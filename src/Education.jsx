import { useScrollReveal } from "./useScrollReveal";

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    text: "Solved 500+ DSA problems on LeetCode, GeeksForGeeks, and Coding Ninjas",
  },
  { icon: "⭐", text: "2-Star rating on LeetCode and CodeChef" },
  { icon: "🥇", text: "Grandmaster Level 7 on Coding Ninjas" },
  {
    icon: "🎓",
    text: "BCA CGPA 8.0/10 — Veer Bahadur Singh Purvanchal University",
  },
];

const COURSES = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Computer Networks",
  "Database Management Systems",
];

const Education = () => {
  useScrollReveal();
  return (
    <section
      id="education"
      className="py-24"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="sr-hidden sr-d1 mb-2">
          <span className="section-label">Education & Achievements</span>
        </div>
        <div className="sr-hidden sr-d2 mb-12">
          <div className="accent-stripe" />
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}
          >
            Background &<br />
            <span className="grad-text font-display italic">Milestones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education card */}
          <div className="sr-left">
            <div className="card p-0 overflow-hidden">
              <div
                className="p-5"
                style={{
                  background: "var(--accent)",
                  borderBottom: "var(--border)",
                }}
              >
                <p className="font-mono-custom text-xs text-white opacity-70 mb-1">
                  2021 – 2024
                </p>
                <h3 className="font-bold text-xl text-white">
                  Bachelor of Computer Applications
                </h3>
                <p className="font-mono-custom text-xs text-white opacity-80 mt-1">
                  Veer Bahadur Singh Purvanchal University
                </p>
              </div>
              <div className="p-6" style={{ background: "var(--bg-card)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="px-4 py-2 font-bold text-2xl font-display"
                    style={{
                      background: "var(--bg-white)",
                      border: "var(--border)",
                      boxShadow: "var(--shadow-sm)",
                    }}
                  >
                    8.0
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "var(--text-primary)" }}
                    >
                      CGPA / 10.0
                    </p>
                    <p
                      className="font-mono-custom text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Final Grade
                    </p>
                  </div>
                </div>
                <p
                  className="font-mono-custom text-xs uppercase tracking-widest mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {COURSES.map((c, i) => (
                    <span key={i} className="tag">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="flex flex-col gap-4">
            <p
              className="font-mono-custom text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Achievements
            </p>
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={i}
                className={`sr-hidden sr-d${i + 1} card-white p-4 flex items-start gap-4`}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: "var(--bg-2)",
                    border: "var(--border)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {a.icon}
                </div>
                <p
                  className="text-sm leading-relaxed pt-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {a.text}
                </p>
              </div>
            ))}

            {/* DSA platforms */}
            <div className="card-white p-4">
              <p
                className="font-mono-custom text-xs uppercase tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Active on
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    name: "LeetCode",
                    url: "https://leetcode.com/ayush2s",
                    color: "#f59e0b",
                  },
                  { name: "GeeksForGeeks", url: "#", color: "#16a34a" },
                  { name: "Coding Ninjas", url: "#", color: "#e85d3a" },
                  { name: "CodeChef", url: "#", color: "#7c3aed" },
                ].map((p, i) => (
                  <a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tag"
                    style={{ color: p.color }}
                  >
                    {p.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
