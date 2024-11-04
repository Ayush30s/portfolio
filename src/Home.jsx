import pro from "../image/pro.jpg";
import ln from "../image/ln2.png";
import git from "../image/github.png";
import x from "../image/x.png";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <div id="home" className="flex flex-col justify-center items-center w-full">
      <div className=" bg-black text-white flex flex-col justify-center items-start align-middle pt-40 pb-20 w-[80%]">
        <div className="flex flex-row justify-center items-center">
          <div className="w-[60%]">
            <h1 className="text-[20px] font-bebas ">I am,</h1>
            <h1 className="text-[50px] font-bebas ">Ayush Srivastav</h1>
            <p className="text-2xl mb-5 font-montserrat ">
              Full-Stack Developer | DSA Enthusiast
            </p>
            <p className="font-lcase font-light">
              Welcome to my portfolio! I'm a passionate full-stack developer
              with a strong foundation in data structures and algorithms. I
              specialize in building dynamic and responsive web applications
              using the MERN stack (MongoDB, Express, React, Node.js).
            </p>
            <div className="flex flex-row justify-start items-center w-[50%] my-3">
              <button className="px-4 py-1 mr-5 rounded-sm text-lg bg-black text-white border border-white">
                <a href="https://drive.google.com/file/d/1GUYNao8tgtupHPqR3CBL972n_oxzYC-Y/view?usp=sharing" >
                  Resume
                </a>
              </button>
              <a
                className="w-[21%]"
                href="https://www.linkedin.com/in/ayush-srivastav-58635b280"
              >
                <img
                  className="w-[60%] rounded-full m-1 border border-white"
                  src={ln}
                  alt="LinkedIn"
                />
              </a>
              <a
                className="w-[20%] mr-2"
                href="https://www.github.com/Ayush30s"
              >
                <img
                  className="w-[60%] rounded-full m-1 border border-white"
                  src={git}
                  alt="GitHub"
                />
              </a>
              <a className="w-[20%]" href="https://x.com/Ayush_Sri_30?s=09">
                <img
                  className="w-[60%] rounded-full m-1 border border-white"
                  src={x}
                  alt="X"
                />
              </a>
            </div>
          </div>
          <img
            className="w-[20%] mx-10 border-2 border-white shadow-lg shadow-black rounded-full"
            src={pro}
            alt="Profile"
          />
        </div>
      </div>
      <Projects />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
