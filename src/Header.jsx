import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ d, setD }) => {
  const navigate = useNavigate();
  const [effect, setEffect] = useState("home");
  const handleLinkClick = (eff) => {
    setEffect(eff);
  }

  console.log(effect)

  return (
    <div
      className={`flex flex-row z-10 justify-around p-4 font-lcase font-medium fixed top-0 left-0 right-0 text-2xl transition-all duration-300 ${
        !d
          ? "bg-gradient-to-r from-gray-600 to-black border-b-2 border-white text-yellow-400"
          : "bg-gradient-to-r from-gray-200 to-white border-b-2 border-gray-800 text-gray-800"
      }`}
    >
      <a
        href="#home"
        className={`hover:text-blue-600 transition-colors ${
          effect === "home" ? "border-b-2 border-yellow-500 hover:border-blue-600" : ""
        }`}
        onClick={() => handleLinkClick("home")}
      >
        Home
      </a>
      <a
        href="#projects"
        className={`hover:text-blue-600 transition-colors ${
          effect === "project" ? "border-b-2 border-yellow-500 hover:border-blue-600" : ""
        }`}
        onClick={() => handleLinkClick("project")}
      >
        Projects
      </a>
      <a
        href="#about"
        className={`hover:text-blue-600 transition-colors ${
          effect === "about" ? "border-b-2 border-yellow-500 hover:border-blue-600" : ""
        }`}
        onClick={() => handleLinkClick("about")}
      >
        About
      </a>
      <a
        href="#contact"
        className={`hover:text-blue-600 transition-colors ${
          effect === "contact" ? "border-b-2 border-yellow-500 hover:border-blue-600" : ""
        }`}
        onClick={() => handleLinkClick("contact")}
      >
        Contact
      </a>
    </div>
  );
};

export default Header;
