import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = ({ dark, setDark }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div
      id="contact"
      className="pt-8 sm:pt-10 w-[100%] md:w-[80%] mx-auto px-4 sm:px-5 mb-24 mt-10 md:mb-40"
    >
      {/* Header Section */}
      <div className="mb-8 sm:mb-12 flex flex-col items-center md:items-start text-center md:text-left">
        <h1
          className={`text-3xl align-items-start sm:text-4xl md:text-5xl font-bold border-b-4 pb-3 sm:pb-4 inline-block ${
            dark
              ? "border-blue-600 text-gray-900"
              : "border-blue-500 text-white"
          }`}
        >
          Get In Touch
        </h1>
        <p
          className={`mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl ${dark ? "text-gray-600" : "text-gray-400"}`}
        >
          I’m always open to discussing new projects, creative ideas, or
          opportunities. Whether you have a question or just want to say hi,
          I'll try my best to get back to you!
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-16">
        {/* Left Side: Contact Information Cards */}
        <div className="flex-1 flex flex-col gap-4 sm:gap-6">
          {/* Email Card */}
          <a
            href="mailto:ayushsri302003@gmail.com"
            className={`group flex items-center p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${dark ? "bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-blue-300" : "bg-neutral-900 border-neutral-800 shadow-xl hover:shadow-blue-900/20 hover:border-blue-900/50"}`}
          >
            <div
              className={`p-3 sm:p-4 rounded-full mr-4 sm:mr-6 transition-colors ${dark ? "bg-blue-50 text-blue-600 group-hover:bg-blue-100" : "bg-neutral-800 text-blue-400 group-hover:bg-neutral-700"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="sm:w-[24px] sm:h-[24px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <p
                className={`text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-70 ${dark ? "text-gray-500" : "text-gray-400"}`}
              >
                Email
              </p>
              <p
                className={`text-sm sm:text-base md:text-lg font-medium truncate ${dark ? "text-gray-900" : "text-white"}`}
              >
                ayushsri302003@gmail.com
              </p>
            </div>
          </a>

          {/* Location Card */}
          <div
            className={`flex items-center p-4 sm:p-6 rounded-xl border ${dark ? "bg-white border-gray-200 shadow-lg" : "bg-neutral-900 border-neutral-800 shadow-xl"}`}
          >
            <div
              className={`p-3 sm:p-4 rounded-full mr-4 sm:mr-6 ${dark ? "bg-blue-50 text-blue-600" : "bg-neutral-800 text-blue-400"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="sm:w-[24px] sm:h-[24px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p
                className={`text-xs sm:text-sm font-semibold uppercase tracking-wider opacity-70 ${dark ? "text-gray-500" : "text-gray-400"}`}
              >
                Location
              </p>
              <p
                className={`text-sm sm:text-base md:text-lg font-medium ${dark ? "text-gray-900" : "text-white"}`}
              >
                Jaunpur, Uttar Pradesh
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div
          className={`flex-[1.5] p-6 sm:p-8 md:p-10 rounded-xl border relative overflow-hidden mt-6 lg:mt-0 ${dark ? "bg-white border-gray-200 shadow-2xl" : "bg-neutral-900 border-neutral-800 shadow-2xl"}`}
        >
          {/* Subtle background glow */}
          <div
            className={`absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-40 sm:h-40 blur-[60px] sm:blur-[80px] rounded-full opacity-50 pointer-events-none ${dark ? "bg-blue-300" : "bg-blue-900"}`}
          ></div>

          <form
            onSubmit={sendEmail}
            className="relative z-10 flex flex-col gap-4 sm:gap-6"
          >
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label
                htmlFor="name"
                className={`text-xs sm:text-sm font-medium ml-1 ${dark ? "text-gray-700" : "text-gray-300"}`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl outline-none transition-all duration-300 border focus:ring-2 ${
                  dark
                    ? "bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    : "bg-neutral-800 border-neutral-700 text-white focus:border-blue-500 focus:ring-blue-500/20 placeholder-gray-500"
                }`}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label
                htmlFor="email"
                className={`text-xs sm:text-sm font-medium ml-1 ${dark ? "text-gray-700" : "text-gray-300"}`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl outline-none transition-all duration-300 border focus:ring-2 ${
                  dark
                    ? "bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    : "bg-neutral-800 border-neutral-700 text-white focus:border-blue-500 focus:ring-blue-500/20 placeholder-gray-500"
                }`}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label
                htmlFor="message"
                className={`text-xs sm:text-sm font-medium ml-1 ${dark ? "text-gray-700" : "text-gray-300"}`}
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleInputChange}
                placeholder="How can I help you?"
                rows="4"
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl outline-none transition-all duration-300 border focus:ring-2 resize-none ${
                  dark
                    ? "bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20"
                    : "bg-neutral-800 border-neutral-700 text-white focus:border-blue-500 focus:ring-blue-500/20 placeholder-gray-500"
                }`}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 sm:py-4 mt-2 rounded-xl font-bold text-base sm:text-lg tracking-wide transition-all duration-300 flex justify-center items-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  Send Message
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    className="sm:w-[20px] sm:h-[20px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </>
              )}
            </button>

            {/* Status Messages */}
            {status === "success" && (
              <p className="text-green-500 text-center font-medium text-sm sm:text-base mt-1 sm:mt-2">
                Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center font-medium text-sm sm:text-base mt-1 sm:mt-2">
                Failed to send message. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
