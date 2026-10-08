/* ============================================================================
   Terminal shell — the interactive environment.
   Boot sequence · command history · autocomplete · keyboard shortcuts ·
   clickable toolbar · smooth scroll · hash deep-linking · live status bar.
   ========================================================================== */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./terminal.css";
import {
  runCommand,
  resolveName,
  commandSignature,
  getCompletions,
  Welcome,
  TOOLBAR,
  THEMES,
  SECTION_CMDS,
} from "./commands.jsx";
import { identity } from "./content.js";
import { logEvent } from "../lib/visitorLog.js";

const THEME_KEY = "ayush-term-theme";
const BOOT_KEY = "ayush-term-booted";
const canHover =
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover)").matches;
const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- Prompt --------------------------------------------------------------- */
const Prompt = ({ cwd }) => (
  <span className="term-prompt" aria-hidden="true">
    <span className="tp-user">ayush</span>
    <span className="tp-at">@</span>
    <span className="tp-host">portfolio</span>
    <span className="tp-colon">:</span>
    <span className="tp-path">{cwd}</span>
    <span className="tp-dollar">$</span>
  </span>
);

/* ---- Boot sequence -------------------------------------------------------- */
function Boot({ onDone }) {
  const steps = [
    "Initializing portfolio…",
    "Loading profile…",
    "Loading projects…",
    "Loading experience…",
    "Loading skills…",
    "Mounting system modules…",
  ];
  const [n, setN] = useState(prefersReduced ? steps.length : 0);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    if (prefersReduced) {
      finish();
      return;
    }
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= steps.length) {
        clearInterval(iv);
        setTimeout(finish, 260);
      }
    }, 130);
    const onKey = () => {
      clearInterval(iv);
      setN(steps.length);
      finish();
    };
    window.addEventListener("keydown", onKey, { once: true });
    return () => {
      clearInterval(iv);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="term-boot" onClick={finish}>
      {steps.slice(0, n).map((s, i) => (
        <span className="bl" key={i}>
          <span className="ok">✓</span> <span className="load">{s}</span>
        </span>
      ))}
      {n >= steps.length && (
        <span className="bl done" style={{ marginTop: 6, display: "inline-block" }}>
          ✓ Portfolio initialized successfully.
        </span>
      )}
      {!prefersReduced && n < steps.length && (
        <div className="boot-skip">
          press <kbd>any key</kbd> to skip
        </div>
      )}
    </div>
  );
}

