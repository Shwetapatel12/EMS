import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Add your logout logic here (e.g., redirect to login page)
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/assets/company-logo.png"
          alt="Company Logo"
          className="navbar-logo"
        />
      </div>
      <div className="navbar-right">
        <div className="profile-dropdown" ref={dropdownRef} onClick={toggleDropdown}>
          <img
            src="/assets/user-profile.png"
            alt="User Profile"
            className="navbar-user-img"
          />
          <span className="navbar-user-name">Aaniket</span>
          <Icon
            icon="mdi:chevron-down"
            className="navbar-dropdown-icon"
          />

          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
