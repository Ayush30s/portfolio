import React, { useState } from "react";
import gmail from "../image/gmail.jpg";
import ln from "../image/ln2.png";
import git from "../image/github.png";

const Contact = ({ dark, setDark }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      id="contact"
      className={`pt-16 w-[90%] md:w-[70%] flex flex-col ml-10 md:ml-0 mb-40 px-5 rounded-lg ${
        !dark ? "text-white" : "text-gray-800"
      }`}
    >
      <h1
        className={`text-[50px] font-medium text-start border-b-2 my-2 font-bebas ${
          !dark
            ? "border-yellow-400 text-yellow-400"
            : "border-blue-500 text-blue-500"
        }`}
      >
        Contact
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between py-5 rounded-xl">
        <div className="md:w-[45%] flex flex-col gap-1 mb-5 md:mb-0">
          <p
            className={`text-center w-[100%] font-lcase p-10 mb-2 text-sm rounded-lg ${
              !dark ? "bg-zinc-800 text-gray-200" : "bg-gray-100  text-black"
            }`}
          >
            I’m always open to discussing new projects, creative ideas, or
            opportunities. Whether you have a question, a proposal, or just want
            to say hello, feel free to reach out—I’d love to hear from you!
          </p>

          <div
            className={`flex flex-row justify-center items-center space-x-5 p-5 mt-2 rounded-lg ${
              !dark ? "bg-zinc-800" : "bg-gray-100"
            }`}
          >
            <a
              href="mailto:ayushsri83328947@gmail.com"
              className={`${
                !dark ? "hover:text-yellow-300" : "hover:text-blue-500"
              }`}
            >
              <img
                className={`w-14 h-14 border rounded-full p-2 ${
                  !dark ? "border-white" : "border-gray-400"
                }`}
                src={gmail}
                alt="Gmail"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
              className={`${
                !dark ? "hover:text-yellow-300" : "hover:text-blue-500"
              }`}
            >
              <img
                className={`w-14 h-14 border rounded-full p-2 ${
                  !dark ? "border-white" : "border-gray-400"
                }`}
                src={ln}
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://www.github.com/Ayush30s"
              className={`${
                !dark ? "hover:text-yellow-300" : "hover:text-blue-500"
              }`}
            >
              <img
                className={`w-14 h-14 border rounded-full p-2 ${
                  !dark ? "border-white" : "border-gray-400"
                }`}
                src={git}
                alt="GitHub"
              />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`w-[100%] md:w-[50%] text-sm shadow-lg rounded-md p-5 ${
            !dark ? "bg-zinc-800" : "bg-gray-100"
          }`}
        >
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 focus:outline-none rounded ${
                !dark
                  ? "bg-transparent border border-white text-white"
                  : "bg-white border border-gray-300 text-gray-800"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
              className={`w-full px-3 py-2 focus:outline-none rounded ${
                !dark
                  ? "bg-transparent border border-white text-white"
                  : "bg-white border border-gray-300 text-gray-800"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="message"
              placeholder="Enter your message"
              name="message"
              value={form.message}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 focus:outline-none rounded ${
                !dark
                  ? "bg-transparent border border-white text-white"
                  : "bg-white border border-gray-300 text-gray-800"
              }`}
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full py-2 font-medium rounded transition-colors duration-200 ${
              !dark
                ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
