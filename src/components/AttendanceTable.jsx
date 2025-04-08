import "./AttendanceTable.css";
import { useState } from "react";
import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  addWeeks,
  isWithinInterval,
  format,
} from "date-fns";

const AttendanceTable = ({ attendanceList }) => {
  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  const filteredAttendance = attendanceList.filter((entry) => {
    const entryDate = new Date(entry.date);
    return isWithinInterval(entryDate, { start: weekStart, end: weekEnd });
  });

  const goToPreviousWeek = () => {
    setWeekStart(subWeeks(weekStart, 1));
  };

  const goToNextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1));
  };

  return (
    <div className="attendance-table">
      <div className="attendance-header">
        <h3>Weekly Attendance</h3>
        <div className="week-controls">
          <span className="week-range">
            {format(weekStart, "dd MMM yyyy")} -{" "}
            {format(weekEnd, "dd MMM yyyy")}
          </span>
          <button onClick={goToPreviousWeek}>←</button>
          <button onClick={goToNextWeek}>→</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Login Time</th>
            <th>Login Location</th>
            <th>Logout Time</th>
            <th>Logout Location</th>
            <th>Total Hours</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-records">
                No records available
              </td>
            </tr>
          ) : (
            filteredAttendance.map((entry, index) => (
              <tr key={index}>
                <td>{format(new Date(entry.date), "dd MMM yyyy")}</td>
                <td>{entry.loginTime}</td>
                <td>{entry.loginLocation}</td>
                <td>{entry.logoutTime}</td>
                <td>{entry.logoutLocation}</td>
                <td>{entry.totalHours}</td>
                <td className="tasks-cell">
                  <span>{entry.tasks}</span>
                  <button className="edit-btn">🖋️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
