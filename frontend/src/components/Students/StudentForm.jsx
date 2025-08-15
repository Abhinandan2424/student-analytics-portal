import React, { useState } from 'react';
import { api } from '../../api/client';
import { useNavigate } from 'react-router-dom';
import './StudentForm.css';

function StudentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    roll_no: '',
    student_class: '10A',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await api.post('/students/add_student/', formData); // trailing slash added
    alert('Student added successfully!');
    setFormData({
      name: '',
      roll_no: '',
      student_class: '10A',
      email: '',
      phone: ''
    });
    navigate('/'); 
  } catch (error) {
    console.error(error);
    alert('Error saving student: ' + (error.response?.data?.detail || error.message));
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Roll Number:</label>
          <input 
            type="number" 
            name="roll_no" 
            value={formData.roll_no} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Class:</label>
          <select 
            name="student_class" 
            value={formData.student_class} 
            onChange={handleChange}
          >
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="11A">11A</option>
            <option value="11B">11B</option>
          </select>
        </div>

       

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit" className="submit-btn">Save Student</button>
      </form>
    </div>
  );
}

export default StudentForm;