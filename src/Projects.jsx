import React, { useState } from "react";
// Import main images for each project
import artipedia from "../image/artipedia.png";
import harris from "../image/harris.png";
import gym1 from "../image/gym1.png";

const Projects = ({ dark, setDark }) => {
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleExpand = (projectId) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  const projects = [
    {
      id: 1,
      title: "Artipedia –  OTT & Arts Platform (Client)",
      shortDesc: (
        <div className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-left">
          <p>
            <strong>Role:</strong> Full-Stack Web Developer (Core OTT
            Infrastructure) <br />
            <strong>Organization:</strong> Artfi Group
          </p>
          <p>
            <strong>Project Overview:</strong> A cutting-edge web-based OTT
            (Over-The-Top) service and decentralized social network designed
            specifically for the global arts community. Blending
            high-performance video streaming with blockchain-ready architecture,
            the platform empowers creators and partners to distribute, monetize,
            and track digital media securely.
          </p>
          <div>
            <strong>Key Features & Accomplishments:</strong>
            <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1.5 md:space-y-2">
              <li>
                <strong>Full-Stack Web Architecture:</strong> Spearheaded the
                development of the core web-based video streaming
                infrastructure, optimizing data delivery between the NestJS
                backend and the Next.js frontend.
              </li>
              <li>
                <strong>Cloud Infrastructure & Caching:</strong> Integrated{" "}
                <strong>Redis</strong> for high-performance data caching and
                architected a robust cloud environment using{" "}
                <strong>AWS (EC2, S3, CloudFront, IAM)</strong> to ensure
                globally optimized, low-latency media delivery and secure,
                scalable storage.
              </li>
              <li>
                <strong>Complex Backend Systems:</strong> Architected a secure
                backend using NestJS and Prisma. Implemented robust database
                transactions, multi-tier user authentication, and secure API
                endpoints to handle heavy media payloads.
              </li>
              <li>
                <strong>Advanced Web Video Playback:</strong> Engineered a
                highly responsive web application using React and Next.js. Built
                custom video player interfaces featuring interactive overlays
                and highly optimized media rendering.
              </li>
              <li>
                <strong>Creator & Partner Dashboards:</strong> Developed
                comprehensive frontend dashboards that provide content creators
                with granular analytics, video management tools, and secure
                upload pipelines.
              </li>
            </ul>
          </div>
          <div>
            <strong>Technical Capabilities Demonstrated:</strong>
            <ul className="list-disc pl-4 md:pl-5 mt-1.5 md:mt-2 space-y-1">
              <li>
                <strong>Frontend (Web):</strong> Next.js, React.js, Tailwind
                CSS.
              </li>
              <li>
                <strong>Backend & Database:</strong> NestJS, Prisma ORM,
                PostgreSQL, Redis.
              </li>
              <li>
                <strong>Cloud & Infrastructure:</strong> AWS (EC2, S3,
                CloudFront, IAM).
              </li>
              <li>
                <strong>Architecture:</strong> MVC, RESTful API Design, JWT
                Authentication.
              </li>
            </ul>
          </div>
        </div>
      ),
      tools: [
        "Next.js",
        "React",
        "NestJS",
        "Redis",
        "AWS",
        "PostgreSQL",
        "Tailwind CSS",
      ],
      link: "https://artipedia.art",
      image: artipedia,
    },
    {
      id: 2,
      title: "Harris International – Supply Chain Portal (Client)",
      shortDesc: (
        <div className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-left">
          <p>
            <strong>Role:</strong> Frontend Developer <br />
            <strong>Organization:</strong> Technobren Infotech Pvt. Ltd.
          </p>
          <p>
            <strong>Project Overview:</strong> A comprehensive enterprise web
            application designed to streamline the manufacturing, logistics, and
            distribution pipeline. The platform empowers the organization and
            its workforce to efficiently track product lifecycles from
            production and loading to shipping and unloading, facilitating
            seamless operations between distributors, salesmen, and end
            customers.
          </p>
          <div>
            <strong>Key Features & Accomplishments:</strong>
            <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1.5 md:space-y-2">
              <li>
                <strong>End-to-End Logistics Tracking:</strong> Developed
                intuitive, real-time UI components to monitor the status of
                products through complex production, shipping, and delivery
                phases.
              </li>
              <li>
                <strong>Role-Based Dashboards:</strong> Engineered tailored
                frontend dashboards for different user tiers (factory workers,
                logistics managers, distributors, and salesmen) to ensure
                secure, context-specific data access.
              </li>
              <li>
                <strong>Optimized Data Management:</strong> Utilized modern
                React/Next.js practices to handle complex data grids and robust
                state management, ensuring smooth frontend performance even with
                large-scale inventory datasets.
              </li>
              <li>
                <strong>Responsive Field UI:</strong> Crafted a highly
                responsive, mobile-first interface using Tailwind CSS, allowing
                salesmen and drivers to seamlessly update shipping and unloading
                statuses on the go from any device.
              </li>
            </ul>
          </div>
          <div>
            <strong>Technical Capabilities Demonstrated:</strong>
            <ul className="list-disc pl-4 md:pl-5 mt-1.5 md:mt-2 space-y-1">
              <li>
                <strong>Frontend:</strong> Next.js, React.js, Tailwind CSS,
                Redux.
              </li>
              <li>
                <strong>Architecture:</strong> Component-Driven UI, Responsive
                Design, Complex State Management.
              </li>
              <li>
                <strong>Domain Integration:</strong> Supply Chain Logistics,
                Role-Based Access Control (RBAC), REST API Integration.
              </li>
            </ul>
          </div>
        </div>
      ),
      tools: ["React.js", "Next.js", "Tailwind CSS", "Redux", "REST APIs"],
      link: "https://hariss-international-v2.vercel.app/petitclaim",
      image: harris,
    },
    {
      id: 3,
      title: "Full-Stack Gym Management Platform (Personal)",
      shortDesc: (
        <div className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-left">
          <p>
            <strong>Live Links:</strong>{" "}
            <a
              href="https://gym-frontendnew-lnl5.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#8597FA] hover:text-[#7F00F0]"
            >
              Frontend
            </a>{" "}
            |{" "}
            <a
              href="https://gym-backenddddd.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#8597FA] hover:text-[#7F00F0]"
            >
              Backend
            </a>
          </p>
          <p>
            <strong>Project Overview:</strong> A scalable, full-stack web
            application designed to streamline gym operations, member
            management, and real-time engagement. Built with a modern JavaScript
            ecosystem, the platform features a highly responsive UI and a
            robust, service-oriented backend architecture capable of handling
            complex business logic, user authentication, and real-time data
            flow.
          </p>
          <div>
            <strong>Key Features & Accomplishments:</strong>
            <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1.5 md:space-y-2">
              <li>
                <strong>Service-Oriented Backend:</strong> Engineered a modular
                Node.js/Express backend utilizing a strict separation of
                concerns (Routes, Services, Models, Middleware). This
                architectural choice enhances code maintainability and allows
                for seamless future feature expansion.
              </li>
              <li>
                <strong>Real-Time Capabilities:</strong> Implemented WebSocket
                integrations to support live, bidirectional data flow between
                the server and clients (ideal for live class updates, instant
                notifications, or trainer-client messaging).
              </li>
              <li>
                <strong>Optimized Frontend Delivery:</strong> Leveraged React
                with Vite to dramatically reduce build times and ensure a highly
                performant, single-page application experience.
              </li>
              <li>
                <strong>Custom Middleware & Security:</strong> Developed custom
                server-side middleware for robust request interception, ensuring
                secure route protection and standardized data validation before
                database interactions.
              </li>
              <li>
                <strong>Responsive & Modern UI:</strong> Designed a fully
                responsive, utility-driven interface using Tailwind CSS,
                ensuring accessibility and a seamless user experience across
                mobile and desktop devices.
              </li>
              <li>
                <strong>Automated CI/CD Pipeline:</strong> Configured automated
                deployments to Vercel for both the frontend client and backend
                API, ensuring high availability and rapid iteration cycles.
              </li>
            </ul>
          </div>
          <div>
            <strong>Technical Capabilities Demonstrated:</strong>
            <ul className="list-disc pl-4 md:pl-5 mt-1.5 md:mt-2 space-y-1">
              <li>
                <strong>Frontend:</strong> React.js, Vite, Tailwind CSS,
                WebSockets.
              </li>
              <li>
                <strong>Backend:</strong> Node.js, Express.js, Custom
                Middleware, RESTful API Design.
              </li>
              <li>
                <strong>System Architecture:</strong> MVC Pattern, Service-Layer
                Abstraction, Real-time Event Handling.
              </li>
              <li>
                <strong>DevOps & Tooling:</strong> Git/GitHub, Vercel
                Deployment, PostCSS.
              </li>
            </ul>
          </div>
        </div>
      ),
      tools: [
        "React.js",
        "Node.js",
        "Express.js",
        "Vite",
        "Tailwind CSS",
        "WebSockets",
      ],
      link: "https://github.com/Ayush30s/ogduplicate",
      image: gym1,
    },
  ];

  // Function to truncate content for preview
  const getPreviewContent = (content) => {
    // Convert JSX to string for preview (simplified approach)
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(content);
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.substring(0, 300) + "...";
  };

  return (
    <div
      id="projects"
      className={`pt-8 md:pt-10 w-[100%] md:w-[80%] px-4 sm:px-5 my-2 md:my-10 mx-auto transition-all duration-500 ${
        dark ? "text-[#1E2A3A]" : "text-white"
      }`}
    >
      {/* Header Section */}
      <div className="mb-12 md:mb-16 flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold border-b-4 pb-3 md:pb-4 inline-block transition-all duration-300 ${
            dark
              ? "border-[#8597FA] text-[#1E2A3A]"
              : "border-[#8597FA] text-white"
          }`}
        >
          Selected Projects
        </h1>
        <p
          className={`mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-2xl transition-colors duration-300 ${
            dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"
          }`}
        >
          A ladder of my technical growth. Here are some of my most impactful
          full-stack builds and applications.
        </p>
      </div>

      {/* Ladder Timeline Container */}
      <div className="relative py-8">
        {/* Left Side Ladder Line */}
        <div
          className={`absolute left-8 top-0 w-0.5 h-full transition-all duration-500 ${
            dark
              ? "bg-gradient-to-b from-[#8597FA] via-[#A0B3D0] to-[#8597FA]"
              : "bg-gradient-to-b from-[#8597FA] via-[#7F00F0] to-[#8597FA]"
          }`}
          style={{ height: "calc(100% - 4rem)" }}
        ></div>

        {projects.map((project, index) => {
          const isExpanded = expandedProjects[project.id];

          return (
            <div
            key={project.id}
            className={`relative flex flex-col items-end mb-12 animate-fadeInUp ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Timeline Point */}
              <div className="absolute left-8 transform -translate-x-1/2 flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 hover:scale-110 ${
                    dark
                      ? "bg-[#8597FA] shadow-lg shadow-[#8597FA]/30"
                      : "bg-gradient-to-r from-[#8597FA] to-[#7F00F0] shadow-lg shadow-[#8597FA]/50"
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                </div>
              </div>

              {/* Content Container */}
              <div className="ml-20 w-full">
                <div
                  className={`p-5 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 hover:shadow-2xl ${
                    dark
                      ? "bg-[#F5F7FA] border-[#E8EDFF] hover:shadow-[#8597FA]/20"
                      : "bg-[#1E2A3A] border-[#2A3A4A] hover:shadow-[#8597FA]/30"
                  }`}
                >
                  <div className="flex flex-row justify-content-center align-middle gap-2">
                    <span
                      className={`text-xl sm:text-4xl font-black opacity-20 select-none ${
                        dark ? "text-[#1E2A3A]" : "text-white"
                      }`}
                    >
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    {/* Project Title */}
                    <h2
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
                        dark ? "text-[#1E2A3A]" : "text-white"
                      }`}
                    >
                      {project.title}
                    </h2>
                  </div>

                  {/* Project Image */}
                  {/* <div className="mb-6">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div
                        className={`absolute -inset-1 rounded-xl blur opacity-30 transition duration-500 group-hover:opacity-60 ${
                          dark ? "bg-[#8597FA]" : "bg-[#8597FA]"
                        }`}
                      ></div>
                      <div
                        className={`relative rounded-xl overflow-hidden border ${
                          dark ? "border-[#E8EDFF]" : "border-[#2A3A4A]"
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </a>
                  </div> */}

                  {/* Project Description with See More */}
                  <div className="mb-4">
                    <div
                      className={`text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-500 ${
                        !isExpanded ? "max-h-48 overflow-hidden relative" : ""
                      }`}
                    >
                      <div
                        className={dark ? "text-[#5A6E8A]" : "text-[#C0D0F0]"}
                      >
                        {project.shortDesc}
                      </div>

                      {!isExpanded && (
                        <div
                          className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${
                            dark
                              ? "from-[#F5F7FA] to-transparent"
                              : "from-[#1E2A3A] to-transparent"
                          }`}
                        ></div>
                      )}
                    </div>

                    {/* See More Button */}
                    <button
                      onClick={() => toggleExpand(project.id)}
                      className={`mt-3 flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3 ${
                        dark ? "text-[#8597FA]" : "text-[#8597FA]"
                      }`}
                    >
                      {isExpanded ? (
                        <>
                          <span>Show Less</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <span>See More</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-all duration-300 hover:scale-105 ${
                          dark
                            ? "bg-white text-[#1E2A3A] border-[#E8EDFF] hover:shadow-md"
                            : "bg-[#2A3A4A] text-[#C0D0F0] border-[#3A4A5A] hover:bg-[#3A4A5A]"
                        }`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:gap-3 ${
                        dark
                          ? "bg-gradient-to-r from-[#8597FA] to-[#A0B3D0] text-white hover:shadow-lg"
                          : "bg-gradient-to-r from-[#8597FA] to-[#7F00F0] text-white hover:shadow-lg"
                      }`}
                    >
                      <span>View Project</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polygon points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Projects;
