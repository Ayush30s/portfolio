import { useEffect, useRef } from "react";

const WORDS = ["Frontend", "Backends", "Full-Stack"];

const FEEDBACK = [
  {
    initials: "SR",
    name: "Sarah R.",
    role: "Product Manager",
    text: "Delivered our dashboard ahead of schedule. Clean code, zero issues on launch.",
  },
  {
    initials: "MK",
    name: "Marcus K.",
    role: "Startup Founder",
    text: "Turned our rough idea into a polished product. Communication was top-notch.",
  },
  {
    initials: "PP",
    name: "Priya P.",
    role: "E-commerce Owner",
    text: "Our store's performance jumped 3x after the rebuild. Highly recommend.",
  },
  {
    initials: "TL",
    name: "Tom L.",
    role: "Agency Lead",
    text: "We've now worked together on 4 projects. Consistent quality every time.",
  },
  {
    initials: "AN",
    name: "Aisha N.",
    role: "SaaS Co-founder",
    text: "Complex integrations handled effortlessly. The team really knows their stack.",
  },
];

const CARD_CONFIG = [
  {
    top: "0%",
    left: "5%",
    dur: "5s",
    delay: "0s",
    tilt: "-1.5deg",
    drift: "-12px",
  },
  {
    top: "2%",
    left: "52%",
    dur: "6.5s",
    delay: "-2s",
    tilt: "1.2deg",
    drift: "-16px",
  },
  {
    top: "36%",
    left: "0%",
    dur: "5.5s",
    delay: "-1.5s",
    tilt: "-0.8deg",
    drift: "-10px",
  },
  {
    top: "38%",
    left: "50%",
    dur: "7s",
    delay: "-3s",
    tilt: "1.5deg",
    drift: "-14px",
  },
  {
    top: "70%",
    left: "22%",
    dur: "6s",
    delay: "-1s",
    tilt: "-1deg",
    drift: "-12px",
  },
];

const Hero = () => {
  const wordRef = useRef(null);
  const idx = useRef(0);

  useEffect(() => {
    let timeoutId;
    const cycle = () => {
      if (!wordRef.current) return;
      wordRef.current.style.opacity = "0";
      wordRef.current.style.transform = "translateY(12px)";
      setTimeout(() => {
        idx.current = (idx.current + 1) % WORDS.length;
        if (wordRef.current) {
          wordRef.current.textContent = WORDS[idx.current];
          wordRef.current.style.opacity = "1";
          wordRef.current.style.transform = "translateY(0)";
        }
      }, 400);
      timeoutId = setTimeout(cycle, 2800);
    };
    timeoutId = setTimeout(cycle, 2800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--navy)" }}
    >
      {/* Animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-1 absolute top-[15%] left-[10%] w-80 h-80 rounded-full blur-[80px]"
          style={{
            background: "var(--accent)",
            opacity: "var(--orb1-opacity)",
          }}
        />
        <div
          className="orb-2 absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full blur-[90px]"
          style={{
            background: "var(--accent-2)",
            opacity: "var(--orb2-opacity)",
          }}
        />
        <div
          className="orb-3 absolute top-[50%] left-[50%] w-64 h-64 rounded-full blur-[70px]"
          style={{
            background: "var(--accent)",
            opacity: "var(--orb3-opacity)",
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* ── Left: Text ── */}
          <div className="flex-1 text-center lg:text-left px-4 sm:px-0">
            <div
              className="reveal-up delay-100 inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
              style={{
                border: "1px solid var(--border)",
                background: "var(--tag-bg)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="font-mono-custom text-xs tracking-widest"
                style={{ color: "var(--accent)" }}
              >
                OPEN FOR PROJECTS
              </span>
            </div>

            <h1 className="font-display font-extrabold leading-none mb-4">
              <span
                className="reveal-up delay-200 block text-5xl sm:text-6xl xl:text-7xl"
                style={{ color: "var(--text-primary)" }}
              >
                I Build
              </span>
              <span className="reveal-up delay-300 block text-5xl sm:text-6xl xl:text-7xl">
                <span
                  ref={wordRef}
                  className="grad-text whitespace-nowrap"
                  style={{
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    display: "inline-block",
                  }}
                >
                  {WORDS[0]}
                </span>
              </span>
              <span
                className="reveal-up delay-400 block text-5xl sm:text-6xl xl:text-7xl"
                style={{ color: "var(--text-primary)" }}
              >
                That Scale.
              </span>
            </h1>

            <p
              className="reveal-fade delay-500 text-lg sm:text-xl max-w-lg mx-auto lg:mx-0 mt-6 mb-8 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              I am specializing in full-stack web development, scalable
              backends, and product engineering — from idea to deployment.
            </p>

            <div className="reveal-fade delay-600 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary px-8 py-4 rounded-2xl text-base"
              >
                View My Work →
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline px-8 py-4 rounded-2xl text-base"
              >
                Start a Project
              </button>
            </div>

            {/* Stats row */}
            <div className="reveal-fade delay-700 flex items-center gap-8 mt-12 justify-center lg:justify-start flex-wrap">
              {[
                { n: "3+", label: "Projects Shipped" },
                { n: "1+", label: "Years Experience" },
                { n: "10+", label: "Technologies" },
              ].map((s, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="font-extrabold text-3xl grad-text">{s.n}</div>
                  <div
                    className="font-mono-custom text-xs tracking-widest mt-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Floating feedback cards ── */}
          <div className="reveal-up delay-400 flex-shrink-0 w-full lg:w-[460px] hidden lg:block">
            <div className="relative w-full h-[480px]">
              {FEEDBACK.map((card, i) => (
                <div
                  key={i}
                  className="absolute w-[200px] rounded-2xl p-4"
                  style={{
                    top: CARD_CONFIG[i].top,
                    left: CARD_CONFIG[i].left,
                    background: "var(--tag-bg)",
                    border: "1px solid var(--border)",
                    backdropFilter: "blur(12px)",
                    animation: `heroCardFloat ${CARD_CONFIG[i].dur} ease-in-out infinite`,
                    animationDelay: CARD_CONFIG[i].delay,
                    "--drift": CARD_CONFIG[i].drift,
                    "--tilt": CARD_CONFIG[i].tilt,
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={{
                        background: "rgba(79,142,247,0.15)",
                        border: "1px solid rgba(79,142,247,0.3)",
                        color: "var(--accent)",
                      }}
                    >
                      {card.initials}
                    </div>
                    <div>
                      <div
                        style={{
                          color: "#f5a623",
                          fontSize: "10px",
                          letterSpacing: "1px",
                        }}
                      >
                        ★★★★★
                      </div>
                      <p
                        className="font-display font-bold leading-none"
                        style={{
                          fontSize: "12px",
                          color: "var(--text-primary)",
                        }}
                      >
                        {card.name}
                      </p>
                      <p
                        className="font-mono-custom"
                        style={{
                          fontSize: "9px",
                          color: "var(--accent)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {card.role}
                      </p>
                    </div>
                  </div>

                  {/* Divider + text */}
                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      paddingTop: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--text-secondary)",
                        lineHeight: "1.55",
                        margin: 0,
                      }}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
