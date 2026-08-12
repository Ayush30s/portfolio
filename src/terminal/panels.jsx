/* ============================================================================
   Live data panels for the achievements dashboard.
   - LeetCodePanel: fetches solved counts + submission calendar from the SAME
     endpoint the GUI uses (alfa-leetcode-api), renders an ASCII heatmap +
     difficulty bars + earned badges. Falls back to the real static snapshot.
   - GitHubPanel: fetches real contribution data (jogruber API) -> ASCII heatmap.
   No fabricated numbers: live where possible, real snapshot as fallback.
   ========================================================================== */
import React, { useEffect, useState } from "react";

// LeetCode data — same source the GUI uses (alfa-leetcode-api). Split across two
// endpoints: /userProfile/<user> (solved counts + global ranking) and
// /<user>/calendar (submission calendar + streak + active days). The calendar
// arrives as a STRINGIFIED JSON map of { unixSeconds: count }, so it needs a parse.
const LC_USER = "ayush2s";
const LC_PROFILE = `https://alfa-leetcode-api.onrender.com/userProfile/${LC_USER}`;
const LC_CALENDAR = `https://alfa-leetcode-api.onrender.com/${LC_USER}/calendar`;
const GH = "https://github-contributions-api.jogruber.de/v4/Ayush30s?y=last";

// Real static snapshot (mirrors the GUI fallback) — shown instantly, refreshed live.
const FALLBACK = { solved: 607, easy: 221, medium: 338, hard: 48, ranking: 133369, streak: 5, activeDays: 40 };

// Real earned LeetCode badges (from the GUI's badge list).
export const LC_BADGES = [
  { n: "365 Days Badge", d: "2024-12-14", key: "365", star: true },
  { n: "200 Days Badge 2024", d: "2024-10-15", key: "200", star: true },
  { n: "100 Days Badge 2024", d: "2024-04-13", key: "100", star: true },
  { n: "50 Days Badge 2024", d: "2024-02-22", key: "50", star: true },
  { n: "100 Days Badge 2023", d: "2023-12-15", key: "100", star: true },
  { n: "50 Days Badge 2023", d: "2023-12-15", key: "50", star: true },
  { n: "May LeetCoding Challenge", d: "2024-06", key: "MAY" },
  { n: "Apr LeetCoding Challenge", d: "2024-04", key: "APR" },
  { n: "Mar LeetCoding Challenge", d: "2024-03", key: "MAR" },
  { n: "Feb LeetCoding Challenge", d: "2024-02", key: "FEB" },
  { n: "Jan LeetCoding Challenge", d: "2024-01", key: "JAN" },
  { n: "Dec LeetCoding Challenge", d: "2023-12", key: "DEC" },
  { n: "Nov LeetCoding Challenge", d: "2023-11", key: "NOV" },
];

const GLYPH = ["·", "░", "▒", "▓", "█"];
const pad = (n) => String(n).padStart(2, "0");
const keyOf = (d) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());

const lcLevel = (c) => (!c ? 0 : c <= 2 ? 1 : c <= 5 ? 2 : c <= 9 ? 3 : 4);

// derive active-days + current streak from a {tsSeconds: count} calendar
const activeDaysFrom = (raw) => {
  const cutoff = Date.now() / 1000 - 366 * 86400;
  return Object.keys(raw).filter((ts) => +ts >= cutoff && raw[ts] > 0).length;
};
const streakFrom = (raw) => {
  const active = new Set(
    Object.keys(raw).filter((ts) => raw[ts] > 0).map((ts) => keyOf(new Date(+ts * 1000)))
  );
  let streak = 0;
  const d = new Date();
  if (!active.has(keyOf(d))) d.setDate(d.getDate() - 1); // grace: today may be empty
  while (active.has(keyOf(d))) { streak++; d.setDate(d.getDate() - 1); }
  return streak;
};

