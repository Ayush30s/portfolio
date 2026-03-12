const ExtraActivity = ({ dark, setDark }) => {
  return (
    <div
      id="activities"
      className={`w-[100%] md:w-[80%] p-4 sm:p-6 md:p-10 mx-auto rounded-2xl flex flex-col gap-6 sm:gap-8 ${
        dark
          ? "text-gray-800 bg-white shadow-xl"
          : "text-gray-200 bg-neutral-900 shadow-2xl"
      }`}
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-2xl sm:text-4xl md:text-5xl font-bold border-b-4 pb-3 sm:pb-4 inline-block ${dark ? "border-blue-600 text-gray-900" : "border-blue-500 text-white"}`}
        >
          Experience & Achievements
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Experience 1 */}
        <div
          className={`flex-1 p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${dark ? "bg-gray-50 border-gray-200 hover:shadow-lg" : "bg-neutral-800 border-neutral-700 hover:shadow-2xl hover:shadow-blue-900/20"}`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold ${dark ? "text-blue-600" : "text-blue-400"}`}
              >
                Software Developer – Frontend
              </h2>
              <h3 className="text-base sm:text-lg font-medium opacity-90">
                Technobren Infotech Pvt. Ltd.
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${dark ? "bg-blue-100 text-blue-700" : "bg-blue-900/50 text-blue-300"}`}
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
              "Tailwind CSS",
              "NestJS",
              "PostgreSQL",
              "Redux",
              "AWS",
            ].map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 text-[10px] sm:text-xs rounded-md ${dark ? "bg-gray-200 text-gray-700" : "bg-neutral-700 text-gray-300"}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Experience 2 */}
        <div
          className={`flex-1 p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${dark ? "bg-gray-50 border-gray-200 hover:shadow-lg" : "bg-neutral-800 border-neutral-700 hover:shadow-2xl hover:shadow-blue-900/20"}`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold ${dark ? "text-blue-600" : "text-blue-400"}`}
              >
                ReactJs Developer - Intern
              </h2>
              <h3 className="text-base sm:text-lg font-medium opacity-90">
                Tetra Information Services
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${dark ? "bg-gray-200 text-gray-700" : "bg-neutral-700 text-gray-300"}`}
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
            {["React.js", "Redux Thunk", "NestJS", "PostgreSQL"].map((tech) => (
              <span
                key={tech}
                className={`px-2 py-1 text-[10px] sm:text-xs rounded-md ${dark ? "bg-gray-200 text-gray-700" : "bg-neutral-700 text-gray-300"}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div
        className={`p-5 sm:p-6 md:p-8 rounded-xl border mt-2 sm:mt-4 ${dark ? "bg-blue-50 border-blue-100" : "bg-blue-950/20 border-blue-900/30"}`}
      >
        <h3
          className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${dark ? "text-gray-900" : "text-white"}`}
        >
          Notable Achievements
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm md:text-base">
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
      </div>
    </div>
  );
};

export default ExtraActivity;