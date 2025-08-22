import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/client";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    subject: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/teacher/signup/", form);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      alert("Error signing up: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Teacher Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
          />
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
