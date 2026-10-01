const ANALYTICS_ENDPOINT =
  "https://portfolioanalytics-io9e.onrender.com/api/track";

const VISITOR_ENDPOINT =
  "https://portfolio-backend-dli6.onrender.com/api/visit";

const SESSION_KEY = "ayush-term-logged";

/* -------------------------------------------------------------------------- */
/* Device / browser helpers                                                   */
/* -------------------------------------------------------------------------- */

function deviceType(ua, touch) {
  const uaData = navigator.userAgentData;

  const tablet =
    /iPad|Tablet|PlayBook|Silk/i.test(ua) ||
    (/Android/i.test(ua) && !/Mobile/i.test(ua));

  if (tablet) return "tablet";

  if (uaData?.mobile) return "mobile";

  if (/Mobi|iPhone|iPod|Android|Windows Phone|IEMobile/i.test(ua)) {
    return "mobile";
  }

  if (touch > 1 && /Macintosh/.test(ua)) {
    return "tablet";
  }

  return "desktop";
}

function osName(ua) {
  const m =
    /Windows NT ([\d.]+)/.exec(ua) ||
    /Android ([\d.]+)/.exec(ua) ||
    /(?:iPhone|iPad) OS ([\d_]+)/.exec(ua) ||
    /Mac OS X ([\d_.]+)/.exec(ua);

  if (!m) {
    return /Linux/.test(ua) ? "Linux" : null;
  }

  const version = m[1].replace(/_/g, ".");

  if (/Windows/.test(m[0])) {
    return `Windows ${
      {
        "10.0": "10/11",
        6.3: "8.1",
        6.1: "7",
      }[version] || version
    }`;
  }

  if (/Android/.test(m[0])) {
    return `Android ${version}`;
  }

  if (/OS X/.test(m[0])) {
    return `macOS ${version}`;
  }

  return `iOS ${version}`;
}

function browserName(ua) {
  const m = /(Edg|OPR|Chrome|Firefox|Version)\/([\d.]+)/.exec(ua);

  if (!m) return null;

  const name =
    {
      Edg: "Edge",
      OPR: "Opera",
      Version: "Safari",
    }[m[1]] || m[1];

  return `${name} ${m[2].split(".")[0]}`;
}

/* -------------------------------------------------------------------------- */
/* Existing visitor payload                                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Analytics tracking                                                         */
/* -------------------------------------------------------------------------- */

export async function captureAndSendAnalytics(eventType) {
  if (eventType !== "portfolio_view" && eventType !== "resume_view") {
    return;
  }

  let batteryLevel = "N/A";
  let isCharging = "N/A";

  try {
    if (typeof navigator.getBattery === "function") {
      const battery = await navigator.getBattery();

      if (typeof battery.level === "number") {
        batteryLevel = `${Math.round(battery.level * 100)}%`;
      }

      if (typeof battery.charging === "boolean") {
        isCharging = battery.charging ? "Yes" : "No";
      }
    }
  } catch {
    // Battery information is optional.
  }

  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  const payload = {
    type: eventType,

    currentUrl: window.location.href,

    referrer: document.referrer || "Direct",

    language: navigator.language || "N/A",

    screenResolution: `${window.screen.width}x${window.screen.height}`,

    viewportSize: `${window.innerWidth}x${window.innerHeight}`,

    hardwareConcurrency: navigator.hardwareConcurrency || "N/A",

    deviceMemory: navigator.deviceMemory || "N/A",

    localTime: new Date().toLocaleString(),

    connectionType: connection?.effectiveType || "N/A",

    downlink: connection?.downlink || "N/A",

    batteryLevel,

    isCharging,
  };

  try {
    await fetch(ANALYTICS_ENDPOINT, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });
  } catch {
    // Analytics failures must not affect the portfolio.
  }
}

/* -------------------------------------------------------------------------- */
/* Contact lead submission                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Submit visitor contact information to the backend.
 *
 * details:
 * {
 *   name: "John",
 *   email: "john@techcorp.com",
 *   social: "linkedin.com/in/john",
 *   company: "Tech Corp"
 * }
 */
export async function submitContactLead(details) {
  const payload = {
    event: "contact_submit",

    contactInfo: {
      name: details?.name || "",
      email: details?.email || "",
      social: details?.social || "",
      company: details?.company || "",
    },

    page: window.location.pathname,

    ref: document.referrer || null,
  };

  try {
    const response = await fetch(VISITOR_ENDPOINT, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch {
    // Contact logging failure should not break the portfolio.
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/* Existing visit logger                                                      */
/* -------------------------------------------------------------------------- */

export function logVisit() {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage unavailable — continue anyway.
  }

  const fire = () => send("visit");

  if (document.readyState === "complete") {
    fire();
  } else {
    window.addEventListener("load", fire, {
      once: true,
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Existing event logger                                                      */
/* -------------------------------------------------------------------------- */

export function logEvent(event) {
  send(event);
}

/* -------------------------------------------------------------------------- */
/* Existing detailed logger                                                   */
/* -------------------------------------------------------------------------- */

function send(event) {
  const body = JSON.stringify({
    event,
    ...collect(),
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], {
        type: "text/plain;charset=UTF-8",
      });

      if (navigator.sendBeacon(VISITOR_ENDPOINT, blob)) {
        return;
      }
    }

    fetch(VISITOR_ENDPOINT, {
      method: "POST",

      body,

      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },

      keepalive: true,

      mode: "cors",
    }).catch(() => {});
  } catch {
    // Logging should never break the site.
  }
}
