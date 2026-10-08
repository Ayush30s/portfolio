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
const GH = "https://github-contributions-api.jogruber.de/v4/Ayush30s?y=all";

// Real static snapshot (mirrors the GUI fallback) — shown instantly, refreshed live.
const FALLBACK = { solved: 607, easy: 221, medium: 338, hard: 48, ranking: 133369, streak: 5, activeDays: 40 };

// Real earned LeetCode badges + their official icons (from /ayush2s/badges).
export const LC_BADGES = [
  { n: "365 Days Badge", d: "2024-12-14", icon: "https://assets.leetcode.com/static_assets/marketing/lg365.png" },
  { n: "200 Days Badge 2024", d: "2024-10-15", icon: "https://assets.leetcode.com/static_assets/marketing/2024-200-lg.png" },
  { n: "100 Days Badge 2024", d: "2024-04-13", icon: "https://assets.leetcode.com/static_assets/marketing/2024-100-lg.png" },
  { n: "50 Days Badge 2024", d: "2024-02-22", icon: "https://assets.leetcode.com/static_assets/marketing/2024-50-lg.png" },
  { n: "100 Days Badge 2023", d: "2023-12-15", icon: "https://assets.leetcode.com/static_assets/marketing/lg100.png" },
  { n: "50 Days Badge 2023", d: "2023-12-15", icon: "https://assets.leetcode.com/static_assets/marketing/lg50.png" },
  { n: "May LeetCoding Challenge", d: "2024-06", icon: "https://leetcode.com/static/images/badges/dcc-2024-5.png" },
  { n: "Apr LeetCoding Challenge", d: "2024-04", icon: "https://leetcode.com/static/images/badges/dcc-2024-4.png" },
  { n: "Mar LeetCoding Challenge", d: "2024-03", icon: "https://leetcode.com/static/images/badges/dcc-2024-3.png" },
  { n: "Feb LeetCoding Challenge", d: "2024-02", icon: "https://leetcode.com/static/images/badges/dcc-2024-2.png" },
  { n: "Jan LeetCoding Challenge", d: "2024-01", icon: "https://leetcode.com/static/images/badges/dcc-2024-1.png" },
  { n: "Dec LeetCoding Challenge", d: "2023-12", icon: "https://leetcode.com/static/images/badges/dcc-2023-12.png" },
  { n: "Nov LeetCoding Challenge", d: "2023-11", icon: "https://leetcode.com/static/images/badges/dcc-2023-11.png" },
];

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

// Heatmap days as a column-major list of levels (0..4, or -1 = hidden: not yet
// happened / outside the chosen year). year "" = the last 53 weeks ending this week;
// otherwise every week touching Jan 1 – Dec 31 of that year.
function heatCells(levelFor, year) {
  const today = new Date();
  const first = year ? new Date(+year, 0, 1) : null;
  const last = year ? new Date(+year, 11, 31) : today;
  const end = new Date(last);
  end.setDate(last.getDate() + (6 - last.getDay())); // Saturday of the last week
  const start = new Date(first || end);
  if (first) start.setDate(first.getDate() - first.getDay()); // Sunday on/before Jan 1
  else start.setDate(end.getDate() - (53 * 7 - 1)); // Sunday, 53 weeks back
  const days = Math.round((end - start) / 864e5) + 1;
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d > today || d > last || (first && d < first) ? -1 : levelFor(keyOf(d)) || 0;
  });
}

const Heat = ({ levelFor, year }) => (
  <div className="t-heat" aria-hidden="true">
    {heatCells(levelFor, year).map((l, i) => <i key={i} data-l={l} />)}
  </div>
);

// "" = last 12 months, otherwise a calendar year (newest first).
const YearSelect = ({ years, value, onChange }) => (
  <select className="t-select" value={value} onChange={(e) => onChange(e.target.value)} aria-label="Year">
    <option value="">Last 12 months</option>
    {years.map((y) => <option key={y} value={y}>{y}</option>)}
  </select>
);

