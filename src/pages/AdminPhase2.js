import React from 'react';
import './AdminPhase2.css'; 

const AdminPhase2 = () => {
  return (
    <div className="admin-phase2">
     
      <div className="admin-welcome">
        <h1>Welcome back Admin!!</h1>
      </div>

      <div className="admin-boxes">
        <button className="admin-box">
          <img src={require('../assets/admin5.jpg')} alt="Mark Attendance" />
          <h3>Mark Attendance</h3>
        </button>
        <button className="admin-box">
          <img src={require('../assets/admin1.jpg')} alt="Add a student" />
          <h3>Add a Student</h3>
        </button>
        <button className="admin-box">
          <img src={require('../assets/admin8.jpg')} alt="Delete Student" />
          <h3>Delete a Student</h3>
        </button>
      </div>
    </div>
  );
};

export default AdminPhase2;