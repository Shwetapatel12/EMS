import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEmployeeModal.css";

const AddEmployeeModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const steps = [
    "Personal Information",
    "Job Details",
    "Leave Balance",
    "Account Details",
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    email: "",
    joiningDate: "",
    department: "",
    designation: "",
    role: "",
    managerId: "",
    hrId: "",
    SickLeaveBalance: "",
    CasualLeaveBalance: "",
    OtherLeaveBalance: "",
    companyEmail: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.companyEmail) {
      toast.error("Please enter company email");
      return;
    }

    console.log("Employee Data:", formData);
    toast.success("Employee added successfully!");

    // Delay closing modal to allow toast to show
    setTimeout(() => {
      console.log("Closing modal...");
      onClose();
    }, 500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p>Add New Employee</p>
          <button onClick={onClose} className="close-btn">
            <Icon
              icon="iconoir:cancel"
              width="18"
              height="18"
              color="rgba(144, 144, 144, 1)"
            />
          </button>
        </div>

        <div className="step-indicator">
          {steps.map((label, index) => {
            const isCompleted = step > index + 1;
            const isActive = step === index + 1;

            return (
              <div
              className={`step-item ${
                isCompleted ? "completed" : isActive ? "active" : ""
              }`}
              key={index}
            >
              <div
                className={`step-circle ${
                  isCompleted ? "completed" : isActive ? "active" : ""
                }`}
              >
                {isCompleted ? (
                  <Icon icon="material-symbols:done" width="14" height="14" />
                ) : (
                  index + 1
                )}
              </div>
              {index !== steps.length - 1 && <div className="step-line"></div>}
              <div className="step-label">{label}</div>
              <hr className="line"/>
            </div>            
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {step === 1 && (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your First Name"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your Last Name"
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </div>
              <div className="form-group">
                <label>Email ID</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>Joining Date</label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter Department"
                />
              </div>
              <div className="form-group">
                <label>Designation</label>
                <input
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Enter Designation"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter Role"
                />
              </div>
              <div className="form-group">
                <label>Manager ID</label>
                <input
                  name="managerId"
                  value={formData.managerId}
                  onChange={handleChange}
                  placeholder="Enter Manager ID"
                />
              </div>
              <div className="form-group">
                <label>HR ID</label>
                <input
                  name="hrId"
                  value={formData.hrId}
                  onChange={handleChange}
                  placeholder="Enter HR ID"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-group">
                <label>Sick Leave Balance</label>
                <input
                  name="SickLeaveBalance"
                  value={formData.SickLeaveBalance}
                  onChange={handleChange}
                  placeholder="Enter Sick Leave Balance"
                />
              </div>
              <div className="form-group">
                <label>Casual Leave Balance</label>
                <input
                  name="CasualLeaveBalance"
                  value={formData.CasualLeaveBalance}
                  onChange={handleChange}
                  placeholder="Enter Casual Leave Balance"
                />
              </div>
              <div className="form-group">
                <label>Other Leave Balance</label>
                <input
                  name="OtherLeaveBalance"
                  value={formData.OtherLeaveBalance}
                  onChange={handleChange}
                  placeholder="Enter Other Leave Balance"
                />
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="form-group">
                <label>Company Email</label>
                <input
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  placeholder="abcdefg@raksoftech.com"
                />
              </div>
            </>
          )}

          <div className="form-actions">
            {step > 1 ? (
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
            ) : (
              <div className="spacer" /> // pushes "Next" to the right on Step 1
            )}

            {step < 4 ? (
              <button type="button" className="submit-btn" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="create-emp-btn">
                Create Employee
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
