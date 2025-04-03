import { NavLink } from "react-router-dom";
import { Clock, LayoutDashboard } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <LayoutDashboard />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/timesheet"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <Clock />
            Timesheet
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;