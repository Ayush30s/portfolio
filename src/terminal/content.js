/* ============================================================================
   Portfolio content — single source of truth for the terminal.
   Every value here is Ayush Srivastav's REAL data, extracted verbatim from the
   existing site (Orval "Deep-Space" build + original React components).
   Nothing is invented. Only project screenshots are placeholders; me.png is real.
   ========================================================================== */

export const identity = {
  name: "AYUSH SRIVASTAV",
  first: "AYUSH",
  last: "SRIVASTAV",
  handle: "ayush",
  host: "portfolio",
  roles: ["Full-Stack Developer", "Backend · AI · Real-time"],
  discipline: "Full-Stack Developer · Backend · AI · Real-time",
  tagline:
    "I build production backends, real-time systems and on-prem AI — OTT streaming platforms, supply-chain dashboards, exactly-once chat and RAG assistants. From schema to CI/CD, I own the whole stack.",
  location: "Mehsana, India",
  locationLong: "Mehsana, India · Remote-ready",
  availability: "Available — Full-time & Freelance",
  status: "Open to work",
  email: "ayushsri302003@gmail.com",
  phone: "+91 9648829728",
  phoneDisplay: "+91 96488 29728",
  tel: "+919648829728",
  resume:
    "https://drive.google.com/file/d/1Su61WREpNJhHrqmwrl-hEeVmBzOgTl3I/view?usp=sharing",
};

export const stats = {
  experience: "1.5 yrs",
  projects: 6,
  companies: 3,
  dsa: "500+",
  lastUpdated: "2026",
};

export const manifesto =
  "Anyone can make an endpoint return 200. I build systems that survive real traffic, reconnects and bad input — exactly-once writes, graceful degradation, and data flows you can reason about at 3am.";

export const about = {
  paragraphs: [
    "Full-Stack Developer with 1.5 years of experience building production web apps, REST APIs, real-time systems, and AI assistants. Currently at Sevitsil Solutions, developing on-prem AI platforms and scalable chat backends, with experience across ERP, OTT, and property platforms.",
    "Focused on building scalable, secure systems through strong architecture, API contracts, efficient data flows, and reliable engineering practices.",
  ],
  focus: [
    "On-prem / offline AI platforms — local LLMs & RAG",
    "Scalable real-time chat backends",
    "Production ERP, OTT & supply-chain systems",
  ],
  values: [
    {
      title: "Production-Ready Code",
      desc: "Every project I touch goes to production. Clean architecture, proper error handling, optimized queries.",
    },
    {
      title: "Full-Stack Coverage",
      desc: "From pixel-perfect React frontends to NestJS microservices and AWS deployments — I own the entire stack.",
    },
    {
      title: "System Design First",
      desc: "I think in schemas, API contracts, and data flows before writing a single line of code.",
    },
    {
      title: "Fast Learner",
      desc: "500+ DSA problems. Constant upskilling. I pick up new technologies fast and apply them correctly.",
    },
  ],
};

