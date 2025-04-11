import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Profile.css";
import { Icon } from "@iconify/react";

const Profile = () => {
  const initialData = {
    firstName: "Your First Name",
    middleName: "Your Last Name",
    lastName: "Your Last Name",
    personalEmail: "abc@gmail.com",
    companyEmail: "abc@raksoftech.com",
    mobile: "12345 67890",
    dob: "DD/MM/YYYY",
    doj: "DD/MM/YYYY",
    department: "IT",
    designation: "Engineer",
    manager: "John Doe",
    hr: "Jane Smith",
  };

  const [userData, setUserData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [profileImage, setProfileImage] = useState("/assets/Profile.png");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

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
          </div>

          <div className="profile-info">
            <div className="profile-left">
              <div className="profile-picture">
                <img
                  src={profileImage}
                  alt="User Profile"
                  className="profile-picture"
                  onClick={() =>
                    editMode && document.getElementById("imageUpload").click()
                  }
                />
                {editMode && (
                  <div
                    className="edit-icon-overlay"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    <Icon icon="mdi:edit" className="edit-icons" />
                  </div>
                )}
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
              <h3 className="name">Aaniket Dange</h3>
            </div>

            {!editMode ? (
              <button className="edit-btn" onClick={handleEditToggle}>
                <Icon icon="mdi:pencil" />
                Edit
              </button>
            ) : (
              <div className="action-buttons">
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="profile-fields">
            {renderField("First Name", "firstName")}
            {renderField("Middle Name", "middleName")}
            {renderField("Last Name", "lastName")}
            {renderField("Date of Birth", "dob", "date")}
            {renderField("Date of Joining", "doj", "date")}
            {renderField("Department", "department")}

            {renderField("Personal Email", "personalEmail")}
            {renderField("Company Email", "companyEmail")}
            {renderField("Mobile Number", "mobile")}

            {renderField("Designation", "designation")}
            {renderField("Manager Name", "manager")}
            {renderField("HR Name", "hr")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
