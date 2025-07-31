import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
import ExtraActivity from "./activity";

const App = () => {
  const [d, setD] = useState(false);

  return (
    <Router>
      <div
        className={`min-h-screen transition-all duration-300 ${
          !d ? "bg-black" : "bg-gray-100"
        }`}
      >
        <Header d={d} setD={setD} />
        <div>
          <Routes>
            <Route path="/" element={<Home d={d} setD={setD} />} />
            <Route path="/projects" element={<Projects d={d} setD={setD} />} />
            <Route path="/about" element={<About d={d} setD={setD} />} />
            <Route path="/contact" element={<Contact d={d} setD={setD} />} />
            <Route
              path="/activity"
              element={<ExtraActivity d={d} setD={setD} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
