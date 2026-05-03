import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

const Header = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:578px)");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = [
        "hero",
        "about",
        "experience",
        "projects",
        "education",
        "contact",
      ];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}
      >
        <div
          className="mx-auto max-w-6xl mx-4 sm:mx-auto px-4 sm:px-6 flex items-center justify-between"
          style={
            scrolled
              ? {
                  background: !isMobile ? "var(--header-bg)" : "none",
                  borderBottom: !isMobile ? "var(--border)" : "none",
                  boxShadow: !isMobile ? "0 4px 0px #1a1a1a" : "none",
                }
              : {}
          }
        >
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 py-3"
          >
            <div
              className="w-8 h-8 flex items-center justify-center font-bold text-sm text-white"
              style={{
                background: "var(--accent)",
                border: "var(--border)",
                boxShadow: "2px 2px 0px #1a1a1a",
              }}
            >
              AS
            </div>
            <span
              className="font-bold text-base tracking-tight hidden sm:block"
              style={{ color: "var(--text-primary)" }}
            >
              Ayush Srivastav
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 py-3">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 text-sm font-semibold transition-all duration-150"
                style={
                  active === l.id
                    ? {
                        background: "var(--accent)",
                        color: "#fff",
                        border: "var(--border)",
                        boxShadow: "2px 2px 0px #1a1a1a",
                      }
                    : { color: "var(--text-secondary)" }
                }
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary ml-3 px-5 py-2 text-sm"
            >
              Hire Me →
            </button>
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2 py-3">
            <button
              className="p-2 transition-colors font-bold text-xl"
              style={{ color: "var(--text-primary)" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden mx-4 mt-1 flex flex-col gap-1 p-4"
            style={{
              background: "var(--bg-card)",
              border: "var(--border)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-4 py-3 font-semibold transition-all"
                style={{
                  color: "var(--text-primary)",
                  borderBottom: "1px solid rgba(26,26,26,0.1)",
                }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary mt-2 px-4 py-3 text-sm text-center"
            >
              Hire Me →
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
