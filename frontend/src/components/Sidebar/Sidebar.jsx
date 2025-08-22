import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/students">Students</Link></li> {/* ✅ FIXED path */}
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/marks">Marks</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
