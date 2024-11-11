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
    <div
      className={` ${
        !dark ? " bg-black  " : " bg-gray-100  "
      } flex flex-col my-7 `}
    >
      <div className="flex flex-row justify-start items-center">
        <h1
          className={`text-2xl text-center  my-5  uppercase font-medium font-bebas ${
            !dark
              ? "border-yellow-400 text-yellow-500 "
              : " border-blue-500 text-blue-600"
          }`}
        >
          {index+1 + ". "}{title}
        </h1>
        <a
          className={`text-sm border rounded-xl font-medium px-3 py-1 mx-3 ${
            !dark
              ? "text-white border-white hover:text-blue-600"
              : "text-black border-black hover:text-blue-500"
          }  transition-colors`}
          href={liveLink}
        >
          Live
        </a>
      </div>

      <div
        className={`flex flex-col-reverse md:flex-row bg-gradient-to-b ${
          !dark ? "bg-zinc-900" : "from-white to-gray-100"
        } rounded-xl md:my-0 mb-5 justify-center items-center p-5 align-middle`}
      >
        <div className="w-[100%] md:w-[65%] my-5">
          <div className="mb-5">
            <button
              onClick={() => handleSectionToggle("features")}
              className={`text-2xl font-bebas underline hover:${
                !dark ? "text-blue-600" : "text-blue-500"
              } transition-colors ${!dark ? "text-white" : "text-gray-800"}`}
            >
              Features
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden`}
            >
              <ul className="">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className={`text-sm md:my-2 ${
                      !dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span
                      className={
                        !dark
                          ? "text-gray-300 block font-lcase"
                          : "text-gray-800 block font-lcase"
                      }
                    >
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <button
              onClick={() => handleSectionToggle("usage")}
              className={`text-2xl font-bebas underline hover:${
                !dark ? "text-blue-600" : "text-blue-500"
              } transition-colors ${!dark ? "text-white" : "text-gray-800"}`}
            >
              Tech / Tools
            </button>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden`}
            >
              <ul className=" flex flex-wrap">
                {tools.map((tool, index) => (
                  <li
                    key={index}
                    className={`text-lg my-1 ${
                      !dark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <span
                      className={`text-sm font-lcase ${
                        !dark ? "text-gray-200" : "text-gray-800"
                      } mr-1`}
                    >
                      {tool.name + ", "}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="md:w-[30%] md:p-2 flex flex-col items-center">
          {projectImage.map((imgObj, index) => (
            <img
              key={index}
              className={`border-2 h-[50%] w-auto mx-2 my-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                !dark ? "border-yellow-300" : "border-yellow-500"
              }`}
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
          className="fixed w-[100%] inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
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
