import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { Clock, LayoutDashboard } from "lucide-react";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Added for mobile menu toggle
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    alert("Logging out...");
    // Add your logout logic here (e.g., redirect to login page)
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
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
        {/* Hamburger icon for small screens */}
        <button className="menu-icon" onClick={toggleMenu}>
          <Icon icon="material-symbols:menu-rounded" width="22" height="22" />
        </button>
        <img
          src="/assets/company-logo.png"
          alt="Company Logo"
          className="navbar-logo"
        />
      </div>
      <div className="navbar-right">
        <div
          className="profile-dropdown"
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          <img
            src="/assets/user-profile.png"
            alt="User Profile"
            className="navbar-user-img"
          />
          <span className="navbar-user-name">Aaniket</span>
          <Icon icon="mdi:chevron-down" className="navbar-dropdown-icon" />

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
      {/* Sidebar drawer for mobile */}
      <div className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>
        <ul>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/admin-dashboard">Admin Dashboard</NavLink></li>
          <li><NavLink to="/admin-timesheet">Admin Timesheet</NavLink></li>
          <li><NavLink to="/emp-managment">Employee Management</NavLink></li>
          <li><NavLink to="/timesheet">Timesheet</NavLink></li>
        </ul>
      </div>
      {/* overlay to close sidebar when clicking outside */}
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navbar;
