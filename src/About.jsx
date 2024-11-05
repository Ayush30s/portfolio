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
import web from "../image/web2.png";
import tailwind from "../image/tail2.png";
import github from "../image/github2.jpg";
import leetcode from "../image/lc4.png";
import gfg from "../image/gfg.png";
import codenin from "../image/codeninja.jpg";
import pro2 from "../image/pro2.jpg";
import ln2 from "../image/ln2.png";
import x from "../image/x.png";

const About = ({ dark, setDark }) => {
  return (
    <div
      id="about"
      className="w-[70%] p-5 rounded-lg flex flex-col gap-3 my-10 font-lcase text-white text-sm"
    >
      <h1
        className={`text-[50px] pb-5 mt-20 mb-5 border-b-2 ${
          !dark
            ? "border-yellow-400 text-yellow-500"
            : "border-blue-500 text-blue-600"
        } text-start font-bebas`}
      >
        About
      </h1>
      <div className="h-[50%] flex flex-row gap-3">
        <div className="bg-zinc-900 rounded-lg w-[70%] p-7 flex flex-col justify-around gap-2">
          <h1>I am Ayush</h1>
          <h1>
            A MERN Stack Developer, DSA Enthusisat, with a passion for design
            and development.
          </h1>
          <h1>
            I hold a Bachelor's degree in Computer Application and have worked
            on numerous projects that have strengthened my understanding of both
            front-end and back-end development. Through various projects, I’ve
            honed my ability to create scalable and maintainable code.
          </h1>
        </div>
        <div className="bg-zinc-900 rounded-lg w-[30%]  flex justify-center items-center">
          <img
            className="w-[50%] h-[65%] rounded-full object-center"
            src={pro2}
            alt=""
          />
        </div>
      </div>
      <div className="h-[40%] flex flex-row gap-3">
        <div className="bg-zinc-900 rounded-lg w-[15%] text-center flex flex-col p-5 justify-center items-center gapy-3">
          <h1 className="text-4xl m-1">10+</h1>
          <h1>completed projects</h1>
        </div>
        <div className="bg-zinc-900 rounded-lg w-[25%] text-center flex flex-col p-5 justify-center items-center gapy-3">
          <h1 className="text-4xl m-1">6+</h1>
          <h1>Months Experience as an Intern</h1>
        </div>
        <div className="bg-zinc-900 rounded-lg w-[60%] p-5 flex flex-col gap-y-2 justify-center items-center">
          <h1>solved more than 500+ problems in DSA among multiple websites</h1>
          <div className="">
            <button className="p-2 rounded-full shadow-sm shadow-white mr-2">
              Leetcode
            </button>
            <button className="p-2 rounded-full shadow-sm shadow-white mr-2">
              Geeksforgeeks
            </button>
            <button className="p-2 rounded-full shadow-sm shadow-white mr-2">
              Coding Ninja
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 w-[100%]">
        
        <a
          className="bg-zinc-900 rounded-lg w-[20%] h-[100%]"
          href="https://www.linkedin.com/in/ayush-srivastav-58635b280/"
        >
          <img src={ln2} className="remove-bg rounded-lg"/>
        </a>

      

        <div className="bg-zinc-900 rounded-lg w-[80%] overflow-hidden relative flex flex-col justify-between items-center p-3">
          <h1 className="font-bold">My Tech Skills</h1>
          <div className="flex animate-scroll">
            {[
              node,
              express,
              jwt,
              mongo,
              chartjs,
              ejs,
              cloud,
              react,
              redux,
              firebase,
              socket,
              web,
              tailwind,
              github,
            ]
              .concat([
                node,
                express,
                jwt,
                mongo,
                chartjs,
                ejs,
                cloud,
                react,
                redux,
                firebase,
                socket,
                web,
                tailwind,
                github,
              ]) // duplicate the icons for seamless looping
              .map((icon, index) => (
                <img
                  key={index}
                  className="w-[5%] m-3 p-2 rounded-full hover:p-1"
                  src={icon}
                  alt={`Icon ${index}`}
                />
              ))}
          </div>
        </div>

        <a
          className="bg-zinc-900 rounded-lg w-[20%] h-[100%]"
          href="https://x.com/Ayush_Sri_30"
        >
          <img className="rounded-lg remove-bg" src={x} alt="" />
        </a>
      </div>

      {/* 
      <div
        className={`w-[100%] flex p-10 rounded-xl flex-col justify-center text-start ${
          !dark ? "bg-gradient-to-b from-gray-500 to-black text-white" : "bg-gradient-to-b from-gray-100 to-white text-gray-800"
        }`}
      >
        <h1 className="mb-5">
          Hi, I’m
          <span className={`text-2xl font-medium ${!dark ? "text-white" : "text-gray-800"} px-1`}>
            Ayush Srivastav
          </span>
          , a passionate{" "}
          <span className={`text-2xl font-medium ${!dark ? "text-white" : "text-gray-800"} px-1`}>
            MERN Full Stack Developer
          </span>{" "}
          with a knack for crafting user-friendly interfaces and bringing ideas to life through code.
        </h1>

        <h1
          className={`font-bebas font-medium text-2xl mt-10 ${
            !dark ? "text-yellow-400" : "text-blue-500"
          } underline`}
        >
          Web Dev Skills
        </h1>

        <div className="flex flex-row flex-wrap justify-start mt-3 mb-5">
          {[
            node,
            express,
            jwt,
            mongo,
            chartjs,
            ejs,
            cloud,
            react,
            redux,
            firebase,
            socket,
            web,
            tailwind,
            github,
          ].map((icon, index) => (
            <img key={index} className="w-[5%] m-2 rounded-full hover:p-1" src={icon} alt="" />
          ))}
        </div>

        <h1 className="mb-10 text-[14px]">
          I build responsive, accessible, dynamic full-fledged applications that prioritize both
          aesthetics and functionality. I’m always open to connecting with like-minded professionals
          or discussing new projects. Feel free to reach out!
        </h1>

        <h1
          className={`font-bebas font-medium text-2xl mt-5 ${
            !dark ? "text-yellow-400" : "text-blue-500"
          } underline`}
        >
          DSA Skills
        </h1>

        <h1 className="mt-3 mb-5 text-[14px]">
          As a developer with a good foundation in data structures, algorithms, and efficient
          problem-solving, I am always looking to deepen my skills and tackle new challenges.
          Here’s an overview of my work and learning journey on coding platforms
        </h1>

        <div className="flex justify-start w-full mt-3 mb-5">
          <div className="flex space-x-5">
            <a href="https://leetcode.com/u/ayush2s/">
              <img className="w-14 rounded-full hover:p-1" src={leetcode} alt="LeetCode" />
            </a>
            <a href="https://www.geeksforgeeks.org/user/ayush2s/">
              <img className="w-14 rounded-full hover:p-1" src={gfg} alt="GeeksforGeeks" />
            </a>
            <a href="https://www.naukri.com/code360/profile/IndianAyu">
              <img className="w-14 rounded-full hover:p-1" src={codenin} alt="Coding Ninjas" />
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default About;
