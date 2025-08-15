import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>School Analytics Dashboard</h2>
      <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
        <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 5 }}>
          <h3>Total Students</h3>
          <p style={{ fontSize: 24 }}>{stats.total_students}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 5 }}>
          <h3>Avg Attendance</h3>
          <p style={{ fontSize: 24 }}>{stats.avg_attendance_pct}%</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: 15, borderRadius: 5 }}>
          <h3>Avg Marks</h3>
          <p style={{ fontSize: 24 }}>{stats.avg_marks}</p>
        </div>
      </div>
    </div>
  );
}