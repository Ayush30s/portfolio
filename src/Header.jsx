import { useState, useEffect } from "react";

const Header = ({ d, setD }) => {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll Spy: Automatically update the active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "activities", "about", "contact"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is currently in the middle of the viewport
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Work" },
    { id: "activities", label: "Experience" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="fixed z-50 transition-all duration-500 bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-6 w-[95%] md:w-auto">
      <nav
        className={`flex items-center justify-between md:justify-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
          d
            ? "bg-white/70 border-gray-200/50 text-gray-700"
            : "bg-neutral-900/70 border-neutral-700/50 text-gray-300"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                setActiveSection(link.id);
              }}
              className={`relative px-3 md:px-5 py-2 text-[11px] md:text-sm font-semibold tracking-wide rounded-full transition-all duration-300 ${
                isActive
                  ? d
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-blue-500 text-white shadow-lg shadow-blue-900/50"
                  : d
                    ? "hover:bg-gray-200/50 hover:text-blue-600"
                    : "hover:bg-neutral-800/50 hover:text-blue-400"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Header;
