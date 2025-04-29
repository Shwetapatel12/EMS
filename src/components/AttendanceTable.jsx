import "./AttendanceTable.css";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

import {
  startOfWeek,
  endOfWeek,
  subWeeks,
  addWeeks,
  isWithinInterval,
  format,
} from "date-fns";

const AttendanceTable = ({ attendanceList, setAttendanceList }) => {
  const [weekStart, setWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleEditTask = (filteredIndex, currentTask) => {
    const realIndex = attendanceList.findIndex(
      (entry) => entry.date === filteredAttendance[filteredIndex].date
    );
    setEditingIndex(realIndex);
    setEditedTask(currentTask);
  };

  const handleSaveTask = () => {
    const updatedList = [...attendanceList];
    if (editingIndex !== null && updatedList[editingIndex]) {
      updatedList[editingIndex].tasks = editedTask;
      setAttendanceList(updatedList);
    }
    setEditingIndex(null);
    setEditedTask("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTask("");
  };

  return (
    <div className="attendance-table">
      <div className="attendance-header">
        <p>Weekly Attendance</p>
        <div className="week-controls">
          <Icon icon="uil:calender" width="24" height="24" />
          <span className="week-range">
            {format(weekStart, "dd MMM yyyy")} -{" "}
            {format(weekEnd, "dd MMM yyyy")}
          </span>
          <button onClick={goToPreviousWeek}>
            <Icon icon="iconamoon:arrow-left-2" width="18" height="18" />
          </button>
          <button onClick={goToNextWeek}>
            <Icon icon="iconamoon:arrow-right-2" width="18" height="18" />
          </button>
        </div>
      </div>

      {!isMobile ? (
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
                  <td data-label="Date">
                    {format(new Date(entry.date), "dd MMM yyyy")}
                  </td>
                  <td data-label="Login Time">{entry.loginTime}</td>
                  <td data-label="Login Location">{entry.loginLocation}</td>
                  <td data-label="Logout Time">{entry.logoutTime}</td>
                  <td data-label="Logout Location">{entry.logoutLocation}</td>
                  <td data-label="Total Hours">{entry.totalHours}</td>
                  <td data-label="Tasks" className="tasks-cell">
                    <span>{entry.tasks}</span>
                    <button
                      className="edit-btns"
                      onClick={() => handleEditTask(index, entry.tasks)}
                    >
                      <Icon icon="mdi:edit" width="18" height="18" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <div className="attendance-cards">
          {filteredAttendance.length === 0 ? (
            <div className="no-records">No records available</div>
          ) : (
            filteredAttendance.map((entry, index) => (
              <div className="attendance-card" key={index}>
                <div className="card-header">
                  <h4>{format(new Date(entry.date), "dd-MM-yyyy")}</h4>
                </div>
                <div className="card-body">
                  <p>
                    Login: <span className="login-time">{entry.loginTime}</span>
                    <span className="login-location">
                      {entry.loginLocation}
                    </span>
                  </p>
                  <p>
                    Logout:{" "}
                    <span className="logout-time">{entry.logoutTime}</span>
                    <span className="logout-location">
                      {entry.logoutLocation}
                    </span>
                  </p>
                  
                  <div className="card-edit-icon">
                  <p>
                    Task: <span className="tsk">{entry.tasks}</span>
                  </p>
                    <button
                      className="edit-btns"
                      onClick={() => handleEditTask(index, entry.tasks)}
                    >
                      <Icon icon="mdi:edit" width="20" height="20" className="ic"/>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {editingIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Edit Task</h4>
            <textarea
              className="task-textarea"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
              rows="5"
              style={{
                width: "90%",
                padding: "10px",
                borderRadius: "8px",
              }}
            />
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveTask}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
