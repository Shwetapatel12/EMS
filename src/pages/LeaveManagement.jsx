import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./LeaveManagement.css";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const LeaveManagement = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/apply-leave");
  };

  const leaveRecords = [
    {
      applied: "01/03/2025",
      type: "Sick Leave",
      range: "01/03/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Pending",
    },
    {
      applied: "21/02/2025",
      type: "Casual Leave",
      range: "21/02/2025 - 23/02/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Approved",
    },
    {
      applied: "12/01/2025",
      type: "Casual Leave",
      range: "12/01/2025",
      reason: "Lorem ipsum dolor sit amet...",
      status: "Approved",
    },
  ];

  return (
    <div>
      <div className="dashboard-container">
        <Navbar />
        <div className="dashboard-content">
          <Sidebar />
        </div>
        <div className="backgound-main-content">
          <div className="leave-management-container">
            <div className="header-section">
              <Icon
                icon="material-symbols:event-outline-rounded"
                className="apply-cal-icon"
              />
              <button className="apply-button" onClick={handleApplyClick}>
                Apply for Leave
              </button>
            </div>

            <div className="summary-cards">
              <div className="card">
                <div className="icon-container">
                  <Icon
                    icon="material-symbols:event-outline-rounded"
                    width="28"
                    height="28"
                    className="TotalLeave"
                  />
                </div>
                <div className="card-content">
                  <div className="label">Total Leaves for year</div>
                  <div className="value">12</div>
                </div>
              </div>

              <div className="card">
                <div className="icon-container">
                  <Icon
                    icon="material-symbols:event-outline-rounded"
                    width="28"
                    height="28"
                    className="LeaveTaken"
                  />
                </div>
                <div className="card-content">
                  <div className="label">Leaves Taken</div>
                  <div className="value">4</div>
                </div>
              </div>

              <div className="card">
                <div className="icon-container">
                  <Icon
                    icon="material-symbols:event-outline-rounded"
                    width="28"
                    height="28"
                    className="HalfDay"
                  />
                </div>
                <div className="card-content">
                  <div className="label">Half Days</div>
                  <div className="value">1</div>
                </div>
              </div>
            </div>

            <div className="leave-records">
              <p className="section-title">Leave Records</p>
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Date Applied</th>
                    <th>Leave Type</th>
                    <th>Date (From–To)</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.applied}</td>
                      <td>{record.type}</td>
                      <td>{record.range}</td>
                      <td>{record.reason}</td>
                      <td>
                        <div
                          className={`status ${
                            record.status === "Pending"
                              ? "status-pending"
                              : "status-approved"
                          }`}
                        >
                          <Icon
                            icon={
                              record.status === "Pending"
                                ? "weui:time-outlined"
                                : "weui:done2-outlined"
                            }
                            width="18"
                            height="18"
                          />
                          <span>{record.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="leave-guidelines">
              <p className="section-title">Leaves Guidelines:</p>
              <div className="guideline-container">
                <div className="guideline-item">
                  <div className="guideline-card">
                    <span>RAK Holiday List</span>
                    <Icon
                      icon="vscode-icons:file-type-pdf2"
                      width="28"
                      height="28"
                      className="pdf-icon"
                    />
                  </div>
                </div>

                <div className="guideline-item">
                  <div className="guideline-card">
                    <span>Leave Guidelines</span>
                    <Icon
                      icon="vscode-icons:file-type-pdf2"
                      width="28"
                      height="28"
                      className="pdf-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
