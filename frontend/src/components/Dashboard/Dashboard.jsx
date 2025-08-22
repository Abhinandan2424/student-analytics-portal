import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { api } from "../../api/client"; // ✅ axios client
import "./Dashboard.css";

const COLORS = ["#0088FE", "#FF8042"];

const marksData = [
  { subject: "Maths", avg: 75 },
  { subject: "Science", avg: 82 },
  { subject: "English", avg: 68 },
  { subject: "History", avg: 80 },
];

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendancePercent, setAttendancePercent] = useState("0%");

  // Fetch data from API
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ Total Students
      const studentsRes = await api.get("/students/");
      setTotalStudents(studentsRes.data.length);

      // ✅ Today's Attendance
      const attendanceRes = await api.get("/attendance/today/");
      const present = attendanceRes.data.present || 0;
      const absent = attendanceRes.data.absent || 0;

      setAttendanceData([
        { name: "Present", value: present },
        { name: "Absent", value: absent },
      ]);

      const percent =
        ((present / ((present + absent) || 1)) * 100).toFixed(1) + "%";
      setAttendancePercent(percent);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome To Panhala Highschool Panhala</h2>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="card">
          👨‍🎓 Students <br /> {totalStudents}
        </div>
        <div className="card">
          📅 Attendance Today <br /> {attendancePercent}
        </div>
        <div className="card">
          📊 Avg Marks <br /> 78%
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart">
          <h3>Attendance Overview</h3>
          {attendanceData.length > 0 ? (
            <PieChart width={300} height={300}>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <p>Loading attendance data...</p>
          )}
        </div>

        <div className="chart">
          <h3>Subject-wise Average Marks</h3>
          <BarChart width={400} height={300} data={marksData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avg" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
