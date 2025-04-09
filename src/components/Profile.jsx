import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Profile.css";
import { Icon } from "@iconify/react";

const Profile = () => {
  const initialData = {
    firstName: "Aaniket",
    middleName: "Kumar",
    lastName: "Dange",
    personalEmail: "abc@gmail.com",
    companyEmail: "abc@raksoftech.com",
    mobile: "12345 67890",
    dob: "1990-01-01",
    doj: "2020-06-01",
    department: "IT",
    designation: "Engineer",
    manager: "John Doe",
    hr: "Jane Smith",
  };

  const [userData, setUserData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(userData);
    setEditMode(false);
  };

  const handleSave = () => {
    setUserData(formData);
    setEditMode(false);
    // Optionally send data to backend API
  };

  const renderField = (label, name, type = "text") => (
    <div className="field-group" key={name}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        readOnly={!editMode}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="profile-page">
      <Navbar />
      <div className="page-body">
        <Sidebar />

        <div className="profile-container">
          <div className="profile-header">
            <h2>My Profile</h2>
            {!editMode ? (
              <button className="edit-btn" onClick={handleEditToggle}>
                <Icon icon="mdi:pencil" />
                Edit
              </button>
            ) : (
              <div className="action-buttons">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </div>

          <div className="profile-info">
            <div className="profile-picture">
              <img src="/assets/user-profile.png" alt="User Profile" />
              <h3 className="name">
                {formData.firstName} {formData.lastName}
              </h3>
            </div>

            <div className="profile-fields">
              <h4>Personal Details</h4>
              {renderField("First Name", "firstName")}
              {renderField("Middle Name", "middleName")}
              {renderField("Last Name", "lastName")}
              {renderField("Date of Birth", "dob", "date")}
              {renderField("Date of Joining", "doj", "date")}

              <h4>Contact Details</h4>
              {renderField("Personal Email", "personalEmail")}
              {renderField("Company Email", "companyEmail")}
              {renderField("Mobile Number", "mobile")}

              <h4>Work Details</h4>
              {renderField("Department", "department")}
              {renderField("Designation", "designation")}
              {renderField("Manager Name", "manager")}
              {renderField("HR Name", "hr")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
