import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;