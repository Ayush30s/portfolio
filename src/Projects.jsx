const skillTextColors = {
  React: "text-cyan-400",
  "React.js": "text-cyan-400",
  "Next.js": "text-gray-200",
  NestJS: "text-red-500",
  "Node.js": "text-green-500",
  TypeScript: "text-blue-500",
  JavaScript: "text-yellow-300",
  Express: "text-gray-400",
  "Express.js": "text-gray-400",
  PostgreSQL: "text-blue-600",
  MongoDB: "text-green-500",
  Redis: "text-red-600",
  AWS: "text-orange-400",
  "AWS S3": "text-orange-400",
  CloudFront: "text-orange-300",
  "AWS RDS": "text-orange-400",
  "AWS EC2": "text-orange-400",
  "Tailwind CSS": "text-teal-400",
  "REST API": "text-gray-400",
  "REST APIs": "text-gray-400",
  "API Gateway": "text-purple-400",
  Microservices: "text-pink-400",
  Prisma: "text-indigo-500",
  "Prisma ORM": "text-indigo-500",
  Git: "text-orange-500",
  GitHub: "text-gray-300",
  "GitHub Actions": "text-gray-300",
  JWT: "text-purple-500",
  "Passport.js": "text-purple-400",
  RBAC: "text-red-400",
  "Socket.IO": "text-gray-300",
  WebSockets: "text-cyan-300",
  "Redux Toolkit": "text-purple-400",
  "Redux Thunk": "text-purple-400",
  "Redux Persist": "text-purple-400",
  "TanStack Query": "text-red-400",
  PM2: "text-green-400",
  Swagger: "text-green-500",
  "Swagger/OpenAPI": "text-green-500",
  Helmet: "text-yellow-500",
  Throttler: "text-yellow-400",
  Opossum: "text-red-400",
  HLS: "text-blue-300",
  M3U8: "text-blue-300",
};

import { useScrollReveal } from "./useScrollReveal";
import harrisPng from "../image/harris.png";
import gymPng from "../image/gym1.png";

const PROJECTS = [
  {
    title: "Artify Group OTT Platform",
    subtitle: "Production OTT Streaming Platform",
    desc: "Architected and developed a production OTT platform for creators to publish web series, movies, and documentaries with multi-tier subscriptions, role-based access control, secure content delivery, video analytics, and adaptive streaming.",
    image: null,
    tags: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Redis",
      "React.js",
      "Next.js",
      "AWS S3",
      "CloudFront",
      "AWS RDS",
      "AWS EC2",
      "HLS",
      "M3U8",
    ],
    role: "Software Developer",
    outcomes: [
      "Built scalable NestJS backend services",
      "Implemented HLS/M3U8 video streaming",
      "Integrated Redis caching and Pub/Sub",
    ],
    gradient: "from-[#4f8ef7] to-[#7c6af5]",
  },
  {
    title: "Harrison International",
    subtitle: "Supply Chain & Distribution System",
    desc: "Built responsive React.js component flows and real-time dashboards for enterprise product lifecycle tracking from manufacturing through distribution to end-consumer delivery.",
    image: harrisPng,
    tags: ["React.js", "Redux Toolkit", "Tailwind CSS", "JavaScript"],
    role: "Frontend Developer",
    outcomes: [
      "Built responsive component library",
      "Created enterprise tracking dashboards",
      "Improved product lifecycle visibility",
    ],
    gradient: "from-[#7c6af5] to-[#4f8ef7]",
  },
  {
    title: "ZuHaus.org",
    subtitle: "German Property Rental Platform",
    desc: "Developed modular React.js components, reusable UI flows, error boundaries, optimized API integrations, pagination, filtering, search workflows, and role-based access for a PostgreSQL-backed NestJS property listing system.",
    image: null,
    tags: [
      "React.js",
      "Redux Thunk",
      "Redux Persist",
      "NestJS",
      "PostgreSQL",
      "REST API",
      "RBAC",
    ],
    role: "React.js Intern",
    outcomes: [
      "Reduced redundant API calls",
      "Implemented filtering and pagination",
      "Built role-based listing workflows",
    ],
    gradient: "from-[#4f8ef7] to-[#2dd4bf]",
  },
  {
    title: "Gym Management Platform",
    subtitle: "Backend Microservices Platform",
    desc: "Designed a production-grade NestJS monorepo with 6 independently deployable microservices, centralized API Gateway routing, TCP/Redis messaging, real-time broadcasting, authentication, rate limiting, security headers, API documentation, and CI/CD workflows.",
    image: gymPng,
    tags: [
      "NestJS",
      "TypeScript",
      "Microservices",
      "API Gateway",
      "Redis",
      "Socket.IO",
      "WebSockets",
      "Prisma ORM",
      "PostgreSQL",
      "AWS S3",
      "JWT",
      "Passport.js",
      "Opossum",
      "Throttler",
      "Helmet",
      "Swagger/OpenAPI",
      "PM2",
      "GitHub Actions",
    ],
    role: "Backend Developer",
    outcomes: [
      "Built 6 deployable microservices",
      "Implemented scalable real-time events",
      "Configured CI/CD and backend deployment",
    ],
    gradient: "from-[#f59e0b] to-[#ef4444]",
  },
];

const Projects = () => {
  useScrollReveal();

  return (
    <section
      id="projects"
      className="py-28 relative"
      style={{ background: "var(--navy)" }}
    >
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "var(--accent)",
          opacity: "var(--orb-section-opacity)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-4 section-line" />

        <div className="sr-hidden sr-d2 mb-16">
          <span
            className="font-mono-custom text-xs tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            My Work
          </span>

          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mt-3"
            style={{ color: "var(--text-primary)" }}
          >
            Shipped <br />
            <span className="grad-text">Delivered & Wokring</span>
          </h2>

          <p
            className="text-lg max-w-xl mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            Production web applications, scalable backend systems, real-time
            features, and cloud-ready platforms built with technologies from my
            professional experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`sr-hidden sr-d${
                (i % 2) + 1
              } glass-card rounded-2xl overflow-hidden group`}
            >
              <div
                className={`relative h-16 overflow-hidden bg-gradient-to-r ${p.gradient}`}
              >
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{
                    background: "var(--pill-bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="font-mono-custom text-xs"
                    style={{ color: "var(--accent)" }}
                  >
                    {p.role}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="font-bold text-2xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {p.title}
                </h3>

                <p
                  className="font-mono-custom text-xs tracking-wide mt-1 mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {p.subtitle}
                </p>

                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p.desc}
                </p>

                <div className="flex flex-col gap-1.5 mb-5">
                  {p.outcomes.map((o, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                      {o}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t, j) => (
                    <span
                      key={j}
                      className={`${
                        skillTextColors[t] || "text-gray-400"
                      } font-mono text-[0.65rem] tracking-[0.05em] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-[10px] py-[3px] rounded-full transition-all duration-200 inline-block`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
