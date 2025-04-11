import { useState } from "react";
import Navbar from "../components/Navbar"; // Ensure Navbar is imported
import Sidebar from "../components/Sidebar";
import "./Dashboard.css"; // Add a CSS file for layout adjustments
import Profile from "../components/Profile";

const ProfilePage = () => {

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="main-content">
            <Profile/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;