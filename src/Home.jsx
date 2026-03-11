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
              <div
                className={`flex items-center justify-around gap-2 rounded-2xl`}
              >
                <a
                  href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl transition-all hover:scale-110 ${dark ? "bg-gray-50 text-blue-700 hover:bg-blue-50" : "bg-neutral-800 text-gray-300 hover:text-blue-400"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://www.github.com/Ayush30s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl transition-all hover:scale-110 ${dark ? "bg-gray-50 text-gray-900 hover:bg-gray-200" : "bg-neutral-800 text-gray-300 hover:text-white"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="https://x.com/Ayush_Sri_30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl transition-all hover:scale-110 ${dark ? "bg-gray-50 text-gray-900 hover:bg-blue-50 hover:text-blue-500" : "bg-neutral-800 text-gray-300 hover:text-blue-400"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
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
      <ExtraActivity dark={dark} setDark={setDark} />
      <About dark={dark} setDark={setDark} />

      <Projects dark={dark} setDark={setDark} />
      <Contact dark={dark} setDark={setDark} />
    </div>
  );
};

export default Home;
