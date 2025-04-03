import { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ onNewEntry }) => {
  const punchInIcon = "/assets/Group 348.png";

  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  useEffect(() => {
    let timer;
    if (isPunchedIn && punchInTime) {
      timer = setInterval(() => {
        const secondsElapsed = Math.floor((Date.now() - punchInTime) / 1000);
        setElapsedTime(formatTime(secondsElapsed));
      }, 1000);
    } else {
      setElapsedTime("00:00:00");
    }

    return () => clearInterval(timer);
  }, [isPunchedIn, punchInTime]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handlePunchIn = () => {
    setPunchInTime(Date.now());
    setIsPunchedIn(true);
  };

  const handlePunchOut = () => {
    const logoutTime = Date.now();
    const totalSeconds = Math.floor((logoutTime - punchInTime) / 1000);

    onNewEntry({
      date: new Date(punchInTime).toLocaleDateString(),
      loginTime: new Date(punchInTime).toLocaleTimeString(),
      loginLocation: "Shivraj Nagar, Pune",
      logoutTime: new Date(logoutTime).toLocaleTimeString(),
      logoutLocation: "Shivraj Nagar, Pune",
      totalHours: formatTime(totalSeconds),
      tasks: "Edit Tasks",
    });

    setPunchInTime(null);
    setIsPunchedIn(false);
  };

  return (
    <div className={`header ${isPunchedIn ? "header-green" : ""}`}>
      <h2 className="date">Today, {new Date().toLocaleDateString()}</h2>

      {isPunchedIn && (
        <div className="time-info">
          <p>Punch In Time: {new Date(punchInTime).toLocaleTimeString()}</p>
          <p className="timer">{elapsedTime}</p>
        </div>
      )}

      <div className="punch-container">
        {!isPunchedIn ? (
          <button className="punch-btn punch-in" onClick={handlePunchIn}>
            <img src={punchInIcon} alt="Punch In" className="punch-icon" />
            <p className="punch-text">Punch In</p>
          </button>
        ) : (
          <button class="punchout-button" onClick={handlePunchOut}>
          <span class="punchout-icon"></span> Punchout
        </button>
        )}
      </div>
    </div>
  );
};

export default Header;