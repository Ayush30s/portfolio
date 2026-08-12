/* ============================================================================
   Visit logger — zero-dependency Node server.

   Receives a beacon from the portfolio frontend, resolves the caller's IP and
   approximate location, and appends ONE JSON line per visit to visits.log
   (JSONL) at the project root. The file is never rewritten, only appended to.

   In production it also serves the Vite build from dist/, so a single process
   answers both the UI and /api on one origin — which is exactly what the
   relative /api/visit beacon in src/lib/visitorLog.js needs. In dev this stays
   API-only and Vite's proxy plays the same role.

   Run:  npm run log        (API only, alongside `npm run dev`)
         npm start          (API + dist/ — run `npm run build` first)
   Env:  PORT, LOG_FILE, GEO_LOOKUP=off, STATIC_DIR, SERVE_STATIC=off
   ========================================================================== */
import { createServer } from "node:http";
import { appendFile, readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOG_FILE = process.env.LOG_FILE
  ? path.resolve(process.env.LOG_FILE)
  : path.join(ROOT, "visits.log");
const PORT = Number(process.env.PORT) || 8787;
const GEO_ON = process.env.GEO_LOOKUP !== "off";
const MAX_BODY = 8 * 1024; // a beacon is ~1KB; anything larger is junk
const STATIC_DIR = path.resolve(process.env.STATIC_DIR || path.join(ROOT, "dist"));
const SERVE_STATIC = process.env.SERVE_STATIC !== "off";

/* ---- IP helpers ----------------------------------------------------------- */
/* Behind a proxy the socket address is the proxy, so trust the usual headers
   first and take the left-most entry (the original client). */
function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  const raw =
    (typeof fwd === "string" && fwd.split(",")[0]) ||
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress ||
    "";
  return String(raw).trim().replace(/^::ffff:/, "");
}

