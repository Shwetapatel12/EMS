import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import "./AdminTimesheet.css";
import "../components/AddEmployeeModal.css"; // Add a CSS file for layout adjustments
import { Icon } from "@iconify/react";
import AddEmployeeModal from "../components/AddEmployeeModel"; // Make sure the path is correct

const employees = [
  {
    name: "Anirudha Kadam",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Manoj Pande",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    name: "Radha Kumar",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "",
  },
  {
    name: "Anjali Singh",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    name: "Ashish Kumar",
    login: "10:00 AM",
    logout: "07:00 PM",
    tasks: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar: "https://randomuser.me/api/portraits/men/25.jpg",
  },
];

const EmployeeManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <div className="backgound-main-content">
          <div className="timesheet-header">
            <div className="header-title">
              <h2>Employee Manager</h2>
              <button className="download-btn" onClick={handleOpenModal}>
                <Icon icon="material-symbols:add-rounded" width="18" height="18" />
                New Employee
              </button>
            </div>

            <div className="timesheet-controls">
              <div className="search-bar">
                <input type="text" placeholder="Search employee name" />
                <Icon icon="iconamoon:search" width="20" height="20" color="rgba(0, 175, 239, 1)" />
              </div>
            </div>

            <div className="timesheet-table">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Employee Name</th>
                    <th>Email Id</th>
                    <th>Contact Number</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="employee-info">
                        {employee.avatar ? (
                          <img src={employee.avatar} alt={employee.name} />
                        ) : (
                          <div className="placeholder-avatar">NA</div>
                        )}
                        <span>{employee.name}</span>
                      </td>
                      <td>{employee.name.toLowerCase().replace(" ", ".")}@raksoftech.com</td>
                      <td>+91 12345 67890</td>
                      <td>{index % 2 === 0 ? "Engineering" : "Operations"}</td>
                      <td className="action-icons">
                        <Icon icon="mdi:eye-outline" />
                        <Icon icon="material-symbols:edit" />
                        <Icon icon="material-symbols:delete-outline" color="red" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Show Modal */}
      {showModal && <AddEmployeeModal onClose={handleCloseModal} />}
    </div>
  );
};

export default EmployeeManagement;
