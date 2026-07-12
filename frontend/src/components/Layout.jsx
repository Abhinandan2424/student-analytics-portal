import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

function Layout({ setIsLoggedIn, teacherInfo }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      
     
      <div style={{ flex: "0.5" }}>
        <Sidebar setIsLoggedIn={setIsLoggedIn} />
      </div>

      <div style={{ flex: "3", padding: "20px" }}>
        
       
        {teacherInfo && (
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "10px 20px",
            background: "#f8f9fa",
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
          }}>
            <span style={{ fontSize: "20px", marginRight: "10px" }}>👤</span>
            <div>
              <div style={{ 
                fontWeight: "600", 
                color: "#2c3e50",
                fontSize: "14px" 
              }}>
                {teacherInfo.username}
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: "#7f8c8d" 
              }}>
                {teacherInfo.subject || "Teacher"}
              </div>
            </div>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}

export default Layout;