const ExtraActivity = ({ dark, setDark }) => {
  return (
    <div
      id="activities"
      className={`w-[100%] md:w-[70%] p-5 rounded-lg  flex flex-col gap-3 font-lcase text-sm ${
        dark ? "text-black" : "text-white"
      }`}
    >
      <h1
        className={`text-[50px] pb-5 mt-10 mb-5 border-b-2 text-start font-bebas ${
          dark
            ? "border-blue-500 text-blue-600"
            : "border-yellow-400 text-yellow-500"
        }`}
      >
        Activities
      </h1>
      <div
        className={`font-lcase p-4 md:p-6 lg:p-8 rounded-lg ${
          dark ? "bg-gray-200 text-gray-800" : "bg-zinc-900 text-white"
        }`}
      >
        <h2
          className={`text-xl md:text-2xl font-bold mb-3 ${
            dark ? "text-blue-600" : "text-yellow-500"
          }`}
        >
          Experience at Tetra Information Services Pvt. Ltd.
        </h2>
        <p className="mb-3">
          Worked as a{" "}
          <span className="font-semibold">Reactjs Front-End Intern</span>
          for <span className="font-semibold">6 Months</span>, gaining hands-on
          industrial-level knowledge of how real-world projects are built and
          managed.
        </p>

        <h3 className="text-lg font-semibold mb-2">Frontend Technologies</h3>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>React.js</li>
          <li>Redux & Redux Thunk</li>
          <li>Redux Persist</li>
          <li>Tailwind CSS</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Backend & Tools</h3>
        <ul className="list-disc pl-5 mb-3 space-y-1">
          <li>Nest.js</li>
          <li>PostgreSQL</li>
          <li>Postman</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Client Project</h3>
        <p>
          Contributed to the{" "}
          <a
            href="https://zuhaus.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-500"
          >
            Zuhaus.org
          </a>{" "}
          website for our German client, enhancing both frontend and backend
          functionality.
        </p>
      </div>

      <div
        className={`font-lcase p-4 md:p-6 lg:p-8 rounded-lg ${
          dark ? "bg-gray-200 text-gray-800" : "bg-zinc-900 text-white"
        }`}
      >
        <ul className="list-disc list-inside space-y-2 text-md">
          <li>solved 500+ DSA problems</li>
          <li>2-Star rating on CodeChef</li>
          <li>2-Star on LeetCode (230-day streak)</li>
          <li>Expert at Coding Ninjas</li>
          <li>University Rank 8 on GeeksforGeeks</li>
          <li>Campus ambassadro @Physcics Wallah</li>
        </ul>
      </div>
    </div>
  );
};

export default ExtraActivity;
