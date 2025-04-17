import React from "react";
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import Sidebar from "../components/Sidebar";
import "./Dashboard.css"; // Add a CSS file for layout adjustments
import "./AdminTimesheet.css";
import { Icon } from "@iconify/react";

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
  const [viewMode, setViewMode] = React.useState("weekly");
  const [selectedDate, setSelectedDate] = React.useState("26");
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        <Sidebar />
        <div className="backgound-main-content">
          <div className="timesheet-headesr">
            <div className="header-title">
              <h2>Employee’s Timesheet</h2>
              <button className="download-btn">
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
                  <span className="dates">Apr 24 - Apr 30 '25</span>
                  <Icon
                    icon="iconamoon:arrow-up-2"
                    width="20"
                    height="20"
                    color="rgba(144, 144, 144, 1)"
                    className="rotate-90"
                  />
                  <Icon
                    icon="iconamoon:arrow-up-2"
                    width="20"
                    height="20"
                    color="rgba(144, 144, 144, 1)"
                    className="rotate-90-left"
                  />
                </div>

                {viewMode === "weekly" ? (
                  <div className="date-boxes">
                    {["24", "25", "26", "27", "28", "29", "30"].map(
                      (day, idx) => (
                        <div
                          key={idx}
                          className={`date-box ${
                            selectedDate === day ? "selected" : ""
                          }`}
                          onClick={() => setSelectedDate(day)}
                        >
                          {day}
                        </div>
                      )
                    )}
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
