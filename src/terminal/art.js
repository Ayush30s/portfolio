/* ============================================================================
   Per-project ASCII "cover art" — punctuation-mark emblems shown at the top of
   each project's detail view (a terminal-native stand-in for a screenshot).
   String.raw keeps backslashes literal. Keep each <= ~40 cols wide.
   ========================================================================== */

export const PROJECT_ART = {
  // AI Sales Assistant — a little robot
  "ai-sales-assistant": String.raw`    .---------------.
   |  .---.   .---.  |
   |  | o |   | o |  |
   |  '---'   '---'  |
   |   :  .---.  :   |
   |   :  '---'  :   |
    '.-----------.'
   [ RAG : LLM : SQL ]`,

  // Sevitsil ERP — a stacked server / database
  "sevitsil-erp": String.raw`   .=================.
   | [=============] |
   | [=== SALES ===] |
   | [==== HR =====] |
   | [=== PROD ====] |
   | [=== DISP ====] |
   '==(o)=======(o)=='
    FastAPI :: MySQL`,

  // Real-time Chat — speech bubbles
  "real-time-chat": String.raw`   .--------------.
   |  hey there!  |
   '------v-------'
     .----------v----.
     |  ...typing    |
     '---------------'
   1:1 :: group :: live`,

  // OTT Platform — a play button on a screen
  "ott-platform": String.raw`   .----------------.
   |  ____________  |
   | |    |\       ||
   | |    | \      ||
   | |    |  >     ||
   | |    | /      ||
   | |    |/       ||
   | |____________ ||
   '---=[  o  o  ]=-'
   HLS :: M3U8 :: CDN`,

  // Gym Platform — a dumbbell
  "gym-platform": String.raw`    __            __
   |==|__________|==|
   |==|==========|==|
   |==|__________|==|
    ''            ''
   6 micro-services
   gw:auth:user:gym:rt`,

  // Supply Chain — a delivery truck
  "supply-chain": String.raw`    ______________
   |  SUPPLY     |'.
   |  CHAIN      |  '.____
   |_____________|__|     |
    (o)       (o)    (o)=='
   track :: lifecycle
   react :: redux :: live`,
};

// Fallback for any project without dedicated art
export const DEFAULT_ART = String.raw`   ._________________.
   |  > ~/project     |
   |  .------------.  |
   |  | # # # # #  |  |
   |  '------------'  |
   '_________________'`;

export const artFor = (slug) => PROJECT_ART[slug] || DEFAULT_ART;
