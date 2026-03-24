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
      className={`flex flex-col justify-center items-center w-full min-h-screen transition-colors duration-500 ${
        dark
          ? "bg-[#F5F7FA] text-[#1E2A3A]" // Light theme: light background, dark text
          : "bg-[#182234] text-white" // Dark theme: dark background, white text
      }`}
    >
      {/* Hero Section */}
      <div
        id="home"
        className="flex flex-col justify-center items-start align-middle py-12 sm:py-20 md:py-28 w-[100%] md:w-[80%] px-4 sm:px-5 mx-auto transition-all duration-500 min-h-[70vh]"
      >
        <div className="flex flex-col-reverse md:flex-row justify-between text-center md:text-start items-center w-full lg:gap-16">
          {/* Text Content */}
          <div className="w-[100%] md:w-[60%] lg:w-[55%] flex flex-col justify-center items-center md:items-start space-y-4 sm:space-y-5 z-10">
            <h1
              className={`text-lg sm:text-xl md:text-2xl font-medium tracking-wide flex items-center gap-2 ${
                dark ? "text-[#5A6E8A]" : "text-[#A0B3D0]"
              }`}
            >
              <span className="w-8 h-[2px] bg-[#8597FA] inline-block hidden md:block"></span>
              Hello, I am
            </h1>

            <div
              className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight flex flex-row flex-wrap justify-center md:justify-start gap-3 sm:gap-4 ${
                dark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#5A6E8A] to-[#1E2A3A]"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-[#8597FA] to-[#A0B3D0]"
              }`}
            >
              <div className="flex flex-row">
                {"Ayush".split("").map((char, index) => (
                  <span
                    key={index}
                    className="hover:-translate-y-1 font-xl md:font-3xl sm:hover:-translate-y-2 transition-transform duration-200 cursor-default"
                  >
                    {char}
                  </span>
                ))}
              </div>
              <div className="flex flex-row">
                {"Srivastav".split("").map((char, index) => (
                  <span
                    key={index}
                    className="hover:-translate-y-1 font-xl md:font-3xl sm:hover:-translate-y-2 transition-transform duration-200 cursor-default"
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>

            <p
              className={`text-xl sm:text-2xl md:text-3xl font-semibold mt-2 ${
                dark ? "text-[#2C3E50]" : "text-[#E8EDFF]"
              }`}
            >
              Frontend - Software Developer at{" "}
              <a
                href="https://technobren.com"
                className={`relative inline-block group transition-colors ${
                  dark
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#5A6E8A] to-[#1E2A3A]"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-[#8597FA] to-[#A0B3D0]"
                }`}
              >
                Technobren Infotech Pvt.Ltd
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    dark
                      ? "bg-gradient-to-r from-[#5A6E8A] to-[#1E2A3A]"
                      : "bg-gradient-to-r from-[#8597FA] to-[#A0B3D0]"
                  }`}
                ></span>
              </a>
            </p>

            <p
              className={`text-base sm:text-lg font-medium tracking-wide ${
                dark ? "text-[#5A6E8A]" : "text-[#A0B3D0]"
              }`}
            >
              Full-Stack Developer | DSA Enthusiast
            </p>

            <p
              className={`text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl ${
                dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
              }`}
            >
              Welcome to my portfolio! I build scalable and high-performance
              applications with a strong foundation in system design and data
              structures.
              <span
                className={`font-semibold mt-3 block text-sm sm:text-base ${
                  dark
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#5A6E8A] to-[#1E2A3A]"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-[#8597FA] to-[#A0B3D0]"
                }`}
              >
                (Next.js, React, NestJS, TypeScript, PostgreSQL, AWS)
              </span>
            </p>

            {/* CTA & Socials */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
              <a
                href="https://drive.google.com/file/d/1SslY0cIdfxFiUcfGrzlgC___7Pz6E_wE/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-3.5 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg  text-white hover:shadow-[#7F00F0]/40 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#8597FA] focus:ring-offset-2 ${
                  dark
                    ? "focus:ring-offset-[#F5F7FA] bg-gradient-to-r from-[#9a9ac7] to-[#6a589c] "
                    : "focus:ring-offset-[#182234] bg-gradient-to-r from-[#4726a1] to-[#36178a]"
                }`}
              >
                View Resume
              </a>

              <div className="flex items-center gap-4">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:-translate-y-1 ${
                    dark
                      ? "bg-[#E8EDFF]/50 text-[#2C3E50] hover:bg-[#0A66C2] hover:text-white"
                      : "bg-white/10 text-[#C0D0F0] hover:bg-[#0A66C2] hover:text-white"
                  }`}
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
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

                {/* GitHub */}
                <a
                  href="https://www.github.com/Ayush30s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:-translate-y-1 ${
                    dark
                      ? "bg-[#E8EDFF]/50 text-[#2C3E50] hover:bg-[#1E2A3A] hover:text-white"
                      : "bg-white/10 text-[#C0D0F0] hover:bg-white hover:text-[#182234]"
                  }`}
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
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

                {/* X (Twitter) */}
                <a
                  href="https://x.com/Ayush_Sri_30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 hover:-translate-y-1 ${
                    dark
                      ? "bg-[#E8EDFF]/50 text-[#2C3E50] hover:bg-[#1E2A3A] hover:text-white"
                      : "bg-white/10 text-[#C0D0F0] hover:bg-white hover:text-[#182234]"
                  }`}
                  aria-label="X (Twitter)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
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

          {/* Profile Image */}
          <div className="relative group w-[65%] sm:w-[45%] md:w-[35%] lg:w-[30%] mx-auto mb-10 md:mb-0">
            {/* Glowing Aura Background */}
            <div
              className={`absolute -inset-2 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-700 ${
                dark
                  ? "bg-gradient-to-br from-[#8597FA] to-[#A0B3D0]"
                  : "bg-gradient-to-br from-[#5e627a] to-[#0a090c]"
              }`}
            ></div>
            <img
              className={`relative w-full aspect-square border-4 rounded-full object-cover z-10 transition-all duration-500 group-hover:scale-[1.03] ${
                dark
                  ? "border-white shadow-2xl"
                  : "border-[#2A3A4A] shadow-2xl shadow-[#8597FA]/20"
              }`}
              src={coder}
              alt="Ayush Srivastav Profile"
            />
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-4 md:right-8 flex flex-col gap-3 z-50">
        <button
          onClick={setTheme}
          aria-label="Toggle Theme"
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
            !dark
              ? "bg-[#2A3A4A]/80 border border-white/20 hover:bg-[#3A4A5A]"
              : "bg-white/80 border border-[#E8EDFF] hover:bg-white"
          }`}
        >
          <img
            className="w-5 rounded-full h-5 sm:w-6 sm:h-6"
            src={dark ? darkimg : lightimg}
            alt="Toggle Theme"
          />
        </button>
        <a
          href="#home"
          aria-label="Scroll to top"
          className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
            !dark
              ? "bg-[#2A3A4A]/80 border border-white/20 hover:bg-[#3A4A5A]"
              : "bg-white/80 border border-[#E8EDFF] hover:bg-white"
          }`}
        >
          <img
            className="w-5 rounded-full h-5 sm:w-6 sm:h-6"
            src={up}
            alt="Scroll to top"
          />
        </a>
      </div>

      {/* Other Sections */}
      <div className="w-full flex flex-col gap-4 md:gap-10 sm:pb-20">
        <ExtraActivity dark={dark} setDark={setDark} />
        <About dark={dark} setDark={setDark} />
        <Projects dark={dark} setDark={setDark} />
        <Contact dark={dark} setDark={setDark} />
      </div>
    </div>
  );
};

export default Home;
