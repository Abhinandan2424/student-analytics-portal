import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AttendancePage from "./components/Attendance/AttendancePage";
import StudentList from "./components/Students/StudentList";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentForm from "./components/Students/StudentForm";
import EditStudent from "./components/Students/EditStudent";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";  
import Layout from "./components/Layout";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access") // check token
  );

  return (
    <BrowserRouter>
      <div>
        <div className="app-header">
          <h1 className="app-title">
            Student Attendance Analytics Portal
          </h1>
          <hr className="app-divider" />
        </div>

        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />

          {isLoggedIn ? (
            <Route element={<Layout setIsLoggedIn={setIsLoggedIn} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<StudentList />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/studentform" element={<StudentForm />} />
              <Route path="/edit-student/:id" element={<EditStudent />} />
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