/* ---- Terminal ------------------------------------------------------------- */
export default function Terminal() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState("");
  const [caret, setCaret] = useState(0);
  const [ghost, setGhost] = useState("");
  const [acs, setAcs] = useState([]);
  const [booted, setBooted] = useState(false);
  const [typing, setTyping] = useState(false);
  const [focused, setFocused] = useState(true);
  const [theme, setThemeState] = useState(
    () => (typeof localStorage !== "undefined" && localStorage.getItem(THEME_KEY)) || "dark"
  );
  const [cwd, setCwdState] = useState("~");
  const [clock, setClock] = useState("");

  const inputRef = useRef(null);
  const screenRef = useRef(null);
  const idRef = useRef(0);
  const histRef = useRef([]); // raw command strings
  const histPtrRef = useRef(-1);
  const cwdRef = useRef("~");
  const themeRef = useRef(theme);
  const typingTimer = useRef(null);
  const pendingRef = useRef(null); // deep-link command to run after boot

  useEffect(() => { cwdRef.current = cwd; }, [cwd]);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  const nextId = () => (idRef.current += 1);

  /* Focus the prompt without letting the browser scroll it into view. The
     input is the last thing in .term-screen, so a bare focus() drags the log
     to the bottom — scrolling stays owned by the autoscroll effect below. */
  const focusInput = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    try { el.focus({ preventScroll: true }); } catch { el.focus(); }
  }, []);

  /* ---- theme ---- */
  const applyTheme = useCallback((t) => {
    setThemeState(t);
    themeRef.current = t;
    try { localStorage.setItem(THEME_KEY, t); } catch {}
  }, []);
  const cycleTheme = () => {
    const i = THEMES.indexOf(themeRef.current);
    applyTheme(THEMES[(i + 1) % THEMES.length]);
  };
  const toggleLight = () => applyTheme(themeRef.current === "light" ? "dark" : "light");

  /* ---- title + hash ---- */
  const syncLocation = useCallback((canonical) => {
    const isSection = SECTION_CMDS.includes(canonical) || canonical === "home";
    const seg = canonical === "home" ? "" : `/${canonical}`;
    document.title = `ayush@portfolio: ~${isSection ? seg : ""}`;
    if (isSection) {
      try {
        const hash = canonical === "home" ? " " : `#${canonical}`;
        window.history.replaceState(null, "", canonical === "home" ? window.location.pathname : hash);
      } catch {}
    }
  }, []);

  /* ---- execute ---- */
  const execute = useCallback((rawInput) => {
    const trimmed = String(rawInput || "").trim();
    const canonical = resolveName(trimmed);

    // record in history (skip empty + consecutive dupes)
    if (trimmed) {
      const h = histRef.current;
      if (h[h.length - 1] !== trimmed) h.push(trimmed);
    }
    histPtrRef.current = -1;

    if (canonical === "clear") {
      setEntries([]);
      setInput(""); setGhost(""); setAcs([]); setCaret(0);
      return;
    }

    const ctx = {
      run: (cmd) => execute(cmd),
      clear: () => setEntries([]),
      setTheme: (t) => applyTheme(t),
      theme: themeRef.current,
      setCwd: (c) => setCwdState(c),
      cwd: cwdRef.current,
      history: histRef.current,
    };

    if (canonical === "home") {
      syncLocation("home");
      setEntries([{ id: nextId(), welcome: true, input: null, cwd: cwdRef.current, node: <Welcome ctx={ctx} /> }]);
      setInput(""); setGhost(""); setAcs([]); setCaret(0);
      return;
    }

    const node = trimmed ? runCommand(trimmed, ctx) : null;
    // One panel per command: re-running something already on screen (repeat
    // typing, a toolbar chip, the section navigator) drops the earlier copy and
    // re-renders it fresh at the prompt instead of stacking duplicates.
    const sig = commandSignature(trimmed);
    setEntries((prev) => [
      ...(sig ? prev.filter((e) => e.sig !== sig) : prev),
      { id: nextId(), sig, input: trimmed, cwd: cwdRef.current, node },
    ]);
    setInput(""); setGhost(""); setAcs([]); setCaret(0);
    syncLocation(canonical);
  }, [applyTheme, syncLocation]);

  /* ---- boot done ---- */
  const handleBootDone = useCallback(() => {
    setBooted(true);
    try { sessionStorage.setItem(BOOT_KEY, "1"); } catch {}
    const ctx = {
      run: (cmd) => execute(cmd),
      clear: () => setEntries([]),
      setTheme: (t) => applyTheme(t),
      theme: themeRef.current,
      setCwd: (c) => setCwdState(c),
      cwd: cwdRef.current,
      history: histRef.current,
    };
    // Idempotent: dev hot-reload keeps state but re-runs the mount effect, which
    // used to stack a second welcome screen on top of the first.
    setEntries((prev) =>
      prev.some((e) => e.welcome)
        ? prev
        : [
            ...prev.filter((e) => e.id !== "boot"),
            { id: nextId(), welcome: true, input: null, cwd: "~", node: <Welcome ctx={ctx} /> },
          ]
    );
    if (pendingRef.current) {
      const cmd = pendingRef.current;
      pendingRef.current = null;
      setTimeout(() => execute(cmd), 30);
    }
    if (canHover) setTimeout(focusInput, 40);
  }, [applyTheme, execute, focusInput]);

  /* ---- mount: boot + deep-link ---- */
  useEffect(() => {
    document.title = "ayush@portfolio: ~";
    const hash = (window.location.hash || "").replace(/^#/, "").trim().toLowerCase();
    if (hash) {
      const canon = resolveName(hash);
      if (
        SECTION_CMDS.includes(canon) ||
        ["whoami", "achievements", "resume", "status", "manifesto", "neofetch"].includes(canon)
      ) {
        pendingRef.current = hash;
      }
    }
    let already = false;
    try { already = !!sessionStorage.getItem(BOOT_KEY); } catch {}
    if (already) {
      handleBootDone();
    } else {
      setEntries([{ id: "boot", input: null, cwd: "~", node: <Boot onDone={handleBootDone} /> }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- clock ---- */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (x) => String(x).padStart(2, "0");
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* ---- autoscroll ---- */
  useEffect(() => {
    const s = screenRef.current;
    const last = s && [...s.querySelectorAll(".term-entry")].pop();
    if (!last) return;
    s.scrollTop += last.getBoundingClientRect().top - s.getBoundingClientRect().top - 12;
  }, [entries, booted]);

  /* ---- input handling ---- */
  const recompute = useCallback((val, selStart) => {
    setCaret(selStart);
    // autocomplete
    const list = getCompletions(val).slice(0, 8);
    setAcs(list);
    const atEnd = selStart >= val.length;
    if (atEnd && list.length) {
      const best = list[0];
      setGhost(best.toLowerCase().startsWith(val.toLowerCase()) ? best.slice(val.length) : "");
    } else {
      setGhost("");
    }
  }, []);

  const onChange = (e) => {
    const val = e.target.value;
    setInput(val);
    histPtrRef.current = -1;
    setTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTyping(false), 600);
    recompute(val, e.target.selectionStart ?? val.length);
  };

  const syncCaret = (e) => {
    const el = e.target;
    setCaret(el.selectionStart ?? 0);
    const atEnd = (el.selectionStart ?? 0) >= el.value.length;
    if (!atEnd) setGhost("");
    else recompute(el.value, el.selectionStart ?? el.value.length);
  };

  const acceptGhost = () => {
    if (!ghost) return false;
    const val = input + ghost;
    setInput(val);
    setGhost("");
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (el) { el.selectionStart = el.selectionEnd = val.length; }
      recompute(val, val.length);
    });
    return true;
  };

  const recallHistory = (dir) => {
    const h = histRef.current;
    if (!h.length) return;
    let ptr = histPtrRef.current;
    if (dir === "up") ptr = Math.min(ptr + 1, h.length - 1);
    else ptr = Math.max(ptr - 1, -1);
    histPtrRef.current = ptr;
    const val = ptr === -1 ? "" : h[h.length - 1 - ptr];
    setInput(val);
    setGhost(""); setAcs([]);
    requestAnimationFrame(() => {
      const el = inputRef.current;
      if (el) { el.selectionStart = el.selectionEnd = val.length; setCaret(val.length); }
    });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      execute(e.currentTarget.value); // live DOM value — never races input state
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (!acceptGhost() && acs.length) {
        setInput(acs[0]);
        requestAnimationFrame(() => recompute(acs[0], acs[0].length));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      recallHistory("up");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      recallHistory("down");
    } else if (e.key === "ArrowRight" && ghost && (e.target.selectionStart ?? 0) >= input.length) {
      e.preventDefault();
      acceptGhost();
    } else if ((e.ctrlKey || e.metaKey) && (e.key === "l" || e.key === "L")) {
      e.preventDefault();
      setEntries([]);
    } else if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
      // cancel current line
      if (window.getSelection && String(window.getSelection())) return; // allow copy
      e.preventDefault();
      setEntries((prev) => [
        ...prev,
        { id: nextId(), input: (input ? input + " " : "") + "^C", cwd: cwdRef.current, node: null },
      ]);
      setInput(""); setGhost(""); setAcs([]); setCaret(0);
      histPtrRef.current = -1;
    }
  };

  /* Focus the prompt when clicking empty terminal space — but never on a
     selection gesture. The decision is deferred to mouseup: focusing on
     mousedown stole focus the moment a drag-select began, and since the prompt
     lives at the bottom of .term-screen the browser scrolled the whole log down
     mid-copy. */
  const downRef = useRef(null);

  const onScreenMouseDown = (e) => {
    const t = e.target;
    const interactive = t && t.closest && t.closest("a, button, [role='button'], input, textarea, select");
    downRef.current = interactive ? null : { x: e.clientX, y: e.clientY };
  };

  const onScreenMouseUp = (e) => {
    const start = downRef.current;
    downRef.current = null;
    if (!start) return;
    // moved between press and release → the user was dragging out a selection
    if (Math.abs(e.clientX - start.x) > 4 || Math.abs(e.clientY - start.y) > 4) return;
    if (window.getSelection && String(window.getSelection())) return;
    focusInput();
  };

  const toolbar = useMemo(() => TOOLBAR, []);

  return (
    <div id="term-root" data-theme={theme}>
      <div className={`term-window${focused ? "" : " blurred"}`}>
        {/* toolbar (no window chrome — the terminal is the page) */}
        <div className="term-toolbar" role="navigation" aria-label="Quick commands">
          <button type="button" className="tb-chip tb-home" onClick={() => execute("home")} title="Home" aria-label="Home">›_</button>
          {toolbar.map((c) => (
            c === "resume" ? (
              <a key={c} className="tb-chip primary" href={identity.resume} target="_blank" rel="noopener noreferrer" onClick={() => logEvent("resume_view")}>
                View résumé ↗
              </a>
            ) : (
              <button key={c} type="button" className="tb-chip" onClick={() => execute(c)}>
                {c}
              </button>
            )
          ))}
          <span style={{ flex: 1 }} />
          <button type="button" className="tb-chip" onClick={() => execute("help")}>
            help
          </button>
          <span className="tb-sep" aria-hidden="true" />
          <button type="button" className="tb-chip tb-ctl" onClick={toggleLight} title="Toggle light / dark mode" aria-label="Toggle light or dark mode">
            {theme === "light" ? "☾ Dark" : "☀ Light"}
          </button>
          <button type="button" className="tb-chip tb-ctl hide-sm" onClick={cycleTheme} title="Cycle color theme (dark · matrix · amber · light · mono)">
            ◑ {theme}
          </button>
        </div>

        {/* screen */}
        <div
          className="term-screen"
          ref={screenRef}
          onMouseDown={onScreenMouseDown}
          onMouseUp={onScreenMouseUp}
        >
          {entries.map((e) => (
            <div className="term-entry" key={e.id}>
              {e.input != null && (
                <div className="term-cmdline">
                  <Prompt cwd={e.cwd || "~"} />
                  <span className="term-cmdtext">{e.input}</span>
                </div>
              )}
              {e.node && <div className="term-output">{e.node}</div>}
            </div>
          ))}

          {booted && (
            <div className="term-inputline">
              <Prompt cwd={cwd} />
              <div className="term-inputwrap">
                <div className="term-mirror">
                  <span>{input.slice(0, caret)}</span>
                  <span className={`term-cursor${typing ? " typing" : ""}`} />
                  <span>{input.slice(caret)}</span>
                  {ghost && <span className="term-ghost">{ghost}</span>}
                </div>
                <input
                  ref={inputRef}
                  className="term-input"
                  value={input}
                  onChange={onChange}
                  onKeyDown={onKeyDown}
                  onKeyUp={syncCaret}
                  onClick={syncCaret}
                  onSelect={syncCaret}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  autoFocus={canHover}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  aria-label="Terminal command input"
                  enterKeyHint="go"
                />
              </div>
            </div>
          )}

          {booted && acs.length > 1 && (
            <div className="term-ac" aria-hidden="true">
              {acs.map((a, i) => (
                <span
                  key={a}
                  className={`ac${i === 0 ? " sel" : ""}`}
                  onMouseDown={(ev) => {
                    ev.preventDefault();
                    setInput(a);
                    requestAnimationFrame(() => {
                      focusInput();
                      recompute(a, a.length);
                    });
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* status bar */}
        <div className="term-statusbar">
          <span className="sb-online"><span className="pulse" />ONLINE</span>
          <span className="sb-sep">│</span>
          <span>UTF-8</span>
          <span className="sb-sep">│</span>
          <span>zsh</span>
          <span className="sb-sep">│</span>
          <span className="tp-path">{cwd}</span>
          <span className="sb-spring" />
          <span className="sb-hint">Click anything · or type: Tab complete · ↑↓ history</span>
          <span className="sb-sep">│</span>
          <span className="sb-clock">{clock}</span>
        </div>

      </div>
    </div>
  );
}
