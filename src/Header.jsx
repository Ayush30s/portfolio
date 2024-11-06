import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ d, setD }) => {
  const navigate = useNavigate();

  const [effect, setEffect] = useState("home");
  const [mouse, setmouse] = useState(false);

  const handleLinkClick = (eff) => {
    setEffect(eff);
  };

  const handleheader = (event) => {
    if (event.clientY <= 50) {
      setmouse(true);
    }
    // Check if the mouse is at the bottom edge
    else if (event.clientY >= window.innerHeight - 50) {
      setmouse(true);
    }
    // Check if the mouse is at the left edge
    else if (event.clientX <= 50) {
      setmouse(true);
    }
    // Check if the mouse is at the right edge
    else if (event.clientX >= window.innerWidth - 50) {
      setmouse(true);
    } else {
      setmouse(false);
    }
  };

  return (
    <div
      className={`writing-mode-vertical-lr ${
        mouse ? "opacity-100" : "opacity-0"
      } flex w-10 h-full flex-row z-10 font-lcase font-medium fixed top-0 left-0 text-lg transition-all duration-300 ${
        d ? "bg-black text-white" : "bg-white text-black"
      }`}
      onMouseMove={(event) => handleheader(event)}
    >
      <a
        href="#home"
        className={`text-center h-[250%] transition-colors ${
          effect === "home" ? "font-extrabold" : null
        }`}
        onClick={() => handleLinkClick("home")}
      >
        Home
      </a>
      <a
        href="#projects"
        className={`text-center h-[250%] transition-colors ${
          effect === "project" ? "font-extrabold" : null
        }`}
        onClick={() => handleLinkClick("project")}
      >
        Projects
      </a>
      <a
        href="#about"
        className={`text-center h-[250%] transition-colors ${
          effect === "about" ? "font-extrabold" : null
        }`}
        onClick={() => handleLinkClick("about")}
      >
        About
      </a>
      <a
        href="#contact"
        className={`text-center h-[250%] transition-colors ${
          effect === "contact" ? "font-extrabold" : null
        }`}
        onClick={() => handleLinkClick("contact")}
      >
        Contact
      </a>
    </div>
  );
};

export default Header;
