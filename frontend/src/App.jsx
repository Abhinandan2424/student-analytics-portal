import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AttendancePage from "./components/Attendance/AttendancePage";
import StudentList from "./components/Students/StudentList";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentForm from "./components/Students/StudentForm";
import EditStudent from "./components/Students/EditStudent";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import {api} from "./api/client";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access"),
  );
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .get("/teacher/profile/")
        .then((res) => setTeacherInfo(res.data))
        .catch(() => {
          setIsLoggedIn(false);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        });
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <div>
        <h1 className="app-title">Student Attendance Analytics Portal</h1>
        <hr className="app-divider" />

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login
                  setIsLoggedIn={setIsLoggedIn}
                  setTeacherInfo={setTeacherInfo}
                />
              )
            }
          />

          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Layout setIsLoggedIn={setIsLoggedIn} teacherInfo={teacherInfo}>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/students"
            element={
              isLoggedIn ? (
                <Layout setIsLoggedIn={setIsLoggedIn} teacherInfo={teacherInfo}>
                  <StudentList />
                </Layout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/attendance"
            element={
              isLoggedIn ? (
                <Layout setIsLoggedIn={setIsLoggedIn} teacherInfo={teacherInfo}>
                  <AttendancePage />
                </Layout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/studentform"
            element={
              isLoggedIn ? (
                <Layout setIsLoggedIn={setIsLoggedIn} teacherInfo={teacherInfo}>
                  <StudentForm />
                </Layout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/edit-student/:id"
            element={
              isLoggedIn ? (
                <Layout setIsLoggedIn={setIsLoggedIn} teacherInfo={teacherInfo}>
                  <EditStudent />
                </Layout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
