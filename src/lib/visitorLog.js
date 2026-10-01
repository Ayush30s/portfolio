const ANALYTICS_ENDPOINT = "https://portfolioanalytics-io9e.onrender.com/api/track";

const SESSION_KEY = "ayush-term-logged";

/* -------------------------------------------------------------------------- */
/* Device / browser helpers                                                   */
/* -------------------------------------------------------------------------- */

function deviceType(ua, touch) {
  const tablet =
    /iPad|Tablet|PlayBook|Silk/i.test(ua) ||
    (/Android/i.test(ua) && !/Mobile/i.test(ua));
  if (tablet) return "tablet";
  if (navigator.userAgentData?.mobile) return "mobile";
  if (/Mobi|iPhone|iPod|Android|Windows Phone|IEMobile/i.test(ua))
    return "mobile";
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
  const v = m[1].replace(/_/g, ".");
  if (/Windows/.test(m[0]))
    return `Windows ${{ "10.0": "10/11", 6.3: "8.1", 6.1: "7" }[v] || v}`;
  if (/Android/.test(m[0])) return `Android ${v}`;
  if (/OS X/.test(m[0])) return `macOS ${v}`;
  return `iOS ${v}`;
}

function browserName(ua) {
  const m = /(Edg|OPR|Chrome|Firefox|Version)\/([\d.]+)/.exec(ua);
  if (!m) return null;
  const name = { Edg: "Edge", OPR: "Opera", Version: "Safari" }[m[1]] || m[1];
  return `${name} ${m[2].split(".")[0]}`;
}

async function getBattery() {
  try {
    if (typeof navigator.getBattery === "function") {
      const b = await navigator.getBattery();
      return {
        battery: `${Math.round(b.level * 100)}%`,
        charging: b.charging ? "Yes" : "No",
      };
    }
  } catch {
    /* optional */
  }
  return { battery: "N/A", charging: "N/A" };
}

/* -------------------------------------------------------------------------- */
/* Payload builder                                                            */
/* -------------------------------------------------------------------------- */

async function buildPayload(event, extra) {
  const ua = navigator.userAgent || "";
  const touch = navigator.maxTouchPoints || 0;
  const conn =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  const { battery, charging } = await getBattery();

  return {
    event,
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
    url: location.href,
    ref: document.referrer || "Direct / None",
    ua,
    cores: navigator.hardwareConcurrency || "N/A",
    memory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "N/A",
    network: conn?.effectiveType
      ? `${conn.effectiveType} (${conn.downlink ?? "?"} Mbps)`
      : "N/A",
    battery,
    charging,
    localTime: new Date().toLocaleString(),
    ...extra,
  };
}

function getPreciseLocation(timeout = 5000) {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => resolve(null),
      { timeout, maximumAge: 60000 },
    );
  });
}

/* -------------------------------------------------------------------------- */
/* Analytics tracking                                                         */
/* -------------------------------------------------------------------------- */

export async function captureAndSendAnalytics(eventType) {
  if (eventType !== "portfolio_view" && eventType !== "resume_view") return;
  await send(eventType);
}

/* -------------------------------------------------------------------------- */
/* Contact lead submission                                                    */
/* -------------------------------------------------------------------------- */

export async function submitContactLead(details) {
  const geo = await getPreciseLocation();

  return send("contact_submit", {
    contactInfo: {
      name: details?.name || "",
      email: details?.email || "",
      phone: details?.phone || "",
      social: details?.social || "",
      company: details?.company || "",
      message: details?.message || "",
    },
    geo, // { lat, lon } or null
  });
}

/* -------------------------------------------------------------------------- */
/* Visit / event loggers                                                      */
/* -------------------------------------------------------------------------- */

export function logVisit() {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* storage unavailable, continue */
  }

  const fire = () => send("visit");
  if (document.readyState === "complete") fire();
  else window.addEventListener("load", fire, { once: true });
}

export function logEvent(event) {
  send(event);
}

/* -------------------------------------------------------------------------- */
/* Transport                                                                  */
/* -------------------------------------------------------------------------- */

async function send(event, extra) {
  try {
    const body = JSON.stringify(await buildPayload(event, extra));

    // text/plain keeps this a "simple" CORS request (no preflight); server parses it as JSON
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
      if (navigator.sendBeacon(ANALYTICS_ENDPOINT, blob)) return true;
    }

    const res = await fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      keepalive: true,
      mode: "cors",
    });
    return res.ok;
  } catch {
    return false; // analytics must never break the site
  }
}
