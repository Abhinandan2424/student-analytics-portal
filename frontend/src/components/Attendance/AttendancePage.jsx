import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import './AttendancePage.css';

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10A');
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  // Fetch students data
  useEffect(() => {
    api.get(`/students/?class=${selectedClass}`)
      .then(res => {
        setStudents(res.data);
        // Initialize all as present by default
        const initialStatus = {};
        res.data.forEach(student => {
          initialStatus[student.id] = true;
        });
        setAttendanceStatus(initialStatus);
      })
      .catch(err => console.error(err));
  }, [selectedClass]);

  // Handle status toggle
  const toggleStatus = (studentId) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  // Mark all present
  const markAllPresent = () => {
    const allPresent = {};
    students.forEach(student => {
      allPresent[student.id] = true;
    });
    setAttendanceStatus(allPresent);
  };

  // Save attendance
  const saveAttendance = () => {
    const attendanceData = students.map(student => ({
      student_id: student.id,
      date: date,
      status: attendanceStatus[student.id] ? 'present' : 'absent'
    }));

    api.post("/attendance/", attendanceData)
      .then(() => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      })
      .catch(err => alert('Error saving attendance: ' + err.message));
  };

  // Format date for display
  const displayDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="attendance-container">
      <h1>Attendance</h1>
      
      <div className="class-date-section">
        <div className="class-selector">
          <label>Class: </label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="10A">10A</option>
            <option value="10B">10B</option>
            <option value="11A">11A</option>
            <option value="11B">11B</option>
            <option value="12A">12A</option>
            <option value="12B">12B</option>
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
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.roll_no}</td>
              <td>{student.name}</td>
              <td>
                <button 
                  className={`status-toggle ${attendanceStatus[student.id] ? 'present' : 'absent'}`}
                  onClick={() => toggleStatus(student.id)}
                >
                  {attendanceStatus[student.id] ? '✅' : '❌'}
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