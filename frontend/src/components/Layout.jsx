import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

function Layout({ setIsLoggedIn }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Sidebar */}
      <div style={{ flex: "0.5" }}>
        <Sidebar setIsLoggedIn={setIsLoggedIn} />
      </div>

      {/* Main content (routes ka content yahan load hoga) */}
      <div style={{ flex: "3", padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
