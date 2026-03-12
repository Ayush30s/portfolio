import { useState, useEffect } from "react";

const Header = ({ d, setD }) => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "activities", "about", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
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
    { id: "activities", label: "Experience" },
    { id: "projects", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="fixed z-50 transition-all duration-500 bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:top-6 w-[95%] sm:w-[90%] md:w-auto max-w-full">
      <nav
        className={`flex items-center justify-start md:justify-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap px-2 py-2 md:px-2 md:py-2 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          d
            ? "bg-white/60 border-gray-200/50"
            : "bg-[#1d1d1f]/70 border-white/10"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setActiveSection(link.id)}
              className={`relative px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-2 text-[11px] sm:text-[12px] md:text-sm font-medium tracking-wide rounded-full transition-all duration-300 ease-out active:scale-95 flex-shrink-0 ${
                isActive
                  ? d
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-black shadow-md"
                  : d
                  ? "text-gray-500 hover:bg-black/5 hover:text-black"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
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