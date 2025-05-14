import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./AdminLeaveManagement.css";
import { Icon } from "@iconify/react";

const AdminLeaveManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const leaveData = [
    {
      employee: "Anirudha Kadam",
      type: "Sick Leave",
      date: "01/03/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Pending",
    },
    {
      employee: "Manoj Pande",
      type: "Casual Leave",
      date: "21/02/2025 - 23/02/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Approved",
    },
    {
      employee: "Radha Kumar",
      type: "Casual Leave",
      date: "12/01/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Approved",
    },
    {
      employee: "Anjali Singh",
      type: "Sick Leave",
      date: "01/03/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Pending",
    },
    {
      employee: "Ashish Kumar",
      type: "Casual Leave",
      date: "21/02/2025 - 23/02/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Approved",
    },
  ];

  const filteredLeaves = leaveData.filter((leave) => {
    const matchesSearch = leave.employee
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || leave.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="backgound-main-content">
          <div className="adminleave-content">
            <h2>Leave Requests</h2>

            <div className="filters">
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
              <div className="date-picker-container">
                <div className="date-display">
                  <Icon
                    icon="uil:calender"
                    width="20"
                    height="20"
                    color="#00A3FF" // match the blue in Figma
                  />
                  <span>Apr ‘25</span>
                  <Icon
                    icon="ep:arrow-down"
                    width="16"
                    height="16"
                    color="#909090"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Pending</option>
                <option>Approved</option>
              </select>
            </div>

            {filteredLeaves.length === 0 ? (
              <p style={{ marginTop: "20px" }}>No leave requests found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Date (From–To)</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave, index) => (
                    <tr key={index}>
                      <td>{leave.employee}</td>
                      <td>{leave.type}</td>
                      <td>{leave.date}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            leave.status === "Approved" ? "approved" : "pending"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveManagement;
