import { useEffect, useRef, useState, useCallback } from "react";
import { useScrollReveal } from "./useScrollReveal";

// ─── Types ───────────────────────────────────────────────────────────────────

type NodeType = "client" | "gateway" | "service" | "infra" | "db" | "external";

interface ColorScheme {
  fill: string;
  stroke: string;
  text: string;
  sub: string;
  acc: string;
  badge: string;
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

// ─── Color Palette ────────────────────────────────────────────────────────────

const COLORS: Record<NodeType, ColorScheme> = {
  client: {
    fill: "#ddeafb",
    stroke: "#185fa5",
    text: "#0c447c",
    sub: "#378add",
    acc: "#185fa5",
    badge: "#378add",
  },
  gateway: {
    fill: "#2d5be3",
    stroke: "#1a3a9e",
    text: "#fff",
    sub: "rgba(255,255,255,.80)",
    acc: "#fff",
    badge: "#7fa8f5",
  },
  service: {
    fill: "#ffffff",
    stroke: "#1a1a1a",
    text: "#0f0f0f",
    sub: "#6a6a6a",
    acc: "#2d5be3",
    badge: "#2d5be3",
  },
  infra: {
    fill: "#d8f0e3",
    stroke: "#16a34a",
    text: "#14532d",
    sub: "#16a34a",
    acc: "#16a34a",
    badge: "#16a34a",
  },
  db: {
    fill: "#fde8df",
    stroke: "#e85d3a",
    text: "#7c1d08",
    sub: "#c2410c",
    acc: "#e85d3a",
    badge: "#e85d3a",
  },
  external: {
    fill: "#fef3c7",
    stroke: "#a16207",
    text: "#713f12",
    sub: "#a16207",
    acc: "#eab308",
    badge: "#a16207",
  },
};

const TYPE_LABEL: Record<NodeType, string> = {
  client: "Client",
  gateway: "Gateway",
  service: "Service",
  infra: "Infra",
  db: "Database",
  external: "External",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const NODES: FlowNode[] = [
  {
    id: "ci",
    x: 18,
    y: 20,
    w: 130,
    h: 60,
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
    ],
  },
  {
    id: "pm2",
    x: 160,
    y: 20,
    w: 145,
    h: 60,
    label: "PM2 Cluster",
    sub: "ecosystem.config.js",
    type: "infra",
    step: "Deployment · Process Manager",
    title: "PM2 · Supervisor on AWS EC2",
    body: "Manages 6 long-running Node processes on the EC2 box: api-gateway:3000, user-service:3001, auth-service:3002, gym-service:3003, realtime-service:3004 and email-service:3006. Auto-restart on crash, structured logs to logs/<svc>-{out,error}.log with ISO timestamps.",
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
    h: 60,
    label: "Redis",
    sub: "Pub/Sub · IO Adapter",
    type: "infra",
    step: "Step 5 — Realtime Backbone",
    title: "Redis · Pub/Sub + Socket.IO Adapter",
    body: "Two roles: (1) @socket.io/redis-adapter shares Socket.IO state across every gateway/realtime pod, (2) custom realtime channels — BROADCAST_MESSAGE, BROADCAST_USER_JOINED, BROADCAST_USER_LEFT, BROADCAST_TYPING. Reconnect strategy capped at 10 retries, 3000 ms.",
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
    h: 60,
    label: "SMTP Server",
    sub: "Nodemailer transport",
    type: "external",
    step: "External · Mail Relay",
    title: "SMTP Server",
    body: "Outbound mail relay (Gmail / SES / similar) configured via SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM. Email service connects through nodemailer (wrapped by @nestjs-modules/mailer) to deliver the welcome email.",
    tags: ["SMTP", "Nodemailer", "TLS", "External"],
  },
  {
    id: "cb",
    x: 320,
    y: 115,
    w: 155,
    h: 60,
    label: "Circuit Breaker",
    sub: "Opossum 9",
    type: "infra",
    step: "Step 3 — Resilience",
    title: "CircuitBreakerService · Opossum",
    body: "Every outbound TCP call from the gateway is wrapped by an Opossum breaker, cached per service:endpoint in a Map. Settings: timeout 3 s, error threshold 50 %, volume threshold 5, reset 10 s, rolling window 10 s. Also exposes an RxJS retryStrategy (max 2 retries, exponential 500 ms backoff).",
    tags: [
      "Opossum 9",
      "Timeout 3s",
      "Threshold 50%",
      "Half-open probe",
      "RxJS retry ×2",
    ],
  },
  {
    id: "rt",
    x: 490,
    y: 115,
    w: 145,
    h: 60,
    label: "Realtime Service",
    sub: "Socket.IO · :3004",
    type: "service",
    step: "Step 4 — WebSocket Hub",
    title: "Realtime Service · NestJS WS App",
    body: "Independent NestJS HTTP+WS app on port 3004. Namespace /realtime, transports websocket+polling, ping 25 s / timeout 60 s. WsJwtGuard validates token from handshake.auth.token. RateLimiterService throttles per-event (send_message 60/min, ping 30/30s). Tracks user:<id> + room:<id> rooms in a connectedClients Map.",
    tags: [
      "Socket.IO",
      "@WebSocketGateway",
      "WsJwtGuard",
      "RateLimiterService",
      "Rooms",
      "Redis adapter",
    ],
  },
  {
    id: "email",
    x: 650,
    y: 115,
    w: 145,
    h: 60,
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
    ],
  },
  {
    id: "ai",
    x: 810,
    y: 115,
    w: 145,
    h: 60,
    label: "AI Service",
    sub: "LangGraph · :3007",
    type: "service",
    step: "Step 6e — AI",
    title: "AI Service · LangGraph Workflow",
    body: "Experimental NestJS microservice running a LangChain + LangGraph StateGraph. Four nodes wired START → fetchWorkoutData → analyzeWorkout → generateReport → generateRecommendations → END. Recommendations split into immediate / shortTerm / longTerm tiers.",
    tags: [
      "@langchain/langgraph",
      "@langchain/openai",
      "StateGraph",
      "4 graph nodes",
      "TCP :3007",
    ],
  },
  {
    id: "llm",
    x: 970,
    y: 115,
    w: 145,
    h: 60,
    label: "LLM API",
    sub: "NVIDIA gpt-oss-20b",
    type: "external",
    step: "External · LLM",
    title: "NVIDIA-hosted gpt-oss-20b",
    body: "OpenAI-compatible inference endpoint at integrate.api.nvidia.com/v1. AI service calls it through ChatOpenAI (@langchain/openai) with temperature 0.3, maxTokens 4096 and streaming enabled.",
    tags: [
      "NVIDIA NIM",
      "OpenAI-compatible",
      "@langchain/openai",
      "Streaming",
      "External",
    ],
  },
  {
    id: "client",
    x: 18,
    y: 220,
    w: 130,
    h: 60,
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
    y: 220,
    w: 145,
    h: 60,
    label: "Nginx LB",
    sub: "AWS EC2 · TLS",
    type: "infra",
    step: "Step 1 — Edge / Load Balancer",
    title: "Nginx · Reverse Proxy & Load Balancer",
    body: "Front-door reverse proxy on the EC2 instance. Terminates TLS, writes access logs, then load-balances HTTP traffic onto the API Gateway and upgrades WebSocket connections onto the realtime_cluster upstream. Also handles static-file caching and edge rate limiting.",
    tags: [
      "Nginx",
      "Reverse proxy",
      "Load balancer",
      "TLS termination",
      "WS upgrade",
      "AWS EC2",
    ],
  },
  {
    id: "gw",
    x: 320,
    y: 220,
    w: 155,
    h: 60,
    label: "API Gateway",
    sub: ":3000 · NestJS HTTP",
    type: "gateway",
    step: "Step 2 — API Gateway",
    title: "API Gateway · NestJS HTTP App (:3000)",
    body: "First Nest app for every request. Globally applies ValidationPipe (whitelist + forbidNonWhitelisted + transform), CORS from ALLOWED_ORIGINS, ThrottlerGuard (60s / 20 req), JwtAuthGuard via Passport on protected routes, and the RpcToHttpExceptionFilter. Mounts Swagger at /api/swagger with addBearerAuth().",
    tags: [
      "NestJS",
      "ValidationPipe",
      "CORS",
      "Throttler 60/20",
      "JwtAuthGuard",
      "Swagger Bearer",
      "Multer",
    ],
  },
  {
    id: "auth",
    x: 490,
    y: 220,
    w: 145,
    h: 60,
    label: "Auth Service",
    sub: "TCP :3002 · JWT",
    type: "service",
    step: "Step 6a — Auth",
    title: "Auth Service · TCP :3002",
    body: "Owns identity. @MessagePattern handlers: create-role, sign-in, register-user, refresh-token, logout. bcrypt for password hashing. Issues JWT access (1 h) + refresh (7 d). Refresh tokens hashed with SHA-256 before storage in UserSession. Logout flips revoked=true.",
    tags: [
      "NestJS Microservice",
      "TCP :3002",
      "bcrypt",
      "@nestjs/jwt",
      "Passport JwtStrategy",
      "Prisma transaction",
    ],
  },
  {
    id: "user",
    x: 650,
    y: 220,
    w: 145,
    h: 60,
    label: "User Service",
    sub: "TCP :3001 · Prisma",
    type: "service",
    step: "Step 6b — User",
    title: "User Service · TCP :3001",
    body: "Owns user profiles. Listens for @EventPattern('user-registered') from auth-service to upsert a shadow user row keyed by authId. Profile model holds gender, dob, heightCm, weightKg, profileImageUrl, address, bio, contact_no.",
    tags: [
      "NestJS Microservice",
      "TCP :3001",
      "Prisma",
      "@EventPattern subscriber",
      "Profile · Address · Follows",
    ],
  },
  {
    id: "gym",
    x: 810,
    y: 220,
    w: 145,
    h: 60,
    label: "Gym Service",
    sub: "TCP :3003 · Domain",
    type: "service",
    step: "Step 6c — Gym",
    title: "Gym Service · TCP :3003",
    body: "Domain logic for the gym SaaS. @MessagePattern handlers: create-gym, create-shift, add-trainer, remove-trainer. Slug generator with collision retry, P2002 unique-violation handled with RpcException. Models: Gym, Shift, Membership, Subscription, GymClass, ClassBooking, Attendance, Payment, Trainer, TrainerGym.",
    tags: [
      "NestJS Microservice",
      "TCP :3003",
      "Prisma",
      "Slug + retry",
      "RpcException",
      "10 entities",
    ],
  },
  {
    id: "s3",
    x: 160,
    y: 330,
    w: 145,
    h: 60,
    label: "AWS S3",
    sub: "images/ · videos/",
    type: "external",
    step: "External · Object Storage",
    title: "AWS S3 · Image & Video Bucket",
    body: "AwsService wraps @aws-sdk/client-s3. uploadFile() routes images to images/<uuid>-<name> and videos to videos/<uuid>-<name> based on mimetype. 50 MB Multer limit, mimetype filter (image/* or video/*). Returns { bucket, key, url, type }.",
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
    y: 330,
    w: 155,
    h: 60,
    label: "Product Service",
    sub: "TCP :4002 · scaffold",
    type: "service",
    step: "Step 6f — Product",
    title: "Product Service · TCP :4002",
    body: "Scaffolded NestJS microservice on TCP :4002. Currently a placeholder — no @MessagePattern handlers wired yet, no Prisma schema. The repo's only e2e Jest spec lives here. Built by CI but not in PM2 ecosystem.",
    tags: [
      "NestJS Microservice",
      "TCP :4002",
      "Scaffold (WIP)",
      "Jest e2e",
      "Not in PM2",
    ],
  },
  {
    id: "db-auth",
    x: 490,
    y: 435,
    w: 145,
    h: 48,
    label: "Auth DB",
    sub: "AWS RDS · Postgres",
    type: "db",
    step: "Step 7a — Auth DB",
    title: "Auth Database · AWS RDS Postgres",
    body: "Dedicated Postgres logical DB on AWS RDS. Schema versioned by Prisma migrations (5 to date). Models: Role, User (auth_users), UserSession (ipAddress / device / platform / refreshTokenHash / expiresAt / revoked).",
    tags: [
      "AWS RDS",
      "PostgreSQL",
      "Prisma migrations × 5",
      "@prisma-clients/auth",
    ],
  },
  {
    id: "db-user",
    x: 650,
    y: 435,
    w: 145,
    h: 48,
    label: "User DB",
    sub: "AWS RDS · Postgres",
    type: "db",
    step: "Step 7b — User DB",
    title: "User Database · AWS RDS Postgres",
    body: "Dedicated Postgres logical DB on AWS RDS for user-service. Models: User (with authId mapping back to auth-service ids), Address, Profile, UserFollows (follower/following self-relation). 3 migrations.",
    tags: ["AWS RDS", "PostgreSQL", "Prisma", "@prisma-clients/user"],
  },
  {
    id: "db-gym",
    x: 810,
    y: 435,
    w: 145,
    h: 48,
    label: "Gym DB",
    sub: "AWS RDS · Postgres",
    type: "db",
    step: "Step 7c — Gym DB",
    title: "Gym Database · AWS RDS Postgres",
    body: "Dedicated Postgres logical DB on AWS RDS for gym-service. Holds Gym, Shift, Membership, Subscription, GymClass, ClassBooking, Attendance, Payment, Trainer, TrainerGym tables. 8 sequential migrations.",
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
  { id: 0, from: "client", to: "nginx", ret: false, label: "HTTPS" },
  { id: 1, from: "nginx", to: "gw", ret: false, label: "HTTP route" },
  { id: 2, from: "nginx", to: "rt", ret: false, label: "WSS upgrade" },
  { id: 3, from: "gw", to: "cb", ret: false, label: "Opossum wrap" },
  { id: 4, from: "cb", to: "auth", ret: false, label: "TCP cmd" },
  { id: 5, from: "cb", to: "user", ret: false, label: "TCP cmd" },
  { id: 6, from: "cb", to: "gym", ret: false, label: "TCP cmd" },
  { id: 7, from: "gw", to: "s3", ret: false, label: "Multer→S3" },
  { id: 8, from: "gw", to: "redis-cache", ret: false, label: "IO adapter" },
  { id: 9, from: "auth", to: "db-auth", ret: false, label: "Prisma" },
  { id: 10, from: "user", to: "db-user", ret: false, label: "Prisma" },
  { id: 11, from: "gym", to: "db-gym", ret: false, label: "Prisma" },
  { id: 12, from: "auth", to: "user", ret: false, label: "user-registered" },
  { id: 13, from: "auth", to: "email", ret: false, label: "user-registered" },
  { id: 14, from: "email", to: "smtp", ret: false, label: "Nodemailer" },
  { id: 15, from: "rt", to: "redis-cache", ret: false, label: "publish" },
  { id: 16, from: "ai", to: "llm", ret: false, label: "LangChain" },
  { id: 17, from: "ci", to: "pm2", ret: false, label: "rsync + ssh" },
  { id: 18, from: "pm2", to: "gw", ret: false, label: "spawn" },
  { id: 19, from: "pm2", to: "rt", ret: false, label: "spawn" },
  { id: 20, from: "gw", to: "client", ret: true, label: "JSON res" },
  { id: 21, from: "rt", to: "client", ret: true, label: "WS event" },
];

const FLOWS: Record<string, FlowStep[]> = {
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
  nginx: [
    { node: "nginx", edges: [] },
    { node: "gw", edges: [1] },
    { node: "rt", edges: [2] },
  ],
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
  auth: [
    { node: "auth", edges: [] },
    { node: "db-auth", edges: [9] },
    { node: "user", edges: [12] },
    { node: "db-user", edges: [10] },
    { node: "email", edges: [13] },
    { node: "smtp", edges: [14] },
    { node: "client", edges: [20] },
  ],
  rt: [
    { node: "client", edges: [] },
    { node: "nginx", edges: [0] },
    { node: "rt", edges: [2] },
    { node: "redis-cache", edges: [15] },
    { node: "client", edges: [21] },
  ],
  email: [
    { node: "email", edges: [] },
    { node: "smtp", edges: [14] },
  ],
  ai: [
    { node: "ai", edges: [] },
    { node: "llm", edges: [16] },
  ],
  gym: [
    { node: "gym", edges: [] },
    { node: "db-gym", edges: [11] },
    { node: "client", edges: [20] },
  ],
  ci: [
    { node: "ci", edges: [] },
    { node: "pm2", edges: [17] },
    { node: "gw", edges: [18] },
    { node: "rt", edges: [19] },
  ],
};

const STARTABLE = new Set<string>(Object.keys(FLOWS));
const STEP_DELAY = 1300;

const QUICK_FLOWS = [
  { id: "client", label: "Full Request", icon: "→" },
  { id: "auth", label: "Auth Flow", icon: "🔐" },
  { id: "rt", label: "Realtime", icon: "⚡" },
  { id: "ci", label: "Deploy", icon: "🚀" },
  { id: "ai", label: "AI Chain", icon: "🤖" },
];

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

const GymProjectFlow = () => {
  useScrollReveal();
  const [litNodes, setLitNodes] = useState<Set<string>>(new Set());
  const [litEdges, setLitEdges] = useState<Set<number>>(new Set());
  const [running, setRunning] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);
  const [activeInfo, setActiveInfo] = useState<FlowNode | null>(null);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [totalSteps, setTotalSteps] = useState<number>(0);
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);

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
    setActiveFlowId(null);
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
      setActiveFlowId(nodeId);
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

  const progressPct =
    totalSteps > 0 ? Math.round((stepIdx / totalSteps) * 100) : 0;

  return (
    <section
      id="flow-diagram"
      className="py-16 relative"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label">Architecture</span>
        </div>
        <div className="sr-hidden sr-d2 mb-8">
          <div className="accent-stripe" />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            Request &<br />
            <span className="grad-text font-display italic">Response Flow</span>
          </h2>
          <p
            className="text-sm mt-3 max-w-xl"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Click any node to animate its data path — or use the quick-launch
            buttons below.
          </p>
        </div>

        {/* Quick-launch strip */}
        <div className="sr-hidden sr-d2 flex flex-wrap gap-2 mb-4">
          {QUICK_FLOWS.map((qf) => (
            <button
              key={qf.id}
              onClick={() => !running && startFlow(qf.id)}
              disabled={running}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 600,
                padding: "5px 14px",
                border: "var(--border)",
                boxShadow:
                  activeFlowId === qf.id
                    ? "4px 4px 0 #1a1a1a"
                    : "var(--shadow-sm)",
                background:
                  activeFlowId === qf.id ? "var(--accent)" : "var(--bg-white)",
                color: activeFlowId === qf.id ? "#fff" : "var(--text-primary)",
                cursor: running ? "not-allowed" : "pointer",
                opacity: running && activeFlowId !== qf.id ? 0.45 : 1,
                transition: "all .15s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 13 }}>{qf.icon}</span>
              {qf.label}
            </button>
          ))}
          {(running || done) && (
            <button
              onClick={resetAll}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                fontWeight: 600,
                padding: "5px 14px",
                border: "var(--border)",
                boxShadow: "var(--shadow-sm)",
                background: "transparent",
                color: "var(--text-primary)",
                cursor: "pointer",
                marginLeft: "auto",
                transition: "all .15s ease",
              }}
            >
              ↺ Reset
            </button>
          )}
        </div>

        {/* Canvas */}
        <div
          className="sr-hidden sr-d3"
          style={{
            border: "var(--border)",
            boxShadow: "var(--shadow-lg)",
            background: "#eae5dd",
            backgroundImage:
              "radial-gradient(circle, rgba(26,26,26,.10) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            overflowX: "auto",
            position: "relative",
          }}
        >
          {/* Row labels */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {[
              { y: 20, label: "DEPLOY" },
              { y: 115, label: "RESILIENCE" },
              { y: 220, label: "ROUTING" },
              { y: 330, label: "STORAGE" },
              { y: 435, label: "DATABASE" },
            ].map(({ y, label }) => (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: 0,
                  top: y * (100 / 510) + "%",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 8,
                  letterSpacing: "0.18em",
                  color: "rgba(26,26,26,0.2)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  padding: "4px 3px",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <svg
            viewBox="0 0 1180 520"
            style={{ display: "block", width: "100%", minWidth: 900 }}
          >
            <defs>
              <marker
                id="fd-arr"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
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
                markerWidth="5"
                markerHeight="5"
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
                markerWidth="5"
                markerHeight="5"
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
                @keyframes fd-pulse { 0%,100%{opacity:1} 50%{opacity:.55} }
                .fd-fwd { stroke:#1a1a1a; stroke-width:2; stroke-dasharray:7 4; animation:fd-fwd .45s linear infinite; marker-end:url(#fd-arr); fill:none; }
                .fd-ret { stroke:#2d5be3; stroke-width:2; stroke-dasharray:5 4; animation:fd-ret .45s linear infinite; marker-end:url(#fd-arr-blue); fill:none; }
                .fd-dim { stroke:#ccc9c0; stroke-width:1; fill:none; marker-end:url(#fd-arr-dim); }
                .fd-node-pulse { animation: fd-pulse 1.4s ease-in-out infinite; }
              `}</style>
            </defs>

            {/* Row bands */}
            {[
              { y: 8, h: 82 },
              { y: 103, h: 82 },
              { y: 208, h: 82 },
              { y: 318, h: 82 },
              { y: 422, h: 72 },
            ].map(({ y, h }, i) => (
              <rect
                key={i}
                x={0}
                y={y}
                width={1180}
                height={h}
                fill={
                  i % 2 === 0 ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"
                }
              />
            ))}

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
                    className={isLit ? (e.ret ? "fd-ret" : "fd-fwd") : "fd-dim"}
                  />
                  {isLit && e.label && (
                    <>
                      <rect
                        x={mid.x - e.label.length * 3.2}
                        y={mid.y - 16}
                        width={e.label.length * 6.4}
                        height={13}
                        rx={2}
                        fill={e.ret ? "#ddeafb" : "#f0ece4"}
                        stroke={e.ret ? "#185fa5" : "#1a1a1a"}
                        strokeWidth={0.8}
                      />
                      <text
                        x={mid.x}
                        y={mid.y - 7}
                        textAnchor="middle"
                        fontSize="8.5"
                        fontFamily="DM Mono, monospace"
                        fill={e.ret ? "#185fa5" : "#1a1a1a"}
                        style={{ pointerEvents: "none" }}
                      >
                        {e.label}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n) => {
              const c = COLORS[n.type];
              const isLit = litNodes.has(n.id);
              const isClickable = STARTABLE.has(n.id) && !running;
              const isActive = isLit && running;
              const labelY = n.sub ? n.y + n.h * 0.36 : n.y + n.h / 2;

              return (
                <g
                  key={n.id}
                  onClick={() => isClickable && startFlow(n.id)}
                  style={{ cursor: isClickable ? "pointer" : "default" }}
                  className={isActive ? "fd-node-pulse" : ""}
                >
                  {/* Clickable glow ring */}
                  {isClickable && !running && (
                    <rect
                      x={n.x - 3}
                      y={n.y - 3}
                      width={n.w + 6}
                      height={n.h + 6}
                      rx={1}
                      fill="none"
                      stroke="#2d5be3"
                      strokeWidth={1.2}
                      strokeDasharray="5 3"
                      opacity={0.5}
                    />
                  )}

                  {/* Shadow offset */}
                  {isLit && (
                    <rect
                      x={n.x + 3}
                      y={n.y + 3}
                      width={n.w}
                      height={n.h}
                      rx={0}
                      fill="rgba(26,26,26,0.18)"
                    />
                  )}

                  {/* Main box */}
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={0}
                    fill={isLit ? c.fill : "#f0ece4"}
                    stroke={isLit ? c.stroke : "#c5c3bb"}
                    strokeWidth={isLit ? 2 : 1.2}
                  />

                  {/* Left accent bar */}
                  {isLit && (
                    <rect x={n.x} y={n.y} width={4} height={n.h} fill={c.acc} />
                  )}

                  {/* Top accent bar */}
                  {isLit && (
                    <rect
                      x={n.x}
                      y={n.y}
                      width={n.w}
                      height={3}
                      fill={c.acc}
                      opacity={0.35}
                    />
                  )}

                  {/* Type badge (top-right corner) */}
                  {isLit && (
                    <>
                      <rect
                        x={n.x + n.w - 38}
                        y={n.y + 4}
                        width={34}
                        height={11}
                        rx={2}
                        fill={c.badge}
                        opacity={n.type === "gateway" ? 0.3 : 0.15}
                      />
                      <text
                        x={n.x + n.w - 21}
                        y={n.y + 11}
                        textAnchor="middle"
                        fontSize="7"
                        fontFamily="DM Mono, monospace"
                        fontWeight="700"
                        fill={n.type === "gateway" ? "#fff" : c.acc}
                        style={{ pointerEvents: "none" }}
                      >
                        {TYPE_LABEL[n.type]}
                      </text>
                    </>
                  )}

                  {/* Label */}
                  <text
                    x={n.x + n.w / 2 + (isLit ? 2 : 0)}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fill={isLit ? c.text : "#b0ada5"}
                    style={{ pointerEvents: "none" }}
                  >
                    {n.label}
                  </text>

                  {/* Sub-label */}
                  {n.sub && (
                    <text
                      x={n.x + n.w / 2 + (isLit ? 2 : 0)}
                      y={n.y + n.h * 0.7}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize="8.5"
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

        {/* Info Panel */}
        <div
          className="sr-hidden sr-d4 mt-0"
          style={{
            background: "var(--bg-card)",
            border: "var(--border)",
            borderTop: "none",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Progress bar */}
          {totalSteps > 0 && (
            <div style={{ height: 3, background: "var(--bg-2)" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: done ? "#16a34a" : "#2d5be3",
                  transition: "width .4s ease, background .3s ease",
                }}
              />
            </div>
          )}

          <div style={{ padding: "16px 20px" }}>
            {!activeInfo ? (
              <div
                style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    background: "#2d5be3",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                  }}
                >
                  ⊹
                </div>
                <div>
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
                    Try <strong>Full Request</strong> for the complete
                    lifecycle, <strong>Auth Flow</strong> for the
                    register-and-welcome-email cascade,{" "}
                    <strong>Realtime</strong> for Socket.IO pub/sub,{" "}
                    <strong>AI Chain</strong> for LangGraph, or{" "}
                    <strong>Deploy</strong> for the GitHub Actions → PM2
                    pipeline.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  {/* Type indicator */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      background: COLORS[activeInfo.type].fill,
                      border: `2px solid ${COLORS[activeInfo.type].stroke}`,
                      boxShadow: "var(--shadow-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: COLORS[activeInfo.type].acc,
                        display: "block",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 2,
                      }}
                    >
                      <p
                        className="font-mono-custom text-xs"
                        style={{
                          color: "#2d5be3",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {activeInfo.step}
                      </p>
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "1px 7px",
                          background: COLORS[activeInfo.type].fill,
                          border: `1.5px solid ${COLORS[activeInfo.type].stroke}`,
                          color: COLORS[activeInfo.type].text,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {TYPE_LABEL[activeInfo.type]}
                      </span>
                    </div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {activeInfo.title}
                    </p>
                  </div>
                </div>

                <p
                  className="text-xs mb-3"
                  style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
                >
                  {activeInfo.body}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {activeInfo.tags.map((t: string) => (
                    <span
                      key={t}
                      className="font-mono-custom"
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        padding: "2px 9px",
                        border: "var(--border)",
                        boxShadow: "2px 2px 0 rgba(26,26,26,.18)",
                        background: "var(--bg-white)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Step dots */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9,
                      color: "var(--text-muted)",
                      marginRight: 6,
                    }}
                  >
                    {stepIdx}/{totalSteps}
                  </span>
                  {Array.from({ length: totalSteps }).map((_, i: number) => (
                    <div
                      key={i}
                      style={{
                        width: i === stepIdx - 1 ? 18 : 8,
                        height: 8,
                        border: "1.5px solid #1a1a1a",
                        background:
                          i < stepIdx - 1
                            ? "#2d5be3"
                            : i === stepIdx - 1
                              ? "#e85d3a"
                              : "#d3d1c7",
                        transition: "all .25s ease",
                        borderRadius: 0,
                      }}
                    />
                  ))}
                  {done && (
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        color: "#16a34a",
                        marginLeft: 8,
                        fontWeight: 700,
                      }}
                    >
                      ✓ complete
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div
          className="flex flex-wrap gap-2 mt-4 items-center"
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: 10,
            color: "var(--text-muted)",
          }}
        >
          {[
            { label: "Client", type: "client" as NodeType },
            { label: "Gateway", type: "gateway" as NodeType },
            { label: "Service", type: "service" as NodeType },
            { label: "Infra", type: "infra" as NodeType },
            { label: "DB", type: "db" as NodeType },
            { label: "External", type: "external" as NodeType },
          ].map(({ label, type }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 9px",
                background: COLORS[type].fill,
                border: `1.5px solid ${COLORS[type].stroke}`,
                color: COLORS[type].text,
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: COLORS[type].acc,
                }}
              />
              {label}
            </div>
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginLeft: "auto",
            }}
          >
            <svg width="22" height="8">
              <line
                x1="0"
                y1="4"
                x2="22"
                y2="4"
                stroke="#1a1a1a"
                strokeWidth="1.8"
                strokeDasharray="5 3"
              />
            </svg>
            <span>request</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="22" height="8">
              <line
                x1="0"
                y1="4"
                x2="22"
                y2="4"
                stroke="#2d5be3"
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />
            </svg>
            <span>response</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GymProjectFlow;
