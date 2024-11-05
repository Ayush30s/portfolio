import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";

const App = () => {
  const [d, setD] = useState(false);

  return (
    <Router>
      <div className={`min-h-screen transition-all duration-300 ${!d ? "bg-black" : "bg-gradient-to-b from-gray-200 to-white"}`}>
        <Header d={d} setD={setD} />
        <Routes>
          <Route path="/" element={<Home d={d} setD={setD} />} />
          <Route path="/projects" element={<Projects d={d} />} />
          <Route path="/about" element={<About d={d} />} />
          <Route path="/contact" element={<Contact d={d} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
