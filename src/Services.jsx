import { useScrollReveal } from "./useScrollReveal";
import {
  Code2,
  Rocket,
  Server,
  LayoutDashboard,
  Database,
  Settings2,
} from "lucide-react";

const skillTextColors = {
  React: "text-cyan-500",
  "Next.js": "text-gray-500",
  TypeScript: "text-blue-500",
  NestJS: "text-red-500",
  PostgreSQL: "text-blue-500",
  AWS: "text-orange-500",
  Laravel: "text-red-500",
  Django: "text-green-500",
  "Node.js": "text-green-500",
  "Tailwind CSS": "text-teal-500",
  "Framer Motion": "text-pink-500",
  MySQL: "text-sky-500",
  Prisma: "text-indigo-500",
  Docker: "text-blue-500",
  "CI/CD": "text-gray-500",
};

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Web Development",
    desc: "End-to-end web applications built for performance, scalability, and maintainability. From landing pages to complex platforms.",
    tags: ["React", "Next.js", "TypeScript"],
    color: "#4f8ef7",
  },
  {
    icon: Rocket,
    title: "SaaS Product Development",
    desc: "Full-lifecycle SaaS building — architecture, auth, billing, dashboards, and everything in between. Ship your MVP fast.",
    tags: ["NestJS", "PostgreSQL", "AWS"],
    color: "#7c6af5",
  },
  {
    icon: Server,
    title: "API & Backend Engineering",
    desc: "Robust, secure, and well-documented REST APIs. We build backends that are a pleasure to work with and scale reliably.",
    tags: ["Laravel", "Django", "Node.js"],
    color: "#4f8ef7",
  },
  {
    icon: LayoutDashboard,
    title: "UI/UX-Focused Frontend",
    desc: "Interfaces that are not just functional but delightful. Pixel-perfect, responsive, and optimized for conversion.",
    tags: ["Tailwind CSS", "Framer Motion", "React"],
    color: "#7c6af5",
  },
  {
    icon: Database,
    title: "Database Design & Optimization",
    desc: "Schema design, query optimization, migrations, and indexing strategies for MySQL, PostgreSQL, MongoDB, and SQLite.",
    tags: ["PostgreSQL", "MySQL", "Prisma"],
    color: "#4f8ef7",
  },
  {
    icon: Settings2,
    title: "Maintenance & Scaling",
    desc: "Ongoing support, performance audits, refactoring, and infrastructure scaling for applications that need to grow.",
    tags: ["AWS", "Docker", "CI/CD"],
    color: "#7c6af5",
  },
];

const Services = () => {
  useScrollReveal();
  return (
    <section
      id="services"
      className="py-28 relative"
      style={{ background: "var(--navy-2)" }}
    >
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "var(--accent-2)",
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
            What We Do
          </span>
          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mt-3"
            style={{ color: "var(--text-primary)" }}
          >
            Services We
            <br />
            <span className="grad-text">Deliver</span>
          </h2>
          <p
            className="text-lg max-w-xl mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            From concept to production — we cover every layer of the modern
            software stack.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;

            return (
              <div
                key={i}
                className={`sr-hidden sr-d${(i % 3) + 1} glass-card rounded-2xl p-7 group cursor-default relative overflow-hidden`}
              >
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl"
                  style={{ background: s.color }}
                />

                <div
                  className="mb-5 w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}25`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: s.color }} />
                </div>

                <h3
                  className="font-bold text-xl mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {s.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {s.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t, j) => (
                    <span
                      key={j}
                      className={`${
                        skillTextColors[t] || "text-gray-500"
                      } font-mono text-[0.85rem] tracking-[0.05em] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-[10px] py-[3px] rounded-full transition-all duration-500 inline-block`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Services;
