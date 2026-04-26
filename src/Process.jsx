import { useScrollReveal } from "./useScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Discovery Call",
    desc: "We start by deeply understanding your business, goals, and technical requirements. No assumptions — just thorough listening.",
    duration: "1–2 days",
  },
  {
    num: "02",
    title: "Scope & Architecture",
    desc: "We design the technical blueprint: stack choices, data models, API structure, and a clear project roadmap with milestones.",
    duration: "3–5 days",
  },
  {
    num: "03",
    title: "Build & Iterate",
    desc: "Development begins with weekly demos. You see progress constantly and can give feedback at every step.",
    duration: "Ongoing sprints",
  },
  {
    num: "04",
    title: "QA & Review",
    desc: "Rigorous testing — functional, security, and performance. We don't ship until we're confident it's solid.",
    duration: "3–5 days",
  },
  {
    num: "05",
    title: "Deploy & Handover",
    desc: "Clean deployment to your infrastructure. Full documentation, code walkthrough, and knowledge transfer included.",
    duration: "1–2 days",
  },
  {
    num: "06",
    title: "Support & Scale",
    desc: "Post-launch monitoring, bug fixes, and feature development as your product grows. We're partners, not just contractors.",
    duration: "Ongoing",
  },
];

const Process = () => {
  useScrollReveal();
  return (
    <section
      id="process"
      className="py-28 relative overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
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
            How We Work
          </span>
          <h2
            className="font-display font-extrabold text-4xl sm:text-5xl mt-3"
            style={{ color: "var(--text-primary)" }}
          >
            Our <span className="grad-text">Process</span>
          </h2>
          <p
            className="text-lg max-w-xl mt-4"
            style={{ color: "var(--text-secondary)" }}
          >
            A structured, transparent workflow that keeps you informed and in
            control at every stage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`sr-hidden sr-d${(i % 3) + 1} glass-card rounded-2xl p-7 relative overflow-hidden group`}
            >
              <div
                className="absolute -top-4 -right-2 font-display font-extrabold text-8xl select-none pointer-events-none transition-colors duration-500"
                style={{ color: "var(--accent)", opacity: 0.05 }}
              >
                {s.num}
              </div>
              <div
                className="font-mono-custom text-xs tracking-widest mb-3 relative z-10"
                style={{ color: "var(--accent)" }}
              >
                {s.num}
              </div>
              <h3
                className="font-bold text-xl mb-3 relative z-10"
                style={{ color: "var(--text-primary)" }}
              >
                {s.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5 relative z-10"
                style={{ color: "var(--text-secondary)" }}
              >
                {s.desc}
              </p>
              <div className="flex items-center gap-2 relative z-10">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <span
                  className="font-mono-custom text-xs tracking-wide"
                  style={{ color: "var(--accent)" }}
                >
                  {s.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Process;
