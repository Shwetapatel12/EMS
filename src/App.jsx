import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import AttendanceTable from "./components/AttendanceTable";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timesheet" element={<AttendanceTable />} />
      </Routes>
    </Router>
  )
}

export default App;
