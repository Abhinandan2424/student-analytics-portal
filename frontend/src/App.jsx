import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AttendancePage from "./components/Attendance/AttendancePage";
// import MarksPage from "./components/MarksPage";
// import ReportsPage from "./components/ReportsPage";
import StudentList from "./components/Students/StudentList";
import Dashboard from "./components/Dashboard/Dashboard";
import StudentForm from "./components/Students/StudentForm";

function App() {
  return (
    <BrowserRouter>
    <div>
      <div  style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <h1>Student Attendance & Marks Analytics Portal</h1>
      <nav >
        <Link to="/" style={{ marginRight: 10 }}>Students</Link>
        <Link to="/dashboard" style={{ marginRight: 10 }}>Dashboard</Link>
        <Link to="/attendance" style={{ marginRight: 10 }}>Attendance</Link>
        <Link to="/studentform" style={{ marginRight: 10 }}>Student Form</Link>

        {/* <Route path="/add_student/" element={<StudentForm />} /> */}
        {/* <Link to="/marks" style={{ marginRight: 10 }}>Marks</Link> */}
        {/* <Link to="/reports">Reports</Link> */}
      </nav>
    </div>
      
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/studentform" element={<StudentForm />} />
        {/* <Route path="/marks" element={<MarksPage />} />
        <Route path="/reports" element={<ReportsPage />} /> */}
      </Routes>
    </div>
    
    </BrowserRouter>
  );
}

export default App;