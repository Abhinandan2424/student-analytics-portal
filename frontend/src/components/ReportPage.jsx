import React, { useEffect, useState } from 'react';
import { api } from '../api/client';

export default function ReportsPage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    // Fetch attendance data
    api.get("/attendance/")
      .then(res => setAttendanceData(res.data))
      .catch(err => console.error(err));

    // Fetch marks data
    api.get("/marks/")
      .then(res => setMarksData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Analytics Reports</h2>
      
      <div style={{ marginBottom: 30 }}>
        <h3>Attendance Records</h3>
        <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: 20 }}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map(record => (
              <tr key={record.id}>
                <td>{record.student_name}</td>
                <td>{record.date}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Marks Records</h3>
        <table border="1" cellPadding="8" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Max Marks</th>
            </tr>
          </thead>
          <tbody>
            {marksData.map(record => (
              <tr key={record.id}>
                <td>{record.student_name}</td>
                <td>{record.subject}</td>
                <td>{record.marks_obtained}</td>
                <td>{record.max_marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}