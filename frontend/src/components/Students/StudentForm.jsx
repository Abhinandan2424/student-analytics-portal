import React, { useState } from "react";
import { api } from "../../api/client";
import { useNavigate } from "react-router-dom";
import "./StudentForm.css";

function StudentForm() {
  const navigate = useNavigate();

  const emptyStudent = {
    name: "",
    roll_no: "",
    student_class: "10A",
    email: "",
    phone: "",
  };

  // only for student list
  const [studentsList, setStudentsList] = useState([emptyStudent]);

  const handleChange = (e, index) => {
    const updatedStudents = [...studentsList];
    updatedStudents[index][e.target.name] = e.target.value;
    setStudentsList(updatedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload =
        studentsList.length === 1 ? studentsList[0] : studentsList;

      await api.post("/students/", payload);
      alert("Student(s) added successfully!");

      // Reset form
      setStudentsList([emptyStudent]);

      navigate("/students");
    } catch (error) {
      alert(
        "Error saving student: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        {studentsList.map((student, index) => (
          <div key={index} className="student-form">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>

            <div className="form-group">
              <label>Roll Number:</label>
              <input
                type="number"
                name="roll_no"
                value={student.roll_no}
                onChange={(e) => handleChange(e, index)}
                required
              />
            </div>

            <div className="form-group">
              <label>Class:</label>
              <select
                name="student_class"
                value={student.student_class}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="10A">10A</option>
                <option value="10B">10B</option>
                <option value="9A">9A</option>
                <option value="9B">9B</option>
                <option value="8A">8A</option>
                <option value="8B">8B</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={(e) => handleChange(e, index)}
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={student.phone}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
          </div>
        ))}

        <button type="submit" className="submit-btn">
          Save Student
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
