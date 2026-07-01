import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/students", label: "Students", icon: "👨‍🎓" },
    { path: "/attendance", label: "Attendance", icon: "📅" },
  ];

  const logoutHandler = (e) => {
    e.preventDefault();
    handleLogout();
  };

  return (
    <div>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "X" : "Menu"}
      </button>

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>
      )}

      <div className={isOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="sidebar-logo">
          Portal
        </div>

        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}

          <li>
            <a href="#" className="logout-link" onClick={logoutHandler}>
              <span className="nav-icon">🚪</span>
              <span className="nav-label">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;