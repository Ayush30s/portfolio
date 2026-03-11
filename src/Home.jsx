import React, { useState } from "react";
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
  const [dark, setDark] = useState(d);

  const setTheme = () => {
    const newDark = !dark;
    setD(newDark);
    setDark(newDark);
  };

  return (
    <div
      id="home"
      className={`flex flex-col justify-center items-center w-full transition-colors duration-500 ${dark ? "bg-gray-50" : "bg-neutral-950"}`}
    >
      <div
        className={`flex flex-col justify-center items-start align-middle py-12 md:py-20 w-[100%] md:w-[75%] md:mt-10 transition-all duration-500`}
      >
        <div className="flex flex-col-reverse md:flex-row justify-center text-center md:text-start items-center mt-5 md:mt-12 gap-8">
          <div className="w-[90%] md:w-[60%] flex flex-col justify-center items-center md:items-start space-y-4">
            <h1
              className={`text-xl md:text-2xl font-medium tracking-wide ${dark ? "text-gray-600" : "text-gray-400"}`}
            >
              Hello, I am
            </h1>
            <div
              className={`text-5xl md:text-7xl font-bold tracking-tight flex flex-col md:flex-row md:items-start items-center gap-2 md:gap-4 ${
                dark ? "text-blue-600" : "text-blue-400"
              }`}
            >
              <div className="flex flex-row">
                {"Ayush".split("").map((char, index) => (
                  <h1
                    key={index}
                    className="hover:-translate-y-2 transition-transform duration-200 cursor-default"
                  >
                    {char}
                  </h1>
                ))}
              </div>
              <div className="flex flex-row">
                {"Srivastav".split("").map((char, index) => (
                  <h1
                    key={index}
                    className="hover:-translate-y-2 transition-transform duration-200 cursor-default"
                  >
                    {char}
                  </h1>
                ))}
              </div>
            </div>

            <p
              className={`text-xl md:text-2xl font-semibold ${dark ? "text-gray-800" : "text-gray-200"}`}
            >
              Software Developer – Frontend at{" "}
              <a
                href="#"
                className="underline decoration-blue-500 underline-offset-4 hover:text-blue-500 transition-colors"
              >
                Technobren Infotech
              </a>
            </p>

            <p
              className={`text-lg ${dark ? "text-gray-600" : "text-gray-400"}`}
            >
              Full-Stack Developer | DSA Enthusiast
            </p>

            <p
              className={`text-base leading-relaxed ${dark ? "text-gray-600" : "text-gray-300"}`}
            >
              Welcome to my portfolio! I build scalable and high-performance
              applications with a strong foundation in system design and data
              structures.
              <br />
              <span className="font-semibold mt-2 block text-blue-500">
                (Next.js, React, NestJS, TypeScript, PostgreSQL, AWS)
              </span>
            </p>

            <div className="flex flex-col md:flex-row justify-start items-center w-full gap-6 mt-6">
              <a
                href="https://drive.google.com/file/d/1i3JGyHRiKZAoycZIXREVq8kHstK37hdW/view?usp=drive_link"
                className={`px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/30 ${
                  !dark
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                View Resume
              </a>

              <div className="flex flex-row justify-center items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
                  className="hover:scale-110 transition-transform"
                >
                  <img
                    className={`w-10 h-10 rounded-full border-2 ${dark ? "border-gray-300" : "border-gray-700"}`}
                    src={ln}
                    alt="LinkedIn"
                  />
                </a>
                <a
                  href="https://www.github.com/Ayush30s"
                  className="hover:scale-110 transition-transform"
                >
                  <img
                    className={`w-10 h-10 rounded-full border-2 ${dark ? "border-gray-300" : "border-gray-700"}`}
                    src={git}
                    alt="github"
                  />
                </a>
                <a
                  href="https://x.com/Ayush_Sri_30"
                  className="hover:scale-110 transition-transform"
                >
                  <img
                    className={`w-10 h-10 rounded-full border-2 ${dark ? "border-gray-300" : "border-gray-700"}`}
                    src={x}
                    alt="x"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="relative group w-[50%] md:w-[25%] mx-auto">
            <div
              className={`absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${dark ? "bg-blue-400" : "bg-blue-600"}`}
            ></div>
            <img
              className={`relative w-full border-4 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                dark ? "border-white shadow-xl" : "border-gray-800 shadow-2xl"
              }`}
              src={coder}
              alt="Profile"
            />
          </div>
        </div>
      </div>

      <div className={`fixed bottom-6 right-6 flex flex-col gap-3 z-50`}>
        <button
          onClick={setTheme}
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-transform hover:scale-110 ${!dark ? "bg-white/10 border border-white/20" : "bg-black/5 border border-black/10"}`}
        >
          <img
            className="w-6 h-6"
            src={dark ? darkimg : lightimg}
            alt="Toggle Theme"
          />
        </button>
        <a
          href="#home"
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-transform hover:scale-110 ${!dark ? "bg-white/10 border border-white/20" : "bg-black/5 border border-black/10"}`}
        >
          <img className="w-6 h-6" src={up} alt="to top" />
        </a>
      </div>

      <Projects dark={dark} setDark={setDark} />
      <ExtraActivity dark={dark} setDark={setDark} />
      <About dark={dark} setDark={setDark} />
      <Contact dark={dark} setDark={setDark} />
    </div>
  );
};

export default Home;