/* ---- SKILLS — real technologies from the source, grouped (no fake levels) - */
export const skills = {
  note: "Grouped from the stack I actually ship with — no invented proficiency scores.",
  categories: [
    { name: "Languages", items: ["TypeScript", "Python", "JavaScript"] },
    { name: "Frontend", items: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"] },
    { name: "Backend", items: ["NestJS", "Node.js", "FastAPI", "REST APIs", "Microservices", "Socket.IO", "WebSockets", "SSE", "JWT / Auth"] },
    { name: "AI / ML", items: ["LangChain", "LangGraph", "RAG", "Ollama", "pgvector", "Embeddings", "Text-to-SQL"] },
    { name: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma ORM", "SQLAlchemy"] },
    { name: "Cloud / DevOps", items: ["AWS (S3 · CloudFront · RDS · EC2 · IAM)", "Docker", "Kafka", "CI/CD", "GitHub Actions", "PM2", "HLS / M3U8"] },
  ],
};

/* ---- PROJECTS (6) --------------------------------------------------------- */
export const projects = [
  {
    slug: "ai-sales-assistant",
    aliases: ["ai", "sales", "assistant", "rag", "1"],
    name: "AI SALES ASSISTANT",
    year: "2025",
    category: "AI / RAG",
    status: "Professional · Flagship",
    tagline: "Offline local-LLM assistant over live sales data",
    description:
      "A retrieval-augmented assistant inside the ERP that answers plain-English questions about live sales data — running entirely on a local Ollama stack, so nothing leaves the network.",
    features: [
      "Forgiving multi-strategy cascade — routes each question to SQL (validated read-only SELECT), a curated read-only API, or hybrid vector + BM25 (RRF) RAG, falling back gracefully",
      "100% local & private — Ollama qwen2.5 (7B/3B) + nomic-embed-text (768-dim); zero external API calls",
      "Structured routing with confidence (route + intent + entities) that fails safe; follow-up rewriting and multi-part splitting/merging",
      "Self-correcting layer catches hallucinations, empty replies and false 'no data' claims and regenerates before responding",
      "Defense-in-depth SQL safety — a two-layer guard (sqlglot AST + regex) enforces read-only, table allow-listing and statement timeouts",
      "JWT fail-closed auth, admin-gated ingestion, per-user rate limiting, server-side sessions; Redis + Postgres/pgvector (HNSW); SSE streaming + a routing eval harness",
    ],
    tech: ["Python", "FastAPI", "LangChain", "LangGraph", "Ollama", "sqlglot", "pgvector", "Redis", "NumPy", "SSE", "Text-to-SQL"],
    links: {},
  },
  {
    slug: "sevitsil-erp",
    aliases: ["erp", "sevitsil", "2"],
    name: "SEVITSIL ERP",
    year: "2025",
    category: "ERP / Backend",
    status: "Professional · Current",
    tagline: "Modular manufacturing ERP backend",
    description:
      "A production FastAPI + MySQL backend digitizing end-to-end operations — sales, HR, procurement, production and dispatch — across a dozen business domains.",
    features: [
      "Sales & Marketing — lead & calling pipeline, quotations, proforma/sales/purchase orders, dispatch challans and financial-year-aware document numbering",
      "HR & Payroll — attendance & shift management, leave/balance accrual, monthly salary runs with computed PF/ESIC, and a multi-stage recruitment funnel",
      "Procurement, Production & Planning (daily production reports across lines), Billing & Dispatch, Tender, Maintenance and Store modules",
      "Cross-cutting — JWT authentication + RBAC, Kafka event streaming, WebSocket chat, scheduled jobs and PDF generation",
      "Integrations — Twilio / WhatsApp messaging and Google APIs",
    ],
    tech: ["Python", "FastAPI", "SQLAlchemy (async)", "MySQL", "Pydantic", "JWT", "Kafka", "WebSockets", "APScheduler", "ReportLab"],
    links: {},
  },
  {
    slug: "real-time-chat",
    aliases: ["chat", "realtime", "3"],
    name: "REAL-TIME CHAT",
    year: "2025",
    category: "Realtime",
    status: "Professional · Current",
    tagline: "Exactly-once messaging at scale",
    description:
      "Production real-time chat backend — 1:1 and group messaging with receipts, reactions, replies, pins, presence and typing.",
    features: [
      "Exactly-once writes via an HTTP Idempotency-Key ledger + a message clientId unique constraint",
      "Optimistic concurrency (version columns + conditional atomic updates) prevents lost updates",
      "Reconnect delta-sync via a watermark /sync; Redis Pub/Sub fan-out over dual WebSocket + SSE",
      "Direct-to-CDN signed uploads (bytes never touch the server); JWT rotation + argon2id",
    ],
    tech: ["NestJS", "TypeScript", "Socket.IO", "Redis", "PostgreSQL", "Prisma", "JWT + Argon2", "SSE", "WebSockets"],
    links: {},
  },
  {
    slug: "ott-platform",
    aliases: ["ott", "streaming", "4"],
    name: "OTT PLATFORM",
    year: "2025",
    category: "Streaming",
    status: "Professional",
    tagline: "Production OTT streaming platform",
    description:
      "Architected a production OTT platform for Artify Group — multi-tier subscriptions, RBAC, video analytics with auto-playlist triggers, and adaptive HLS streaming.",
    features: [
      "HLS/M3U8 adaptive streaming with AWS S3 + CloudFront CDN",
      "Video analytics: completion rate, engagement, watch-progress triggers",
      "Redis Pub/Sub + caching for real-time features across managed AWS infra (S3, CloudFront, RDS, EC2, IAM)",
    ],
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "Redis", "React.js", "Next.js", "AWS S3", "CloudFront", "HLS", "M3U8"],
    links: {},
  },
  {
    slug: "gym-platform",
    aliases: ["gym", "microservices", "5"],
    name: "GYM PLATFORM",
    year: "2024",
    category: "Microservices",
    status: "Personal Project · Ongoing",
    tagline: "NestJS microservices architecture",
    description:
      "Production-grade NestJS monorepo with 6 independently deployable microservices: API Gateway, Auth, User, Gym, Product, and Realtime.",
    features: [
      "6 independently deployable microservices in a monorepo behind an HTTP API gateway",
      "Opossum circuit breaker + Throttler rate limiting; database-per-service isolation",
      "Horizontal socket scaling with @socket.io/redis-adapter; selective CI/CD to EC2",
    ],
    tech: ["NestJS", "TypeScript", "Microservices", "API Gateway", "Redis", "Socket.IO", "Prisma ORM", "PostgreSQL", "JWT", "Opossum", "PM2", "GitHub Actions"],
    links: { github: "https://github.com/Ayush30s/nest-microservices" },
  },
  {
    slug: "supply-chain",
    aliases: ["supply", "dashboard", "6"],
    name: "SUPPLY CHAIN",
    year: "2024",
    category: "Dashboard",
    status: "Professional · Current",
    tagline: "Supply chain & distribution system",
    description:
      "Built a responsive React.js component library and real-time dashboards for Harrison International — enterprise product lifecycle tracking from manufacturing through distribution to delivery.",
    features: [
      "Real-time enterprise tracking dashboards",
      "Full product-lifecycle visibility components",
      "Responsive, production-grade component library",
    ],
    tech: ["React.js", "Redux Toolkit", "Tailwind CSS", "JavaScript"],
    links: {},
  },
];

/* ---- EXPERIENCE (most recent first; sequential timeline from live site) --- */
export const experience = [
  {
    period: "May 2026 — Present",
    role: "Full-Stack Developer",
    company: "Sevitsil Solutions",
    location: "India",
    bullets: [
      "Built a RAG-based ERP AI chatbot — LangGraph, GCP Vertex AI and pgvector; agentic query routing, vector similarity search, embedding pipelines and RBAC-gated data access (NestJS + React.js)",
      "Architected a real-time chat platform — Redis Pub/Sub fan-out, distributed rate-limiting and Socket.IO; JWT/SSO with rotating refresh tokens, idempotent writes, optimistic concurrency and an Angular 17 Signals offline-first UI",
      "Developed a polyglot 3D geometry analyzer — OpenCV, FastAPI and Three.js; Douglas-Peucker & Kasa circle fitting, Tesseract OCR calibration and shared TypeScript–Pydantic contracts",
      "Internalized transport-agnostic security, failure-mode engineering (circuit breakers, graceful degradation), structured observability, and validating AI outputs via code-defined capability registries",
    ],
    tech: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "pgvector", "LangGraph", "GCP Vertex AI", "Redis", "Socket.IO", "Angular", "React", "Python", "FastAPI", "OpenCV"],
  },
  {
    period: "July 2025 — May 2026",
    role: "Full-Stack Developer",
    company: "Technobren Infotech",
    location: "India",
    bullets: [
      "Built backend & frontend modules for an OTT streaming platform — NestJS, Prisma, PostgreSQL and AWS; HLS/M3U8 adaptive streaming, video-analytics workflows, Redis caching and AWS infra (S3, CloudFront, RDS, EC2, IAM)",
      "Developed a supply-chain dashboard in React.js with Redux Toolkit and Tailwind CSS — responsive component libraries and real-time enterprise data visualization for product-lifecycle tracking, manufacturing to delivery",
    ],
    tech: ["NestJS", "React.js", "Next.js", "Prisma", "PostgreSQL", "Redis", "AWS", "HLS", "M3U8", "Redux Toolkit", "Tailwind CSS", "GitHub Actions", "CI/CD", "PM2"],
  },
  {
    period: "Nov 2024 — May 2025",
    role: "React.js Intern",
    company: "Tetra Information Services",
    location: "Remote",
    bullets: [
      "Built ZuHaus.org, a German property-rental platform — modular React components, reusable UI flows, pagination/filtering/search and role-based access over a NestJS + PostgreSQL backend",
      "Collaborated with cross-functional teams across Germany",
    ],
    tech: ["React.js", "Redux", "NestJS", "PostgreSQL", "REST"],
  },
];

