import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row z-10 justify-around p-6 font-bebas bg-black border-b-2 border-white text-yellow-400 fixed top-0 left-0 right-0 text-xl">
      <a href="#home">Home</a>
      <a href="#projects">Projects</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </div>
  );
};

export default Header;
