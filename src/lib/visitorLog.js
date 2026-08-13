const ENDPOINT =  "https://portfolio-backend-dli6.onrender.com/api/visit";
const SESSION_KEY = "ayush-term-logged";

/* ---- Device sniffing ------------------------------------------------------ */
function deviceType(ua, touch) {
  const uaData = navigator.userAgentData;
  const tablet = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
  if (tablet) return "tablet";
  if (uaData?.mobile) return "mobile";
  if (/Mobi|iPhone|iPod|Android|Windows Phone|IEMobile/i.test(ua)) return "mobile";
  /* iPadOS 13+ reports a desktop UA — touch points give it away. */
  if (touch > 1 && /Macintosh/.test(ua)) return "tablet";
  return "desktop";
}

function osName(ua) {
  const m =
    /Windows NT ([\d.]+)/.exec(ua) ||
    /Android ([\d.]+)/.exec(ua) ||
    /(?:iPhone|iPad) OS ([\d_]+)/.exec(ua) ||
    /Mac OS X ([\d_.]+)/.exec(ua);
  if (!m) return /Linux/.test(ua) ? "Linux" : null;
  const version = m[1].replace(/_/g, ".");
  if (/Windows/.test(m[0])) return `Windows ${{ "10.0": "10/11", 6.3: "8.1", 6.1: "7" }[version] || version}`;
  if (/Android/.test(m[0])) return `Android ${version}`;
  if (/OS X/.test(m[0])) return `macOS ${version}`;
  return `iOS ${version}`;
}

function browserName(ua) {
  const m = /(Edg|OPR|Chrome|Firefox|Version)\/([\d.]+)/.exec(ua);
  if (!m) return null;
  const name = { Edg: "Edge", OPR: "Opera", Version: "Safari" }[m[1]] || m[1];
  return `${name} ${m[2].split(".")[0]}`;
}

/* ---- Payload -------------------------------------------------------------- */
function collect() {
  const ua = navigator.userAgent || "";
  const touch = navigator.maxTouchPoints || 0;
  return {
    device: deviceType(ua, touch),
    os: osName(ua),
    browser: browserName(ua),
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    dpr: window.devicePixelRatio || 1,
    touch: touch > 0,
    lang: navigator.language || null,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    page: location.pathname + location.hash,
    ref: document.referrer || null,
    ua,
  };
}

/* ---- Send ----------------------------------------------------------------- */
/* text/plain keeps this a CORS "simple request" — no preflight, and it is the
   only content type sendBeacon can carry as a string. Fire-and-forget: a dead
   logger server must never surface an error in the page. */
export function logVisit() {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode with storage disabled — log anyway, just possibly twice */
  }

  /* Wait for first layout, otherwise viewport dimensions read as 0x0 — and the
     beacon stays out of the way of the initial page load. */
  const fire = () => send("visit");
  if (document.readyState === "complete") fire();
  else window.addEventListener("load", fire, { once: true });
}

/* Anything worth marking beyond the arrival itself — résumé opens, and so on.
   Not session-guarded: every click is its own line, so repeat interest shows. */
export function logEvent(event) {
  send(event);
}

function send(event) {
  const body = JSON.stringify({ event, ...collect() });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
      if (navigator.sendBeacon(ENDPOINT, blob)) return;
    }
    fetch(ENDPOINT, {
      method: "POST",
      body,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      keepalive: true,
      mode: "cors",
    }).catch(() => {});
  } catch {
    /* ignore — logging is never worth breaking the site over */
  }
}
