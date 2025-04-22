import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './EmployeeProfile.css';

// Utilities
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const parseHours = (timeStr) => {
  const [hrs, mins, secs] = timeStr.split(":").map(Number);
  return +(hrs + mins / 60 + secs / 3600).toFixed(2);
};

const customHolidays = ["2025-05-01", "2025-08-15", "2025-08-27", "2025-10-02", "2025-10-20", "2025-10-21", "2025-10-22", "2025-10-23", "2025-12-25"];

const data = [
  // Week-wise hours data
  { week: 'Week 1, 1-4 Apr', day: 'Mon', hours: 8.5 },
  { week: 'Week 1, 1-4 Apr', day: 'Tue', hours: 9 },
  { week: 'Week 1, 1-4 Apr', day: 'Wed', hours: 9.2 },
  { week: 'Week 1, 1-4 Apr', day: 'Thu', hours: 8.8 },
  { week: 'Week 1, 1-4 Apr', day: 'Fri', hours: 9.8 },
  { week: '7-11 Apr', day: 'Mon', hours: 8.5 },
  { week: '7-11 Apr', day: 'Tue', hours: 9 },
  { week: '7-11 Apr', day: 'Wed', hours: 9.5 },
  { week: '7-11 Apr', day: 'Thu', hours: 8.7 },
  { week: '7-11 Apr', day: 'Fri', hours: 9.4 },
  { week: '14-18 Apr', day: 'Mon', hours: 9.2 },
  { week: '14-18 Apr', day: 'Tue', hours: 9.4 },
  { week: '14-18 Apr', day: 'Wed', hours: 8.7 },
  { week: '14-18 Apr', day: 'Thu', hours: 8.5 },
  { week: '14-18 Apr', day: 'Fri', hours: 9.6 },
  { week: '21-25 Apr', day: 'Mon', hours: 8.5 },
  { week: '21-25 Apr', day: 'Tue', hours: 9.2 },
  { week: '21-25 Apr', day: 'Wed', hours: 9 },
  { week: '21-25 Apr', day: 'Thu', hours: 9.4 },
  { week: '21-25 Apr', day: 'Fri', hours: 9.8 },
];

const CustomXAxisTick = ({ x, y, payload, index }) => {
  const day = payload.value;
  const week = data[index] && data[index].week;
  const showWeekLabel = index % 5 === 0;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fontSize={12} fill="#666">{day}</text>
      {showWeekLabel && (
        <text x={0} y={30} dy={16} textAnchor="middle" fontSize={11} fill="#999">{week}</text>
      )}
    </g>
  );
};

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendanceList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const employees = [
    {
      id: 1, name: "Anirudha Kadam", role: "Developer", department: "IT",
      personalEmail: "abc@gmail.com", companyEmail: "abc@raksofteck.com",
      mobile: "12345 67890", dob: "DD/MM/YYYY", doj: "DD/MM/YYYY",
      manager: "Manager Name", hr: "HR Name", image: "/assets/Ellipse 158.png",
    },
    {
      id: 2, name: "Manoj Pande", role: "Developer", department: "IT",
      personalEmail: "abc@gmail.com", companyEmail: "abc@raksofteck.com",
      mobile: "12345 67890", dob: "DD/MM/YYYY", doj: "DD/MM/YYYY",
      manager: "Manager Name", hr: "HR Name", image: "/assets/Ellipse 155.png",
    },
    {
      id: 4, name: "Anjali Sing", role: "Developer", department: "IT",
      personalEmail: "abc@gmail.com", companyEmail: "abc@raksofteck.com",
      mobile: "12345 67890", dob: "DD/MM/YYYY", doj: "DD/MM/YYYY",
      manager: "Manager Name", hr: "HR Name", image: "/assets/Ellipse 157.png",
    },
  ];

  const employee = employees.find(emp => emp.id === parseInt(id));

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const today = new Date();
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();
  const daysInMonth = getDaysInMonth(year, currentMonth.getMonth());
  const startDay = new Date(year, currentMonth.getMonth(), 1).getDay();

  return (
    <div className='emp-main'>
      <Navbar />
      <Sidebar />

      <div className='head-text'>
        <div className="profile-card-container">
          <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

          <div className="profile-view-container">
            <h2 className="profile-title">Employee Profile View</h2>
            <div className="profile-card">
              <div className="profile-left">
                <img src={employee.image} alt="Profile" className="profile-image" />
                <h3 className="employees-name">{employee.name}</h3>
                <p className="employees-role">{employee.role} | {employee.department}</p>
              </div>

              <div className="profile-right">
                <div className="profile-info-column">
                  <p>Personal Email:<strong> {employee.personalEmail}</strong></p>
                  <p>Mobile Number:<strong> {employee.mobile}</strong></p>
                  <p>Date of Birth:<strong> {employee.dob}</strong></p>
                </div>
                <div className="profile-info-column">
                  <p>Company Email:<strong> {employee.companyEmail}</strong></p>
                  <p>Date of Joining:<strong> {employee.doj}</strong></p>
                  <p>Manager Name:<strong> {employee.manager}</strong></p>
                  <p>HR Name:<strong> {employee.hr}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-icon blue">
              <img src="/assets/mingcute_time-line.png" alt="" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Total Hours</p>
              <p className="stat-value">42</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon yellow">
              <img src="/assets/ri_time-line.png" alt="" />
            </div>
            <div className="stat-info">
              <p className="stat-label">Average Daily Hours</p>
              <p className="stat-value">8.5</p>
            </div>
          </div>
        </div>

        {/* Chart + Calendar */}
        <div style={{ display: 'flex', margin: '20px 0' }}>
          <div style={{ width: '60%', height: 420, background: 'white', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ marginBottom: '20px' }}>Average Working Hours</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" interval={0} tick={<CustomXAxisTick />} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#00BFFF" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Calendar */}
          <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
            <div className="calendar-section">
              <div className="calendar-header">
                <p className="secondchart-title">Attendance</p>
                <div className="month-navigation">
                  <button className="nav-btn left" onClick={goToPreviousMonth}><ChevronLeft size={18} /></button>
                  <span className="calendar-title">{monthName} {year}</span>
                  <button className="nav-btn right" onClick={goToNextMonth}><ChevronRight size={18} /></button>
                </div>
              </div>

              <div className="days-grid">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div key={day} className="day-cell">{day}</div>
                ))}
              </div>

              <div className="calendar-days">
                {Array(startDay === 0 ? 6 : startDay - 1).fill(null).map((_, index) => (
                  <div key={"empty-" + index} className="date-cell empty"></div>
                ))}

                {Array(daysInMonth).fill(null).map((_, index) => {
                  const date = index + 1;
                  const fullDate = new Date(year, currentMonth.getMonth(), date);
                  const formattedDate = fullDate.toLocaleDateString("en-CA");
                  const isWeekend = fullDate.getDay() === 0 || fullDate.getDay() === 6;
                  const isToday = fullDate.toDateString() === today.toDateString();
                  const isPunchedIn = attendanceList.some(entry => new Date(entry.date).toLocaleDateString("en-CA") === formattedDate);
                  const isWeekdayHoliday = customHolidays.includes(formattedDate);

                  return (
                    <div key={date} className={`date-cell ${isPunchedIn ? "punched-in" : ""} ${isWeekend ? "weekend" : ""} ${isToday ? "today" : ""} ${isWeekdayHoliday ? "holiday" : ""}`}>
                      {date}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
