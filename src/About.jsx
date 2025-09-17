import React from "react";
import node from "../image/node2.png";
import mongo from "../image/mongo2.png";
import express from "../image/exp2.png";
import chartjs from "../image/chart2.jpg";
import ejs from "../image/ejs2.png";
import cloud from "../image/cloud2.png";
import jwt from "../image/jwt2.png";
import react from "../image/react2.png";
import firebase from "../image/firebase2.png";
import redux from "../image/redux2.png";
import socket from "../image/socket.png";
import tailwind from "../image/tail2.png";
import github from "../image/github2.jpg";
import leetcode from "../image/lc4.png";
import gfg from "../image/gfg.png";
import codenin from "../image/codeninja.jpg";
import profile from "../image/profile.jpg";
import ln2 from "../image/ln2.png";
import x from "../image/x.png";
import web from "../image/web.jpeg"

const About = ({ dark, setDark }) => {
  return (
    <div
      id="about"
      className={`w-[100%] md:w-[70%] p-5 rounded-lg flex flex-col gap-3 font-lcase text-sm ${
        !dark ? "text-white" : "text-black"
      }`}
    >
      <h1
        className={`text-[50px] pb-5 mt-20 mb-5 border-b-2 text-start font-bebas ${
          dark
            ? "border-blue-500 text-blue-600"
            : "border-yellow-400 text-yellow-500"
        }`}
      >
        About
      </h1>
      <div className="flex flex-col md:flex-row gap-3">
        <div
          className={`rounded-lg md:w-[70%] p-7 flex flex-col justify-around gap-2 ${
            !dark ? "bg-zinc-900" : "bg-gray-200 text-black"
          }`}
        >
          <h1>I am Ayush</h1>
          <h1>
            A MERN Stack Developer, DSA , Machine Learning Enthusiast, with a
            passion for design and development.
          </h1>
          <h1>
            I hold a Bachelor's degree in Computer Application and have worked
            on numerous projects that have strengthened my understanding of both
            front-end and back-end development. Through various projects, I’ve
            honed my ability to create scalable and maintainable code.
          </h1>
        </div>
        <div
          className={`rounded-lg w-[100%] md:w-[30%] flex justify-center items-center ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
          <img
            className="w-[40%] h-[40%] my-10 md:my-0 md:w-[110px] md:h-[150px] rounded-full object-center"
            src={profile}
            alt=""
          />
        </div>
      </div>
      <div className="h-[40%] flex flex-col md:flex-row gap-3">
        <div className="flex flxe-row w-[100%] gap-3">
          <div
            className={`rounded-lg w-[50%] text-center flex flex-col p-5 justify-center items-center gapy-3 ${
              !dark ? "bg-zinc-900" : "bg-gray-200"
            }`}
          >
            <h1 className="text-4xl m-1">10+</h1>
            <h1>completed projects</h1>
          </div>

          <div
            className={`rounded-lg w-[50%] text-center flex flex-col p-5 justify-center items-center gapy-3 ${
              !dark ? "bg-zinc-900" : "bg-gray-200"
            }`}
          >
<<<<<<< HEAD
            <h1 className="text-4xl m-1">6</h1>
            <h1>Months Experience as RactJs Developer Intern</h1>
=======
            <h1 className="text-4xl m-1 text-yellow-600">1 Years</h1>
            <h1>Experience as Frontend Developer</h1>
>>>>>>> f05db3a9082c4f2aae4eaf098e72a2fa42c3d793
          </div>
        </div>

        <div
          className={`rounded-lg md:w-[70%] py-5 px-2 md:py-5 md:px-5 flex flex-col gap-y-2 justify-center items-center ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
          <h1 className="md:text-sm text-xs">
            solved 500+ problems in DSA on multiple platforms
          </h1>
          <div className="flex text-xs">
            <a
              href="https://leetcode.com/u/ayush2s/"
              className={`p-2 rounded-full cursor-pointer flex justify-center items-center align-middle shadow-sm mr-2 ${
                !dark ? "shadow-white" : "shadow-gray-400"
              }`}
            >
              Leetcode
            </a>
            <a
              href="https://www.geeksforgeeks.org/user/ayush2s/"
              className={`p-2 rounded-full cursor-pointer flex justify-center items-center align-middle shadow-sm mr-2 ${
                !dark ? "shadow-white" : "shadow-gray-400"
              }`}
            >
              Geeksforgeeks
            </a>
            <a
              href="https://www.naukri.com/code360/profile/IndianAyu"
              className={`p-2 rounded-full cursor-pointer flex justify-center items-center align-middle text-center shadow-sm mr-2 ${
                !dark ? "shadow-white" : "shadow-gray-400"
              }`}
            >
              Coding Ninja
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-3 w-[100%]">
        <a
          className={`rounded-lg md:visible hidden w-[20%] h-[100%] border border-black ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
          href="https://www.linkedin.com/in/ayush-srivastav-58635b290/"
        >
          <img src={ln2} className="remove-bg rounded-lg" />
        </a>
        <div
          className={`relative rounded-lg md:w-[100%] overflow-hidden flex flex-col justify-between items-center p-3 ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
          <h1 className="font-bold">My Tech Skills</h1>
          <div className="flex animate-scroll">
            {[
              { src: node, label: "Node.js" },
              { src: express, label: "Express" },
              { src: jwt, label: "JWT" },
              { src: mongo, label: "MongoDB" },
              { src: chartjs, label: "Chart.js" },
              { src: ejs, label: "EJS" },
              { src: cloud, label: "Cloud" },
              { src: react, label: "React" },
              { src: redux, label: "Redux" },
              { src: firebase, label: "Firebase" },
              { src: socket, label: "Socket.io" },
              { src: web, label: "WebRTC" },
              { src: tailwind, label: "TailwindCSS" },
              { src: github, label: "GitHub" },
            ].map((icon, index) => (
              <div
                key={index}
                className="relative group flex flex-col items-center"
              >
                <img
                  className="w-[100px] m-2 p-2 rounded-full hover:p-1"
                  src={icon.src}
                  alt={icon.label}
                />
                {/* Tooltip */}
                <div
                  className="absolute top-1 left-1/2 -translate-x-1/2 
                      bg-black text-white text-xs px-2 py-1 rounded 
                      opacity-0 group-hover:opacity-100 transition 
                      whitespace-nowrap z-10"
                >
                  {icon.label}
                  {/* Tooltip Arrow */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full 
                        w-0 h-0 border-x-4 border-x-transparent 
                        border-t-4 border-t-black"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <a
          className={`rounded-lg hidden md:visible w-[20%] h-[100%]  border border-black ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
          href="https://x.com/Ayush_Sri_30"
        >
          <img className="rounded-lg remove-bg" src={x} alt="" />
        </a>
      </div>
    </div>
  );
};

export default About;
