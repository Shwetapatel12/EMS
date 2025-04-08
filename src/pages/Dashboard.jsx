import { useState } from "react";
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AttendanceTable from "../components/AttendanceTable";
import "./Dashboard.css"; // Add a CSS file for layout adjustments

const Dashboard = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  const handleNewEntry = (newEntry) => {
    // Add new entry at the beginning of the list
    setAttendanceList([newEntry, ...attendanceList]);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
          <Header onNewEntry={handleNewEntry} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;