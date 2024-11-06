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
      className={`w-[70%] p-5 rounded-lg flex flex-col gap-3 my-10 font-lcase text-sm ${
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
      <div className="h-[50%] flex flex-row gap-3">
        <div
          className={`rounded-lg w-[70%] p-7 flex flex-col justify-around gap-2 ${
            !dark ? "bg-zinc-900" : "bg-gray-200 text-black"
          }`}
        >
          <h1>I am Ayush</h1>
          <h1>A MERN Stack Developer, DSA Enthusiast, with a passion for design and development.</h1>
          <h1>
            I hold a Bachelor's degree in Computer Application and have worked
            on numerous projects that have strengthened my understanding of both
            front-end and back-end development. Through various projects, I’ve
            honed my ability to create scalable and maintainable code.
          </h1>
        </div>
        <div
          className={`rounded-lg w-[30%] flex justify-center items-center ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
          <img
            className="w-[50%] h-[65%] rounded-full object-center"
            src={pro2}
            alt=""
          />
        </div>
      </div>
      <div className="h-[40%] flex flex-row gap-3">
        <div
          className={`rounded-lg w-[15%] text-center flex flex-col p-5 justify-center items-center gapy-3 ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
          <h1 className="text-4xl m-1">10+</h1>
          <h1>completed projects</h1>
        </div>
        <div
          className={`rounded-lg w-[25%] text-center flex flex-col p-5 justify-center items-center gapy-3 ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
          <h1 className="text-4xl m-1">6+</h1>
          <h1>Months Experience as an Intern</h1>
        </div>
        <div
          className={`rounded-lg w-[60%] p-5 flex flex-col gap-y-2 justify-center items-center ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
          <h1>solved more than 500+ problems in DSA among multiple websites</h1>
          <div className="flex">
            <button
              className={`p-2 rounded-full shadow-sm mr-2 ${
                !dark ? "shadow-white" : "shadow-gray-400"
              }`}
            >
              Leetcode
            </button>
            <button
              className={`p-2 rounded-full shadow-sm mr-2 ${
                !dark ? "shadow-white" : "shadow-gray-400"
              }`}
            >
              Geeksforgeeks
            </button>
            <button
              className={`p-2 rounded-full shadow-sm mr-2 ${
                !dark ? "shadow-white" : "shadow-gray-400"
              }`}
            >
              Coding Ninja
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-3 w-[100%]">
        <a
          className={`rounded-lg w-[20%] h-[100%] border border-black ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
          href="https://www.linkedin.com/in/ayush-srivastav-58635b280/"
        >
          <img src={ln2} className="remove-bg rounded-lg" />
        </a>
        <div
          className={`rounded-lg w-[80%] overflow-hidden relative flex flex-col justify-between items-center p-6 ${
            !dark ? "bg-zinc-900" : "bg-gray-200"
          }`}
        >
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
                  className="w-[5%] m-2 p-2 rounded-full hover:p-1"
                  src={icon}
                  alt={`Icon ${index}`}
                />
              ))}
          </div>
        </div>
        <a
          className={`rounded-lg w-[20%] h-[100%]  border border-black ${
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
