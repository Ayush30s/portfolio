import { useScrollReveal } from "./useScrollReveal";

const EXPERIENCES = [
  {
    company: "Technobren Infotech Pvt. Ltd.",
    role: "Software Developer",
    period: "July 2025 – Present",
    location: "India",
    type: "Full-time",
    color: "#2d5be3",
    projects: [
      {
        name: "Artify Group (RTPL / RTMedia.org) — OTT Platform",
        tags: ["NestJS", "PostgreSQL", "Prisma ORM", "Redis", "React.js", "Next.js", "AWS", "HLS/M3U8"],
        bullets: [
          "Architected production OTT platform enabling creators to publish web series, movies & documentaries with multi-tier subscriptions and RBAC",
          "Built scalable NestJS backend with Prisma ORM and AWS RDS PostgreSQL — relational models, migrations, indexes, optimized queries",
          "Engineered video analytics: watch progress, completion rate, engagement tracking, and auto-playlist triggers on watch-progress thresholds",
          "Implemented HLS/M3U8 adaptive streaming via AWS S3 + CloudFront CDN for smooth playback across network conditions",
          "Integrated Redis caching, Redis Pub/Sub, and managed AWS infrastructure (S3, CloudFront, RDS, EC2, IAM)",
        ],
      },
      {
        name: "Harrison International — Supply Chain Dashboard",
        tags: ["React.js", "Redux Toolkit", "Tailwind CSS"],
        bullets: [
          "Built responsive React.js component library and real-time dashboards for enterprise product lifecycle tracking",
          "Tracked product flow from manufacturing through distribution to end-consumer delivery",
        ],
      },
    ],
  },
  {
    company: "Tetra Information Services Pvt. Ltd.",
    role: "React.js Intern",
    period: "Nov 2024 – May 2025",
    location: "Remote",
    type: "Internship",
    color: "#e85d3a",
    projects: [
      {
        name: "ZuHaus.org — German Property Rental Platform",
        tags: ["React.js", "Redux Thunk", "Redux Persist", "NestJS", "PostgreSQL"],
        bullets: [
          "Developed modular React.js components, reusable UI flows, and error boundaries reducing redundant network calls",
          "Implemented pagination, filtering, search workflows, and role-based access for a PostgreSQL-backed NestJS property system",
          "Collaborated with cross-functional teams across Germany, delivering production-ready features",
        ],
      },
    ],
  },
];

const Experience = () => {
  useScrollReveal();
  return (
    <section id="experience" className="py-24 relative" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label">Work Experience</span>
        </div>
        <div className="sr-hidden sr-d2 mb-12">
          <div className="accent-stripe" />
          <h2 className="font-display text-4xl sm:text-5xl" style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            Where I've<br />
            <span className="grad-text font-display italic">Contributed</span>
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {EXPERIENCES.map((exp, ei) => (
            <div key={ei} className={`sr-hidden sr-d${ei + 1}`}>
              {/* Company header */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 mb-0"
                style={{ background: exp.color, border: "var(--border)", boxShadow: "var(--shadow-md)", borderBottom: "none" }}
              >
                <div>
                  <h3 className="font-bold text-xl text-white">{exp.company}</h3>
                  <p className="font-mono-custom text-xs mt-1 text-white opacity-80">{exp.role}</p>
                </div>
                <div className="flex flex-col sm:items-end gap-1 mt-2 sm:mt-0">
                  <span className="font-mono-custom text-xs text-white opacity-80">{exp.period}</span>
                  <span
                    className="font-mono-custom text-xs px-2 py-0.5 inline-block"
                    style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)" }}
                  >
                    {exp.type} · {exp.location}
                  </span>
                </div>
              </div>

              {/* Projects under this exp */}
              <div style={{ border: "var(--border)", borderTop: "none", boxShadow: "var(--shadow-md)" }}>
                {exp.projects.map((proj, pi) => (
                  <div
                    key={pi}
                    className="p-6"
                    style={{ borderBottom: pi < exp.projects.length - 1 ? "var(--border)" : "none", background: "var(--bg-card)" }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h4 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{proj.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tags.map((t, ti) => (
                        <span key={ti} className="tag">{t}</span>
                      ))}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {proj.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                          <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