// Build a 53-week x 7-day ASCII heatmap ending this week. levelFor: key -> 0..4
// Each day = a PAIR of glyphs so the cell reads square (monospace chars are ~2:1
// tall); a blank column is inserted between months for readability.
function buildGrid(levelFor) {
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay())); // Saturday of the current week
  const start = new Date(end);
  start.setDate(end.getDate() - (53 * 7 - 1)); // Sunday, 53 weeks back
  const rows = [[], [], [], [], [], [], []];
  const cell = (lvl) => {
    const g = lvl < 0 ? " " : GLYPH[lvl || 0];
    return g + g; // doubled -> square cell
  };
  let prevMonth = -1;
  for (let w = 0; w < 53; w++) {
    const ws = new Date(start);
    ws.setDate(start.getDate() + w * 7);
    const month = ws.getMonth();
    if (prevMonth !== -1 && month !== prevMonth) {
      for (let r = 0; r < 7; r++) rows[r].push("  "); // month separator
    }
    prevMonth = month;
    for (let r = 0; r < 7; r++) {
      const d = new Date(ws);
      d.setDate(ws.getDate() + r);
      rows[r].push(cell(d > today ? -1 : levelFor(keyOf(d)) || 0));
    }
  }
  return rows.map((r) => r.join("")).join("\n");
}

// Longer timeout tolerates the LeetCode API's free-tier cold start; the snapshot
// stats already render instantly, so this only delays the live heatmap refresh.
const jsonFetch = (u, ms = 16000) =>
  Promise.race([
    fetch(u).then((r) => (r.ok ? r.json() : null)),
    new Promise((res) => setTimeout(() => res(null), ms)),
  ]).catch(() => null);

const Legend = () => (
  <div className="t-heat-legend c-muted">
    Less <span className="c-dim">·░▒▓█</span> More
  </div>
);

