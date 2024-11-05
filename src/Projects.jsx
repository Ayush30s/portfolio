import React, { useState } from "react";
import ProjectAccordion from "./ProjectAccordian";
import node from "../image/node2.png";
import mongo from "../image/mongo2.png";
import express from "../image/exp2.png";
import chartjs from "../image/chart2.jpg";
import ejs from "../image/ejs2.png";
import h from "../image/h.png";
import i from "../image/i.png";
import bb from "../image/bb.png";
import ee from "../image/ee.png";
import ccc from "../image/ccc.png";
import ddd from "../image/ddd.png";
import cloud2 from "../image/cloud2.png";
import jwt2 from "../image/jwt2.png";
import react from "../image/react2.png";
import redux from "../image/redux2.png";
import tail2 from "../image/tail2.png";
import socket from "../image/socket.png";
import web from "../image/web2.png"
import ffff from "../image/ffff.png"
import gggg from "../image/gggg.png"


const Projects = ({ dark, setDark }) => {
  const projects = [
    {
      title: "Gym App",
      liveLink: "https://github.com/Ayush30s/ogduplicate",
      features: [
        {
          title: "User / Admin Profiles",
          description:
            "Track personal fitness performance or Gym Details and exercise history.",
        },
        {
          title: "Social Interaction",
          description:
            "Follow other users to stay motivated and share experiences.",
        },
        {
          title: "Gym Selection",
          description: "Join any gym based on personal requirements.",
        },
        {
          title: "Performance Tracking",
          description:
            "Visualize progress using heat maps and analytics charts.",
        },
        {
          title: "Blog Interaction",
          description:
            "Create, save, like, and comment on blog summaries for fitness tips and community engagement.",
        },
        {
          title: "Responsive Design",
          description: "Responsive design for both mobile and large devices.",
        },
      ],
      tools: [
        {
          name: "Node.js",
          link: "https://nodejs.org/en",
          image: node,
          usage: "Backend server handling and REST APIs.",
        },
        {
          name: "Express.js",
          link: "https://expressjs.com/",
          image: express,
          usage: "Routing and middleware for handling requests.",
        },
        {
          name: "MongoDB",
          link: "https://www.mongodb.com/",
          image: mongo,
          usage: "Data storage and retrieval of user and gym.",
        },
        {
          name: "Chart.js",
          link: "https://www.chartjs.org/",
          image: chartjs,
          usage: "Data visualization for tracking performance.",
        },
        {
          name: "EJS",
          link: "https://ejs.co/",
          image: ejs,
          usage: "Templating engine for rendering dynamic HTML.",
        },
        {
          name: "Cloudinary",
          link: "https://cloudinary.com/",
          image: cloud2,
          usage: "To save images in cloud database",
        },
        {
          name: "JWT",
          link: "https://jwt.io/",
          image: jwt2,
          usage: "Authentication and Authorization of user",
        },
      ],
      projectImage: [{ image: h }, { image: i }],
    },
    {
      title: "Food Ordering App",
      liveLink: "https://github.com/Ayush30s/ogduplicate",
      features: [
        {
          title: "Dynamic Restaurant Listings",
          description: "Dynamic restaurant listings with cuisine filters.",
        },
        {
          title: "Interactive Menus",
          description:
            "Interactive menus for dish selection and customization.",
        },
        {
          title: "Real-Time Price Calculation",
          description: "Real-time price and quantity updates at checkout.",
        },
        {
          title: "Enhanced User Experience",
          description: "Enhanced UI with cursors and accordions.",
        },
        {
          title: "Routing with React Router",
          description: "Seamless navigation using React Router.",
        },
        {
          title: "Responsive Design",
          description: "Responsive design for both mobile and large devices.",
        },
      ],
      tools: [
        {
          name: "Ractjs",
          link: "https://react.dev/",
          image: react,
          usage: "To render data optimally on Frontend",
        },
        {
          name: "Redux",
          link: "https://redux-toolkit.js.org/",
          image: redux,
          usage: "For state aand data management",
        },
        {
          name: "TailwindCSS",
          link: "https://tailwindcss.com/",
          image: tail2,
          usage: "For Designing the web page",
        },
      ],
      projectImage: [{ image: bb }, { image: ee }],
    },
    {
      title: "Video Call App",
      liveLink: "https://github.com/Ayush30s/fullstackvideocallapp",
      features: [
        {
          title: "Real-Time Video Calling",
          description:
            "Users can initiate and participate in video calls using WebRTC.",
        },
        {
          title: "Audio and Video Control",
          description:
            "Mute/unmute audio and enable/disable video during calls.",
        },
        {
          title: "Responsive Design",
          description: "Mobile-friendly and accessible across various devices.",
        },
      ],
      tools: [
        {
          name: "Node.js",
          link: "https://nodejs.org/en",
          image: node,
          usage: "Backend server handling and REST APIs.",
        },
        {
          name: "Express.js",
          link: "https://expressjs.com/",
          image: express,
          usage: "Routing and middleware for handling requests.",
        },
        {
          name: "Ractjs",
          link: "https://react.dev/",
          image: react,
          usage: "To render data optimally on Frontend",
        },
        {
          name: "Socket.Io",
          link: "https://socket.io/",
          image: socket,
          usage: "To establish connection between two users",
        },
        {
          name: "WebRTC",
          link: "https://webrtc.org/",
          image: web,
          usage: "For streaming data between both connected users",
        },
        {
          name: "TailwindCSS",
          link: "https://tailwindcss.com/",
          image: tail2,
          usage: "For Designing the web page",
        },
      ],
      projectImage: [{ image: ccc }, { image: ddd }],
    },
    {
      title: "Wordle Game",
      liveLink: "https://github.com/Ayush30s/wordleGame2",
      features: [
        {
          title: "Guess Words in six chances",
          description:
            "Guess the correct word in six chance in each chance you will know about the characters that matches with the correct word character",
        },
        {
          title: "Internet Connection",
          description: "created custom hook to show wether user is online or offline "
        }
      ],
      tools: [
        {
          name: "Ractjs",
          link: "https://react.dev/",
          image: react,
          usage: "To render data optimally on Frontend",
        },
        {
          name: "TailwindCSS",
          link: "https://tailwindcss.com/",
          image: tail2,
          usage: "For Designing the web page",
        },
      ],
      projectImage: [{ image: ffff }, { image: gggg }],
    },
  ];

  return (
    <div id="projects" className=" pt-20 w-[70%] rounded-lg s px-10">
      <h1 className={`text-[50px] mb-5 border-b-2 border-yellow-400 text-start font-bebas ${dark ? "text-blue-500" : "text-yellow-500"}`}>
        Projects
      </h1>
      {projects.map((project, index) => (
        <ProjectAccordion dark={dark} setDark={setDark} key={index} {...project} />
      ))}
    </div>
  );
};

export default Projects;
