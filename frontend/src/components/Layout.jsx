import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

function Layout({ setIsLoggedIn, children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <div
        className="layout-content"
        style={{
          marginLeft: "180px",
          flex: 1,
          padding: "20px",
          minHeight: "100vh",
          background: "#f0f2f5"
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;