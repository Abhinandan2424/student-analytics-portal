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
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
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
  <Route
    path="/"
    element={
      isLoggedIn ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )
    }
  />

  <Route path="/signup" element={<Signup />} />

  <Route
    path="/dashboard"
    element={
      isLoggedIn ? (
        <Layout setIsLoggedIn={setIsLoggedIn}>
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
        <Layout setIsLoggedIn={setIsLoggedIn}>
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
        <Layout setIsLoggedIn={setIsLoggedIn}>
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
        <Layout setIsLoggedIn={setIsLoggedIn}>
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
        <Layout setIsLoggedIn={setIsLoggedIn}>
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