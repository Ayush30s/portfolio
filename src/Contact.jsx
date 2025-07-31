import React, { useState } from "react";
import gmail from "../image/gmail.jpg";
import ln from "../image/ln2.png";
import git from "../image/github.png";
import emailjs from "@emailjs/browser";

const Contact = ({ dark, setDark }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );
      console.log("Email successfully sent:", result.text);
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div
      id="contact"
      className={`pt-10 w-[100%] md:w-[70%] flex flex-col mb-20 md:mb-40 px-5 rounded-lg ${
        !dark ? "text-white" : "text-gray-800"
      }`}
    >
      <h1
        className={`text-[50px] font-medium text-start border-b-2 my-2 font-bebas ${
          !dark ? "border-yellow-400 text-yellow-400" : "border-blue-500 text-blue-500"
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
              className={`${!dark ? "hover:text-yellow-300" : "hover:text-blue-500"}`}
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
              className={`${!dark ? "hover:text-yellow-300" : "hover:text-blue-500"}`}
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
              className={`${!dark ? "hover:text-yellow-300" : "hover:text-blue-500"}`}
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
          onSubmit={sendEmail}
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
                !dark ? "bg-transparent border border-white text-white" : "bg-white border border-gray-300 text-gray-800"
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
                !dark ? "bg-transparent border border-white text-white" : "bg-white border border-gray-300 text-gray-800"
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
                !dark ? "bg-transparent border border-white text-white" : "bg-white border border-gray-300 text-gray-800"
              }`}
              rows="3"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-medium rounded transition-colors duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : !dark
                ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                : "bg-blue-500 text-white hover:bg-blue-400"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
