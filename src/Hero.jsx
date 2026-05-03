import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";

const WORDS = ["Full-Stack Apps", "APIs", "Real-time Systems", "Microservices"];

const CARDS = [
  {
    label: "NestJS + TypeScript",
    icon: "⚡",
    color: "#e85d3a",
    top: "5%",
    left: "3%",
    drift: "-10px",
    tilt: "-2deg",
    delay: "0s",
    dur: "5s",
  },
  {
    label: "React + Next.js",
    icon: "⚛",
    color: "#2d5be3",
    top: "0%",
    left: "55%",
    drift: "-14px",
    tilt: "1.5deg",
    delay: "-2s",
    dur: "6.5s",
  },
  {
    label: "AWS Services",
    icon: "☁",
    color: "#f59e0b",
    top: "42%",
    left: "0%",
    drift: "-8px",
    tilt: "-1deg",
    delay: "-1s",
    dur: "5.5s",
  },
  {
    label: "PostgreSQL + Redis",
    icon: "🗄",
    color: "#16a34a",
    top: "40%",
    left: "56%",
    drift: "-12px",
    tilt: "2deg",
    delay: "-3s",
    dur: "7s",
  },
  {
    label: "Microservices",
    icon: "🔗",
    color: "#7c3aed",
    top: "74%",
    left: "12%",
    drift: "-10px",
    tilt: "-0.5deg",
    delay: "-1.5s",
    dur: "6s",
  },
  {
    label: "LangChain",
    icon: "🦜",
    color: "#10b981",
    top: "68%",
    left: "55%",
    drift: "-9px",
    tilt: "1deg",
    delay: "-2.5s",
    dur: "5.8s",
  },
  {
    label: "LangGraph",
    icon: "🕸",
    color: "#f97316",
    top: "22%",
    left: "28%",
    drift: "-11px",
    tilt: "-1.5deg",
    delay: "-0.5s",
    dur: "6.2s",
  },
];
const wordStyle = {
  display: "inline-block",
  background: "linear-gradient(90deg, #3e87e0, #330aac, #7c7081)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  transition: "opacity 0.35s ease, transform 0.35s ease",
};

const Hero = () => {
  const [wordIdx, setWordIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const isMobile = useMediaQuery("(max-width:578px)");

  useEffect(() => {
    const timer = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % WORDS.length);
        setIsFading(false);
      }, 350);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid"
      style={{ background: "var(--bg)", paddingTop: "80px" }}
    >
      {/* Decorative stamp corners */}
      <div
        className="absolute top-20 left-46 opacity-20 font-mono-custom text-xs border-2 border-dashed border-current px-3 py-1 rotate-[-3deg]"
        style={{ color: "var(--accent)" }}
      >
        AVAILABLE FOR HIRE
      </div>
      <div className="absolute bottom-28 right-16 opacity-15 font-mono-custom text-xs border-2 border-dashed border-current px-3 py-1 rotate-[2deg]">
        INDIA · UTC+5:30
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-4 pb-20 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="reveal-up delay-100 flex justify-center lg:justify-start mb-6">
              <span className="section-label flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />{" "}
                Open to opportunities
              </span>
            </div>

            <h1 className="font-display leading-[0.95] mb-4">
              <span
                className="reveal-up delay-200 block font-display"
                style={{
                  fontSize: "clamp(3rem,7vw,5.5rem)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                I Build
              </span>

              <span
                className="reveal-up delay-300 block font-display"
                style={{
                  fontSize: "clamp(3rem,7vw,5.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                <span
                  style={{
                    ...wordStyle,
                    opacity: isFading ? 0 : 1,
                    transform: isFading ? "translateY(10px)" : "translateY(0)",
                  }}
                >
                  {WORDS[wordIdx]}
                </span>
              </span>

              <span
                className="reveal-up delay-400 block font-display"
                style={{
                  fontSize: "clamp(3rem,7vw,5.5rem)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                That Scale.
              </span>
            </h1>

            <p
              className="reveal-fade delay-500 text-lg max-w-lg mx-auto lg:mx-0 mt-6 mb-8 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Full-Stack Developer with 1+ year building production apps — OTT
              platforms, supply chain systems, property marketplaces. TypeScript
              · NestJS · React · AWS.
            </p>

            <div className="reveal-fade delay-600 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-primary px-8 py-4 text-base"
              >
                View My Work →
              </button>
              <a
                href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-8 py-4 text-base flex items-center justify-center"
              >
                LinkedIn ↗
              </a>
            </div>

            {/* Stats */}
            <div className="reveal-fade delay-700 flex items-center gap-6 mt-10 justify-center lg:justify-start flex-wrap">
              {[
                { n: "1+", label: "Year Experience" },
                { n: "4+", label: "Production Projects" },
                { n: "500+", label: "DSA Problems" },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`text-center lg:text-left ${isMobile ? "px-2" : "px-4"} ${isMobile ? "py-2" : "py-3"}`}
                  style={{
                    background: "var(--bg-white)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <div
                    className={`font-display font-bold ${isMobile ? "text-xl" : "text-3xl"} grad-text`}
                  >
                    {s.n}
                  </div>
                  <div
                    className="font-mono-custom text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tech floating cards */}
          <div className="reveal-fade delay-400 flex-shrink-0 w-full lg:w-[420px] hidden lg:block">
            <div className="relative w-full h-[480px]">
              {CARDS.map((c, i) => (
                <div
                  key={i}
                  className="absolute flex items-center gap-3 px-4 py-3"
                  style={{
                    top: c.top,
                    left: c.left,
                    background: "var(--bg-white)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-md)",
                    animation: `heroFloat ${c.dur} ease-in-out infinite`,
                    animationDelay: c.delay,
                    "--drift": c.drift,
                    "--tilt": c.tilt,
                    minWidth: "180px",
                  }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center text-base flex-shrink-0"
                    style={{
                      background: c.color,
                      border: "var(--border)",
                      boxShadow: "2px 2px 0px #1a1a1a",
                    }}
                  >
                    {c.icon}
                  </div>
                  <span
                    className="font-mono-custom text-xs font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.label}
                  </span>
                </div>
              ))}

              {/* Center decoration */}
              <div
                className="absolute top-[48%] left-[28%] w-20 h-20 flex items-center justify-center font-display text-4xl"
                style={{
                  background: "var(--accent)",
                  border: "var(--border)",
                  boxShadow: "var(--shadow-lg)",
                  color: "white",
                }}
              >
                {"</>"}
              </div>
              <div
                className="absolute top-[8%] right-[8%] w-14 h-14 flex items-center justify-center font-display text-3xl"
                style={{
                  background: "var(--accent)",
                  border: "var(--border)",
                  boxShadow: "var(--shadow-lg)",
                  color: "white",
                }}
              >
                {"</>"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
