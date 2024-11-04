import React, { useState } from "react";
import gmail from "../image/gmail.jpg";
import ln from "../image/ln2.png";
import git from "../image/github.png";

const Contact = () => {
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
    <div id="contact" className="pt-16 w-[70%] bg-black text-white">
      <h1 className="text-[50px] font-medium text-start border-b-2 border-yellow-400 mt-5 mb-20 text-yellow-400 font-bebas">
        Contact
      </h1>
      <div className="flex flex-col items-center ">
        <p className="text-gray-400 text-center w-[100%] mb-8">
          I’m always open to discussing new projects, creative ideas, or
          opportunities. Whether you have a question, a proposal, or just want
          to say hello, feel free to reach out—I’d love to hear from you!
        </p>

        {/* Social Links */}
        <div className="flex flex-row justify-center items-center space-x-5 mb-10">
          <a
            href="ayushsri83328947@gmail.com"
            className="hover:text-yellow-300"
          >
            <img
              className="w-12 h-12 border border-white rounded-full p-2"
              src={gmail}
              alt="Gmail"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
            className="hover:text-yellow-300"
          >
            <img
              className="w-12 h-12 border border-white rounded-full p-2"
              src={ln}
              alt="LinkedIn"
            />
          </a>
          <a
            href="https://www.github.com/Ayush30s"
            className="hover:text-yellow-300"
          >
            <img
              className="w-12 h-12 border border-white rounded-full p-2"
              src={git}
              alt="GitHub"
            />
          </a>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="w-[70%] p-8 shadow-lg">
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-black border border-white text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2  bg-black border border-white text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-black border border-white text-white focus:outline-none"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 py-2 font-medium rounded hover:bg-yellow-400 transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
