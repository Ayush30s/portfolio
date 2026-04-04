import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";

const ExtraActivity = ({ dark, setDark }) => {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeBadges, setLeetcodeBadges] = useState([]);
  const [loadingLeetcode, setLoadingLeetcode] = useState(true);
  const [leetcodeError, setLeetcodeError] = useState(false);

  const githubUsername = "ayush30s";
  const leetcodeUsername = "ayush2s";

  useEffect(() => {
    // Fetch GitHub Profile Data
    fetch(`https://api.github.com/users/${githubUsername}`)
      .then((res) => res.json())
      .then((data) => setGithubData(data))
      .catch((err) => console.error("Failed to fetch GitHub data:", err));

    // Fetch LeetCode Badges via Alfa LeetCode API
    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/badges`)
      .then((res) => {
        if (!res.ok) throw new Error("API Network Error");
        return res.json();
      })
      .then((data) => {
        console.log("LeetCode API Response:", data);
        if (data && data.badges && Array.isArray(data.badges)) {
          setLeetcodeBadges(data.badges);
        } else if (Array.isArray(data)) {
          setLeetcodeBadges(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch LeetCode badges:", err);
        setLeetcodeError(true);
      })
      .finally(() => {
        setLoadingLeetcode(false);
      });
  }, []);

  const getBadgeIconUrl = (iconPath) => {
    if (!iconPath) return "";
    return iconPath.startsWith("http")
      ? iconPath
      : `https://leetcode.com${iconPath}`;
  };

  const experiences = [
    {
      title: "Software Developer",
      company: "Technobren Infotech Pvt. Ltd.",
      period: "Sept 2025 - Present",
      description:
        "Delivering scalable front-end features for international clients (Harris International & Score XL) enhancing UI responsiveness. Building Artipedia.art(OTT), a decentralized blockchain-based social media platform for arts.",
      technologies: [
        "Next.js",
        "React.js",
        "NestJS",
        "PostgreSQL",
        "Redux",
        "AWS Services",
        "Prisma",
        "Redis Cache",
      ],
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Implemented AWS Services, scalling factors in backend, request queue, customized REST methods in frontend",
        "Implemented real-time features using WebSocket connections",
      ],
    },
    {
      title: "ReactJs Developer - Intern",
      company: "Tetra Information Services",
      period: "Nov 2024 - June 2025",
      description:
        "Contributed to ZuHaus.org, a German property rental platform. Worked on a PostgreSQL-backed property listing system, implementing modular components and optimized API interactions.",
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Redux",
        "NestJS",
        "PostgreSQL",
      ],
      achievements: [
        "Reduced page load time by 25% through code splitting",
        "Developed 15+ reusable UI components",
        "Collaborated with cross-functional teams across Germany",
      ],
    },
    {
      title: "GitHub Contributions",
      company: "Open Source & Personal Projects",
      period: "2023 - Present",
      isGitHubSection: true,
      githubData: githubData,
    },
    {
      title: "Notable Achievements",
      company: "Competitive Programming & Leadership",
      period: "2023 - Present",
      isAchievementsSection: true,
      achievements: [
        "Solved 500+ DSA problems (LeetCode, GFG, Coding Ninjas)",
        "2-Star Coder on CodeChef & LeetCode",
        "Grand Master (Level 7) on Coding Ninjas",
        "Campus Ambassador at Physics Wallah",
      ],
      leetcodeBadges: leetcodeBadges,
      loadingLeetcode: loadingLeetcode,
      leetcodeError: leetcodeError,
    },
  ];

  return (
    <div
      id="activities"
      className={`w-[100%] md:w-[80%] mx-auto px-4 sm:px-5 my-2 md:my-12 sm:my-20 rounded-2xl flex flex-col gap-6 sm:gap-8 transition-all duration-500 ${
        dark ? "text-[#1E2A3A]" : "text-white"
      }`}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-2xl sm:text-4xl md:text-5xl font-bold border-b-4 pb-3 sm:pb-4 inline-block transition-all duration-300 ${
            dark
              ? "border-[#8597FA] text-[#1E2A3A]"
              : "border-[#8597FA] text-white"
          }`}
        >
          Experience & Achievements
        </h1>
      </div>

      {/* Timeline/Ladder Experience Section */}
      <div className="relative py-8">
        {/* Central Line - Right side on mobile, center on desktop */}
        <div
          className={`absolute right-8 md:left-1/2 top-0 w-0.5 h-full transition-all duration-500 ${
            dark
              ? "bg-gradient-to-b from-[#8597FA] via-[#A0B3D0] to-[#8597FA]"
              : "bg-gradient-to-b from-[#8597FA] via-[#7F00F0] to-[#8597FA]"
          }`}
          style={{ height: "calc(100% - 4rem)" }}
        ></div>

        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-end mb-12 animate-fadeInUp ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Timeline Point - Right side on mobile, center on desktop */}
            <div className="absolute right-8 md:left-1/2 transform translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:scale-110 ${
                  dark
                    ? "bg-[#8597FA] shadow-lg shadow-[#8597FA]/30"
                    : "bg-gradient-to-r from-[#8597FA] to-[#7F00F0] shadow-lg shadow-[#8597FA]/50"
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
              </div>
            </div>

            {/* Content - Full width on mobile, 45% on desktop */}
            <div
              className={`w-full md:w-[45%] transition-all duration-500 hover:-translate-y-1 ${
                index % 2 === 0 ? "md:mr-[55%]" : "md:ml-[55%]"
              }`}
            >
              {exp.isGitHubSection ? (
                // GitHub Section
                <div
                  className={`p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:shadow-2xl ${
                    dark
                      ? "bg-[#F5F7FA] border-[#E8EDFF] hover:shadow-[#8597FA]/20"
                      : "bg-[#1E2A3A] border-[#2A3A4A] hover:shadow-[#8597FA]/30"
                  }`}
                >
                  {/* Period Badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-all duration-300 hover:scale-105 ${
                      dark
                        ? "bg-gradient-to-r from-[#8597FA] to-[#A0B3D0] text-white"
                        : "bg-gradient-to-r from-[#8597FA] to-[#7F00F0] text-white"
                    }`}
                  >
                    {exp.period}
                  </span>

                  <h2
                    className={`text-xl sm:text-2xl font-bold mb-1 transition-colors duration-300 ${
                      dark ? "text-[#1E2A3A]" : "text-white"
                    }`}
                  >
                    {exp.title}
                  </h2>
                  <h3
                    className={`text-base sm:text-lg font-medium mb-4 transition-colors duration-300 ${
                      dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                    }`}
                  >
                    {exp.company}
                  </h3>

                  {githubData && (
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                      <div className="relative group">
                        <div
                          className={`absolute -inset-1 rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-500 ${
                            dark ? "bg-[#8597FA]" : "bg-[#8597FA]"
                          }`}
                        ></div>
                        <img
                          src={githubData.avatar_url}
                          alt={`${githubData.login} avatar`}
                          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#8597FA]/30 shadow-md transition-all duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="text-center sm:text-left flex-1">
                        <h4
                          className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                            dark ? "text-[#1E2A3A]" : "text-white"
                          }`}
                        >
                          {githubData.name || githubData.login}
                        </h4>
                        <p
                          className={`text-xs sm:text-sm mt-1 mb-2 transition-colors duration-300 ${
                            dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                          }`}
                        >
                          {githubData.bio ||
                            "Full-Stack Developer | Open Source Enthusiast"}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span
                            className={`px-2 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
                              dark
                                ? "bg-white text-[#1E2A3A] border border-[#E8EDFF]"
                                : "bg-[#2A3A4A] text-[#C0D0F0] border border-[#3A4A5A]"
                            }`}
                          >
                            <span className="font-bold">
                              {githubData.public_repos}
                            </span>{" "}
                            Repos
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full transition-all duration-300 hover:scale-105 ${
                              dark
                                ? "bg-white text-[#1E2A3A] border border-[#E8EDFF]"
                                : "bg-[#2A3A4A] text-[#C0D0F0] border border-[#3A4A5A]"
                            }`}
                          >
                            <span className="font-bold">
                              {githubData.followers}
                            </span>{" "}
                            Followers
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* GitHub Calendar with custom scrollbar */}
                  <div className="relative">
                    <div
                      className={`w-full overflow-y-hidden rounded-xl transition-all duration-300 ${
                        dark
                          ? "bg-white border border-[#E8EDFF]"
                          : "bg-[#182234] border border-[#2A3A4A]"
                      }`}
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: dark
                          ? "#8597FA #E8EDFF"
                          : "#8597FA #2A3A4A",
                      }}
                    >
                      <div className="min-w-[600px] p-3 sm:p-4">
                        <GitHubCalendar
                          username={githubUsername}
                          colorScheme={dark ? "light" : "dark"}
                          blockSize={12}
                          blockMargin={4}
                          fontSize={12}
                        />
                      </div>
                    </div>
                    {/* Custom scroll indicators */}
                    <div
                      className={`absolute left-0 top-0 w-8 h-full bg-gradient-to-r ${dark ? "from-white" : "from-[#182234]"} to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                    <div
                      className={`absolute right-0 top-0 w-8 h-full bg-gradient-to-l ${dark ? "from-white" : "from-[#182234]"} to-transparent pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </div>
                </div>
              ) : exp.isAchievementsSection ? (
                // Achievements Section
                <div
                  className={`p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:shadow-2xl ${
                    dark
                      ? "bg-[#F5F7FA] border-[#E8EDFF] hover:shadow-[#8597FA]/20"
                      : "bg-[#1E2A3A] border-[#2A3A4A] hover:shadow-[#8597FA]/30"
                  }`}
                >
                  {/* Period Badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-all duration-300 hover:scale-105 ${
                      dark
                        ? "bg-gradient-to-r from-[#8597FA] to-[#A0B3D0] text-white"
                        : "bg-gradient-to-r from-[#8597FA] to-[#7F00F0] text-white"
                    }`}
                  >
                    {exp.period}
                  </span>

                  <h2
                    className={`text-xl sm:text-2xl font-bold mb-1 transition-colors duration-300 ${
                      dark ? "text-[#1E2A3A]" : "text-white"
                    }`}
                  >
                    {exp.title}
                  </h2>
                  <h3
                    className={`text-base sm:text-lg font-medium mb-4 transition-colors duration-300 ${
                      dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                    }`}
                  >
                    {exp.company}
                  </h3>

                  {/* Achievements List */}
                  <ul className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 text-sm sm:text-base transition-all duration-300 hover:translate-x-1 ${
                          dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                        }`}
                      >
                        <span className="text-[#8597FA] text-lg">🏆</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* LeetCode Badges with custom scrollbar */}
                  <div className="mt-4 pt-4 border-t border-[#8597FA]/20">
                    <h4
                      className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                        dark ? "text-[#1E2A3A]" : "text-white"
                      }`}
                    >
                      LeetCode Badges
                    </h4>

                    {exp.loadingLeetcode && (
                      <p
                        className={`text-sm animate-pulse ${
                          dark ? "text-[#8597FA]" : "text-[#8597FA]"
                        }`}
                      >
                        Fetching badges from LeetCode...
                      </p>
                    )}

                    {exp.leetcodeError && !exp.loadingLeetcode && (
                      <p className="text-sm text-red-500 opacity-80">
                        Currently unable to fetch LeetCode data.
                      </p>
                    )}

                    {!exp.loadingLeetcode &&
                      !exp.leetcodeError &&
                      exp.leetcodeBadges.length === 0 && (
                        <p
                          className={`text-sm opacity-70 transition-colors duration-300 ${
                            dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                          }`}
                        >
                          No badges found for this profile yet.
                        </p>
                      )}

                    <div className="flex flex-wrap gap-3 max-h-32 overflow-y-auto custom-scrollbar p-1">
                      {exp.leetcodeBadges.map((badge, index) => (
                        <div
                          key={index}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            dark
                              ? "bg-white shadow-sm hover:shadow-[#8597FA]/20"
                              : "bg-[#2A3A4A] hover:bg-[#3A4A5A] hover:shadow-[#8597FA]/30"
                          }`}
                          title={badge.displayName}
                        >
                          <img
                            src={getBadgeIconUrl(badge.icon)}
                            alt={badge.displayName}
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                          />
                          <span
                            className={`text-[8px] sm:text-[10px] mt-1 text-center max-w-[50px] truncate transition-colors duration-300 ${
                              dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                            }`}
                          >
                            {badge.displayName || badge.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Regular Experience Card
                <div
                  className={`p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:shadow-2xl ${
                    dark
                      ? "bg-[#F5F7FA] border-[#E8EDFF] hover:shadow-[#8597FA]/20"
                      : "bg-[#1E2A3A] border-[#2A3A4A] hover:shadow-[#8597FA]/30"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-all duration-300 hover:scale-105 ${
                      dark
                        ? "bg-gradient-to-r from-[#8597FA] to-[#A0B3D0] text-white"
                        : "bg-gradient-to-r from-[#8597FA] to-[#7F00F0] text-white"
                    }`}
                  >
                    {exp.period}
                  </span>

                  <h2
                    className={`text-xl sm:text-2xl font-bold mb-1 transition-colors duration-300 ${
                      dark ? "text-[#1E2A3A]" : "text-white"
                    }`}
                  >
                    {exp.title}
                  </h2>
                  <h3
                    className={`text-base sm:text-lg font-medium mb-3 transition-colors duration-300 ${
                      dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                    }`}
                  >
                    {exp.company}
                  </h3>

                  <p
                    className={`mb-4 text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                      dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                    }`}
                  >
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-[10px] sm:text-xs rounded-md transition-all duration-300 hover:scale-105 ${
                          dark
                            ? "bg-white text-[#1E2A3A] border border-[#E8EDFF] hover:shadow-md"
                            : "bg-[#2A3A4A] text-[#C0D0F0] border border-[#3A4A5A] hover:bg-[#3A4A5A]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#8597FA]/30">
                    <h4
                      className={`text-xs sm:text-sm font-semibold mb-2 transition-colors duration-300 ${
                        dark ? "text-[#1E2A3A]" : "text-[#8597FA]"
                      }`}
                    >
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 text-xs sm:text-sm transition-all duration-300 hover:translate-x-1 ${
                            dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
                          }`}
                        >
                          <span className="text-[#8597FA] mt-1">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Custom scrollbar styling */
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${dark ? "#E8EDFF" : "#2A3A4A"};
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${dark ? "#8597FA" : "#8597FA"};
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${dark ? "#7F00F0" : "#7F00F0"};
        }

        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: ${dark ? "#8597FA #E8EDFF" : "#8597FA #2A3A4A"};
        }

        /* Smooth scrolling */
        .custom-scrollbar {
          scroll-behavior: smooth;
        }

        /* Hide scroll indicators on hover effect */
        .custom-scrollbar:hover {
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  );
};

export default ExtraActivity;
