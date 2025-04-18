import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Icon } from '@iconify/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './admindashboard.css';
import './EmployeeProfile';
import { useNavigate } from 'react-router-dom';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

// Sample attendance data
const attendanceData = [
  { day: 1, emp: 21 },
  { day: 2, emp: 15 },
  { day: 3, emp: 10 },
  { day: 4, emp: 18 },
  { day: 5, emp: 22 },
  { day: 6, emp: 20 },
  { day: 7, emp: 15 },
  { day: 8, emp: 13 },
  { day: 9, emp: 18 },
  { day: 10, emp: 20 },
  { day: 11, emp: 25 },
  { day: 12, emp: 20 },
  { day: 13, emp: 22 },
  { day: 14, emp: 24 },
  { day: 15, emp: 23 },
  { day: 16, emp: 22 },
  { day: 17, emp: 25 },
  { day: 18, emp: 24 },
  { day: 19, emp: 21 },
  { day: 20, emp: 23 },
  { day: 21, emp: 22 },
  { day: 22, emp: 20 },
  { day: 23, emp: 21 },
  { day: 24, emp: 23 },
  { day: 25, emp: 24 },
  { day: 26, emp: 22 },
  { day: 27, emp: 20 },
  { day: 28, emp: 23 },
  { day: 29, emp: 25 },
  { day: 30, emp: 22 },
];

// Employees data
const employees = [
  {
    id: 1,
    name: "Anirudha Kadam",
    role: "Developer",
    department: "IT",
    personalEmail: "abc@gmail.com",
    companyemail: "anirudha@raksoftech.com",
    mobile: "12345 67890",
    dob: "DD/MM/YYYY",
    doj: "DD/MM/YYYY",
    manager: "Manager Name",
    hr: "HR Name",
    image: "/assets/Ellipse 154.png",
  },
  {
    id: 2,
    name: "Manoj Pande",
    role: "Developer",
    department: "IT",
    email: "manojp@raksoftech.com",
    image: "/assets/Ellipse 155.png",
  },
  {
    id: 3,
    name: "Radha Kumar",
    email: "radhak@raksoftech.com",
    image: "/assets/Group 239225 .png",
  },
  {
    id: 4,
    name: "Anjali Singh",
    email: "anjalis@raksoftech.com",
    image: "/assets/Ellipse 157.png",
  },
];

// Custom button for DatePicker
const CustomDateButton = React.forwardRef(({ value, onClick }, ref) => (
  <div className="date-picker-btn" ref={ref}>
    <span>{value}</span>
    <Icon
      icon="mdi:chevron-down"
      width="20"
      height="20"
      className="dropdown-icon"
      onClick={onClick}
      style={{ cursor: 'pointer', marginLeft: '8px' }}
    />
  </div>
));

const CustomTooltip = ({ active, payload, label, selectedDate }) => {
  if (active && payload && payload.length) {
    const selectedMonth = selectedDate.toLocaleString('default', { month: 'short' });
    const selectedYear = selectedDate.getFullYear();

    return (
      <div className="custom-tooltip" style={{
        background: "#fff",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "6px"
      }}>
        <p><strong>{`${payload[0].value}`}</strong> | {selectedMonth} {label}</p>
      </div>
    );
  }
  return null;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleViewEmployee = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  return (
    <div>
      <div className="admin-dashboard-container"></div>
      <Navbar />
      <div className="admin-dashboard-content"></div>
      <Sidebar />

      <div className="admin-backgound-main-content">
        <div className='text'>
          <div className="stat-row">
            <div className="admin-stat-card">
              <div className="admin-stat-icon blue">
                <img src="/assets/material-symbols_group-outline.png" alt="" className="icon-with-bg-one" />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Employees</p>
                <p className="stat-value">32</p>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon yellow">
                <img src="/assets/fingerprint.png" alt="" className="icon-with-bg-two" />
              </div>
              <div className="stat-info">
                <p className="stat-label">Punched in Today</p>
                <p className="stat-value">28</p>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon green">
                <img src="/assets/material-symbols_group-outline (1).png" alt="" className="icon-with-bg-three" />
              </div>
              <div className="stat-info">
                <p className="stat-label">Absent Today</p>
                <p className="stat-value">4</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-dashboard-row">
          {/* Chart Section */}
          <div className="admin-dashboard-chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Monthly Attendance Trends</h3>
              <div className="date-picker-container">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  customInput={<CustomDateButton />}
                />
              </div>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                data={attendanceData}
                margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorEmp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00AFEF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" type="number" domain={[1, 30]} tickCount={6} tick={{ fontSize: 12 }} />
                <YAxis type="number" domain={[0, 30]} ticks={[0, 5, 10, 15, 20, 25, 30]} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip selectedDate={selectedDate} />} />
                <Area type="monotone" dataKey="emp" stroke="#2563eb" fill="url(#colorEmp)" strokeWidth={2} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* New Employees Section */}
          <div className="admin-new-employees-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">New Employees This Month</h2>
              <button className="admin-add-employee-btn">+ Employee</button>
            </div>

            <div className="admin-employee-list">
              {employees.map(employee => (
                <div className="admin-employee-item" key={employee.id}>
                  <img
                    src={employee.image}
                    alt={employee.name}
                    className="admin-employee-img"
                  />
                  <div className="admin-employee-info">
                    <p className="admin-employee-name">{employee.name}</p>
                    <p className="admin-employee-email">{employee.email}</p>
                  </div>
                  <button
                    className="view-btn"
                    onClick={() => handleViewEmployee(employee.id)}
                  >
                    <Icon icon="mdi:eye-outline" className="admin-admin-eye-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;





