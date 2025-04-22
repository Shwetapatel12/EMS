import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import Sidebar from "../components/Sidebar";
import "./Dashboard.css"; // Add a CSS file for layout adjustments
import "./AdminTimesheet.css";
import { Icon } from "@iconify/react";
import { format, addDays, subDays, startOfWeek, isSameDay } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const employees = [
  {
    name: "Anirudha Kadam",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Manoj Pande",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Radha Kumar",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "",
  },
  {
    name: "Anjali Singh",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Ashish Kumar",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
  },
];

const AdminTimeSheet = () => {
  const [viewMode, setViewMode] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const generateWeekDates = () => {
    return Array.from({ length: 7 }, (_, i) =>
      addDays(currentWeekStartDate, i)
    );
  };

  const handlePrevWeek = () => {
    setCurrentWeekStartDate((prev) => subDays(prev, 7));
  };

  const handleNextWeek = () => {
    setCurrentWeekStartDate((prev) => addDays(prev, 7));
  };

  const weekDates = generateWeekDates();
  const today = new Date();

  const handleDownload = () => {
    const dataToExport = employees
      .filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((emp) => ({
        "Employee Name": emp.name,
        "Login Time": emp.login,
        "Login Location": "View Map", // Replace with actual location if available
        "Logout Time": emp.logout,
        "Logout Location": "View Map", // Replace with actual location if available
        Tasks: emp.tasks,
      }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timesheet");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(file, "Employee_Timesheet.xlsx");
  };
  

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />
        <div className="backgound-main-content">
          <div className="timesheet-headesr">
            <div className="header-title">
              <h2>Employee’s Timesheet</h2>
              <button className="download-btn" onClick={handleDownload}>
                {" "}
                <Icon
                  icon="material-symbols:download-rounded"
                  width="18"
                  height="18"
                />
                Download Sheet
              </button>
            </div>
            <div className="timesheet-controls">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search employee name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Icon
                  icon="iconamoon:search"
                  width="20"
                  height="20"
                  color="rgba(0, 175, 239, 1)"
                />
              </div>
              <div className="toggle-buttons">
                <button
                  className={viewMode === "daily" ? "active" : "inactive"}
                  onClick={() => setViewMode("daily")}
                >
                  Daily
                </button>
                <button
                  className={viewMode === "weekly" ? "active" : "inactive"}
                  onClick={() => setViewMode("weekly")}
                >
                  Weekly
                </button>
              </div>
              <div className="calender">
                <div className="date-picker">
                  <Icon
                    icon="uil:calender"
                    width="20"
                    height="20"
                    color="rgba(144, 144, 144, 1)"
                  />
                  <span className="dates">
                    {format(weekDates[0], "MMM d")} -{" "}
                    {format(weekDates[6], "MMM d ''yy")}
                  </span>
                  <button className="na-btn" onClick={handlePrevWeek}>
                    <Icon
                      icon="iconamoon:arrow-left-2"
                      width="20"
                      height="20"
                      color="rgba(144, 144, 144, 1)"
                    />
                  </button>
                  <button className="na-btn" onClick={handleNextWeek}>
                    <Icon
                      icon="iconamoon:arrow-right-2"
                      width="20"
                      height="20"
                      color="rgba(144, 144, 144, 1)"
                    />
                  </button>
                </div>

                {viewMode === "weekly" ? (
                  <div className="date-boxes">
                    {weekDates.map((day, idx) => (
                      <div
                        key={idx}
                        className={`date-box ${
                          isSameDay(day, selectedDate) ? "selected" : ""
                        } ${isSameDay(day, today) ? "today" : ""}`}
                        onClick={() => setSelectedDate(day)}
                      >
                        {format(day, "d")}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="daily-date-view">
                    {/* <span className="selected-daily-date">
                      Date: Apr {selectedDate}, 2025
                    </span> */}
                  </div>
                )}
              </div>
            </div>

            <div className="timesheet-table">
              <table>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Login Time</th>
                    <th>Login Location</th>
                    <th>Logout Time</th>
                    <th>Logout Location</th>
                    <th>Tasks</th>
                  </tr>
                </thead>
                <tbody>
                  {employees
                    .filter((emp) =>
                      emp.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((emp, index) => (
                      <tr key={index}>
                        <td>
                          <div className="employee-info">
                            {emp.avatar ? (
                              <img src={emp.avatar} alt={emp.name} />
                            ) : (
                              <div className="default-avatar">👤</div>
                            )}
                            <span>{emp.name}</span>
                          </div>
                        </td>
                        <td>{emp.login}</td>
                        <td>
                          <a href="#">View Map</a>
                        </td>
                        <td>{emp.logout}</td>
                        <td>
                          <a href="#">View Map</a>
                        </td>
                        <td>{emp.tasks}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTimeSheet;
