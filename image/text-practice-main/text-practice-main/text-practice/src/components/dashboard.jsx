
import { Link, useNavigate } from "react-router-dom";
// import Header from "./header"; // Import the Header component

function Dashboard() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      {/* Use the Header component */}
      
      <h1>Welcome to the Admin Panel</h1>
      <h2>Hello, {username}</h2>
      <nav>
        <Link to="/employee-list">Employee List</Link> |{" "}
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
}

export default Dashboard;
