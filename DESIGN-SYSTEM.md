# Portfolio — Design System & Re-Theme Guide

A hand-off summary of the current UI/UX so a coding agent can **re-theme it to a new colour palette** without missing anything. The design is intentionally **near-monochrome with a single reserved accent** (currently blue `#2451FF`) on a light canvas, ported from a dark "Deep-Space/Obsidian" prototype. It has a light default theme **and** a dark theme (toggle).

> **If your only job is a new colour theme, jump to [§11 HOW TO RE-THEME](#11--how-to-re-theme-do-every-item).** Colours live in *four* places, not one: CSS tokens, a JSX defaults block, hardcoded literals across CSS/HTML, **and JavaScript canvas/WebGL draws.** Missing the JS ones is why a naive find-replace leaves cyan showing.

---

## 1. What it is
A single-scroll personal portfolio for a full-stack / backend developer. Not an app — a career instrument: identity → range → proof (projects) → depth → contact. No forms (contact is `mailto:`/links), no tables, no dashboards.

## 2. Architecture — where everything lives
React + Vite is only a shell. **The entire UI is vanilla DOM + Three.js driven by one imperative class**, injected as an HTML string.

| File | Role | Contains colours? |
|---|---|---|
| `src/orval/orval-root.html` | The whole page as an HTML string (injected via `innerHTML`). All sections + content + **inline styles**. | ✅ many inline `rgba()`/`#hex` |
| `src/orval/orval-logic.js` | The engine class: mount, scroll RAF loop, reveals, `#ov-field` canvas, Three.js scene, command palette, theme toggle, LeetCode, reel, card-fan, count-ups. | ✅ **JS canvas draws + `0x` Three.js colours** |
| `src/orval/orval.css` | Design **tokens** (`:root`), all component styles, `@keyframes`, media queries. | ✅ tokens + hardcoded literals |
| `src/orval/image-slot.js` | `<image-slot>` custom element (fillable image placeholders). | – |
| `src/OrvalPortfolio.jsx` | Mounts the engine; passes `DEFAULTS` (accent colours + default theme). | ✅ **accent defaults + `lightTheme`** |
| `index.html` | Loads Google Fonts (Inter, Sora, JetBrains Mono) + Three.js CDN. | – (font source) |

## 3. Colour system (current)
One accent, neutral base, two themes. Defined as CSS variables in `orval.css`.

**Light (default) — `:root[data-ovtheme="light"]`:**
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#ffffff` | page canvas |
| `--bg2` | `#f4f4f4` | surfaces |
| `--ink` | `#111111` | primary text/headings |
| `--dim` | `#6e6e6e` | muted text, meta, captions |
| `--line` | `#e4e4e4` | borders, hairlines |
| `--glass` / `--glass2` | `rgba(17,17,17,.03)` / `.015` | glass fills |
| `--cy` / `--vi` | `#2451ff !important` (both) | **the single accent** (cyan+violet collapsed to one) |
| `--lc-*` | blue ramp | LeetCode heatmap levels |

**Dark — `:root`:** `--bg #04050a`, `--bg2 #080b14`, `--ink #e9edf7`, `--dim #7e89a3`, `--line rgba(255,255,255,.09)`, accent `--cy/--vi #2451ff`, `--lc-hard #ff5c7a`.

- **Single accent:** `--cy` and `--vi` are the same colour now. Gradients that once went cyan→violet are effectively monochrome.
- **Only semantic colour:** `--lc-hard #ff5c7a` (red) marks LeetCode "hard" problems. Everything else is neutral + accent.
- Project-card **covers** are dark gradient bases (`#06060e`, `#05070e`, `#0a1622`, …) with an accent glow on top; cards are dark "media" units in both themes (dark cover + white text), so they read as image thumbnails on the white page.

## 4. Typography
- **Inter** (grotesk sans) everywhere. Applied via a global override in `orval.css`: `#ov-root, #ov-root * { font-family:"Inter",… !important }` (overrides the many inline `font:` shorthands, which still name "Sora"). Loaded in `index.html`.
- Hierarchy: **Display/H1** ~clamp(34–118px)/200–600 · **H2** section titles ~clamp(30–90px) · **H3/card title** ~18–26px/600 · **body** ~14–16px/400 · **eyebrow/kicker** 10–11px/500 uppercase tracked (the site's signature label — "01 — Position", "06 — Experience") · **caption/meta** 10–12px/400.

## 5. Spacing & layout
- Content max-width: `#ov-page { max-width:1600px; margin:0 auto }` (backgrounds are full-bleed). Bumps on large screens: `≥1920px → 1760px`, `≥2560px → 2040px`, and inline `max-width:1200px` section wrappers widen to 1360/1560 via a `[style*="max-width: 1200px"]` rule.
- Fluid spacing via `clamp()` throughout (8px-ish base). Section wrappers cap at **1200px** centered; big vertical rhythm between sections (each section has a rounded-top "panel lip" divider via `[data-anchor]:not(#hero)::before`).

## 6. Sections (top → bottom)
Each is a `[data-anchor]` (drives the Ctrl+K palette + scroll beam). Order:
1. **Home** (`#hero`) — big name H1, one-line bio, 3 CTAs (liquid buttons), stats, scroll cue; ambient particle field + cursor glow behind.
2. **Manifesto** (`#manifesto`) — pinned; large word-by-word illuminating statement + DISCIPLINE/BASED/STATUS.
3. **About** (`#about`) — portrait slot + "The developer behind the work." bio + **4 value cards** (Production-Ready Code / Full-Stack Coverage / System Design First / Fast Learner), SVG icons.
4. **Projects** (`#build`) — 6 premium `.pcard` hover cards (see §7) + per-card **impact callout**.
5. **Archive** (`#index`) — coding-profile rows (GitHub/LeetCode/GFG/Code360/CodeChef), grid rows collapse on mobile.
6. **Skills** (`#skills`) — auto-scrolling **reel** marquee of 24 tech chips.
7. **Experience** (`#experience`) — 3 `.pcard`s in a 2-top + 1-full-width grid (Sevitsil / Technobren / Tetra).
8. **Education** (`#education`) — degree card + coursework.
9. **Achievements** (`#wins`) — bento grid of `.ov-win` cards (500+ DSA, ratings, CGPA…), IntersectionObserver stagger.
10. **LeetCode** (`#leetcode`) — baked stats + GitHub-style heatmap (horizontal-scroll) + earned badges (pinned horizontal scroll) + custom year dropdown.
11. **Learning** (`#play`) — bento of "currently exploring" cards.
12. **Kind words** (`#voices`) — scroll-driven **card-fan** of 5 testimonials + elliptical ring.
13. **Contact** (`#contact`) — big "LET'S BUILD…" + email/phone/social links + availability.
14. **Footer** (`#footer`) — marquee wordmark + sitemap.

## 7. Components
- **`.pcard`** (projects + experience): dark cover (`--pcard-cover`) + title resting bottom-left + short desc. On hover: whole-card lift (translateY(-3px)+shadow), cover zooms, **title glides to top-left**, a "child" detail card **slides up from inside** (overflow-clipped) carrying full desc + impact callout + tags; top-right **arrow button** (`.pcard-arrow`, → GitHub/LinkedIn) fills with accent on hover. Tunable tokens on `.pcard`: `--pcard-h/-child-h/-dur/-ease/-radius/-pad/-accent`.
- **`.ov-win`** bento card: tinted glass, SVG icon, hover lift.
- **Reel chip** (`.ov-reelchip`): glass pill + accent dot; auto-scroll marquee (`#ov-reeltrack`), pauses none, one direction.
- **Archive row** (`#ov-list [data-row]`): 4-col grid (code · title · meta · status), hover hue; collapses to code+title on mobile.
- **Card-fan** (`#ov-fan`): 5 `[data-fancard]` glass cards fanning radially on scroll.
- **Filter/year dropdown** (`.ov-lc-year*`): custom glass dropdown.
- **Nav** (`<nav>`): logo + 5 text links (magnetic) + sound/theme/⌘K buttons; links hide < 760px (⌘K palette is mobile nav).
- **Liquid button** (`.ov-liquid`): rising-wave fill, text uses `mix-blend-mode:difference`.
- **Loader** (`#ov-loader`): full-screen intro (panel-split + counter + bar), now token-driven.
- **Cursor label / custom cursor**, **section panel-lip**, **image-slot** placeholders.

## 8. Motion / interactions
Custom RAF engine (no GSAP/Framer). Keep it subtle.
- **Scroll reveals** `data-rev="up|mask|count|split|voices|type|glitch"` (opacity/translate/clip/count-up, fired by scroll position).
- **Hero entrance** staggered `.ov-hi` (gated on loader finish).
- **pcard hover**: title glide + child slide-up + card lift + arrow fill (CSS, 220–550ms).
- **Reel marquee**: continuous CSS auto-scroll, plays only in view.
- **Card-fan**: scroll-driven radial fan.
- **Count-ups** (stats), **magnetic** nav links, **IntersectionObserver** stagger (`.ov-win`), **`#ov-field`** ambient particle+line network (JS 2D canvas), **`#ov-light`** cursor glow, **aurora** spotlight.
- **Micro-interactions** (restrained): button hover translateY(-1px)+shadow, card hover translateY(-3px)+shadow, nav hover → accent (180ms).
- **Accessibility:** global `@media (prefers-reduced-motion: reduce)` guard makes motion near-instant.

## 9. Responsive
- Breakpoints ~1920/2560 (up), 900/760/600/560/400 (down).
- Grids collapse: projects 3→2→1, experience 2→1, wins→1.
- Nav: text links hide < 760px, keep logo + icon buttons; padding tightens < 400px.
- No horizontal overflow at 320–2560px (fixed the Archive `width:1200px` bug + About `minmax(min(320px,100%),1fr)`).

## 10. Theme system (read before re-theming)
- Themes switch via `data-ovtheme="light|dark"` on `<html>`. **Light is the default** (`OrvalPortfolio.jsx` DEFAULTS `lightTheme:true`); toggle button flips it. No persistence.
- ⚠️ **`applyProps()` in `orval-logic.js` sets `--cy`/`--vi` as INLINE styles on `<html>`** (from `props.accentA/accentB`). Inline styles beat stylesheet rules — so **light-theme `--cy/--vi` overrides in CSS MUST use `!important`**, and the Three.js particle colour also comes from `accentA/accentB`.
- ⚠️ **Colour `transition`s freeze in a non-composited preview** — reading `getComputedStyle().color` right after a theme change returns the mid-transition (old) value. Inject `*{transition:none!important}` before reading steady state, or just trust the source.
- ⚠️ **Vite CSS-HMR can stall** after many edits — restart the dev server for a clean recompile if CSS stops updating.

## 11. ★ HOW TO RE-THEME (do every item)
To change the accent and/or neutrals, update **all** of these. (Currently everything is `#2451FF` accent + the neutrals in §3.)

**A. CSS tokens — `orval.css`**
- `:root[data-ovtheme="light"]` — `--bg --bg2 --ink --dim --line --glass --glass2` and `--cy --vi` (keep `!important`) and `--lc-easy --lc-l0..l4`.
- `:root` (dark) — same tokens for the dark theme + `--lc-med --lc-hard`.

**B. Accent defaults — `src/OrvalPortfolio.jsx`**
- `DEFAULTS.accentA` / `DEFAULTS.accentB` (currently both `"#2451ff"`). These set the inline `--cy/--vi` on `<html>` **and** the Three.js particle colour. Set to your new accent. (`lightTheme:true` = light default; flip if you want dark default.)

**C. Fonts (if changing type) — `index.html` + `orval.css`**
- Google-Fonts `<link>` in `index.html`; the `#ov-root, #ov-root * { font-family:… !important }` override in `orval.css`.

**D. Hardcoded colour literals — sweep ALL formats across `orval.css`, `orval-root.html`, `orval-logic.js`.** The accent is currently `#2451ff` / `rgba(36, 81, 255, α)`. Replace **every** occurrence (preserve α). Formats to search:
- `#2451ff` (hex) and `rgba(36, 81, 255, …)` / `rgba(36,81,255,…)` (both spacings).
- `0x2451ff` — **Three.js hex-integer** colours (constellation lines/ico/ribbons in `orval-logic.js`; scene may not render but keep consistent).

**E. JS-drawn colours — `orval-logic.js` (easy to miss).** These paint to `<canvas>`, so they never show in CSS/computed styles:
- **`initField()`** — the visible ambient network (`#ov-field`): `dotCol` / `lineCol` (theme-aware light/dark branches).
- **`#ov-light`** cursor glow gradient + the project-card **hover glows** (`rgba(...,var(--lx) var(--ly))`).
- Canvas **"hot" particle** fills near the cursor.
- Confetti colour array in `initProjectFx` (currently dead code, but present).

**F. Decide on semantics & darks**
- `--lc-hard #ff5c7a` (red "hard") — recolour or keep as a difficulty signal.
- Project-card cover **dark base** gradients (`#06060e`, `#0a1622`, …) and dark "media" surfaces (pcard child bg) — theme-neutral; usually leave unless you want light cards.

**G. Verify**
- Reload; scan computed styles for any leftover of the *old* accent (no cyan/teal/periwinkle remaining).
- Check both themes (toggle), light + dark, mobile + desktop, no horizontal overflow, no console errors.
- Remember the transition-freeze + HMR-stall gotchas in §10.

---
*Practical note from the last re-theme: a `#hex`+`rgba()`-only find-replace left cyan visible because the `#ov-field` network, `#ov-light` glow, hover glows, and Three.js `0x` colours are in JavaScript. Sweep **all four** color homes (A–E) in one pass.*
