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
      className={`pt-16 w-[70%] shadow-lg px-10 shadow-black ${!dark ? "text-white " : "text-gray-800"}`}
    >
      <h1
        className={`text-[50px] font-medium text-start border-b-2 mt-5 mb-20 font-bebas ${
          !dark ? "border-yellow-400 text-yellow-400" : "border-blue-500 text-blue-500"
        }`}
      >
        Contact
      </h1>
      <div
        className={`flex flex-col items-center p-5 rounded-xl ${
          !dark
            ? "bg-gradient-to-b from-gray-500 to-black"
            : "bg-gradient-to-b from-gray-100 to-white"
        }`}
      >
        <p
          className={`text-center w-[100%] mb-8 ${
            !dark ? "text-gray-200" : "text-gray-600"
          }`}
        >
          I’m always open to discussing new projects, creative ideas, or
          opportunities. Whether you have a question, a proposal, or just want
          to say hello, feel free to reach out—I’d love to hear from you!
        </p>

        {/* Social Links */}
        <div className="flex flex-row justify-center items-center space-x-5 mb-10">
          <a
            href="mailto:ayushsri83328947@gmail.com"
            className={!dark ? "hover:text-yellow-300" : "hover:text-blue-500"}
          >
            <img
              className={`w-12 h-12 border rounded-full p-2 ${
                !dark ? "border-white" : "border-gray-300"
              }`}
              src={gmail}
              alt="Gmail"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
            className={!dark ? "hover:text-yellow-300" : "hover:text-blue-500"}
          >
            <img
              className={`w-12 h-12 border rounded-full p-2 ${
                !dark ? "border-white" : "border-gray-300"
              }`}
              src={ln}
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://www.github.com/Ayush30s"
            className={!dark ? "hover:text-yellow-300" : "hover:text-blue-500"}
          >
            <img
              className={`w-12 h-12 border rounded-full p-2 ${
                !dark ? "border-white" : "border-gray-300"
              }`}
              src={git}
              alt="GitHub"
            />
          </a>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className={`w-[70%] p-8 shadow-lg ${
            !dark ? "border border-white" : "bg-white border border-gray-300"
          }`}
        >
          <div className="mb-4">
            <label
              className={`block text-sm mb-1 ${
                !dark ? "text-white" : "text-gray-600"
              }`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 focus:outline-none ${
                !dark
                  ? "bg-black border border-white text-white"
                  : "bg-gray-100 border border-gray-300 text-gray-800"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-sm mb-1 ${
                !dark ? "text-white" : "text-gray-600"
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 focus:outline-none ${
                !dark
                  ? "bg-black border border-white text-white"
                  : "bg-gray-100 border border-gray-300 text-gray-800"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-sm mb-1 ${
                !dark ? "text-white" : "text-gray-600"
              }`}
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 focus:outline-none ${
                !dark
                  ? "bg-black border border-white text-white"
                  : "bg-gray-100 border border-gray-300 text-gray-800"
              }`}
              rows="5"
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
