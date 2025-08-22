// src/pages/students/EditStudent.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import "./EditStudent.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    roll_no: "",
    student_class: "10A",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchStudent();
   
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/students/${id}/`);
      setFormData(res.data);
    } catch (err) {
      console.error("Error fetching student:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/students/${id}/`, formData);
      alert(" Student updated successfully!");
      navigate("/students"); // 👈 correct redirect
    } catch (err) {
      alert(" Error updating student: " + err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="roll_no"
          placeholder="Enter roll number"
          value={formData.roll_no}
          onChange={handleChange}
          required
        />
        <select
          name="student_class"
          value={formData.student_class}
          onChange={handleChange}
        >
          <option value="10A">10A</option>
          <option value="10B">10B</option>
          <option value="9A">9A</option>
          <option value="9B">9B</option>
          <option value="8A">8A</option>
          <option value="8B">8B</option>
        </select>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <div className="main-btn">
          
          <button type="button" onClick={() => navigate("/students")}>
            Back
          </button>
          <button type="submit">Update Student</button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
