import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["hero", "about", "projects", "contact"];
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
    { id: "projects", label: "Work" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed px-2 sm:px-0 top-0 left-0 right-0 z-50 transition-all rounded-[5rem] duration-500 ${scrolled ? "py-3" : "py-3 sm:py-5"}`}
      >
        <div
          className={`mx-auto max-w-6xl p-6 flex items-center justify-between rounded-[5rem] transition-all duration-500`}
          style={
            scrolled
              ? {
                  background: "var(--header-bg)",
                  backdropFilter: "blur(200px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 8px 40px rgba(151, 127, 127, 0.12)",
                }
              : {}
          }
        >
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4f8ef7] to-[#7c6af5] rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm z-10">
                My
              </span>
            </div>
            <span
              className="font-800 text-lg tracking-tight hidden sm:block"
              style={{ color: "var(--text-primary)" }}
            >
              Portfolio
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 rounded-full text-sm font-medium  tracking-wide transition-all duration-300"
                style={
                  active === l.id
                    ? {
                        background: "rgba(79,142,247,0.13)",
                        color: "var(--accent)",
                        border: "1px solid var(--border)",
                      }
                    : {
                        color: "var(--text-secondary)",
                        border: "1px solid transparent",
                      }
                }
                onMouseEnter={(e) => {
                  if (active !== l.id)
                    e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (active !== l.id)
                    e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="ml-3 btn-primary px-5 py-2 rounded-full text-sm"
            >
              Let's Build →
            </button>
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile right side */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="p-2 transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div
                className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <div
                className={`w-5 h-0.5 bg-current mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}
              />
              <div
                className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden mx-4 mt-2 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-1"
            style={{
              background: "var(--mobile-menu-bg)",
              border: "1px solid var(--border)",
            }}
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-4 py-3 rounded-xl  font-semibold transition-all"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.background = "var(--tag-bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-primary mt-2 px-4 py-3 rounded-xl text-sm text-center"
            >
              Let's Build Together →
            </button>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