// Longer timeout tolerates the LeetCode API's free-tier cold start; the snapshot
// stats already render instantly, so this only delays the live heatmap refresh.
const jsonFetch = (u, ms = 16000) =>
  Promise.race([
    fetch(u).then((r) => (r.ok ? r.json() : null)),
    new Promise((res) => setTimeout(() => res(null), ms)),
  ]).catch(() => null);

const Legend = () => (
  <div className="t-heat-legend c-muted">
    Less <span className="t-heat-key">{[0, 1, 2, 3, 4].map((l) => <i key={l} data-l={l} />)}</span> More
  </div>
);

// LeetCode calendar response -> { map: date -> level, activeDays, streak, years },
// or null. With ?year=, streak is that year's longest; without, the current one.
// submissionCalendar arrives as a STRINGIFIED { unixSeconds: count } map.
function parseCalendar(cal) {
  if (!cal) return null;
  let raw = cal.submissionCalendar;
  if (typeof raw === "string") { try { raw = JSON.parse(raw); } catch { raw = null; } }
  if (!raw || typeof raw !== "object") return null;
  const map = new Map();
  Object.keys(raw).forEach((ts) => map.set(keyOf(new Date(+ts * 1000)), lcLevel(raw[ts])));
  return {
    map,
    activeDays: cal.totalActiveDays ?? activeDaysFrom(raw),
    streak: cal.streak ?? streakFrom(raw),
    years: (cal.activeYears || []).map(String).sort().reverse(),
  };
}

