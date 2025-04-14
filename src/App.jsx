import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TimeSheet from "./pages/Timesheet"; 
import Profile from "./pages/ProfilePage"; // Ensure Profile is imported
import "./index.css";
import AdminTimeSheet from "./pages/AdminTimeSheet";
import EmployeeManagement from "./pages/EmployeeManagement";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-timesheet" element={<AdminTimeSheet />} />
        <Route path="/emp-managment" element={<EmployeeManagement />} />
        <Route path="/timesheet" element={<TimeSheet />} /> 
        <Route path="/profile" element={<Profile />} /> {/* Ensure Profile is imported */}
      </Routes>
    </Router>
  );
}

export default App;
