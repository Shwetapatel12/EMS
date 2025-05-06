import React, { useState } from "react";
import "./ApplyLeave.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; // You were importing Sidebar incorrectly
import { Icon } from "@iconify/react/dist/iconify.js";

const ApplyLeaveForm = () => {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ leaveType, fromDate, toDate, reason });
    // Add your API logic or further handling here
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="backgound-main-content">
          <div className="apply-container">
            <Icon
              icon="material-symbols:arrow-back-rounded"
              className="back-icon"
              onClick={() => window.history.back()}
            />
            <p className="apply-title">Apply for Leave:</p>
            <p className="apply-subtitle">
              For leave application fill out the below details
            </p>
            <form className="leave-form" onSubmit={handleSubmit}>
              <label>Leave Type*</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Earned Leave">Earned Leave</option>
              </select>

              <div className="date-section">
                <label>Leave Duration*</label>
                <div className="date-input">
                  <div>
                    <label>From*</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>To*</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <label>Reason*</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />

              <div className="button-wrapper">
                <Icon icon="grommet-icons:send" color="rgba(0, 175, 239, 1)" />
                <button type="submit" className="send-button">
                  Send Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