/* ---- EDUCATION ------------------------------------------------------------ */
export const education = [
  {
    degree: "Bachelor of Computer Applications",
    institution: "Veer Bahadur Singh Purvanchal University",
    period: "2021 — 2024",
    score: "CGPA 8.0 / 10",
    coursework: [
      { name: "Data Structures & Algorithms", desc: "Arrays, linked lists, stacks, queues, trees, graphs, hashing, recursion, sorting & searching, and Big-O time/space complexity to write efficient, scalable code." },
      { name: "Operating Systems", desc: "Processes & threads, CPU scheduling, memory management & virtual memory, concurrency, deadlocks, and synchronization with locks and semaphores." },
      { name: "Database Management Systems", desc: "Relational modelling & normalization, SQL, indexing & query optimization, transactions and ACID guarantees, and concurrency control." },
      { name: "Computer Networks", desc: "The TCP/IP & OSI model, HTTP/HTTPS, DNS, sockets, TCP vs UDP, and how data travels across the network between client and server." },
    ],
  },
];

/* ---- ACHIEVEMENTS --------------------------------------------------------- */
export const achievements = [
  { icon: "★", title: "500+ DSA problems solved", desc: "Across LeetCode, GeeksForGeeks & Coding Ninjas — consistency over intensity." },
  { icon: "★", title: "Grandmaster · Level 7 on Coding Ninjas (Code360)", desc: "" },
  { icon: "★", title: "2★ rating on LeetCode & CodeChef", desc: "" },
  { icon: "✓", title: "BCA CGPA 8.0 / 10", desc: "Veer Bahadur Singh Purvanchal University." },
  { icon: "✓", title: "6 production projects shipped across 3 companies", desc: "" },
];

