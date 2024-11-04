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

const About = () => {
  return (
    <div
      id="about"
      className="w-[70%]  pb-20 pt-20"
    >
      <h1 className="text-[50px] mb-20 border-b-2 border-yellow-400 text-yellow-500 text-start font-bebas">
        About
      </h1>
      <div className="w-[100%] flex flex-col justify-center text-start text-white">
        <h1 className="mb-5">
          Hi, I’m
          <span className="text-2xl font-medium text-white px-1">
            Ayush Srivastav
          </span>
          , a passionate{" "}
          <span className="text-2xl font-medium text-white px-1">
            MERN Full Stack Developer
          </span>{" "}
          with a knack for crafting user-friendly interfaces and bringing ideas
          to life through code.
        </h1>

        <h1 className="font-bebas font-medium text-2xl mt-10 text-yellow-400 underline">
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
            <img
              key={index}
              className="w-[5%] m-2 rounded-full hover:p-1"
              src={icon}
              alt=""
            />
          ))}
        </div>

        <h1 className="mb-10">
          I build responsive, accessible, dynamic full-fledged applications that
          prioritize both aesthetics and functionality. I’m always open to
          connecting with like-minded professionals or discussing new projects.
          Feel free to reach out!
        </h1>

        <h1 className="font-bebas font-medium text-yellow-400 text-2xl mt-5 underline">
          DSA Skills
        </h1>

        <h1 className="mt-3 mb-5">
          As a developer with a good foundation in data structures, algorithms,
          and efficient problem-solving, I am always looking to deepen my skills
          and tackle new challenges. Here’s an overview of my work and learning
          journey on coding platforms
        </h1>

        <div className="flex justify-start w-full mt-3 mb-5">
          <div className="flex space-x-5">
            <a href="https://leetcode.com/u/ayush2s/">
              <img
                className="w-14 rounded-full hover:p-1"
                src={leetcode}
                alt="LeetCode"
              />
            </a>
            <a href="https://www.geeksforgeeks.org/user/ayush2s/">
              <img
                className="w-14 rounded-full hover:p-1"
                src={gfg}
                alt="GeeksforGeeks"
              />
            </a>
            <a href="https://www.naukri.com/code360/profile/IndianAyu">
              <img
                className="w-14 rounded-full hover:p-1"
                src={codenin}
                alt="Coding Ninjas"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
