import { useState, useEffect } from "react";
import "./Header.css";
import { Icon } from "@iconify/react";

const Header = ({ onNewEntry }) => {
  const punchInIcon = "/assets/Group 348.png";

  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [showPrompt, setShowPrompt] = useState(false); // State for punchout confirmation

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
    setShowPrompt(true); // Show confirmation modal
  };

  const confirmPunchOut = () => {
    const logoutTime = Date.now();
    const totalSeconds = Math.floor((logoutTime - punchInTime) / 1000);

    onNewEntry({
      date: new Date(punchInTime).toISOString().split("T")[0],
      loginTime: new Date(punchInTime).toLocaleTimeString(),
      loginLocation: "Shivraj Nagar, Pune",
      logoutTime: new Date(logoutTime).toLocaleTimeString(),
      logoutLocation: "Shivraj Nagar, Pune",
      totalHours: formatTime(totalSeconds),
      tasks: "Edit Tasks",
    });

    setPunchInTime(null);
    setIsPunchedIn(false);
    setShowPrompt(false);
  };

  const cancelPunchOut = () => {
    setShowPrompt(false); 
  };

  return (
    <div className="header-container">
    <div className={`header ${isPunchedIn ? "header-green" : " "}`}>
      <h2 className="date">Today, {new Date().toLocaleDateString()}</h2>

      {isPunchedIn && (
        <div>
          <p className="timer">{elapsedTime}</p>
          <div className="time-info">
            <p className="puch-in-time">
              {" "}
              <Icon icon="formkit:time" width="18" height="18" color="white" />
              Punch In Time: {new Date(punchInTime).toLocaleTimeString()}
            </p>

            <p className="location">
              {" "}
              <Icon
                icon="fluent:location-28-regular"
                width="18"
                height="18"
                color="white"
              />
              Shivrajnagar, pune
            </p>

            <p className="task">
              {" "}
              <Icon
                icon="material-symbols-light:add"
                width="18"
                height="18"
                color="white"
              />
              Task
            </p>
          </div>
        </div>
      )}

      <div className="punch-container">
        {!isPunchedIn ? (
          <div className="punch-in-container">
            <button className="punch-btn punch-in" onClick={handlePunchIn}>
              <img src={punchInIcon} alt="Punch In" className="punch-icon" />
            </button>
            <p className="punch-text">Punch In</p>
            <p className="greating">"Wish you a Great Day!"</p>
          </div>
        ) : (
          <button class="punchout-button" onClick={handlePunchOut}>
            <span class="punchout-icon"></span> Punchout
          </button>
        )}
      </div>

      {/* Punchout Confirmation Prompt */}
      {showPrompt && (
        <div className="prompt-overlay">
          <div className="prompt-box">
            <img src="/assets/Group 239197.png" alt="Logo" className="logo" />{" "}
            <h3 className="prompt-title">Confirm Punch-Out</h3>
            <p>Are you sure you want to punch out?</p>
            <div className="prompt-actions">
              <button onClick={confirmPunchOut} className="confirm-button">
                Punch Out
              </button>
              <button onClick={cancelPunchOut} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Header;
