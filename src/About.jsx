import { useScrollReveal } from "./useScrollReveal";
import { Target, Zap, Handshake, Telescope } from "lucide-react";

const skills = [
  "React.js",
  "Next.js",
  "NestJS",
  "Node.js",
  "TypeScript",
  "Laravel",
  "Django",
  "PHP",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Tailwind CSS",
  "REST APIs",
  "Prisma",
  "Docker",
  "Git",
  "Postman",
  "JWT",
  "Socket.io",
  "Python",
  "JavaScript",
  "Bootstrap",
  "React.js",
  "Next.js",
  "NestJS",
  "Node.js",
  "TypeScript",
  "Laravel",
  "Django",
  "PHP",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Tailwind CSS",
  "REST APIs",
  "Prisma",
  "Docker",
  "Git",
  "Postman",
  "JWT",
  "Socket.io",
  "Python",
  "JavaScript",
  "Bootstrap",
  "Claud AI",
  "Codex",
  "Gemini",
  "Prompt Engineering",
];

const skillColors = {
  "React.js": " text-cyan-500",
  "Next.js": " text-gray-500",
  NestJS: " text-red-500",
  "Node.js": " text-green-500",
  TypeScript: " text-blue-500",
  PostgreSQL: " text-blue-500",
  MongoDB: " text-green-500",
  Redis: "text-red-500",
  AWS: " text-orange-500",
  "Tailwind CSS": " text-teal-500",
  "REST APIs": " text-gray-500",
  Prisma: "text-indigo-500",
  Docker: " text-blue-500",
  Git: " text-orange-500",
  Postman: " text-orange-500",
  JWT: " text-purple-500",
  "Socket.io": " text-gray-500",
  JavaScript: " text-yellow-500",
  "Claud AI": "text-pink-500",
  Codex: "text-gray-500",
  Gemini: "text-blue-500",
  "Prompt Engineering": "text-emerald-500",
};

const SkillTicker = () => {
  return (
    <div className="overflow-hidden w-full py-4">
      <div className="ticker-track flex gap-6 w-max animate-scroll">
        {skills.map((t, i) => (
          <span
            key={i}
            className={`${skillColors[t]} font-mono text-[0.85rem] tracking-[0.05em] bg-[var(--tag-bg)] border border-[var(--tag-border)] px-[10px] py-[3px] rounded-full transition-all duration-200 inline-block`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  useScrollReveal();

  const values = [
    {
      icon: Target, // 🎯 precision / quality
      title: "Quality-First",
      desc: "I don't ship code — I ship products. Every line is written with scalability and maintainability in mind.",
    },
    {
      icon: Zap, // ⚡ speed
      title: "Speed Without Shortcuts",
      desc: "Rapid delivery doesn't mean cutting corners. I move fast while keeping architecture clean and robust.",
    },
    {
      icon: Handshake,
      title: "Real Partnership",
      desc: "I treat every client's problem as our own. You get founders-level commitment, not contractor-level effort.",
    },
    {
      icon: Telescope, // 🔭 vision / future
      title: "Long-term Thinking",
      desc: "I build for the future — clean APIs, documented code, and systems that can grow with your business.",
    },
  ];

  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none"
        style={{ background: "var(--accent)", opacity: "var(--orb1-opacity)" }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-4 section-line" />
        <div className="sr-hidden sr-d2 mb-16">
          <span
            className="font-mono-custom text-xs tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Who I am
          </span>
          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mt-3"
            style={{ color: "var(--text-primary)" }}
          >
            Trust & <span className="grad-text">Code</span>
          </h2>
          <p
            className="text-lg max-w-2xl mt-4 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            I am Ayush — obsessed with building great software. I cover the full
            stack: from pixel-perfect frontends and robust APIs to scalable
            databases and cloud deployments.
          </p>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon; // 👈 important

            return (
              <div
                key={i}
                className={`sr-hidden sr-d${i + 1} glass-card rounded-2xl p-6 group`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[var(--tag-bg)] border border-[var(--border)]">
                  <Icon className="w-5 h-5 text-[var(--accent)] transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3
                  className=" font-bold text-lg mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {v.title}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tech ticker */}
        <div className="mt-20 sr-hidden">
          <div
            className="font-mono-custom text-xs tracking-widest uppercase mb-6 text-center"
            style={{ color: "var(--accent)" }}
          >
            My Tech Arsenal
          </div>
          <div className="relative overflow-hidden py-4">
            <div
              className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(to right, var(--fade-edge), transparent)`,
              }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{
                background: `linear-gradient(to left, var(--fade-edge), transparent)`,
              }}
            />
            <div className="ticker-track flex gap-6 w-max">
              <SkillTicker />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
