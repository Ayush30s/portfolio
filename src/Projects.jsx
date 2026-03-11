import React from "react";
// Import main images for each project
import gym1 from "../image/gym1.png";
import portfolio1 from "../image/portfolio1.png";
import bb from "../image/bb.png";
import ccc from "../image/ccc.png";
import ffff from "../image/ffff.png";

const Projects = ({ dark, setDark }) => {
  const projects = [
    {
      title: "GYM Management Platform",
      shortDesc:
        "A comprehensive full-stack platform featuring role-based dashboards, an AI-powered training assistant integrated via OpenAI, and real-time social networking capabilities using Socket.IO.",
      tools: ["React", "Express.js", "MongoDB", "Socket.IO", "OpenAI"],
      link: "https://github.com/Ayush30s/ogduplicate",
      image: gym1,
    },
    {
      title: "Food Ordering Platform",
      shortDesc:
        "Built a production-grade UI with advanced filters, real-time cart systems powered by Redux, lazy-loaded menus for optimal performance, and live Swiggy API integration.",
      tools: ["React", "Redux", "Tailwind CSS", "Context API"],
      link: "https://github.com/Ayush30s/Restaurant-App",
      image: bb,
    },
    {
      title: "Video Conferencing App",
      shortDesc:
        "Engineered a peer-to-peer video calling application using WebRTC and Socket.io. Maintained latency under 500ms globally with a 98% connection success rate.",
      tools: ["WebRTC", "Socket.io", "Node.js", "React"],
      link: "https://github.com/Ayush30s/fullstackvideocallapp",
      image: ccc,
    },
    {
      title: "My Portfolio",
      shortDesc:
        "A highly responsive, modern developer portfolio featuring dark/light mode toggling, seamless EmailJS contact forms, and fluid glassmorphism UI components.",
      tools: ["React", "Tailwind CSS", "EmailJS"],
      link: "https://github.com/Ayush30s/portfolio",
      image: portfolio1,
    },
    {
      title: "Wordle Game",
      shortDesc:
        "An interactive, browser-based word-guessing game with real-time character matching feedback and custom hooks to detect user online/offline status.",
      tools: ["React", "Tailwind CSS"],
      link: "https://github.com/Ayush30s/wordleGame2",
      image: ffff,
    },
  ];

  return (
    <div id="projects" className="pt-10 w-[100%] md:w-[80%] px-5 my-10 mx-auto">
      {/* Header Section */}
      <div className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-4xl md:text-5xl font-bold border-b-4 pb-4 inline-block ${
            dark ? "border-blue-600 text-gray-900" : "border-blue-500 text-white"
          }`}
        >
          Selected Projects
        </h1>
        <p className={`mt-4 text-lg max-w-2xl ${dark ? "text-gray-600" : "text-gray-400"}`}>
          A ladder of my technical growth. Here are some of my most impactful full-stack builds and applications.
        </p>
      </div>

      {/* Ladder Layout Container */}
      <div className="flex flex-col gap-20 md:gap-32">
        {projects.map((project, index) => {
          // Determine if the layout should be reversed (Image on right, text on left)
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 group ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Container (Left side on even, Right side on odd) */}
              <div className="w-full md:w-1/2 relative">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  {/* Subtle Glow Effect Behind Image */}
                  <div className={`absolute -inset-1 rounded-2xl blur opacity-30 transition duration-500 group-hover:opacity-60 ${dark ? "bg-blue-400" : "bg-blue-600"}`}></div>
                  
                  <div className={`relative rounded-2xl overflow-hidden border ${dark ? "border-gray-200" : "border-neutral-800"}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-white/90 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                        View Code
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Text Content Container */}
              <div className={`w-full md:w-1/2 relative flex flex-col ${isReversed ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                
                {/* Background Numbering (e.g., 01, 02) */}
                <div className={`absolute -top-16 md:-top-24 text-[120px] md:text-[180px] font-black leading-none opacity-5 select-none z-0 ${dark ? "text-black" : "text-white"} ${isReversed ? "md:-right-10" : "md:-left-10"}`}>
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? "text-gray-900" : "text-white"}`}>
                    {project.title}
                  </h3>
                  
                  <div className={`p-6 rounded-2xl shadow-xl mb-6 text-base md:text-lg leading-relaxed border ${
                    dark 
                      ? "bg-white/80 border-gray-100 text-gray-700 backdrop-blur-md" 
                      : "bg-neutral-900/80 border-neutral-800 text-gray-300 backdrop-blur-md"
                  }`}>
                    {project.shortDesc}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className={`flex flex-wrap gap-2 ${isReversed ? "md:justify-end" : "justify-start"}`}>
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors ${
                          dark
                            ? "bg-gray-100 text-blue-700 border-gray-200 hover:bg-blue-100"
                            : "bg-neutral-800 text-blue-300 border-neutral-700 hover:bg-neutral-700"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;