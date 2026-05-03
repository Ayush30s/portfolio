import { useScrollReveal } from "./useScrollReveal";

const SKILLS = [
  { name: "TypeScript", color: "#2d5be3" },
  { name: "NestJS", color: "#e85d3a" },
  { name: "React.js", color: "#06b6d4" },
  { name: "Next.js", color: "#0f0f0f" },
  { name: "Node.js", color: "#16a34a" },
  { name: "PostgreSQL", color: "#2d5be3" },
  { name: "Redis", color: "#e85d3a" },
  { name: "AWS S3/CDN", color: "#f59e0b" },
  { name: "Prisma ORM", color: "#7c3aed" },
  { name: "Socket.IO", color: "#4a4a4a" },
  { name: "Docker", color: "#2d5be3" },
  { name: "JWT/Auth", color: "#7c3aed" },
  { name: "HLS Streaming", color: "#06b6d4" },
  { name: "Microservices", color: "#e85d3a" },
  { name: "REST APIs", color: "#16a34a" },
  { name: "GitHub Actions", color: "#0f0f0f" },
  { name: "Tailwind CSS", color: "#06b6d4" },
  { name: "MongoDB", color: "#16a34a" },
];

const TICKER_SKILLS = [...SKILLS, ...SKILLS];

const TRAITS = [
  {
    icon: "⚡",
    title: "Production-Ready Code",
    desc: "Every project I touch goes to production. Clean architecture, proper error handling, optimized queries.",
  },
  {
    icon: "🔧",
    title: "Full-Stack Coverage",
    desc: "From pixel-perfect React frontends to NestJS microservices and AWS deployments — I own the entire stack.",
  },
  {
    icon: "📐",
    title: "System Design First",
    desc: "I think in schemas, API contracts, and data flows before writing a single line of code.",
  },
  {
    icon: "🚀",
    title: "Fast Learner",
    desc: "500+ DSA problems. Constant upskilling. I pick up new technologies fast and apply them correctly.",
  },
];

const About = () => {
  useScrollReveal();
  return (
    <section
      id="about"
      className="py-24 relative"
      style={{ background: "var(--bg-2)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label">About Me</span>
        </div>
        <div className="sr-hidden sr-d2 mb-12">
          <div className="accent-stripe" />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            The developer behind
            <br />
            <span className="grad-text font-display italic">the work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Bio card */}
          <div className="sr-left card p-8">
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-16 h-16 flex-shrink-0 flex items-center justify-center font-display font-bold text-2xl text-white"
                style={{
                  background: "var(--accent)",
                  border: "var(--border)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                AS
              </div>
              <div>
                <h3
                  className="font-bold text-xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  Ayush Srivastav
                </h3>
                <p
                  className="font-mono-custom text-xs mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Full-Stack Software Developer
                </p>
                <p
                  className="font-mono-custom text-xs mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Jaunpur, Uttar Pradesh, India
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              Full-Stack Developer with 1+ year of hands-on experience building
              production web applications, REST APIs, and real-time systems.
              Currently working at{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                Technobren Infotech Pvt. Ltd.
              </strong>{" "}
              on an OTT streaming platform.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              I've contributed to a German property rental platform, enterprise
              supply chain dashboards, and am actively building a gym management
              microservices platform. BCA graduate from Veer Bahadur Singh
              Purvanchal University with a CGPA of 8.0/10.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://github.com/Ayush30s"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-4 py-2 text-xs"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-4 py-2 text-xs"
              >
                LinkedIn ↗
              </a>
              <a
                href="mailto:ayushsri302003@gmail.com"
                className="btn-primary px-4 py-2 text-xs"
              >
                Email Me
              </a>
            </div>
          </div>

          {/* Trait cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRAITS.map((t, i) => (
              <div key={i} className={`sr-hidden sr-d${i + 2} card-white p-5`}>
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl mb-3"
                  style={{
                    background: "var(--bg-2)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {t.icon}
                </div>
                <h4
                  className="font-bold text-sm mb-1.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t.title}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills ticker */}
        <div className="sr-hidden sr-d2">
          <p
            className="font-mono-custom text-xs tracking-widest uppercase mb-4 font-bold text-center"
            style={{ color: "var(--text-muted)" }}
          >
            Tech Stack
          </p>
          <div
            className="relative overflow-hidden py-4"
            style={{
              borderTop: "var(--border)",
              borderBottom: "var(--border)",
              background: "var(--bg-white)",
            }}
          >
            <div className="ticker-track flex gap-4 w-max">
              {TICKER_SKILLS.map((s, i) => (
                <span key={i} className="tag flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: s.color }}
                  />{" "}
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
