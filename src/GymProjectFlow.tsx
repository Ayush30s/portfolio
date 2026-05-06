import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollReveal } from "./useScrollReveal";

// ─── Types ───────────────────────────────────────────────────────────────────

type NodeType =
  | "client"
  | "gateway"
  | "service"
  | "infra"
  | "db"
  | "external";

interface ColorScheme {
  fill: string;
  stroke: string;
  text: string;
  sub: string;
  acc: string;
}

interface FlowNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub: string;
  type: NodeType;
  step: string;
  title: string;
  body: string;
  tags: string[];
}

interface FlowEdge {
  id: number;
  from: string;
  to: string;
  ret: boolean;
  label: string;
}

interface FlowStep {
  node: string;
  edges: number[];
}

interface LegendItem {
  label: string;
  fill: string;
  stroke: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const COLORS: Record<NodeType, ColorScheme> = {
  client: {
    fill: "#e6eefb",
    stroke: "#185fa5",
    text: "#0c447c",
    sub: "#185fa5",
    acc: "#185fa5",
  },
  gateway: {
    fill: "#2d5be3",
    stroke: "#1a1a1a",
    text: "#fff",
    sub: "rgba(255,255,255,.72)",
    acc: "#fff",
  },
  service: {
    fill: "#faf7f2",
    stroke: "#1a1a1a",
    text: "#0f0f0f",
    sub: "#7a7a7a",
    acc: "#2d5be3",
  },
  infra: {
    fill: "#e4f2ea",
    stroke: "#16a34a",
    text: "#14532d",
    sub: "#16a34a",
    acc: "#16a34a",
  },
  db: {
    fill: "#fdf3ed",
    stroke: "#e85d3a",
    text: "#7c1d08",
    sub: "#c2410c",
    acc: "#e85d3a",
  },
  external: {
    fill: "#fef3c7",
    stroke: "#a16207",
    text: "#713f12",
    sub: "#a16207",
    acc: "#eab308",
  },
};

const NODES: FlowNode[] = [
  // ─── Row 1 (y=20) — Operations + edge externals ──────────────────────────
  {
    id: "ci",
    x: 18,
    y: 20,
    w: 130,
    h: 56,
    label: "CI / CD",
    sub: "GitHub Actions",
    type: "infra",
    step: "Deployment · Pipeline",
    title: "GitHub Actions · deploy.yml",
    body: "On every push to master the workflow installs pnpm 9 + Node 20, generates Prisma clients for auth/user/gym, runs nest build for each microservice, then SSH+rsyncs dist/, package.json, pnpm-lock.yaml, ecosystem.config.js and prisma dirs into AWS EC2. Once on the host it triggers `pm2 delete all` followed by `pm2 start ecosystem.config.js` and `pm2 save`.",
    tags: [
      "GitHub Actions",
      "pnpm 9",
      "Node 20",
      "Prisma generate",
      "rsync",
      "appleboy/ssh-action",
      "EC2_SSH_KEY",
    ],
  },
  {
    id: "pm2",
    x: 160,
    y: 20,
    w: 145,
    h: 56,
    label: "PM2 Cluster",
    sub: "ecosystem.config.js",
    type: "infra",
    step: "Deployment · Process Manager",
    title: "PM2 · Supervisor on AWS EC2",
    body: "Manages 6 long-running Node processes on the EC2 box: api-gateway:3000, user-service:3001, auth-service:3002, gym-service:3003, realtime-service:3004 and email-service:3006. Auto-restart on crash, structured logs to logs/<svc>-{out,error}.log with ISO timestamps. (ai-service and product-service exist in source but are NOT yet in the PM2 ecosystem.)",
    tags: [
      "PM2",
      "ecosystem.config.js",
      "AWS EC2",
      "Auto-restart",
      "6 processes",
      "Log rotation",
    ],
  },
  {
    id: "redis-cache",
    x: 490,
    y: 20,
    w: 145,
    h: 56,
    label: "Redis",
    sub: "Pub/Sub · IO Adapter",
    type: "infra",
    step: "Step 5 — Realtime Backbone",
    title: "Redis · Pub/Sub + Socket.IO Adapter",
    body: "Two roles: (1) @socket.io/redis-adapter shares Socket.IO state across every gateway / realtime pod so a message from any instance reaches every connected client, (2) custom realtime channels — BROADCAST_MESSAGE, BROADCAST_USER_JOINED, BROADCAST_USER_LEFT, BROADCAST_TYPING — that the realtime gateway publishes/subscribes through. Reconnect strategy capped at 10 retries, 3000 ms.",
    tags: [
      "Redis",
      "@socket.io/redis-adapter",
      "BROADCAST_*",
      "Pub/Sub",
      "Reconnect 10× · 3s cap",
    ],
  },
  {
    id: "smtp",
    x: 970,
    y: 20,
    w: 145,
    h: 56,
    label: "SMTP Server",
    sub: "Nodemailer transport",
    type: "external",
    step: "External · Mail Relay",
    title: "SMTP Server",
    body: "Outbound mail relay (Gmail / SES / similar) configured via SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM. Email service connects through nodemailer (wrapped by @nestjs-modules/mailer) to deliver the welcome email triggered by the user-registered event.",
    tags: [
      "SMTP",
      "Nodemailer",
      "TLS",
      'defaults.from "My App"',
      "External",
    ],
  },

  // ─── Row 2 (y=110) — Resilience + Realtime + AI ───────────────────────────
  {
    id: "cb",
    x: 320,
    y: 110,
    w: 155,
    h: 56,
    label: "Circuit Breaker",
    sub: "Opossum 9",
    type: "infra",
    step: "Step 3 — Resilience",
    title: "CircuitBreakerService · Opossum",
    body: "Every outbound TCP call from the gateway is wrapped by an Opossum breaker, cached per service:endpoint in a Map. Settings: timeout 3 s, error threshold 50 %, volume threshold 5, reset 10 s, rolling window 10 s. Emits open/halfOpen/close/failure/success events to the Logger. Also exposes an RxJS retryStrategy (max 2 retries, exponential 500 ms backoff).",
    tags: [
      "Opossum 9",
      "Timeout 3s",
      "Threshold 50%",
      "Half-open probe",
      "RxJS retry ×2",
      "Per-endpoint Map",
    ],
  },
  {
    id: "rt",
    x: 490,
    y: 110,
    w: 145,
    h: 56,
    label: "Realtime Service",
    sub: "Socket.IO · :3004",
    type: "service",
    step: "Step 4 — WebSocket Hub",
    title: "Realtime Service · NestJS WS App",
    body: "Independent NestJS HTTP+WS app on port 3004 (also reachable through nginx upstream realtime_cluster). Namespace /realtime, transports websocket+polling, ping 25 s / timeout 60 s. WsJwtGuard validates token from handshake.auth.token, Authorization header or query. RateLimiterService throttles per-event with a sliding window (send_message 60/min, ping 30/30s). WsValidationPipe enforces SendMessage / JoinRoom / LeaveRoom DTOs. Tracks user:<id> + room:<id> rooms in a connectedClients Map.",
    tags: [
      "Socket.IO",
      "@WebSocketGateway",
      "WsJwtGuard",
      "RateLimiterService",
      "WsValidationPipe",
      "Rooms",
      "Redis adapter",
      "Ping 25s",
    ],
  },
  {
    id: "email",
    x: 650,
    y: 110,
    w: 145,
    h: 56,
    label: "Email Service",
    sub: "TCP :3006 · Mailer",
    type: "service",
    step: "Step 6d — Email",
    title: "Email Service · TCP :3006",
    body: "Tiny TCP microservice. @EventPattern({cmd:'user-registered'}) consumes the auth-service emit and calls MailerService.sendWelcomeEmail. Uses @nestjs-modules/mailer + nodemailer; SMTP transport configured async from env. Currently sends raw inline HTML — no template engine, no queue, fire-and-forget.",
    tags: [
      "NestJS Microservice",
      "TCP :3006",
      "@nestjs-modules/mailer",
      "Nodemailer",
      "@EventPattern",
      "Welcome email",
    ],
  },
  {
    id: "ai",
    x: 810,
    y: 110,
    w: 145,
    h: 56,
    label: "AI Service",
    sub: "LangGraph · :3007",
    type: "service",
    step: "Step 6e — AI",
    title: "AI Service · LangGraph Workflow",
    body: "Experimental NestJS microservice running a LangChain + LangGraph StateGraph on OnModuleInit. Four nodes wired START → fetchWorkoutData → analyzeWorkout → generateReport → generateRecommendations → END. Recommendations split into immediate / shortTerm / longTerm tiers. Currently fed with hardcoded sample workouts; not yet in PM2 ecosystem or CI build.",
    tags: [
      "@langchain/langgraph",
      "@langchain/openai",
      "StateGraph",
      "Annotation state",
      "4 graph nodes",
      "TCP :3007",
    ],
  },
  {
    id: "llm",
    x: 970,
    y: 110,
    w: 145,
    h: 56,
    label: "LLM API",
    sub: "NVIDIA gpt-oss-20b",
    type: "external",
    step: "External · LLM",
    title: "NVIDIA-hosted gpt-oss-20b",
    body: "OpenAI-compatible inference endpoint at integrate.api.nvidia.com/v1. AI service calls it through ChatOpenAI (@langchain/openai) with temperature 0.3, maxTokens 4096 and streaming enabled. OPENAI_API_KEY env holds the NVIDIA NIM API key.",
    tags: [
      "NVIDIA NIM",
      "OpenAI-compatible",
      "@langchain/openai",
      "Streaming",
      "External",
    ],
  },

  // ─── Row 3 (y=215) — Edge → Gateway → Domain Services ────────────────────
  {
    id: "client",
    x: 18,
    y: 215,
    w: 130,
    h: 56,
    label: "HTTP / WS Client",
    sub: "Browser · mobile",
    type: "client",
    step: "Entry Point",
    title: "HTTP / WebSocket Client",
    body: "External consumer — browser, mobile app or another service. Sends HTTPS REST requests carrying access_token + refresh_token httpOnly cookies (sameSite lax, secure in prod), or opens a Socket.IO connection on the /realtime namespace with handshake.auth.token.",
    tags: ["REST", "Socket.IO", "JWT cookie", "HTTPS", "WSS"],
  },
  {
    id: "nginx",
    x: 160,
    y: 215,
    w: 145,
    h: 56,
    label: "Nginx LB",
    sub: "AWS EC2 · TLS",
    type: "infra",
    step: "Step 1 — Edge / Load Balancer",
    title: "Nginx · Reverse Proxy & Load Balancer",
    body: "Front-door reverse proxy on the EC2 instance. Terminates TLS, writes access logs, then load-balances HTTP traffic onto the API Gateway (round-robin / least_conn) and upgrades WebSocket connections (Upgrade / Connection headers, proxy_read_timeout) onto the realtime_cluster upstream. Also a natural place for static-file caching and edge rate limiting.",
    tags: [
      "Nginx",
      "Reverse proxy",
      "Load balancer",
      "TLS termination",
      "WS upgrade",
      "AWS EC2",
      "Round-robin / least_conn",
    ],
  },
  {
    id: "gw",
    x: 320,
    y: 215,
    w: 155,
    h: 56,
    label: "API Gateway",
    sub: ":3000 · NestJS HTTP",
    type: "gateway",
    step: "Step 2 — API Gateway",
    title: "API Gateway · NestJS HTTP App (:3000)",
    body: "First Nest app for every request. Globally applies ValidationPipe (whitelist + forbidNonWhitelisted + transform), CORS from ALLOWED_ORIGINS (credentials + custom methods), ThrottlerGuard (60s / 20 req), JwtAuthGuard via Passport on protected routes, and the RpcToHttpExceptionFilter that converts microservice errors back to HTTP JSON. Mounts Swagger at /api/swagger with addBearerAuth(). Wires the RedisIoAdapter so it can also speak Socket.IO. Multer FileInterceptor / FileFieldsInterceptor handle multipart uploads forwarded to S3 via AwsService.",
    tags: [
      "NestJS",
      "ValidationPipe",
      "CORS",
      "Throttler 60/20",
      "JwtAuthGuard",
      "RpcToHttpExceptionFilter",
      "Swagger Bearer",
      "Multer",
      "Passport.js",
      "Helmet [staged]",
    ],
  },
  {
    id: "auth",
    x: 490,
    y: 215,
    w: 145,
    h: 56,
    label: "Auth Service",
    sub: "TCP :3002 · JWT · bcrypt",
    type: "service",
    step: "Step 6a — Auth",
    title: "Auth Service · TCP :3002",
    body: "Owns identity. @MessagePattern handlers: create-role, sign-in, register-user, refresh-token, logout. bcrypt for password hashing. Issues JWT access (1 h) + refresh (7 d). Refresh tokens hashed with SHA-256 before storage in UserSession (capturing ipAddress, device, platform, expiresAt, revoked). Logout flips revoked=true. registerUser runs prisma.$transaction (email-uniqueness check, role lookup, user create) then emits user-registered to user-service and email-service.",
    tags: [
      "NestJS Microservice",
      "TCP :3002",
      "bcrypt",
      "@nestjs/jwt",
      "Passport JwtStrategy",
      "Refresh tokens SHA-256",
      "UserSession",
      "Prisma transaction",
    ],
  },
  {
    id: "user",
    x: 650,
    y: 215,
    w: 145,
    h: 56,
    label: "User Service",
    sub: "TCP :3001 · Prisma",
    type: "service",
    step: "Step 6b — User",
    title: "User Service · TCP :3001",
    body: "Owns user profiles. Listens for @EventPattern('user-registered') from auth-service to upsert a shadow user row keyed by authId. @MessagePattern handlers: get_all_users, upsert-profile, get-profile. Profile model holds gender, dob, heightCm, weightKg, profileImageUrl, address, bio, contact_no. Address + UserFollows (follower/following self-relation) join tables. Profile images uploaded through gateway → AwsService → S3.",
    tags: [
      "NestJS Microservice",
      "TCP :3001",
      "Prisma",
      "@EventPattern subscriber",
      "Profile · Address · Follows",
      "@prisma-clients/user",
    ],
  },
  {
    id: "gym",
    x: 810,
    y: 215,
    w: 145,
    h: 56,
    label: "Gym Service",
    sub: "TCP :3003 · Domain",
    type: "service",
    step: "Step 6c — Gym",
    title: "Gym Service · TCP :3003",
    body: "Domain logic for the gym SaaS. @MessagePattern handlers: create-gym, create-shift, add-trainer, remove-trainer. Slug generator with collision retry, P2002 unique-violation handled with RpcException. Models: Gym, Shift, Membership, Subscription, GymClass, ClassBooking, Attendance, Payment, Trainer, TrainerGym (composite-key join). Enums: MembershipStatus, SubscriptionStatus, BookingStatus, PaymentMethod, PaymentStatus.",
    tags: [
      "NestJS Microservice",
      "TCP :3003",
      "Prisma",
      "Slug + retry",
      "RpcException",
      "10 entities",
      "5 enums",
    ],
  },

  // ─── Row 4 (y=320) — Side infra + Product service ────────────────────────
  {
    id: "s3",
    x: 160,
    y: 320,
    w: 145,
    h: 56,
    label: "AWS S3",
    sub: "images/ · videos/",
    type: "external",
    step: "External · Object Storage",
    title: "AWS S3 · Image & Video Bucket",
    body: "AwsService (libs/common/aws) wraps @aws-sdk/client-s3. uploadFile() routes images to images/<uuid>-<name> and videos to videos/<uuid>-<name> based on mimetype. 50 MB Multer limit, mimetype filter (image/* or video/*). Returns { bucket, key, url, type }. deleteFile uses DeleteObjectCommand. Env: AWS_BUCKET_NAME, AWS_REGION (+ implicit credentials chain).",
    tags: [
      "@aws-sdk/client-s3",
      "Multer 50 MB",
      "FileInterceptor",
      "Mimetype filter",
      "PutObject / DeleteObject",
    ],
  },
  {
    id: "product",
    x: 320,
    y: 320,
    w: 155,
    h: 56,
    label: "Product Service",
    sub: "TCP :4002 · scaffold",
    type: "service",
    step: "Step 6f — Product",
    title: "Product Service · TCP :4002",
    body: "Scaffolded NestJS microservice on TCP :4002. Currently a placeholder — controller still named GymServiceController internally, no @MessagePattern handlers wired yet, no Prisma schema. The repo's only e2e Jest spec lives here at apps/product-service/test/app.e2e-spec.ts. Built by CI but not in PM2 ecosystem.",
    tags: [
      "NestJS Microservice",
      "TCP :4002",
      "Scaffold (WIP)",
      "Jest e2e",
      "Not in PM2",
    ],
  },

  // ─── Row 5 (y=425) — Databases (AWS RDS) ─────────────────────────────────
  {
    id: "db-auth",
    x: 490,
    y: 425,
    w: 145,
    h: 44,
    label: "Auth DB",
    sub: "AWS RDS · Postgres",
    type: "db",
    step: "Step 7a — Auth DB",
    title: "Auth Database · AWS RDS Postgres",
    body: "Dedicated Postgres logical DB on AWS RDS. Schema versioned by Prisma migrations (5 to date). Models: Role, User (auth_users), UserSession (ipAddress / device / platform / refreshTokenHash / expiresAt / revoked). Output Prisma client at @prisma-clients/auth. Env: AUTH_DATABASE_URL.",
    tags: [
      "AWS RDS",
      "PostgreSQL",
      "Prisma migrations × 5",
      "@prisma-clients/auth",
      "Isolated schema",
    ],
  },
  {
    id: "db-user",
    x: 650,
    y: 425,
    w: 145,
    h: 44,
    label: "User DB",
    sub: "AWS RDS · Postgres",
    type: "db",
    step: "Step 7b — User DB",
    title: "User Database · AWS RDS Postgres",
    body: "Dedicated Postgres logical DB on AWS RDS for user-service. Models: User (with authId mapping back to auth-service ids), Address, Profile, UserFollows (follower/following self-relation). Prisma client at @prisma-clients/user. Env: USER_DATABASE_URL. 3 migrations.",
    tags: [
      "AWS RDS",
      "PostgreSQL",
      "Prisma",
      "@prisma-clients/user",
      "Cross-service authId",
    ],
  },
  {
    id: "db-gym",
    x: 810,
    y: 425,
    w: 145,
    h: 44,
    label: "Gym DB",
    sub: "AWS RDS · Postgres",
    type: "db",
    step: "Step 7c — Gym DB",
    title: "Gym Database · AWS RDS Postgres",
    body: "Dedicated Postgres logical DB on AWS RDS for gym-service. Holds Gym, Shift, Membership, Subscription, GymClass, ClassBooking, Attendance, Payment, Trainer, TrainerGym tables. 8 sequential migrations. Prisma client at @prisma-clients/gym. Env: GYM_DATABASE_URL.",
    tags: [
      "AWS RDS",
      "PostgreSQL",
      "Prisma",
      "@prisma-clients/gym",
      "10 entities",
      "8 migrations",
    ],
  },
];

const EDGES: FlowEdge[] = [
  // Edge / load balancer
  { id: 0, from: "client", to: "nginx", ret: false, label: "HTTPS" },
  { id: 1, from: "nginx", to: "gw", ret: false, label: "HTTP route" },
  { id: 2, from: "nginx", to: "rt", ret: false, label: "WSS upgrade" },
  // Gateway resilience and outbound TCP
  { id: 3, from: "gw", to: "cb", ret: false, label: "Opossum wrap" },
  { id: 4, from: "cb", to: "auth", ret: false, label: "TCP cmd" },
  { id: 5, from: "cb", to: "user", ret: false, label: "TCP cmd" },
  { id: 6, from: "cb", to: "gym", ret: false, label: "TCP cmd" },
  // Side effects: file upload + Socket.IO adapter
  { id: 7, from: "gw", to: "s3", ret: false, label: "Multer→S3" },
  { id: 8, from: "gw", to: "redis-cache", ret: false, label: "IO adapter" },
  // Service → DB (Prisma)
  { id: 9, from: "auth", to: "db-auth", ret: false, label: "Prisma" },
  { id: 10, from: "user", to: "db-user", ret: false, label: "Prisma" },
  { id: 11, from: "gym", to: "db-gym", ret: false, label: "Prisma" },
  // Auth fan-out (events)
  { id: 12, from: "auth", to: "user", ret: false, label: "user-registered" },
  { id: 13, from: "auth", to: "email", ret: false, label: "user-registered" },
  // Email out
  { id: 14, from: "email", to: "smtp", ret: false, label: "Nodemailer" },
  // Realtime pub/sub
  { id: 15, from: "rt", to: "redis-cache", ret: false, label: "publish" },
  // AI → LLM
  { id: 16, from: "ai", to: "llm", ret: false, label: "LangChain" },
  // CI → PM2 → managed processes
  { id: 17, from: "ci", to: "pm2", ret: false, label: "rsync + ssh" },
  { id: 18, from: "pm2", to: "gw", ret: false, label: "spawn" },
  { id: 19, from: "pm2", to: "rt", ret: false, label: "spawn" },
  // Returns
  { id: 20, from: "gw", to: "client", ret: true, label: "JSON res" },
  { id: 21, from: "rt", to: "client", ret: true, label: "WS event" },
];

const FLOWS: Record<string, FlowStep[]> = {
  // Full happy-path API request lifecycle
  client: [
    { node: "client", edges: [] },
    { node: "nginx", edges: [0] },
    { node: "gw", edges: [1] },
    { node: "cb", edges: [3] },
    { node: "auth", edges: [4] },
    { node: "user", edges: [5] },
    { node: "gym", edges: [6] },
    { node: "db-auth", edges: [9] },
    { node: "db-user", edges: [10] },
    { node: "db-gym", edges: [11] },
    { node: "client", edges: [20] },
  ],
  // Edge routing — Nginx fans out to gateway (HTTP) AND realtime (WS)
  nginx: [
    { node: "nginx", edges: [] },
    { node: "gw", edges: [1] },
    { node: "rt", edges: [2] },
  ],
  // Gateway-centric fan-out — every downstream the gateway can hit
  gw: [
    { node: "gw", edges: [] },
    { node: "cb", edges: [3] },
    { node: "auth", edges: [4] },
    { node: "user", edges: [5] },
    { node: "gym", edges: [6] },
    { node: "s3", edges: [7] },
    { node: "redis-cache", edges: [8] },
    { node: "db-auth", edges: [9] },
    { node: "db-user", edges: [10] },
    { node: "db-gym", edges: [11] },
    { node: "client", edges: [20] },
  ],
  // Auth flow — register: write user, fan-out events to user + email + SMTP
  auth: [
    { node: "auth", edges: [] },
    { node: "db-auth", edges: [9] },
    { node: "user", edges: [12] },
    { node: "db-user", edges: [10] },
    { node: "email", edges: [13] },
    { node: "smtp", edges: [14] },
    { node: "client", edges: [20] },
  ],
  // Realtime broadcast cycle — client publishes, Redis fans out to peers
  rt: [
    { node: "client", edges: [] },
    { node: "nginx", edges: [0] },
    { node: "rt", edges: [2] },
    { node: "redis-cache", edges: [15] },
    { node: "client", edges: [21] },
  ],
  // Email path — TCP event consumed, SMTP relay
  email: [
    { node: "email", edges: [] },
    { node: "smtp", edges: [14] },
  ],
  // AI workflow — LangGraph round-trip to NVIDIA LLM
  ai: [
    { node: "ai", edges: [] },
    { node: "llm", edges: [16] },
  ],
  // Gym domain flow — Prisma read/write returns to client
  gym: [
    { node: "gym", edges: [] },
    { node: "db-gym", edges: [11] },
    { node: "client", edges: [20] },
  ],
  // Deployment pipeline — GitHub Actions → PM2 → managed services
  ci: [
    { node: "ci", edges: [] },
    { node: "pm2", edges: [17] },
    { node: "gw", edges: [18] },
    { node: "rt", edges: [19] },
  ],
};

const STARTABLE = new Set<string>(Object.keys(FLOWS));
const STEP_DELAY = 1300;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getNodeById(id: string): FlowNode | undefined {
  return NODES.find((n) => n.id === id);
}

function makePath(fn: FlowNode, tn: FlowNode): string {
  const x1 = fn.x + fn.w / 2,
    y1 = fn.y + fn.h / 2;
  const x2 = tn.x + tn.w / 2,
    y2 = tn.y + tn.h / 2;
  const dx = x2 - x1,
    dy = y2 - y1;
  if (Math.abs(dy) < 8) {
    return `M${fn.x + (dx > 0 ? fn.w : 0)},${y1} L${tn.x + (dx > 0 ? 0 : tn.w)},${y2}`;
  }
  if (Math.abs(dx) < 8) {
    return `M${x1},${fn.y + (dy > 0 ? fn.h : 0)} L${x2},${tn.y + (dy > 0 ? 0 : tn.h)}`;
  }
  const sx = fn.x + (dx > 0 ? fn.w : 0),
    ex = tn.x + (dx > 0 ? 0 : tn.w);
  return `M${sx},${y1} C${sx + dx * 0.45},${y1} ${ex - dx * 0.45},${y2} ${ex},${y2}`;
}

function getMid(fn: FlowNode, tn: FlowNode): { x: number; y: number } {
  return {
    x: (fn.x + fn.w / 2 + tn.x + tn.w / 2) / 2,
    y: (fn.y + fn.h / 2 + tn.y + tn.h / 2) / 2,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

const FlowDiagram = () => {
  useScrollReveal();
  const [litNodes, setLitNodes] = useState<Set<string>>(new Set());
  const [litEdges, setLitEdges] = useState<Set<number>>(new Set());
  const [running, setRunning] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [activeInfo, setActiveInfo] = useState<FlowNode | null>(null);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const litNodesRef = useRef<Set<string>>(new Set());
  const litEdgesRef = useRef<Set<number>>(new Set());

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const resetAll = useCallback(() => {
    clearTimer();
    litNodesRef.current = new Set();
    litEdgesRef.current = new Set();
    setLitNodes(new Set());
    setLitEdges(new Set());
    setRunning(false);
    setDone(false);
    setActiveInfo(null);
    setStepIdx(0);
    setTotalSteps(0);
  }, []);

  const startFlow = useCallback(
    (nodeId: string) => {
      const flow = FLOWS[nodeId];
      if (!flow || running) return;
      clearTimer();
      litNodesRef.current = new Set();
      litEdgesRef.current = new Set();
      setLitNodes(new Set());
      setLitEdges(new Set());
      setDone(false);
      setRunning(true);

      setTotalSteps(flow.length);

      let idx = 0;
      const tick = () => {
        if (idx >= flow.length) {
          setRunning(false);
          setDone(true);
          return;
        }
        const step = flow[idx];
        litNodesRef.current = new Set([...litNodesRef.current, step.node]);
        litEdgesRef.current = new Set([...litEdgesRef.current, ...step.edges]);
        setLitNodes(new Set(litNodesRef.current));
        setLitEdges(new Set(litEdgesRef.current));
        setActiveInfo(getNodeById(step.node) ?? null);
        setStepIdx(idx + 1);
        idx++;
        if (idx < flow.length) {
          timerRef.current = setTimeout(tick, STEP_DELAY);
        } else {
          timerRef.current = setTimeout(() => {
            setRunning(false);
            setDone(true);
          }, 600);
        }
      };
      tick();
    },
    [running],
  );

  useEffect(() => () => clearTimer(), []);

  return (
    <section
      id="flow-diagram"
      className="py-24 relative"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label">Architecture</span>
        </div>
        <div className="sr-hidden sr-d2 mb-10">
          <div className="accent-stripe" />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            Request &<br />
            <span className="grad-text font-display italic">Response Flow</span>
          </h2>
          <p
            className="text-base mt-4 max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Click any highlighted node to animate its path — Nginx-fronted edge,
            circuit-broken TCP between 7 NestJS services, Socket.IO on a Redis
            adapter, S3 / SMTP / NVIDIA LLM hops, and per-service Postgres on
            AWS RDS.
          </p>
        </div>

        {/* Canvas */}
        <div
          className="sr-hidden sr-d3"
          style={{
            border: "var(--border)",
            boxShadow: "var(--shadow-lg)",
            background: "#ede8df",
            backgroundImage:
              "radial-gradient(circle, rgba(26,26,26,.11) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            overflowX: "auto",
          }}
        >
          <svg
            viewBox="0 0 1180 510"
            style={{ display: "block", width: "100%", minWidth: 900 }}
          >
            <defs>
              <marker
                id="fd-arr"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="context-stroke"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
              <marker
                id="fd-arr-blue"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="#2d5be3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
              <marker
                id="fd-arr-dim"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path
                  d="M2 1L8 5L2 9"
                  fill="none"
                  stroke="#c5c3bb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
              <style>{`
                @keyframes fd-fwd { to { stroke-dashoffset: -18; } }
                @keyframes fd-ret { to { stroke-dashoffset: 18; } }
                .fd-edge-fwd { stroke: #1a1a1a; stroke-width: 1.8; stroke-dasharray: 7 4; animation: fd-fwd .5s linear infinite; marker-end: url(#fd-arr); }
                .fd-edge-ret { stroke: #2d5be3; stroke-width: 1.8; stroke-dasharray: 5 4; animation: fd-ret .5s linear infinite; marker-end: url(#fd-arr-blue); }
                .fd-edge-dim { stroke: #d3d1c7; stroke-width: 1; fill: none; marker-end: url(#fd-arr-dim); }
              `}</style>
            </defs>

            {/* Edges */}
            {EDGES.map((e) => {
              const fn = getNodeById(e.from);
              const tn = getNodeById(e.to);
              if (!fn || !tn) return null;
              const isLit = litEdges.has(e.id);
              const mid = getMid(fn, tn);
              return (
                <g key={e.id}>
                  <path
                    d={makePath(fn, tn)}
                    fill="none"
                    className={
                      isLit
                        ? e.ret
                          ? "fd-edge-ret"
                          : "fd-edge-fwd"
                        : "fd-edge-dim"
                    }
                  />
                  {isLit && e.label && (
                    <text
                      x={mid.x}
                      y={mid.y - 6}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="DM Mono, monospace"
                      fill={e.ret ? "#2d5be3" : "#1a1a1a"}
                      style={{ pointerEvents: "none" }}
                    >
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n) => {
              const c = COLORS[n.type];
              const isLit = litNodes.has(n.id);
              const isClickable = STARTABLE.has(n.id) && !running;
              const tY = n.sub ? n.y + n.h * 0.37 : n.y + n.h / 2;

              return (
                <g
                  key={n.id}
                  onClick={() => isClickable && startFlow(n.id)}
                  style={{ cursor: isClickable ? "pointer" : "default" }}
                >
                  {isClickable && !running && (
                    <rect
                      x={n.x - 2}
                      y={n.y - 2}
                      width={n.w + 4}
                      height={n.h + 4}
                      rx={2}
                      fill="none"
                      stroke="#2d5be3"
                      strokeWidth="1.5"
                      strokeDasharray="5 3"
                      opacity={0.6}
                    />
                  )}
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={0}
                    fill={isLit ? c.fill : "#f0ece4"}
                    stroke={isLit ? c.stroke : "#c5c3bb"}
                    strokeWidth={isLit ? 2 : 1.5}
                  />
                  {isLit && (
                    <rect x={n.x} y={n.y} width={3} height={n.h} fill={c.acc} />
                  )}
                  <text
                    x={n.x + n.w / 2 + 2}
                    y={tY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="11.5"
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fill={isLit ? c.text : "#aaa8a0"}
                    style={{ pointerEvents: "none" }}
                  >
                    {n.label}
                  </text>
                  {n.sub && (
                    <text
                      x={n.x + n.w / 2 + 2}
                      y={n.y + n.h * 0.68}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="9"
                      fontFamily="DM Mono, monospace"
                      fill={isLit ? c.sub : "#c0bdb5"}
                      style={{ pointerEvents: "none" }}
                    >
                      {n.sub}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info Card */}
        <div
          className="sr-hidden sr-d4 mt-4"
          style={{
            background: "var(--bg-card)",
            border: "var(--border)",
            boxShadow: "var(--shadow-md)",
            padding: "16px 20px",
            minHeight: 90,
          }}
        >
          {!activeInfo ? (
            <>
              <p
                className="font-mono-custom text-xs mb-1"
                style={{
                  color: "#2d5be3",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Select a starting node above
              </p>
              <p
                className="font-bold text-sm mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Nest Microservices · Flow Visualizer
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}
              >
                Try Client for the full request lifecycle, Auth for the
                register-and-welcome-email cascade, Realtime for the Socket.IO
                pub/sub fan-out, AI for the LangGraph workflow, or CI/CD for
                the GitHub Actions → PM2 deploy.
              </p>
            </>
          ) : (
            <>
              <p
                className="font-mono-custom text-xs mb-1"
                style={{
                  color: "#2d5be3",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {activeInfo.step}
              </p>
              <p
                className="font-bold text-sm mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {activeInfo.title}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}
              >
                {activeInfo.body}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {activeInfo.tags.map((t: string) => (
                  <span
                    key={t}
                    className="font-mono-custom"
                    style={{
                      fontSize: "9px",
                      padding: "2px 8px",
                      border: "var(--border)",
                      boxShadow: "2px 2px 0 rgba(26,26,26,.2)",
                      background: "var(--bg-white)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 mt-3">
                {Array.from({ length: totalSteps }).map((_, i: number) => (
                  <div
                    key={i}
                    style={{
                      width: 8,
                      height: 8,
                      border: "1.5px solid #1a1a1a",
                      background:
                        i < stepIdx - 1
                          ? "#2d5be3"
                          : i === stepIdx - 1
                            ? "#e85d3a"
                            : "#d3d1c7",
                      transition: "background .25s",
                    }}
                  />
                ))}
              </div>
            </>
          )}
          {done && (
            <div className="flex items-center justify-between mt-3">
              <p
                className="font-mono-custom text-xs"
                style={{ color: "#7a7a7a" }}
              >
                Flow complete — explore another path.
              </p>
              <button
                onClick={resetAll}
                className="btn-outline font-mono-custom"
                style={{ fontSize: "10px", padding: "3px 12px" }}
              >
                ↺ Reset
              </button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap gap-3 mt-4 items-center"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: 10,
            color: "var(--text-muted)",
          }}
        >
          {(
            [
              { label: "Client", fill: "#e6eefb", stroke: "#185fa5" },
              { label: "Gateway", fill: "#2d5be3", stroke: "#1a1a1a" },
              { label: "Service", fill: "#faf7f2", stroke: "#1a1a1a" },
              { label: "Infrastructure", fill: "#e4f2ea", stroke: "#16a34a" },
              { label: "DB (AWS RDS)", fill: "#fdf3ed", stroke: "#e85d3a" },
              {
                label: "External (AWS / 3rd-party)",
                fill: "#fef3c7",
                stroke: "#a16207",
              },
            ] as LegendItem[]
          ).map(({ label, fill, stroke }) => (
            <div key={label} className="flex items-center gap-1">
              <div
                style={{
                  width: 11,
                  height: 11,
                  background: fill,
                  border: `1.5px solid ${stroke}`,
                }}
              />
              {label}
            </div>
          ))}
          <div className="flex items-center gap-1">
            <svg width="24" height="8">
              <line
                x1="0"
                y1="4"
                x2="24"
                y2="4"
                stroke="#1a1a1a"
                strokeWidth="1.8"
                strokeDasharray="5 3"
              />
            </svg>
            request
          </div>
          <div className="flex items-center gap-1">
            <svg width="24" height="8">
              <line
                x1="0"
                y1="4"
                x2="24"
                y2="4"
                stroke="#2d5be3"
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />
            </svg>
            response
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowDiagram;
