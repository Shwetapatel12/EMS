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
            to="/admin-dashboard"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <LayoutDashboard />
            Admin Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-timesheet"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <LayoutDashboard />
           Admin Timesheet
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/emp-managment"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <LayoutDashboard />
            Employee Managment
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
        <li>
          <NavLink
            to="/leave-managment"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <LayoutDashboard />
            Leave Managment
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin-leave-managment"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <LayoutDashboard />
            Admin Leave Managment
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;