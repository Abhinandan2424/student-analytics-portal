import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { api } from "../../api/client";
import "./Dashboard.css";

const COLORS = ["#4CAF50", "#F44336"];

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancePercent, setAttendancePercent] = useState("0%");
  const [todayData, setTodayData] = useState({ present: 0, absent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const studentsRes = await api.get("/students/");
      setTotalStudents(studentsRes.data.length);

      const attendanceRes = await api.get("/attendance/today/");
      const present = attendanceRes.data.present || 0;
      const absent = attendanceRes.data.absent || 0;

      setTodayData({ present, absent });
      setAttendanceData([
        { name: "Present", value: present },
        { name: "Absent", value: absent },
      ]);

      const percent = ((present / ((present + absent) || 1)) * 100).toFixed(1) + "%";
      setAttendancePercent(percent);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>🏫 Panhala Highschool</h2>
        <p className="dashboard-date">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long", year: "numeric",
            month: "long", day: "numeric"
          })}
        </p>
      </div>

      <div className="stats-container">
        <div className="card card-blue">
          <div className="card-icon">👨‍🎓</div>
          <div className="card-value">{totalStudents}</div>
          <div className="card-label">Total Students</div>
        </div>
        <div className="card card-green">
          <div className="card-icon">✅</div>
          <div className="card-value">{todayData.present}</div>
          <div className="card-label">Present Today</div>
        </div>
        <div className="card card-red">
          <div className="card-icon">❌</div>
          <div className="card-value">{todayData.absent}</div>
          <div className="card-label">Absent Today</div>
        </div>
        <div className="card card-purple">
          <div className="card-icon">📊</div>
          <div className="card-value">{attendancePercent}</div>
          <div className="card-label">Attendance Rate</div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>Today's Attendance Overview</h3>
          {attendanceData.length > 0 && (attendanceData[0].value > 0 || attendanceData[1].value > 0) ? (
            <div className="chart-wrapper">
              <PieChart width={280} height={280}>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          ) : (
            <div className="no-data">
              <p>📭 No attendance marked today</p>
            </div>
          )}
        </div>

        <div className="chart summary-card">
          <h3>Quick Summary</h3>
          <div className="summary-row">
            <span className="summary-label">🟢 Present</span>
            <span className="summary-value green">{todayData.present} students</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">🔴 Absent</span>
            <span className="summary-value red">{todayData.absent} students</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">📈 Rate</span>
            <span className="summary-value blue">{attendancePercent}</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: attendancePercent }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;