/* ---- LeetCode ------------------------------------------------------------- */
export function LeetCodePanel() {
  const [s, setS] = useState(FALLBACK);
  const [cal, setCal] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | live | snapshot

  useEffect(() => {
    let dead = false;
    // Fetch profile (counts + ranking) and calendar (heatmap + streak) in parallel;
    // either can fail independently — snapshot stats already render underneath.
    Promise.all([jsonFetch(LC_PROFILE), jsonFetch(LC_CALENDAR)]).then(([prof, cal]) => {
      if (dead) return;
      const next = { ...FALLBACK };
      let got = false;

      if (prof && prof.totalSolved != null) {
        next.solved = prof.totalSolved;
        next.easy = prof.easySolved;
        next.medium = prof.mediumSolved;
        next.hard = prof.hardSolved;
        next.ranking = prof.ranking || FALLBACK.ranking;
        got = true;
      }

      if (cal) {
        got = true;
        if (cal.totalActiveDays != null) next.activeDays = cal.totalActiveDays;
        if (cal.streak != null) next.streak = cal.streak;
        // submissionCalendar is a stringified { unixSeconds: count } map
        let raw = cal.submissionCalendar;
        if (typeof raw === "string") { try { raw = JSON.parse(raw); } catch { raw = null; } }
        if (raw && typeof raw === "object") {
          const m = new Map();
          Object.keys(raw).forEach((ts) => m.set(keyOf(new Date(+ts * 1000)), lcLevel(raw[ts])));
          setCal(m);
          if (cal.totalActiveDays == null) next.activeDays = activeDaysFrom(raw);
          if (cal.streak == null) next.streak = streakFrom(raw);
        }
      }

      setS(next);
      setStatus(got ? "live" : "snapshot");
    });
    return () => { dead = true; };
  }, []);

  const max = Math.max(s.easy, s.medium, s.hard, 1);
  const Bar = ({ label, val, cls }) => (
    <div className="t-skill">
      <span className="name">{label} <b className="c-text">{val}</b></span>
      <div className={`t-bar ${cls}`}><i style={{ "--w": (val / max) * 100 + "%" }} /></div>
    </div>
  );

  return (
    <div className="t-ach-panel">
      <div className="t-ach-head">
        <span className="t-subheading">LeetCode</span>
        <a className="t-link" href="https://leetcode.com/ayush2s" target="_blank" rel="noopener noreferrer">@ayush2s ↗</a>
        <span className={`t-live ${status}`}>{status === "loading" ? "◌ syncing" : status === "live" ? "● live" : "○ snapshot"}</span>
      </div>
      <div className="t-hr" />
      <div className="t-lcstat">
        <div><b className="c-green-b">{s.solved}</b><span>solved</span></div>
        <div><b>#{s.ranking.toLocaleString()}</b><span>global rank</span></div>
        <div><b>{s.activeDays}</b><span>active days</span></div>
        <div><b className="c-green">{s.streak}</b><span>day streak</span></div>
      </div>
      <div style={{ marginTop: 10 }}>
        <Bar label="Easy  " val={s.easy} cls="easy" />
        <Bar label="Medium" val={s.medium} cls="medium" />
        <Bar label="Hard  " val={s.hard} cls="hard" />
      </div>
      <div className="c-accent c-bold t-mt">Submission activity · last 12 months</div>
      {cal ? (
        <pre className="t-heat" aria-hidden="true">{buildGrid((k) => cal.get(k) || 0)}</pre>
      ) : (
        <div className="c-muted c-dim" style={{ padding: "8px 0" }}>
          {status === "loading" ? "◌ loading submission calendar…" : "○ live calendar unavailable — showing snapshot stats above"}
        </div>
      )}
      {cal && <Legend />}
      <div className="c-accent c-bold t-mt">Earned badges <span className="c-muted c-dim">({LC_BADGES.length})</span></div>
      <div className="t-badges2">
        {LC_BADGES.map((b) => (
          <div className={`t-badge2${b.star ? " star" : ""}`} key={b.n} title={`${b.n} · ${b.d}`}>
            <div className="sq">
              <pre className="emblem">{".-.\n(" + b.key + ")\n'-'"}</pre>
            </div>
            <div className="t-badge-cap">{b.n}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- GitHub --------------------------------------------------------------- */
export function GitHubPanel() {
  const [data, setData] = useState(null); // { total, map }
  const [status, setStatus] = useState("loading"); // loading | live | offline

  useEffect(() => {
    let dead = false;
    jsonFetch(GH).then((d) => {
      if (dead) return;
      if (d && Array.isArray(d.contributions)) {
        const map = new Map();
        let total = 0;
        d.contributions.forEach((c) => { map.set(c.date, c.level); total += c.count || 0; });
        setData({ total, map });
        setStatus("live");
      } else {
        setStatus("offline");
      }
    });
    return () => { dead = true; };
  }, []);

  return (
    <div className="t-ach-panel">
      <div className="t-ach-head">
        <span className="t-subheading">GitHub</span>
        <a className="t-link" href="https://github.com/Ayush30s" target="_blank" rel="noopener noreferrer">@Ayush30s ↗</a>
        <span className={`t-live ${status}`}>{status === "loading" ? "◌ syncing" : status === "live" ? "● live" : "○ offline"}</span>
      </div>
      <div className="t-hr" />
      {status === "live" && data ? (
        <>
          <div className="c-text"><b className="c-green-b">{data.total.toLocaleString()}</b> <span className="c-muted">contributions in the last year</span></div>
          <pre className="t-heat" aria-hidden="true">{buildGrid((k) => data.map.get(k) || 0)}</pre>
          <Legend />
        </>
      ) : status === "loading" ? (
        <div className="c-muted c-dim" style={{ padding: "8px 0" }}>◌ fetching contribution graph…</div>
      ) : (
        <div className="c-muted c-dim" style={{ padding: "8px 0" }}>
          ○ contribution graph unavailable right now — see{" "}
          <a className="t-link" href="https://github.com/Ayush30s" target="_blank" rel="noopener noreferrer">github.com/Ayush30s ↗</a>
        </div>
      )}
    </div>
  );
}
