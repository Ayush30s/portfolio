import React, { useState } from "react";
import pro from "../image/pro.jpg";
import ln from "../image/ln2.png";
import git from "../image/github.png";
import x from "../image/x.png";
import lightimg from "../image/light.png";
import darkimg from "../image/dark.png";
import up from "../image/up.png";
import coder from "../image/coder.webp";


import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import ExtraActivity from "./activity";

const Home = ({ d, setD }) => {
  const [dark, setDark] = useState(d); // Initialize dark mode based on prop

  const setTheme = () => {
    const newDark = !dark;
    setD(newDark); // Update parent state
    setDark(newDark); // Update local state
  };

  return (
    <div id="home" className="flex flex-col justify-center items-center w-full">
      <div
        className={`bg-gradient-to-b ${
          dark
            ? "from-white to-gray-300 text-gray-800  rounded-none"
            : "from-gray-600 to-black text-white"
        } md:rounded-xl flex flex-col justify-center items-start align-middle py-16 w-[100%] md:w-[70%] md:mt-14 transition-colors duration-300`}
      >
        <div
          className={`fixed bottom-4 md:right-10 left right-[40%] flex flex-row z-30 ${
            !dark ? "bg-[#252626]" : "bg-gray-300"
          }  px-2 py-1 rounded-2xl`}
        >
          <button onClick={setTheme}>
            <img
              className=" m-1 rounded-full w-5"
              src={dark ? darkimg : lightimg}
              alt="Toggle Theme"
            />
          </button>

          <a href="#home">
            <img className="m-1 rounded-full w-5" src={up} alt="to top" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-center text-center md:text-start items-center md:mt-12 mt-6">
          <div className="w-[90%] md:w-[60%] flex flex-col justify-center  items-center md:items-start">
            <h1 className="text-[20px] font-bebas">
              {!dark ? "I am," : "I am,"}
            </h1>
            <div
              className={`text-[50px] cursor-pointer font-bebas flex flex-col md:items-start items-center md:flex-row  ${
                dark ? "text-blue-600" : "text-yellow-400"
              }`}
            >
              <div className="flex flex-row">
                <h1 className="hover:animate-bounce">A</h1>
                <h1 className="hover:animate-bounce">y</h1>
                <h1 className="hover:animate-bounce">u</h1>
                <h1 className="hover:animate-bounce">s</h1>
                <h1 className="hover:animate-bounce">h</h1>
                <h1 className="mx-1"></h1>
              </div>

              <div className="flex flex-row">
                <h1 className="hover:animate-bounce">S</h1>
                <h1 className="hover:animate-bounce">r</h1>
                <h1 className="hover:animate-bounce">i</h1>
                <h1 className="hover:animate-bounce">v</h1>
                <h1 className="hover:animate-bounce">a</h1>
                <h1 className="hover:animate-bounce">s</h1>
                <h1 className="hover:animate-bounce">t</h1>
                <h1 className="hover:animate-bounce">a</h1>
                <h1 className="hover:animate-bounce">v</h1>
              </div>
            </div>
            <p className="text-2xl mb-5 font-montserrat">{`Full-Stack Developer | DSA Enthusiast`}</p>
            <p
              className={`font-lcase font-light ${dark ? "text-gray-600" : ""}`}
            >
              Welcome to my portfolio! I'm a passionate full-stack developer
              with a strong foundation in data structures and algorithms. I
              specialize in building dynamic and responsive web applications
              using the MERN stack (MongoDB, Express, React, Node.js).
            </p>
            <div className="flex md:flex-row flex-col justify-center items-center w-[80%] md:w-[50%] mt-4 mb-2">
              <a
                href="https://drive.google.com/file/d/1GUYNao8tgtupHPqR3CBL972n_oxzYC-Y/view?usp=sharing"
                className={`px-4 py-1 md:my-0 my-3 mr-5 text-sm rounded-sm bg-transparent border ${!dark ? "text-white border-white" : " text-black border-black"} hover:bg-blue-700`}
              >
                Resume
              </a>

              <div className="flex md:my-0 my-3 flex-row justify-evenly items-center">
                <a
                  className="w-[20%] md:w-[26%]"
                  href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
                >
                  <img
                    className={`w-[80%] md:w-[60%] rounded-full m-1 border border-white ${
                      dark ? "hover:border-blue-600" : "hover:border-gray-400"
                    }`}
                    src={ln}
                    alt="LinkedIn"
                  />
                </a>
                <a
                  className="w-[20%] md:w-[25%] mr-2"
                  href="https://www.github.com/Ayush30s"
                >
                  <img
                    className={`w-[80%] md:w-[60%] rounded-full m-1 border border-white ${
                      dark ? "hover:border-blue-600" : "hover:border-gray-400"
                    }`}
                    src={git}
                    alt="github"
                  />
                </a>
                <a className="w-[20%] md:w-[25%] " href="https://x.com/Ayush_Sri_30?s=09">
                  <img
                    className={`w-[80%] md:w-[60%] rounded-full m-1 border border-white ${
                      dark ? "hover:border-blue-600" : "hover:border-gray-400"
                    }`}
                    src={x}
                    alt="x"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Image visible only on medium and larger screens */}
          <img
            className={`hidden md:block md:w-[20%] mx-10 border-2 ${
              dark
                ? "border-gray-300 shadow-md shadow-gray-400"
                : "border-white shadow-lg shadow-black"
            } rounded-full`}
            src={coder}
            alt="Profile"
          />
        </div>
      </div>

      <Projects dark={dark} setDark={setDark} />
      <ExtraActivity dark={dark} setDark={setDark} />
      <About dark={dark} setDark={setDark} />
      <Contact dark={dark} setDark={setDark} />
    </div>
  );
};

export default Home;
