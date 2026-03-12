import React from "react";
// Import main images for each project
import artipedia from "../image/artipedia.png";
import harris from "../image/harris.png";
import gym1 from "../image/gym1.png";

const Projects = ({ dark, setDark }) => {
  const projects = [
    {
      title: "Artipedia – Decentralized OTT & Arts Platform",
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
      title: "Harris International – Enterprise Supply Chain Portal",
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
    // {
    //   title: "Full-Stack Gym Management Platform",
    //   shortDesc: (
    //     <div className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-left">
    //       <p>
    //         <strong>Live Links:</strong>{" "}
    //         <a
    //           href="https://gym-frontendnew-lnl5.vercel.app/"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="underline text-blue-500 hover:text-blue-400"
    //         >
    //           Frontend
    //         </a>{" "}
    //         |{" "}
    //         <a
    //           href="https://gym-backenddddd.vercel.app/"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="underline text-blue-500 hover:text-blue-400"
    //         >
    //           Backend
    //         </a>
    //       </p>
    //       <p>
    //         <strong>Project Overview:</strong> A scalable, full-stack web
    //         application designed to streamline gym operations, member
    //         management, and real-time engagement. Built with a modern JavaScript
    //         ecosystem, the platform features a highly responsive UI and a
    //         robust, service-oriented backend architecture capable of handling
    //         complex business logic, user authentication, and real-time data
    //         flow.
    //       </p>
    //       <div>
    //         <strong>Key Features & Accomplishments:</strong>
    //         <ul className="list-disc pl-4 md:pl-5 mt-2 space-y-1.5 md:space-y-2">
    //           <li>
    //             <strong>Service-Oriented Backend:</strong> Engineered a modular
    //             Node.js/Express backend utilizing a strict separation of
    //             concerns (Routes, Services, Models, Middleware). This
    //             architectural choice enhances code maintainability and allows
    //             for seamless future feature expansion.
    //           </li>
    //           <li>
    //             <strong>Real-Time Capabilities:</strong> Implemented WebSocket
    //             integrations to support live, bidirectional data flow between
    //             the server and clients (ideal for live class updates, instant
    //             notifications, or trainer-client messaging).
    //           </li>
    //           <li>
    //             <strong>Optimized Frontend Delivery:</strong> Leveraged React
    //             with Vite to dramatically reduce build times and ensure a highly
    //             performant, single-page application experience.
    //           </li>
    //           <li>
    //             <strong>Custom Middleware & Security:</strong> Developed custom
    //             server-side middleware for robust request interception, ensuring
    //             secure route protection and standardized data validation before
    //             database interactions.
    //           </li>
    //           <li>
    //             <strong>Responsive & Modern UI:</strong> Designed a fully
    //             responsive, utility-driven interface using Tailwind CSS,
    //             ensuring accessibility and a seamless user experience across
    //             mobile and desktop devices.
    //           </li>
    //           <li>
    //             <strong>Automated CI/CD Pipeline:</strong> Configured automated
    //             deployments to Vercel for both the frontend client and backend
    //             API, ensuring high availability and rapid iteration cycles.
    //           </li>
    //         </ul>
    //       </div>
    //       <div>
    //         <strong>Technical Capabilities Demonstrated:</strong>
    //         <ul className="list-disc pl-4 md:pl-5 mt-1.5 md:mt-2 space-y-1">
    //           <li>
    //             <strong>Frontend:</strong> React.js, Vite, Tailwind CSS,
    //             WebSockets.
    //           </li>
    //           <li>
    //             <strong>Backend:</strong> Node.js, Express.js, Custom
    //             Middleware, RESTful API Design.
    //           </li>
    //           <li>
    //             <strong>System Architecture:</strong> MVC Pattern, Service-Layer
    //             Abstraction, Real-time Event Handling.
    //           </li>
    //           <li>
    //             <strong>DevOps & Tooling:</strong> Git/GitHub, Vercel
    //             Deployment, PostCSS.
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   ),
    //   tools: [
    //     "React.js",
    //     "Node.js",
    //     "Express.js",
    //     "Vite",
    //     "Tailwind CSS",
    //     "WebSockets",
    //   ],
    //   link: "https://github.com/Ayush30s/ogduplicate",
    //   image: gym1,
    // },
  ];

  return (
    <div
      id="projects"
      className="pt-8 md:pt-10 w-[100%] md:w-[80%] px-4 sm:px-5 my-2 md:my-10 mx-auto"
    >
      {/* Header Section */}
      <div className="mb-12 md:mb-16 flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold border-b-4 pb-3 md:pb-4 inline-block ${
            dark
              ? "border-blue-600 text-gray-900"
              : "border-blue-500 text-white"
          }`}
        >
          Selected Projects
        </h1>
        <p
          className={`mt-3 md:mt-4 text-sm sm:text-base md:text-lg max-w-2xl ${dark ? "text-gray-600" : "text-gray-400"}`}
        >
          A ladder of my technical growth. Here are some of my most impactful
          full-stack builds and applications.
        </p>
      </div>

      {/* Ladder Layout Container */}
      <div className="flex flex-col gap-16 sm:gap-20 md:gap-32">
        {projects.map((project, index) => {
          // Determine if the layout should be reversed (Image on right, text on left)
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row md:items-start items-center gap-8 md:gap-16 group ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2 relative md:sticky md:top-32 h-max z-20">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative rounded-2xl overflow-hidden shadow-xl md:shadow-2xl transition-transform duration-500 group-hover:-translate-y-2"
                >
                  {/* Subtle Glow Effect Behind Image */}
                  <div
                    className={`absolute -inset-1 rounded-2xl blur opacity-30 transition duration-500 group-hover:opacity-60 ${dark ? "bg-blue-400" : "bg-blue-600"}`}
                  ></div>

                  <div
                    className={`relative rounded-2xl overflow-hidden border ${dark ? "border-gray-200" : "border-neutral-800"}`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-white/90 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base flex items-center gap-2 shadow-lg backdrop-blur-sm">
                        View Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Text Content Container */}
              <div
                className={`w-full md:w-1/2 relative flex flex-col ${isReversed ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}
              >
                {/* Background Numbering (e.g., 01, 02) */}
                <div
                  className={`absolute -top-12 sm:-top-16 md:-top-24 text-[80px] sm:text-[100px] md:text-[140px] lg:text-[180px] font-black leading-none opacity-5 select-none z-0 ${dark ? "text-black" : "text-white"} ${isReversed ? "md:-right-10" : "md:-left-10"}`}
                >
                  0{index + 1}
                </div>

                <div className="relative z-10 w-full">
                  <h3
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 ${dark ? "text-gray-900" : "text-white"}`}
                  >
                    {project.title}
                  </h3>

                  <div
                    className={`p-4 sm:p-5 md:p-6 rounded-2xl shadow-xl mb-4 md:mb-6 text-sm sm:text-base md:text-lg leading-relaxed border ${
                      dark
                        ? "bg-white/80 border-gray-100 text-gray-700 backdrop-blur-md"
                        : "bg-neutral-900/80 border-neutral-800 text-gray-300 backdrop-blur-md"
                    }`}
                  >
                    {project.shortDesc}
                  </div>

                  {/* Tech Stack Pills */}
                  <div
                    className={`flex flex-wrap gap-1.5 sm:gap-2 ${isReversed ? "md:justify-end" : "justify-start"}`}
                  >
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full border transition-colors ${
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