function isPrivate(ip) {
  if (!ip || ip === "::1" || ip === "1") return true;
  if (/^(127|10)\./.test(ip)) return true;
  if (/^192\.168\./.test(ip)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return true;
  if (/^169\.254\./.test(ip)) return true;
  if (/^(fc|fd|fe80)/i.test(ip)) return true;
  return false;
}

/* ---- Geo lookup ----------------------------------------------------------- */
/* ip-api.com free tier: no key, 45 requests/minute, HTTP only. Cached per IP
   so repeat visitors in the same server run cost nothing. Failures are soft —
   the visit is still logged, just with geo: null. */
const geoCache = new Map();

async function lookupGeo(ip) {
  if (!GEO_ON || isPrivate(ip)) return null;
  if (geoCache.has(ip)) return geoCache.get(ip);
  try {
    const fields = "status,country,countryCode,regionName,city,zip,lat,lon,isp,timezone";
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=${fields}`, {
      signal: AbortSignal.timeout(3000),
    });
    const d = await res.json();
    const geo =
      d.status === "success"
        ? {
            city: d.city || null,
            region: d.regionName || null,
            country: d.country || null,
            cc: d.countryCode || null,
            zip: d.zip || null,
            lat: d.lat ?? null,
            lon: d.lon ?? null,
            tz: d.timezone || null,
            isp: d.isp || null,
          }
        : null;
    geoCache.set(ip, geo);
    return geo;
  } catch {
    return null;
  }
}

/* ---- UA fallback ---------------------------------------------------------- */
/* The client sends parsed device details; this only fills gaps when the beacon
   arrives without them (curl, scrapers, older browsers). */
function parseUa(ua = "") {
  const tablet = /iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua);
  const mobile = /Mobi|iPhone|iPod|Android|Windows Phone|IEMobile/i.test(ua);
  const bot = /bot|crawler|spider|crawling|preview|facebookexternalhit|slurp/i.test(ua);
  const os =
    /Windows NT ([\d.]+)/.exec(ua)?.[0] ||
    /Android [\d.]+/.exec(ua)?.[0] ||
    /(iPhone|iPad) OS [\d_]+/.exec(ua)?.[0] ||
    /Mac OS X [\d_.]+/.exec(ua)?.[0] ||
    (/Linux/.test(ua) ? "Linux" : null);
  const browser =
    /(Edg|OPR|Chrome|Firefox|Safari)\/([\d.]+)/.exec(ua)?.slice(1, 3).join(" ") || null;
  return {
    device: bot ? "bot" : tablet ? "tablet" : mobile ? "mobile" : "desktop",
    os,
    browser,
  };
}

/* ---- Entry assembly ------------------------------------------------------- */
async function buildEntry(req, body) {
  const ip = clientIp(req);
  const ua = body.ua || req.headers["user-agent"] || null;
  const fallback = parseUa(ua || "");
  const geo = await lookupGeo(ip);

  return {
    ts: new Date().toISOString(),
    /* "visit" on arrival; "resume_view" / "resume_download" when the résumé
       buttons are clicked. Older lines predate this field and have none. */
    event: typeof body.event === "string" ? body.event.slice(0, 40) : "visit",
    ip: ip || null,
    local: isPrivate(ip) || undefined,
    device: body.device || fallback.device,
    os: body.os || fallback.os,
    browser: body.browser || fallback.browser,
    screen: body.screen || null,
    viewport: body.viewport || null,
    dpr: body.dpr ?? null,
    touch: body.touch ?? null,
    lang: body.lang || req.headers["accept-language"]?.split(",")[0] || null,
    tz: body.tz || null,
    geo,
    page: body.page || null,
    ref: body.ref || req.headers.referer || null,
    ua,
  };
}

/* ---- Static frontend ------------------------------------------------------ */
/* Serves the Vite build so the UI and the API share an origin in production.
   Only files under STATIC_DIR are reachable — see the traversal guard below. */
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

async function resolveFile(pathname) {
  /* Decode first so "/a%20b.png" finds "a b.png"; malformed escapes throw. */
  let rel;
  try {
    rel = decodeURIComponent(pathname);
  } catch {
    return null;
  }

  /* Leading "." keeps an absolute-looking path relative to STATIC_DIR, and the
     startsWith check stops "../" from climbing out of the build directory. */
  const target = path.resolve(STATIC_DIR, "." + path.posix.normalize(rel));
  if (target !== STATIC_DIR && !target.startsWith(STATIC_DIR + path.sep)) return null;

  try {
    const s = await stat(target);
    if (s.isFile()) return target;
    if (s.isDirectory()) {
      const index = path.join(target, "index.html");
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    /* missing — the caller decides between SPA fallback and 404 */
  }
  return null;
}

async function serveStatic(req, res, pathname) {
  if (req.method !== "GET" && req.method !== "HEAD") return false;

  let file = await resolveFile(pathname);

  /* SPA fallback: unknown *routes* render index.html, but a missing asset stays
     a 404 — answering a dead .js request with HTML turns an obvious missing
     file into a confusing MIME-type error in the console. */
  if (!file && !path.extname(pathname)) {
    const index = path.join(STATIC_DIR, "index.html");
    try {
      if ((await stat(index)).isFile()) file = index;
    } catch {
      return false;
    }
  }
  if (!file) return false;

  /* Vite fingerprints everything in assets/, so those are safe to pin forever.
     index.html never is, or a redeploy leaves visitors on a stale bundle
     pointing at chunks that no longer exist. */
  const hashed = file.startsWith(path.join(STATIC_DIR, "assets") + path.sep);
  const isIndex = path.basename(file) === "index.html";
  res.writeHead(200, {
    "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
    "Cache-Control": isIndex
      ? "no-cache"
      : hashed
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
  });

  if (req.method === "HEAD") {
    res.end();
    return true;
  }

  await new Promise((resolve) => {
    const stream = createReadStream(file);
    stream.on("error", () => {
      res.end();
      resolve();
    });
    stream.on("close", resolve);
    stream.pipe(res);
  });
  return true;
}

/* ---- Server --------------------------------------------------------------- */
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error("body too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  cors(res);
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "OPTIONS") return res.writeHead(204).end();

  if (req.method === "POST" && url.pathname === "/api/visit") {
    let body = {};
    try {
      const raw = await readBody(req);
      body = raw ? JSON.parse(raw) : {};
    } catch {
      body = {};
    }
    try {
      const entry = await buildEntry(req, body);
      await appendFile(LOG_FILE, JSON.stringify(entry) + "\n", "utf8");
      const where = entry.geo
        ? `${entry.geo.city || "?"}, ${entry.geo.country || "?"}`
        : entry.local
          ? "local"
          : "unknown";
      console.log(
        `[${entry.event}] ${entry.ts}  ${entry.ip}  ${entry.device}  ${where}`,
      );
      res.writeHead(204).end();
    } catch (err) {
      console.error("[visit] failed to log:", err);
      res.writeHead(500).end();
    }
    return;
  }

  /* Convenience readback so you can eyeball the log without opening the file. */
  if (req.method === "GET" && url.pathname === "/api/visits") {
    const limit = Math.min(Number(url.searchParams.get("limit")) || 50, 500);
    try {
      const text = await readFile(LOG_FILE, "utf8");
      const lines = text.split("\n").filter(Boolean).slice(-limit);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(`[${lines.join(",")}]`);
    } catch {
      res.writeHead(200, { "Content-Type": "application/json" }).end("[]");
    }
    return;
  }

  if (url.pathname === "/health") return res.writeHead(200).end("ok");

  /* Static last, so an /api path is never shadowed by a file of the same name. */
  if (SERVE_STATIC && (await serveStatic(req, res, url.pathname))) return;

  res.writeHead(404).end();
});

server.listen(PORT, async () => {
  console.log(`visit logger listening on http://localhost:${PORT}`);
  console.log(`appending to ${LOG_FILE}`);
  if (!GEO_ON) console.log("geo lookup disabled (GEO_LOOKUP=off)");

  if (!SERVE_STATIC) return console.log("static serving disabled (SERVE_STATIC=off)");
  try {
    await stat(path.join(STATIC_DIR, "index.html"));
    console.log(`serving frontend from ${STATIC_DIR}`);
  } catch {
    console.log(`no build at ${STATIC_DIR} — run \`npm run build\` (API still works)`);
  }
});
