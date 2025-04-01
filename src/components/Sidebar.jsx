import { Link } from "react-router-dom";
import { Calendar, Clock, LayoutDashboard } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <LayoutDashboard />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/timesheet">
            <Clock />
            Timesheet
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
