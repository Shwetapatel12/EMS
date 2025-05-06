import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TimeSheet from "./pages/Timesheet"; 
import Profile from "./pages/ProfilePage"; // Ensure Profile is imported
import "./index.css";
import AdminTimeSheet from "./pages/AdminTimeSheet";
import EmployeeManagement from "./pages/EmployeeManagement";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeProfile from "./pages/EmployeeProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeaveManagement from "./pages/LeaveManagement";
import ApplyLeave from "./pages/ApplyLeave";
import AdminLeaveManagement from "./pages/AdminLeaveManagement";


function App() {
  return (
    <Router>
      <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-timesheet" element={<AdminTimeSheet />} />
        <Route path="/emp-managment" element={<EmployeeManagement />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        
        <Route path="/timesheet" element={<TimeSheet />} /> 
        <Route path="/profile" element={<Profile />} /> {/* Ensure Profile is imported */}
        <Route path="/leave-managment" element={<LeaveManagement />} /> 
        <Route path="/apply-leave" element={<ApplyLeave />} />
        <Route path="/admin-leave-managment" element={<AdminLeaveManagement />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      </>
    </Router>
  );
}

export default App;
