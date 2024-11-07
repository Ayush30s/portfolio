import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ d, setD }) => {
  const navigate = useNavigate();

  const [effect, setEffect] = useState("home");
  const [mouse, setMouse] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false); // State to toggle header visibility on small screens

  const handleLinkClick = (eff) => {
    setEffect(eff);
  };

  const handleHeaderMouse = (event) => {
    // Detect if the mouse is near any edge
    if (
      event.clientY <= 50 ||
      event.clientY >= window.innerHeight - 50 ||
      event.clientX <= 50 ||
      event.clientX >= window.innerWidth - 50
    ) {
      setMouse(true);
    } else {
      setMouse(false);
    }
  };

  return (
    <>
      {/* Toggle Button, visible only on small screens */}
      <button
        className={`fixed top-12 right-12 rounded-xl text-sm z-50 p-2 ${
          d
            ? "text-black bg-white border border-white"
            : "text-white bg-black border border-black"
        } rounded md:hidden`}
        onClick={() => setIsHeaderVisible(!isHeaderVisible)}
      >
        {isHeaderVisible ? "Close Menu" : "Open Menu"}
      </button>

      <div
        className={`md:writing-mode-vertical-lr z-40 ${
          mouse || isHeaderVisible ? "opacity-100" : "opacity-0 md:opacity-100"
        } flex w-full md:w-10 md:p-10 px-10 py-10 md:h-full flex-col md:flex-row md:justify-between items-start md:items-center font-lcase font-medium fixed top-0 left-0 text-sm md:text-lg transition-all duration-300 ${
          !d ? "bg-black text-orange-400" : "bg-gray-100 text-black"
        } ${isHeaderVisible ? "block" : "hidden md:block"}`} // Show header based on screen size
        onMouseMove={(event) => handleHeaderMouse(event)}
      >
        <a
          href="#home"
          className={`text-center transition-colors text-lg  py-2 ${
            effect === "home" ? "font-extrabold" : ""
          }`}
          onClick={() => handleLinkClick("home")}
        >
          Home
        </a>
        <a
          href="#projects"
          className={`text-center transition-colors text-lg  py-2 ${
            effect === "project" ? "font-extrabold" : ""
          }`}
          onClick={() => handleLinkClick("project")}
        >
          Projects
        </a>
        <a
          href="#activities"
          className={`text-center transition-colors text-lg  py-2 ${
            effect === "activities" ? "font-extrabold" : ""
          }`}
          onClick={() => handleLinkClick("activities")}
        >
          Activities
        </a>
        <a
          href="#about"
          className={`text-center transition-colors text-lg  py-2 ${
            effect === "about" ? "font-extrabold" : ""
          }`}
          onClick={() => handleLinkClick("about")}
        >
          About
        </a>
        <a
          href="#contact"
          className={`text-center transition-colors text-lg  py-2 ${
            effect === "contact" ? "font-extrabold" : ""
          }`}
          onClick={() => handleLinkClick("contact")}
        >
          Contact
        </a>
      </div>
    </>
  );
};

export default Header;
