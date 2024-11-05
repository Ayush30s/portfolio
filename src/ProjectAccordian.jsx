import React, { useState } from "react";

const ProjectAccordion = ({
  title,
  liveLink,
  features,
  tools,
  projectImage,
  dark,
  setDark
}) => {
  const [activeSection, setActiveSection] = useState("features");
  const [inlarge, setInlarge] = useState(false);
  const [currentImage, setCurrentImage] = useState(null); // Track the image to enlarge

  const handleSectionToggle = (section) => {
    setActiveSection((prevSection) =>
      prevSection === section
        ? section === "features"
          ? "usage"
          : "features"
        : section
    );
  };

  const InlargeImage = (image) => {
    setCurrentImage(image);
    setInlarge(!inlarge);
  };

  return (
    <div className={` shadow-lg hover:shadow-lg ${!dark ? "bg-gradient-to-b from-gray-600 to-black" : "bg-gradient-to-b from-gray-100 to-white"} mx-auto flex flex-col mb-10 rounded-lg`}>
      <h1 className={`text-4xl text-center my-10 font-medium font-bebas ${!dark ? "text-orange-50" : "text-gray-800"}`}>
        {title}
        <a
          className={`text-lg ${!dark ? "text-blue-600" : "text-blue-800"} underline hover:text-blue-800 transition-colors`}
          href={liveLink}
        >
          Live
        </a>
      </h1>

      <div className="flex flex-row justify-center items-center p-5 align-middle">
        <div className="w-[65%] space-y-6">
          <div className="mb-5">
            <button
              onClick={() => handleSectionToggle("features")}
              className={`text-2xl mb-2 font-bebas underline hover:${!dark ? "text-blue-600" : "text-blue-500"} transition-colors ${!dark ? "text-white" : "text-gray-800"}`}
            >
              Features
            </button>
            <div
              className={`transition-all duration-500 ease-in-out ${
                activeSection === "features"
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <ul className="pt-3 space-y-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className={`text-sm my-2 transition-transform transform hover:translate-x-2 ${!dark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    <span className={`font-semibold ${!dark ? "text-white" : "text-gray-800"}`}>
                      {feature.title} :
                    </span>
                    {feature.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <button
              onClick={() => handleSectionToggle("usage")}
              className={`text-2xl mb-2 font-bebas underline hover:${!dark ? "text-blue-600" : "text-blue-500"} transition-colors ${!dark ? "text-white" : "text-gray-800"}`}
            >
              Tech / Tools
            </button>
            <div
              className={`transition-all duration-500 ease-in-out ${
                activeSection === "usage"
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <ul className="pt-3 space-y-2">
                {tools.map((tool, index) => (
                  <li
                    key={index}
                    className={`flex justify-start items-center text-sm my-2 transition-transform transform hover:translate-x-2 ${!dark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    <a
                      href={tool.link}
                      className="mr-2 transition-transform transform hover:scale-110"
                    >
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="w-6 h-6 border border-gray-400 rounded-full shadow-md"
                        onClick={() => InlargeImage(tool.image)} // Pass image to enlarge
                      />
                    </a>
                    <span className={`font-semibold ${!dark ? "text-white" : "text-gray-800"} mr-1`}>
                      {tool.name} :
                    </span>
                    <span>{tool.usage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="w-[30%] p-2 flex flex-col items-center">
          {projectImage.map((imgObj, index) => (
            <img
              key={index}
              className={`border-2 h-[50%] w-auto mx-2 my-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${!dark ? "border-yellow-300" : "border-yellow-500"}`}
              src={imgObj.image}
              alt="Project Image"
              onClick={() => InlargeImage(imgObj.image)} // Pass image to enlarge
            />
          ))}
        </div>
      </div>

      {/* Modal for Enlarged Image */}
      {inlarge && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={InlargeImage} // Close modal when background clicked
        >
          <div className="relative">
            <img
              src={currentImage}
              alt="Enlarged Project Image"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg"
            />
            <button
              onClick={InlargeImage} // Close modal when button clicked
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full p-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAccordion;
