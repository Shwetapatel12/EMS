import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/assets/company-logo.png" alt="Company Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <span className="navbar-user-name">Aaniket</span>
        <img src="/assets/user-profile.png" alt="User Profile" className="navbar-user-img" />
      </div>
    </nav>
  );
};

export default Navbar;