import "./AttendanceTable.css";

const AttendanceTable = ({ attendanceList }) => {
  return (
    <div className="attendance-table">
      <h3>Weekly Attendance</h3>
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
          {attendanceList.length === 0 ? (
            <tr>
              <td colSpan="7" className="no-records">
                No records available
              </td>
            </tr>
          ) : (
            attendanceList.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.loginTime}</td>
                <td>{entry.loginLocation}</td>
                <td>{entry.logoutTime}</td>
                <td>{entry.logoutLocation}</td>
                <td>{entry.totalHours}</td>
                <td className="tasks-cell">
                  <span>{entry.tasks}</span>
                  <button className="edit-btn">✏️</button>
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