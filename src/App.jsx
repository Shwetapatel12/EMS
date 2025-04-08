import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TimeSheet from "./pages/Timesheet"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timesheet" element={<TimeSheet />} /> 
      </Routes>
    </Router>
  );
}

export default App;
