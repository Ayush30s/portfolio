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
        <ul className="list-disc list-inside space-y-2 text-md">
          <li>solved 500+ DSA problems</li>
          <li>2-Star rating on CodeChef</li>
          <li>2-Star on LeetCode (230-day streak)</li>
          <li>Expert at Coding Ninjas</li>
          <li>University Rank 8 on GeeksforGeeks</li>
        </ul>
      </div>
    </div>
  );
};

export default ExtraActivity;
