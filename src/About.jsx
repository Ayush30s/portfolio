import React from "react";
import node from "../image/node2.png";
import mongo from "../image/mongo2.png";
import express from "../image/exp2.png";
import jwt from "../image/jwt2.png";
import react from "../image/react2.png";
import firebase from "../image/firebase2.png";
import redux from "../image/redux2.png";
import socket from "../image/socket.png";
import tailwind from "../image/tail2.png";
import github from "../image/github2.jpg";
import profile from "../image/profile.jpg";
import web from "../image/web.jpeg";

import prisma from "../image/prisma.png";
import aws from "../image/aws.png";
import nestjs from "../image/nestjs.png";

const About = ({ dark, setDark }) => {
  const techStack = [
    { src: react, label: "React/Next.js" },
    { src: nestjs, label: "NestJS" },
    { src: node, label: "Node.js" },
    { src: aws, label: "AWS" },
    { src: prisma, label: "Prisma" },
    { src: mongo, label: "MongoDB" },
    { src: express, label: "Express" },
    { src: tailwind, label: "Tailwind CSS" },
    { src: redux, label: "Redux" },
    { src: jwt, label: "JWT" },
    { src: socket, label: "Socket.io" },
    { src: web, label: "WebRTC" },
    { src: github, label: "GitHub" },
    { src: firebase, label: "Firebase" },
  ];

  return (
    <div
      id="about"
      className={`w-[100%] md:w-[80%] mx-auto px-5 my-20 rounded-2xl flex flex-col gap-8 ${!dark ? "text-gray-200" : "text-gray-800"}`}
    >
      <style>
        {`
          @keyframes infiniteScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            animation: infiniteScroll 35s linear infinite;
            width: max-content;
          }
        `}
      </style>

      <div className="mb-4 flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-4xl md:text-5xl font-bold border-b-4 pb-4 inline-block ${dark ? "border-blue-600 text-gray-900" : "border-blue-500 text-white"}`}
        >
          About Me
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div
          className={`flex-[2] rounded-3xl p-8 md:p-10 flex flex-col justify-center gap-5 leading-relaxed text-lg border transition-shadow duration-300 ${!dark ? "bg-neutral-900 border-neutral-800 shadow-xl" : "bg-white border-gray-100 shadow-2xl"}`}
        >
          <h2
            className={`text-3xl font-bold ${dark ? "text-gray-900" : "text-white"}`}
          >
            I am Ayush Srivastav
          </h2>
          <p className="opacity-90">
            A Software Developer with a deep passion for scalable architecture,
            performance optimization, and creating seamless user experiences.
          </p>
          <p className="opacity-90">
            With a BCA and solid experience in building large-scale
            decentralized applications and robust backends, I leverage modern
            tools like{" "}
            <b className={dark ? "text-blue-600" : "text-blue-400"}>
              Next.js, NestJS, AWS, and PostgreSQL
            </b>{" "}
            to build maintainable, high-performance software.
          </p>
        </div>

        <div
          className={`flex-1 rounded-3xl flex justify-center items-center p-8 border ${!dark ? "bg-neutral-900 border-neutral-800 shadow-xl" : "bg-white border-gray-100 shadow-2xl"}`}
        >
          <div className="relative group">
            <div
              className={`absolute -inset-3 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-500 ${dark ? "bg-blue-400" : "bg-blue-600"}`}
            ></div>
            <img
              className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full object-cover border-4 border-transparent shadow-inner"
              src={profile}
              alt="Ayush Srivastav"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div
          className={`flex-1 rounded-3xl text-center flex flex-col p-10 justify-center items-center border ${!dark ? "bg-neutral-900 border-neutral-800 shadow-xl" : "bg-white border-gray-100 shadow-2xl"}`}
        >
          <h1
            className={`text-6xl font-black mb-3 ${dark ? "text-blue-600" : "text-blue-400"}`}
          >
            10+
          </h1>
          <p className="font-semibold tracking-widest uppercase text-sm opacity-70">
            Completed Projects
          </p>
        </div>

        <div
          className={`flex-1 rounded-3xl text-center flex flex-col p-10 justify-center items-center border ${!dark ? "bg-neutral-900 border-neutral-800 shadow-xl" : "bg-white border-gray-100 shadow-2xl"}`}
        >
          <h1
            className={`text-6xl font-black mb-3 ${dark ? "text-blue-600" : "text-blue-400"}`}
          >
            500+
          </h1>
          <p className="font-semibold tracking-widest uppercase text-sm opacity-70">
            DSA Problems Solved
          </p>
        </div>
      </div>

      {/* Tech Skills Auto-Scroll Slider */}
      <div
        className={`rounded-3xl flex flex-col items-center pt-10 px-0 border ${!dark ? "bg-neutral-900 border-neutral-800 shadow-xl" : "bg-white border-gray-100 shadow-2xl"}`}
      >
        <h2 className="text-xl font-bold uppercase tracking-widest opacity-80 z-10">
          My Tech Arsenal
        </h2>

        {/* ADDED overflow-hidden to stop horizontal scrolling, and ADDED pt-20 & pb-12 so tooltips have room to float inside! */}
        <div className="relative w-full rounded-full overflow-hidden flex items-center group/slider pt-6 pb-12 mt-2">
          {/* Blur gradient edges */}
          <div
            className={`absolute left-0 top-0 w-24 md:w-40 h-full z-30 bg-gradient-to-r ${dark ? "from-white to-transparent" : "from-neutral-900 to-transparent"} pointer-events-none`}
          ></div>
          <div
            className={`absolute right-0 top-0 w-24 md:w-40 h-full z-30 bg-gradient-to-l ${dark ? "from-white to-transparent" : "from-neutral-900 to-transparent"} pointer-events-none`}
          ></div>

          {/* The Scrolling Track */}
          <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
            {[...techStack, ...techStack].map((icon, index) => (
              <div
                key={index}
                className="relative group flex flex-col items-center mx-4 md:mx-6 cursor-pointer"
              >
                {/* Hover Tooltip */}
                <div
                  className={`absolute -top-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap shadow-2xl z-50 pointer-events-none ${
                    dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                  }`}
                >
                  {icon.label}
                  {/* Tooltip Arrow */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent ${
                      dark ? "border-t-gray-800" : "border-t-white"
                    }`}
                  ></div>
                </div>

                {/* Circular Icon */}
                <div
                  className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] p-4 md:p-5 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                    dark
                      ? "bg-gray-50 border border-gray-200"
                      : "bg-neutral-800 border border-neutral-700"
                  }`}
                >
                  <img
                    className="w-full h-full rounded-full object-contain filter drop-shadow-sm"
                    src={icon.src}
                    alt={icon.label}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