/* ---- LeetCode ------------------------------------------------------------- */
export function LeetCodePanel() {
  const [s, setS] = useState(FALLBACK);
  const [status, setStatus] = useState("loading"); // loading | live | snapshot
  const [year, setYear] = useState(""); // "" = last 12 months
  const [cals, setCals] = useState({}); // year -> parsed calendar | null (failed); absent = loading

  useEffect(() => {
    let dead = false;
    // Fetch profile (counts + ranking) and calendar (heatmap + streak) in parallel;
    // either can fail independently — snapshot stats already render underneath.
    Promise.all([jsonFetch(LC_PROFILE), jsonFetch(LC_CALENDAR)]).then(([prof, rawCal]) => {
      if (dead) return;
      const next = { ...FALLBACK };
      if (prof && prof.totalSolved != null) {
        next.solved = prof.totalSolved;
        next.easy = prof.easySolved;
        next.medium = prof.mediumSolved;
        next.hard = prof.hardSolved;
        next.ranking = prof.ranking || FALLBACK.ranking;
      }
      const cal = parseCalendar(rawCal);
      if (cal) {
        next.activeDays = cal.activeDays;
        next.streak = cal.streak;
      }
      setCals((c) => ({ ...c, "": cal }));
      setS(next);
      setStatus(prof || cal ? "live" : "snapshot");
    });
    return () => { dead = true; };
  }, []);

  // A past year is fetched the first time it's picked, then kept.
  useEffect(() => {
    if (!year || year in cals) return;
    let dead = false;
    jsonFetch(`${LC_CALENDAR}?year=${year}`).then((raw) => {
      if (!dead) setCals((c) => ({ ...c, [year]: parseCalendar(raw) }));
    });
    return () => { dead = true; };
  }, [year, cals]);

  const cal = cals[year];
  // badges follow the dropdown: a year shows what was earned that year; the
  // default view shows every badge
  const badges = year ? LC_BADGES.filter((b) => b.d.startsWith(year)) : LC_BADGES;
  const years = cals[""]?.years || [];

  // Each bar is that difficulty's share of everything solved (same scale for all
  // three), labelled with count + % so the colour is never the only cue.
  const total = Math.max(s.easy + s.medium + s.hard, 1);
  const diff = [["Easy", s.easy, "easy"], ["Medium", s.medium, "medium"], ["Hard", s.hard, "hard"]];

  return (
    <div className="t-ach-panel">
      <div className="t-ach-head">
        <span className="t-subheading">LeetCode</span>
        <a className="t-link" href="https://leetcode.com/ayush2s" target="_blank" rel="noopener noreferrer">@ayush2s ↗</a>
        <span className={`t-live ${status}`}>{status === "loading" ? "◌ syncing" : status === "live" ? "● live" : "○ snapshot"}</span>
      </div>
      <div className="t-hr" />
      <div className="t-stats">
        {[
          [s.solved, "Problems solved"],
          [`#${s.ranking.toLocaleString()}`, "Global rank"],
          [s.activeDays, "Active days"],
          [s.streak, "Day streak"],
        ].map(([v, k]) => (
          <div className="t-stat" key={k}><b>{v}</b><span>{k}</span></div>
        ))}
      </div>
      <div className="c-accent c-bold t-mt">Solved by difficulty</div>
      <div className="t-diff">
        {diff.map(([label, val, cls]) => {
          const pct = Math.round((val / total) * 100);
          return (
            <div className={`t-diff-row ${cls}`} key={label} title={`${label}: ${val} solved (${pct}%)`}>
              <span className="lbl"><i />{label}</span>
              <b>{val}</b>
              <span className="track"><span className="fill" style={{ width: `${pct}%` }} /></span>
              <span className="pct">{pct}%</span>
            </div>
          );
        })}
      </div>
      <div className="t-heat-head t-mt">
        <span className="c-accent c-bold">Submission activity</span>
        {years.length > 0 && <YearSelect years={years} value={year} onChange={setYear} />}
        {year && cal && (
          <span className="c-muted">
            <b className="c-text">{cal.activeDays}</b> active days · longest streak <b className="c-text">{cal.streak}</b>
          </span>
        )}
      </div>
      {cal ? (
        <>
          <Heat levelFor={(k) => cal.map.get(k)} year={year} />
          <Legend />
        </>
      ) : (
        <div className="c-muted c-dim" style={{ padding: "8px 0" }}>
          {cal === undefined ? "◌ loading submission calendar…" : "○ calendar unavailable right now — try again in a bit"}
        </div>
      )}
      <div className="c-accent c-bold t-mt">
        Earned badges <span className="c-muted c-dim">{year ? `in ${year}` : "· all time"} ({badges.length})</span>
      </div>
      {badges.length === 0 && <div className="c-muted c-dim" style={{ padding: "8px 0" }}>No badges earned in {year}.</div>}
      <div className="t-badges2">
        {badges.map((b) => (
          <div className="t-badge2" key={b.n} title={`${b.n} · ${b.d}`}>
            <div className="sq">
              <img src={b.icon} alt="" loading="lazy" />
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
  const [data, setData] = useState(null); // { days: date -> { level, count }, totals: year -> n }
  const [status, setStatus] = useState("loading"); // loading | live | offline
  const [year, setYear] = useState(""); // "" = last 12 months

  useEffect(() => {
    let dead = false;
    // one call returns every year, so switching years needs no further fetches
    jsonFetch(GH).then((d) => {
      if (dead) return;
      if (d && Array.isArray(d.contributions)) {
        const days = new Map();
        d.contributions.forEach((c) => days.set(c.date, c));
        setData({ days, totals: d.total || {} });
        setStatus("live");
      } else {
        setStatus("offline");
      }
    });
    return () => { dead = true; };
  }, []);

  let count = 0;
  if (data) {
    if (year) count = data.totals[year] || 0;
    else {
      const since = keyOf(new Date(Date.now() - 365 * 864e5));
      data.days.forEach((c, k) => { if (k > since) count += c.count || 0; });
    }
  }
  const years = data ? Object.keys(data.totals).sort().reverse() : [];

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
          <div className="t-heat-head">
            <span className="c-text">
              <b className="c-green-b">{count.toLocaleString()}</b>{" "}
              <span className="c-muted">contributions {year ? `in ${year}` : "in the last year"}</span>
            </span>
            <YearSelect years={years} value={year} onChange={setYear} />
          </div>
          <Heat levelFor={(k) => data.days.get(k)?.level} year={year} />
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
