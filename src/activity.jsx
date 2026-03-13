import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";

const ExtraActivity = ({ dark, setDark }) => {
  const [githubData, setGithubData] = useState(null);
  const [leetcodeBadges, setLeetcodeBadges] = useState([]);
  const [loadingLeetcode, setLoadingLeetcode] = useState(true); // Added loading state
  const [leetcodeError, setLeetcodeError] = useState(false); // Added error state

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
        console.log("LeetCode API Response:", data); // <-- Check your browser console for this!

        // Handle different possible API response structures
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
        setLoadingLeetcode(false); // Turn off loading spinner whether it succeeded or failed
      });
  }, []);

  // Helper function to ensure badge icon URLs are absolute
  const getBadgeIconUrl = (iconPath) => {
    if (!iconPath) return "";
    return iconPath.startsWith("http")
      ? iconPath
      : `https://leetcode.com${iconPath}`;
  };

  return (
    <div
      id="activities"
      className={`w-[100%] md:w-[80%] mx-auto px-4 sm:px-5 my-2 md:my-12 sm:my-20 rounded-2xl flex flex-col gap-6 sm:gap-8 ${
        dark ? "text-gray-800 bg-white shadow-xl" : "text-gray-200 shadow-2xl"
      }`}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-2xl sm:text-4xl md:text-5xl font-bold border-b-4 pb-3 sm:pb-4 inline-block ${
            dark
              ? "border-blue-600 text-gray-900"
              : "border-blue-500 text-white"
          }`}
        >
          Experience & Achievements
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Experience 1 */}
        <div
          className={`flex-1 p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
            dark
              ? "bg-gray-50 border-gray-200 hover:shadow-lg"
              : "bg-neutral-800 border-neutral-700 hover:shadow-2xl hover:shadow-blue-900/20"
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold ${
                  dark ? "text-blue-600" : "text-blue-400"
                }`}
              >
                Software Developer – Frontend
              </h2>
              <h3 className="text-base sm:text-lg font-medium opacity-90">
                Technobren Infotech Pvt. Ltd.
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                dark
                  ? "bg-blue-100 text-blue-700"
                  : "bg-blue-900/50 text-blue-300"
              }`}
            >
              Sept 2025 - Present
            </span>
          </div>
          <p className="mb-4 text-sm sm:text-base leading-relaxed opacity-80">
            Delivering scalable front-end features for international clients
            (Harris International & Score XL) enhancing UI responsiveness.
            Building{" "}
            <span className="font-semibold text-blue-500">Artipedia.art</span>,
            a decentralized blockchain-based social media platform for arts.
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
            {[
              "Next.js",
              "React.js",
              "NestJS",
              "PostgreSQL",
              "Redux",
              "AWS Services",
              "Prisma",
              "Redis Cache",
            ].map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 text-[10px] sm:text-xs rounded-md ${
                  dark
                    ? "bg-gray-200 text-gray-700"
                    : "bg-neutral-700 text-gray-300"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Experience 2 */}
        <div
          className={`flex-1 p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
            dark
              ? "bg-gray-50 border-gray-200 hover:shadow-lg"
              : "bg-neutral-800 border-neutral-700 hover:shadow-2xl hover:shadow-blue-900/20"
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold ${
                  dark ? "text-blue-600" : "text-blue-400"
                }`}
              >
                ReactJs Developer - Intern
              </h2>
              <h3 className="text-base sm:text-lg font-medium opacity-90">
                Tetra Information Services
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                dark
                  ? "bg-gray-200 text-gray-700"
                  : "bg-neutral-700 text-gray-300"
              }`}
            >
              Nov 2024 - June 2025
            </span>
          </div>
          <p className="mb-4 text-sm sm:text-base leading-relaxed opacity-80">
            Contributed to ZuHaus.org, a German property rental platform. Worked
            on a PostgreSQL-backed property listing system, implementing modular
            components and optimized API interactions.
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
            {["React.js", "Tailwind CSS", "Redux", "NestJS", "PostgreSQL"].map(
              (tech) => (
                <span
                  key={tech}
                  className={`px-2 py-1 text-[10px] sm:text-xs rounded-md ${
                    dark
                      ? "bg-gray-200 text-gray-700"
                      : "bg-neutral-700 text-gray-300"
                  }`}
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* GitHub Profile & Heatmap Section */}
      <div
        className={`p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 mt-2 sm:mt-4 ${
          dark
            ? "bg-gray-50 border-gray-200 hover:shadow-lg"
            : "bg-neutral-800 border-neutral-700 hover:shadow-2xl hover:shadow-blue-900/20"
        }`}
      >
        <h3
          className={`text-xl text-center sm:text-start sm:text-2xl font-bold mb-6 ${
            dark ? "text-blue-600" : "text-blue-400"
          }`}
        >
          GitHub Contributions
        </h3>

        {githubData && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8">
            <img
              src={githubData.avatar_url}
              alt={`${githubData.login} avatar`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-blue-500/30 shadow-md"
            />
            <div className="text-center sm:text-left flex flex-col justify-center">
              <h4
                className={`text-lg sm:text-xl font-bold ${
                  dark ? "text-gray-900" : "text-white"
                }`}
              >
                {githubData.name || githubData.login}
              </h4>
              <p
                className={`text-sm mt-1 mb-3 max-w-md ${
                  dark ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {githubData.bio ||
                  "Full-Stack Developer | Open Source Enthusiast"}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs sm:text-sm">
                <span
                  className={`px-3 py-1 rounded-full ${
                    dark
                      ? "bg-gray-200 text-gray-800"
                      : "bg-neutral-700 text-gray-200"
                  }`}
                >
                  <span className="font-bold">{githubData.public_repos}</span>{" "}
                  Repositories
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    dark
                      ? "bg-gray-200 text-gray-800"
                      : "bg-neutral-700 text-gray-200"
                  }`}
                >
                  <span className="font-bold">{githubData.followers}</span>{" "}
                  Followers
                </span>
              </div>
            </div>
          </div>
        )}

        <div
          className={`w-full overflow-x-auto p-4 sm:p-6 rounded-xl flex justify-center items-center ${
            dark
              ? "bg-white border border-gray-200"
              : "bg-neutral-900 border border-neutral-700"
          }`}
        >
          <GitHubCalendar
            username={githubUsername}
            colorScheme={dark ? "light" : "dark"}
            blockSize={14}
            blockMargin={5}
            fontSize={14}
          />
        </div>
      </div>

      {/* Achievements Section */}
      <div
        className={`p-5 sm:p-6 md:p-8 rounded-xl border mt-2 sm:mt-4 ${
          dark
            ? "bg-blue-50 border-blue-100"
            : "bg-blue-950/20 border-blue-900/30"
        }`}
      >
        <h3
          className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${
            dark ? "text-gray-900" : "text-white"
          }`}
        >
          Notable Achievements
        </h3>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm md:text-base mb-6">
          <li className="flex items-center gap-2">
            <span className="text-blue-500">🏆</span> Solved 500+ DSA problems
            (LeetCode, GFG, Coding Ninjas)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">⭐</span> 2-Star Coder on CodeChef &
            LeetCode
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">🔥</span> Grand Master (Level 7) on
            Coding Ninjas
          </li>
          <li className="flex items-center gap-2">
            <span className="text-blue-500">🎓</span> Campus Ambassador at
            Physics Wallah
          </li>
        </ul>

        {/* Dynamic LeetCode Badges Area */}
        <div className="mt-4 pt-4 border-t border-blue-500/20">
          <h4
            className={`text-sm font-semibold mb-3 ${
              dark ? "text-gray-700" : "text-gray-300"
            }`}
          >
            LeetCode Badges
          </h4>

          {/* Debugging UI States */}
          {loadingLeetcode && (
            <p
              className={`text-sm animate-pulse ${dark ? "text-blue-600" : "text-blue-400"}`}
            >
              Fetching badges from LeetCode (this may take up to 30 seconds)...
            </p>
          )}

          {leetcodeError && !loadingLeetcode && (
            <p className="text-sm text-red-500 opacity-80">
              Currently unable to fetch LeetCode data. The proxy server might be
              down.
            </p>
          )}

          {!loadingLeetcode &&
            !leetcodeError &&
            leetcodeBadges.length === 0 && (
              <p
                className={`text-sm opacity-70 ${dark ? "text-gray-600" : "text-gray-400"}`}
              >
                No badges found for this profile yet.
              </p>
            )}

          <div className="flex flex-wrap gap-3">
            {leetcodeBadges.map((badge, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-transform hover:scale-105 ${
                  dark ? "bg-white shadow-sm" : "bg-neutral-900/50"
                }`}
                title={badge.displayName}
              >
                <img
                  src={getBadgeIconUrl(badge.icon)}
                  alt={badge.displayName}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
                <span
                  className={`text-[10px] mt-1 text-center max-w-[60px] truncate ${
                    dark ? "text-gray-600" : "text-gray-400"
                  }`}
                >
                  {badge.displayName || badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraActivity;
