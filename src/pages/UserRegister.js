import React, { useState } from "react";
import "./UserRegister.css";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phase: "Phase 1",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add MongoDB logic here
    console.log(formData);
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>
        <div className="form-field">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
        </div>
        <div className="form-field">
          <label>Phase:</label>
          <select
            name="phase"
            value={formData.phase}
            onChange={handleChange}
          >
            <option>Phase 1</option>
            <option>Phase 2</option>
            <option>Phase 3</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegister;
