import React, { useState } from "react";

const ProjectAccordion = ({
  title,
  liveLink,
  features,
  tools,
  projectImage,
  dark,
  index,
  setDark,
}) => {
  const [activeSection, setActiveSection] = useState("usage");
  const [inlarge, setInlarge] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSectionToggle = (section) => {
    setActiveSection((prevSection) =>
      prevSection === section
        ? section === "features"
          ? "usage"
          : "features"
        : section
    );
  };

  const InlargeImage = (index) => {
    setCurrentImageIndex(index);
    setInlarge(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImage.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + projectImage.length) % projectImage.length
    );
  };

  return (
    <div className={`${!dark ? "bg-black" : "bg-gray-100"} flex flex-col my-7`}>
      <div className="flex flex-row justify-start items-center">
        <h1
          className={`text-2xl text-center my-5 uppercase font-medium font-bebas ${
            !dark
              ? "border-yellow-400 text-yellow-500"
              : "border-blue-500 text-blue-600"
          }`}
        >
          {index + 1 + ". "}
          {title}
        </h1>
        <a
          className={`text-sm border rounded-xl font-medium px-3 py-1 mx-3 ${
            !dark
              ? "text-white border-white hover:text-blue-600"
              : "text-black border-black hover:text-blue-500"
          } transition-colors`}
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Live
        </a>
      </div>

      <div
        className={`flex flex-col bg-gradient-to-b ${
          !dark ? "bg-zinc-900" : "from-white to-gray-100"
        } rounded-xl md:my-0 mb-5 justify-center items-center p-5 align-middle`}
      >
        {/* Image Slider */}
        <div className="relative w-full flex justify-center items-center">
          {/* Mobile: Buttons on Image */}
          <div className="md:hidden absolute inset-0 flex justify-between items-center px-4">
            <button
              onClick={prevImage}
              className="text-xl p-2 bg-black bg-opacity-40 text-white rounded-full"
            >
              {"<"}
            </button>
            <button
              onClick={nextImage}
              className="text-xl p-2 bg-black bg-opacity-40 text-white rounded-full"
            >
              {">"}
            </button>
          </div>

          {/* Image */}
          <img
            className={`border-2 md:w-[80%] h-[200px] md:h-[250px] w-auto my-2 rounded-lg shadow-lg ${
              !dark ? "border-yellow-300" : "border-yellow-500"
            }`}
            src={projectImage[currentImageIndex]?.image}
            alt="Project Slide"
            onClick={() => InlargeImage(currentImageIndex)}
          />

          {/* Desktop: Buttons beside image */}
          <div className="hidden md:flex absolute w-full justify-between px-2">
            <button
              onClick={prevImage}
              className="text-xl px-3 py-1 bg-black text-white rounded-full hover:bg-gray-300 hover:text-black"
            >
              {"<"}
            </button>
            <button
              onClick={nextImage}
              className="text-xl px-3 py-1 bg-black text-white rounded-full hover:bg-gray-300 hover:text-black"
            >
              {">"}
            </button>
          </div>
        </div>

        {/* Features & Tools */}
        <div className="w-full my-5 px-0 md:px-[10%]">
          {/* Features Section */}
          <div className="mb-5">
            <button
              onClick={() => handleSectionToggle("features")}
              className={`text-2xl font-bebas underline hover:${
                !dark ? "text-blue-600" : "text-blue-500"
              } transition-colors ${!dark ? "text-white" : "text-gray-800"}`}
            >
              Features
            </button>
            <ul
              className={`list-disc pl-5 space-y-2 mt-3 ${
                !dark ? "text-gray-300" : "text-gray-800"
              } text-sm leading-relaxed`}
            >
              {features.map((feature, index) => (
                <li key={index}>{feature.description}</li>
              ))}
            </ul>
          </div>

          {/* Tools Section */}
          <div>
            <button
              onClick={() => handleSectionToggle("usage")}
              className={`text-2xl font-bebas underline hover:${
                !dark ? "text-blue-600" : "text-blue-500"
              } transition-colors ${!dark ? "text-white" : "text-gray-800"}`}
            >
              Tech / Tools
            </button>
            <ul className="flex flex-wrap mt-3">
              {tools.map((tool, index) => (
                <li
                  key={index}
                  className={`text-sm mr-2 my-1 ${
                    !dark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {tool}
                  {index < tools.length - 1 && ","}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {inlarge && (
        <div
          className="fixed w-full inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setInlarge(false)}
        >
          <div className="relative">
            <img
              src={projectImage[currentImageIndex]?.image}
              alt="Enlarged Project"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg"
            />
            <button
              onClick={() => setInlarge(false)}
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full p-2"
            >
              &times;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
            >
              {"<"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAccordion;
