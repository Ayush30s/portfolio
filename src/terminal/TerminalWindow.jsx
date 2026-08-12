import React, { useEffect, useRef, useState } from "react";

/* ============================================================================
   TerminalWindow — a draggable mini terminal window.

   Generic shell only: a header (a single red close button on the top-left ·
   title) and a scrollable body. Content is passed as children so the same shell
   serves both project and experience details.

   • The red top-left button closes the window, or type `exit` at its prompt.
   • Dragging is pointer-based, grabbed from the header only. The cursor offset
     is preserved so the window never jumps, and the position is clamped so a
     window can never be lost off-screen (a strip always stays reachable).
   • Position is owned locally while dragging (smooth, and it never re-renders
     sibling windows) and committed back to the parent on release, so the parent
     stays the source of truth for persistence + layering.
   ========================================================================== */
const KEEP_VISIBLE = 52; // px of the window kept on-screen at all times
// commands understood by a window's own prompt
const EXIT = ["exit", "quit", "q", ":q", "close", "bye"];

const TerminalWindow = React.memo(function TerminalWindow({
  id,
  title,
  type,
  x,
  y,
  zIndex,
  onClose,
  onFocus,
  onMove,
  children,
}) {
  const winRef = useRef(null);
  const headRef = useRef(null);
  const dragRef = useRef(null); // { dx, dy, pid } while dragging, else null
  const posRef = useRef({ x, y });
  const [pos, setPos] = useState({ x, y });

  /* ---- the window's own prompt (last line of its document) ----------------
     Same construction as the main terminal's input line: a mirror renders the
     text with a real block .term-cursor, and a transparent input sits on top —
     so the caret here looks and blinks exactly like the one at the shell. */
  const bodyRef = useRef(null);
  const cmdRef = useRef(null);
  const typingTimer = useRef(null);
  const [cmd, setCmd] = useState("");
  const [caret, setCaret] = useState(0);
  const [typing, setTyping] = useState(false); // steady while typing, blinks when idle
  const [focused, setFocused] = useState(false);
  const [msg, setMsg] = useState(null); // { tone, text } — reply to the last command

  useEffect(() => () => clearTimeout(typingTimer.current), []);

  const focusCmd = () => {
    const el = cmdRef.current;
    if (!el) return;
    try { el.focus({ preventScroll: true }); } catch { el.focus(); }
  };

  // The prompt is the last line of a scrollable document, so typing brings it
  // into view — the same thing a real terminal does when you start a command.
  const revealPrompt = () => {
    const b = bodyRef.current;
    if (b) b.scrollTop = b.scrollHeight;
  };

  const onCmdChange = (e) => {
    setCmd(e.target.value);
    setCaret(e.target.selectionStart ?? e.target.value.length);
    setTyping(true);
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTyping(false), 600);
    revealPrompt();
  };

  const syncCaret = (e) => setCaret(e.target.selectionStart ?? 0);

  const onCmdKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const v = e.currentTarget.value.trim().toLowerCase();
    setCmd("");
    setCaret(0);
    if (!v) return;
    if (EXIT.includes(v)) {
      onClose(id);
      return;
    }
    if (v === "help" || v === "?") {
      setMsg({ tone: "c-muted", text: "exit · close · q  →  close this window" });
      revealPrompt();
      return;
    }
    if (v === "clear" || v === "cls") {
      setMsg(null);
      return;
    }
    setMsg({ tone: "c-red", text: `command not found: ${v} — type exit to close` });
    revealPrompt();
  };

  // Adopt the parent's position when it changes and we're not mid-drag
  // (initial open, resize re-clamp). Focus changes z only, never x/y.
  useEffect(() => {
    if (!dragRef.current) {
      posRef.current = { x, y };
      setPos({ x, y });
    }
  }, [x, y]);

  // On viewport resize, re-clamp this window into view using its real width so
  // a desktop-placed window can't end up mostly off-screen on a phone. Windows
  // wider than the viewport (mobile near-full-width) pin to a small left margin.
  useEffect(() => {
    const onResize = () => {
      if (dragRef.current) return;
      const el = winRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const cur = posRef.current;
      const nx = w >= vw - 8 ? 8 : Math.max(8, Math.min(cur.x, vw - w - 8));
      const ny = Math.max(0, Math.min(cur.y, vh - 40));
      if (nx !== cur.x || ny !== cur.y) {
        posRef.current = { x: nx, y: ny };
        setPos({ x: nx, y: ny });
        onMove(id, nx, ny);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [id, onMove]);

  const clampPos = (nx, ny) => {
    const el = winRef.current;
    const w = el ? el.offsetWidth : 400;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: Math.max(KEEP_VISIBLE - w, Math.min(nx, vw - KEEP_VISIBLE)),
      y: Math.max(0, Math.min(ny, vh - 40)),
    };
  };

  const move = (nx, ny) => {
    const c = clampPos(nx, ny);
    posRef.current = c;
    setPos(c);
  };

  const onHeadPointerDown = (e) => {
    if (e.target.closest(".tw-ctrl")) return; // controls handle their own clicks
    // Offset from the window's LOGICAL position (what we set as left/top), not
    // getBoundingClientRect — so an in-flight open animation or any rendering
    // transform can't make the drag drift.
    dragRef.current = {
      dx: e.clientX - posRef.current.x,
      dy: e.clientY - posRef.current.y,
      pid: e.pointerId,
    };
    document.body.classList.add("tw-dragging");
    try { headRef.current.setPointerCapture(e.pointerId); } catch {}
    e.preventDefault();
  };

  const onHeadPointerMove = (e) => {
    const d = dragRef.current;
    if (!d || d.pid !== e.pointerId) return;
    move(e.clientX - d.dx, e.clientY - d.dy);
    e.preventDefault();
  };

  // Clicking dead space in the body hands focus to the prompt — but a
  // drag-select is a copy gesture, so it must never steal focus.
  const downRef = useRef(null);
  const onBodyMouseDown = (e) => {
    const t = e.target;
    const interactive = t && t.closest && t.closest("a, button, [role='button'], input, textarea");
    downRef.current = interactive ? null : { x: e.clientX, y: e.clientY };
  };
  const onBodyMouseUp = (e) => {
    const start = downRef.current;
    downRef.current = null;
    if (!start) return;
    if (Math.abs(e.clientX - start.x) > 4 || Math.abs(e.clientY - start.y) > 4) return;
    if (window.getSelection && String(window.getSelection())) return;
    focusCmd();
  };

  const onHeadPointerUp = (e) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;
    document.body.classList.remove("tw-dragging");
    try { headRef.current.releasePointerCapture(e.pointerId); } catch {}
    onMove(id, posRef.current.x, posRef.current.y); // commit to parent
  };

  return (
    <div
      ref={winRef}
      className={`tw tw-${type}`}
      style={{ left: pos.x, top: pos.y, zIndex }}
      onPointerDown={() => onFocus(id)}
      role="dialog"
      aria-label={title}
    >
      <div
        ref={headRef}
        className="tw-head"
        onPointerDown={onHeadPointerDown}
        onPointerMove={onHeadPointerMove}
        onPointerUp={onHeadPointerUp}
        onPointerCancel={onHeadPointerUp}
      >
        <button
          type="button"
          className="tw-ctrl tw-close"
          onClick={() => onClose(id)}
          aria-label="Close window"
          title="Close"
        >
          <span className="tw-close-x" aria-hidden="true">&#10005;</span>
        </button>
        <span className="tw-title">{title}</span>
      </div>
      <div
        className="tw-body"
        ref={bodyRef}
        onMouseDown={onBodyMouseDown}
        onMouseUp={onBodyMouseUp}
      >
        {children}

        {/* the document's own prompt — type `exit` here to close the window */}
        {msg && <div className={`tw-cmdmsg ${msg.tone}`}>{msg.text}</div>}
        <div className={`tw-prompt${focused ? "" : " blurred"}`} onMouseUp={focusCmd}>
          <span className="c-green" aria-hidden="true">$</span>
          <div className="tw-inputwrap">
            <div className="tw-mirror" aria-hidden="true">
              <span>{cmd.slice(0, caret)}</span>
              <span className={`term-cursor${typing ? " typing" : ""}`} />
              <span>{cmd.slice(caret)}</span>
              {!cmd && <span className="tw-hint">exit</span>}
            </div>
            <input
              ref={cmdRef}
              className="tw-cmdinput"
              value={cmd}
              onChange={onCmdChange}
              onKeyDown={onCmdKeyDown}
              onKeyUp={syncCaret}
              onClick={syncCaret}
              onSelect={syncCaret}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label={`Command prompt for ${title}`}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              enterKeyHint="go"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TerminalWindow;
