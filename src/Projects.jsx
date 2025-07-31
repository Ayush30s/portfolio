import React, { useState } from "react";
import ProjectAccordion from "./ProjectAccordian";
import node from "../image/node2.png";
import mongo from "../image/mongo2.png";
import express from "../image/exp2.png";
import chartjs from "../image/chart2.jpg";
import ejs from "../image/ejs2.png";
import gym1 from "../image/gym1.png";
import gym2 from "../image/gym2.png";
import gym3 from "../image/gym3.png";
import gym4 from "../image/gym4.png";
import gym5 from "../image/gym5.png";
import gym6 from "../image/gym6.png";
import m from "../image/m.png";
import l from "../image/l.png";
import j from "../image/j.png";
import jwt from "../image/jwt2.png";
import cloud from "../image/cloud2.png";
import tailwind from "../image/tail2.png";
import bb from "../image/bb.png";
import aa from "../image/aa.png";
import ee from "../image/ee.png";
import ccc from "../image/ccc.png";
import ddd from "../image/ddd.png";
import cloud2 from "../image/cloud2.png";
import jwt2 from "../image/jwt2.png";
import react from "../image/react2.png";
import redux from "../image/redux2.png";
import tail2 from "../image/tail2.png";
import socket from "../image/socket.png";
import web from "../image/web2.png";
import ffff from "../image/ffff.png";
import gggg from "../image/gggg.png";
import openai from "../image/openai.webp"; // You'll need to add this image

const Projects = ({ dark, setDark }) => {
  const projects = [
    {
      title: "GYM Management Platform",
      liveLink: "https://github.com/Ayush30s/ogduplicate",
      features: [
        {
          title: "Role-based Dashboards",
          description:
            "Developed dashboards for users and gym owners with different access levels using JWT authentication.",
        },
        {
          title: "AI-powered Training Assistant",
          description:
            "Integrated OpenAI API to analyze workout patterns with 90% accuracy.",
        },
        {
          title: "Social Networking Features",
          description:
            "Users can follow others, write blogs, and engage with the fitness community.",
        },
        {
          title: "Real-time Notifications",
          description:
            "Implemented join requests/approvals notifications via Socket.IO with protected routes.",
        },
        {
          title: "Gym Marketplace",
          description:
            "Created a marketplace for equipment with dynamic shift scheduling and gym registrations.",
        },
        {
          title: "High Performance",
          description:
            "Achieved 93% Lighthouse performance score through code-splitting and MongoDB indexing (40% API call reduction).",
        },
        {
          title: "Enhanced Security",
          description:
            "Improved backend security from 80% to 93% using rate limiting and input sanitization.",
        },
        {
          title: "Real-time Notification of follow and Gym join requests",
          description:
            "Used socket-IO to build realtime notification to the end users",
        },
        {
          title: "Buy ,Sell or Rent Gym Accessories or Equpment",
          description:
            "User Can post Gym equipemnts or Accessories to Sell or Rent it",
        },
        {
          title: "Mark Attendence In and Out",
          description:
            "User Can mark attendence In and Out in the gym they are joined and active",
        },
      ],
      tools: [
        "React",
        "Redux",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
        "Socket.IO",
        "Tailwind CSS",
        "Chart.js",
        "OpenAI API",
        "Cloudinary",
      ],
      projectImage: [
        { image: gym1 },
        { image: gym2 },
        { image: gym3 },
        { image: gym4 },
        { image: gym5 },
        { image: gym6 },
      ],
    },
    {
      title: "Food Ordering Platform",
      liveLink: "https://github.com/Ayush30s/ogduplicate",
      features: [
        {
          title: "Production-grade UI",
          description:
            "Built with filters (price/rating/cuisine) and lazy-loaded menus for optimal performance.",
        },
        {
          title: "Real-time Cart System",
          description:
            "Implemented using Redux for customizations, quantity updates, and persistent local storage.",
        },
        {
          title: "Reusable Components",
          description:
            "Developed 15+ reusable components using atomic design principles, speeding feature rollout by 30%.",
        },
        {
          title: "API Integration",
          description: "Integrated with Swiggy API for restaurant data.",
        },
      ],
      tools: ["React", "Redux Toolkit", "Tailwind CSS", "Context API"],
      projectImage: [{ image: bb }, { image: ee }],
    },
    {
      title: "Video Conferencing App",
      liveLink: "https://github.com/Ayush30s/fullstackvideocallapp",
      features: [
        {
          title: "Peer-to-Peer Video Calling",
          description:
            "Built with WebRTC including mute/unmute, screen sharing, and health monitoring features.",
        },
        {
          title: "High Connection Success",
          description:
            "Achieved 98% connection success rate globally using Socket.io for signaling.",
        },
        {
          title: "Low Latency",
          description:
            "Maintained latency under 500ms with SDP negotiation and ICE candidate tuning.",
        },
      ],
      tools: ["WebRTC", "Socket.io", "React", "Node.js", "Express.js"],
      projectImage: [{ image: ccc }, { image: ddd }],
    },
    {
      title: "Wordle Game",
      liveLink: "https://github.com/Ayush30s/wordleGame2",
      features: [
        {
          title: "Word Guessing Game",
          description:
            "Guess the correct word in six attempts with feedback on character matches.",
        },
        {
          title: "Online Status Detection",
          description:
            "Created custom hook to show whether user is online or offline.",
        },
      ],
      tools: ["React", "Tailwind CSS"],
      projectImage: [{ image: ffff }, { image: gggg }],
    },
  ];

  return (
    <div
      id="projects"
      className=" pt-20 w-[100%] md:w-[70%]  rounded-lg s px-5 "
    >
      <h1
        className={`text-[50px] mb-5 border-b-2  text-start font-bebas ${
          dark
            ? "text-blue-600 border-blue-500"
            : "text-yellow-500 border-yellow-500"
        }`}
      >
        Projects
      </h1>

      {projects.map((project, index) => (
        <ProjectAccordion
          dark={dark}
          setDark={setDark}
          key={index}
          index={index}
          {...project}
        />
      ))}
    </div>
  );
};

export default Projects;
