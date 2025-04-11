import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./DashboardDetails.css";

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const parseHours = (timeStr) => {
  const [hrs, mins, secs] = timeStr.split(":" ).map(Number);
  return +(hrs + mins / 60 + secs / 3600).toFixed(2);
};

// 🎯 Custom weekday holidays (format: YYYY-MM-DD)
const customHolidays = ["2025-05-01", "2025-08-15","2025-08-27","2025-10-02","2025-10-20","2025-10-21","2025-10-22","2025-10-23","2025-12-25"];

const DashBoardDetails = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleNewEntry = (newEntry) => {
    setAttendanceList([newEntry, ...attendanceList]);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const today = new Date();
  const monthName = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();
  const daysInMonth = getDaysInMonth(year, currentMonth.getMonth());
  const startDay = new Date(year, currentMonth.getMonth(), 1).getDay();

  // Define weekdays to always show on X-axis
  const weekDays = ['Mon', 'Tue', 'Wedn', 'Thu', 'Fri'];

  const chartData = weekDays.map((day) => {
    const entry = attendanceList.find(
      (entry) =>
        new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" }) ===
        day
    );
    return {
      name: day,
      hours: entry ? parseHours(entry.totalHours) : 0,
    };
  });

  return (
    
        <div className="main-content">
            
          {/* Statistic Cards */}
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

            <div className="stat-card">
              <div className="stat-icon green">
                <img src="/assets/rename.png" alt="" />
              </div>
              <div className="stat-info">
                <p className="stat-label">Leaves</p>
                <p className="stat-value">
                  4 <span className="stat-subvalue">/12</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bar Chart & Calendar */}
          <div className="chart-calendar-wrapper">
            <div className="chart-section">
              <h2 className="chart-title">Apr 24 - Apr 30 '25 (Week Hours)</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} ticks={[2, 4, 6, 8, 10]} tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
                  {/* <Tooltip formatter={(value) => `${value} Hrs`} /> */}
                  <Legend />
                  <Bar dataKey="hours" fill="#CBF1FF" radius={[6, 6, 0, 0]}>
                    <LabelList dataKey="hours" position="top" formatter={(val) => (val === 9.17 ? "9:10 Hrs" : '')} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="calendar-section">
              <div className="calendar-header">
                <p className="secondchart-title">Attendance</p>

                <div className="month-navigation">
                  <button className="nav-btn left" onClick={goToPreviousMonth}>
                    <ChevronLeft size={18} />
                  </button>

                  <span className="calendar-title">
                    {monthName} {year}
                  </span>

                  <button className="nav-btn right" onClick={goToNextMonth}>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="days-grid">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                  <div key={day} className="day-cell">
                    {day}
                  </div>
                ))}
              </div>

              <div className="calendar-days">
                {Array(startDay === 0 ? 6 : startDay - 1)
                  .fill(null)
                  .map((_, index) => (
                    <div key={"empty-" + index} className="date-cell empty"></div>
                  ))}

                {Array(daysInMonth)
                  .fill(null)
                  .map((_, index) => {
                    const date = index + 1;
                    const fullDate = new Date(year, currentMonth.getMonth(), date);
                    const formattedDate = fullDate.toLocaleDateString("en-CA");
                    const isWeekend = fullDate.getDay() === 0 || fullDate.getDay() === 6;
                    const isToday = fullDate.toDateString() === today.toDateString();
                    const isPunchedIn = attendanceList.some(
                      (entry) =>
                        new Date(entry.date).toLocaleDateString("en-CA") === formattedDate
                    );
                    const isWeekdayHoliday = customHolidays.includes(formattedDate);

                    return (
                      <div
                        key={date}
                        className={`date-cell 
                          ${isPunchedIn ? "punched-in" : ""} 
                          ${isWeekend ? "weekend" : ""} 
                          ${isToday ? "today" : ""} 
                          ${isWeekdayHoliday ? "holiday" : ""}`}
                      >
                        {date}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

  );
};

export default DashBoardDetails;
 