/* ---- LEARNING (currently exploring) --------------------------------------- */
export const learning = [
  { title: "LLMs & Generative AI", desc: "Understanding a transformer well enough to explain and tweak every layer." },
  { title: "Machine Learning", desc: "Getting fluent with the core algorithms and when to reach for each." },
  { title: "Neural Networks", desc: "Building a small neural net from scratch — no framework." },
  { title: "Model Training & Fine-tuning", desc: "Fine-tuning an open model into a domain-specific chatbot." },
];

/* ---- CONTACT -------------------------------------------------------------- */
export const contact = {
  email: "ayushsri302003@gmail.com",
  phone: "+91 96488 29728",
  tel: "+919648829728",
  location: "Mehsana, India · Remote-ready",
  replies: "Replies in ~24h",
  availableFor: ["Full-time opportunities", "Freelance & contract", "Collaboration"],
};

/* ---- SOCIAL / PROFILES ---------------------------------------------------- */
export const social = [
  { name: "GitHub", handle: "@Ayush30s", url: "https://github.com/Ayush30s", kind: "social" },
  { name: "LinkedIn", handle: "in/ayush-srivastav", url: "https://www.linkedin.com/in/ayush-srivastav-58635b280", kind: "social" },
  { name: "X / Twitter", handle: "@Ayush_Sri_30", url: "https://x.com/Ayush_Sri_30", kind: "social" },
  { name: "LeetCode", handle: "@ayush2s", url: "https://leetcode.com/ayush2s", kind: "code" },
  { name: "GeeksForGeeks", handle: "@ayush2s", url: "https://www.geeksforgeeks.org/profile/ayush2s", kind: "code" },
  { name: "Code360", handle: "Coding Ninjas · Grandmaster L7", url: "https://www.naukri.com/code360/profile/IndianAyu", kind: "code" },
  { name: "CodeChef", handle: "ayush2s1 · 2★", url: "https://www.codechef.com/users/ayush2s1", kind: "code" },
];

export default {
  identity,
  stats,
  manifesto,
  about,
  skills,
  projects,
  experience,
  education,
  achievements,
  learning,
  contact,
  social,
};
