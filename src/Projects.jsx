import { useScrollReveal } from "./useScrollReveal";
import harrisPng from "../image/harris.png";
import gymPng from "../image/gym1.png";

const TAG_COLORS = {
  "NestJS": "#e85d3a", "TypeScript": "#2d5be3", "PostgreSQL": "#2d5be3",
  "Prisma ORM": "#7c3aed", "Redis": "#e85d3a", "React.js": "#06b6d4",
  "Next.js": "#0f0f0f", "AWS S3": "#f59e0b", "CloudFront": "#f59e0b",
  "AWS RDS": "#f59e0b", "AWS EC2": "#f59e0b", "HLS": "#06b6d4",
  "M3U8": "#06b6d4", "Redux Toolkit": "#7c3aed", "Tailwind CSS": "#06b6d4",
  "JavaScript": "#f59e0b", "Redux Thunk": "#7c3aed", "Redux Persist": "#7c3aed",
  "REST API": "#16a34a", "RBAC": "#e85d3a", "Microservices": "#7c3aed",
  "API Gateway": "#7c3aed", "Socket.IO": "#0f0f0f", "WebSockets": "#06b6d4",
  "JWT": "#7c3aed", "Passport.js": "#7c3aed", "PM2": "#16a34a",
  "Swagger/OpenAPI": "#16a34a", "GitHub Actions": "#0f0f0f", "Opossum": "#e85d3a",
};

const PROJECTS = [
  {
    title: "Artify Group OTT Platform",
    subtitle: "Production OTT Streaming Platform",
    type: "Professional",
    typeColor: "#2d5be3",
    desc: "Architected and developed a production OTT platform for Artify Group enabling creators to publish web series, movies, and documentaries. Features multi-tier subscriptions, RBAC, secure content delivery, video analytics with auto-playlist triggers, and adaptive HLS streaming.",
    image: null,
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Prisma ORM", "Redis", "React.js", "Next.js", "AWS S3", "CloudFront", "HLS", "M3U8"],
    highlights: [
      "HLS/M3U8 adaptive streaming with AWS CloudFront CDN",
      "Video analytics: completion rate, engagement, watch-progress triggers",
      "Redis Pub/Sub + caching for real-time features",
    ],
    gradient: "#2d5be3",
    link: null,
  },
  {
    title: "Gym Management Platform",
    subtitle: "NestJS Microservices Architecture",
    type: "Personal Project · Ongoing",
    typeColor: "#e85d3a",
    desc: "Production-grade NestJS monorepo with 6 independently deployable microservices: API Gateway, Auth Service, User Service, Gym Service, Product Service, and Realtime Service. Features TCP/Redis transport, circuit breaker, JWT auth, and CI/CD pipeline.",
    image: null,
    tags: ["NestJS", "TypeScript", "Microservices", "API Gateway", "Redis", "Socket.IO", "WebSockets", "Prisma ORM", "PostgreSQL", "JWT", "Passport.js", "Opossum", "Swagger/OpenAPI", "PM2", "GitHub Actions"],
    highlights: [
      "6 independently deployable microservices in a monorepo",
      "Opossum circuit breaker + Throttler rate limiting",
      "Horizontal socket scaling with @socket.io/redis-adapter",
    ],
    gradient: "#e85d3a",
    link: "https://github.com/Ayush30s/nest-microservices",
  },
  {
    title: "Harrison International",
    subtitle: "Supply Chain & Distribution System",
    type: "Professional · Current",
    typeColor: "#16a34a",
    desc: "Built responsive React.js component library and real-time dashboards for enterprise product lifecycle tracking — from manufacturing through distribution to end-consumer delivery — for an international supply chain client.",
    image: null,
    tags: ["React.js", "Redux Toolkit", "Tailwind CSS", "JavaScript"],
    highlights: [
      "Real-time enterprise tracking dashboards",
      "Full product lifecycle visibility components",
      "Responsive, production-grade component library",
    ],
    gradient: "#16a34a",
    link: null,
  },
  {
    title: "ZuHaus.org",
    subtitle: "German Property Rental Platform",
    type: "Internship Project",
    typeColor: "#7c3aed",
    desc: "Developed modular React.js components, reusable UI flows, error boundaries, and optimized API integrations for a German property rental platform. Built role-based listing workflows for agents and end users on a PostgreSQL-backed NestJS system.",
    image: null,
    tags: ["React.js", "Redux Thunk", "Redux Persist", "REST API", "RBAC"],
    highlights: [
      "Reduced redundant API calls via optimized integration",
      "Pagination, filtering, search for property listings",
      "Role-based access for agents vs end users",
    ],
    gradient: "#7c3aed",
    link: null,
  },
];

const Projects = () => {
  useScrollReveal();
  return (
    <section id="projects" className="py-24 relative" style={{ background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label">Projects</span>
        </div>
        <div className="sr-hidden sr-d2 mb-12">
          <div className="accent-stripe" />
          <h2 className="font-display text-4xl sm:text-5xl" style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Shipped &<br />
            <span className="grad-text font-display italic">Deployed</span>
          </h2>
          <p className="text-base mt-4 max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Production applications, scalable systems, and real-world platforms built from experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`sr-hidden sr-d${(i % 2) + 1} card overflow-hidden flex flex-col`}
            >
              {/* Color bar header */}
              <div
                className="h-2 flex-shrink-0"
                style={{ background: p.gradient }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Title row */}
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-bold text-xl" style={{ color: "var(--text-primary)" }}>{p.title}</h3>
                  <span
                    className="font-mono-custom text-xs px-2 py-1 flex-shrink-0 mt-0.5"
                    style={{ background: p.typeColor, color: "#fff", border: "var(--border)", boxShadow: "2px 2px 0px #1a1a1a" }}
                  >
                    {p.type}
                  </span>
                </div>
                <p className="font-mono-custom text-xs mb-4" style={{ color: "var(--text-muted)" }}>{p.subtitle}</p>

                {/* Image if exists */}
                {p.image && (
                  <div className="mb-4 overflow-hidden" style={{ border: "var(--border)", boxShadow: "var(--shadow-sm)" }}>
                    <img src={p.image} alt={p.title} className="w-full h-32 object-cover" />
                  </div>
                )}

                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-secondary)" }}>
                  {p.desc}
                </p>

                {/* Highlights */}
                <div className="mb-4">
                  {p.highlights.map((h, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>
                      <span className="flex-shrink-0 font-bold" style={{ color: p.gradient }}>→</span>
                      {h}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t, j) => (
                    <span
                      key={j}
                      className="font-mono-custom text-xs px-2.5 py-1"
                      style={{
                        background: "var(--bg-white)",
                        border: "var(--border)",
                        boxShadow: "2px 2px 0px rgba(26,26,26,0.3)",
                        color: TAG_COLORS[t] || "var(--text-secondary)",
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline px-4 py-2 text-xs self-start"
                  >
                    View on GitHub ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
