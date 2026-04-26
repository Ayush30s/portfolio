import { ThemeProvider } from "./ThemeContext";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import "./index.css";

const App = () => {
  return (
    <ThemeProvider>
      <div
        className="relative min-h-screen"
        style={{ background: "var(--navy)" }}
      >
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        


        {/* Scroll to top */}
        {/* <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-48 left-[95%] z-50 w-11 h-11 rounded-full btn-primary flex items-center justify-center shadow-xl opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button> */}
      </div>
    </ThemeProvider>
  );
};

export default App;
