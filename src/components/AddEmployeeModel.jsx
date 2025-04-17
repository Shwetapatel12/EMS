import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddEmployeeModal.css";

const AddEmployeeModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
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
    leaveBalance: "",
    bankAccount: "",
    ifscCode: "",
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
    console.log("Employee Data:", formData);
    toast.success("Employee added successfully!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p>Add New Employee</p>
          <button onClick={onClose} className="close-btn">
            <Icon icon="mdi:close" width="24" height="24" />
          </button>
        </div>

        <div className="step-indicator">
          {["Personal Information", "Job Details", "Leave Balance", "Account Details"].map(
            (label, index) => (
              <div
                key={index}
                className={`step-circle ${step === index + 1 ? "active" : ""}`}
              >
                {index + 1}
              </div>
            )
          )}
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
            <div className="form-group">
              <label>Leave Balance</label>
              <input
                name="leaveBalance"
                value={formData.leaveBalance}
                onChange={handleChange}
                placeholder="Enter Leave Balance"
              />
            </div>
          )}

          {step === 4 && (
            <>
              <div className="form-group">
                <label>Bank Account Number</label>
                <input
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleChange}
                  placeholder="Enter Account Number"
                />
              </div>
              <div className="form-group">
                <label>IFSC Code</label>
                <input
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="Enter IFSC Code"
                />
              </div>
            </>
          )}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="back-btn" onClick={handleBack}>
                Back
              </button>
            )}
            {step < 4 ? (
              <button type="button" className="submit-btn" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="submit-btn">
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
