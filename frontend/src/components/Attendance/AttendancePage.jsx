import React, { useState, useEffect } from "react";
import { api } from "../../api/client";
import "./AttendancePage.css";

function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState("10A");
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [isSaved, setIsSaved] = useState(false);


  useEffect(() => {
    if (selectedClass) {
      api
        .get(`/students/?student_class=${selectedClass}`)
        .then((res) => {
          setStudents(res.data);

          // default all as present
          const initialStatus = {};
          res.data.forEach((student) => {
            initialStatus[student.id] = true;
          });
          setAttendanceStatus(initialStatus);

          // also fetch saved attendance for this class & date
          fetchSavedAttendance(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedClass, date]);

  // fetch saved attendance for date + class
  const fetchSavedAttendance = (studentList) => {
    api
      .get(`/attendance/?date=${date}&class=${selectedClass}`)
      .then((res) => {
        if (res.data.length > 0) {
          const savedStatus = {};
          studentList.forEach((student) => {
            const record = res.data.find((a) => a.student.id === student.id);
            savedStatus[student.id] = record
              ? record.status === "present"
              : false;
          });
          setAttendanceStatus(savedStatus);
        }
      })
      .catch((err) => console.error("Error fetching saved attendance", err));
  };

  // Toggle status of one student
  const toggleStatus = (studentId) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // Mark all present
  const markAllPresent = () => {
    const allPresent = {};
    students.forEach((student) => {
      allPresent[student.id] = true;
    });
    setAttendanceStatus(allPresent);
  };

  // Save attendance
  const saveAttendance = () => {
    const attendanceData = students.map((student) => ({
      student_id: student.id,
      date: date,
      status: attendanceStatus[student.id] ? "present" : "absent",
    }));

    api
      .post("/save-attendance/", attendanceData) 
      .then(() => {
        alert(`Attendance is saved.`)
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      })
      .catch((err) => alert("Error saving attendance: " + err.message));
  };

  // Date display
  const displayDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="attendance-container">
      <h1>Attendance</h1>

      <div className="class-date-section">
        <div className="class-selector">
          <label>Class: </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="9A">9A</option>
            <option value="9B">9B</option>
            <option value="8A">8A</option>
            <option value="8B">8B</option>
          </select>
        </div>

        <div className="date-selector">
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <hr className="divider" />

      <h2>Mark Attendance</h2>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.roll_no}</td>
              <td>{student.name}</td>
              <td>
                <button
                  className={`status-toggle ${
                    attendanceStatus[student.id] ? "present" : "absent"
                  }`}
                  onClick={() => toggleStatus(student.id)}
                >
                  {attendanceStatus[student.id] ? "✅" : "❌"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="action-buttons">
        <button className="mark-all-btn" onClick={markAllPresent}>
          Mark All Present
        </button>

        <button className="save-btn" onClick={saveAttendance}>
          Save Attendance
        </button>
      </div>

      {isSaved && (
        <div className="save-message">
          Attendance saved for Class {selectedClass} on {displayDate}
        </div>
      )}
    </div>
  );
}

export default AttendancePage;
