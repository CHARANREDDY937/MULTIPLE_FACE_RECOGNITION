import React from "react";
import { Link } from "react-router-dom";
import adminImage from "../assets/adminim.png";
import userImage from "../assets/userim.webp";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="box admin-box">
        <img src={adminImage} alt="Admin" className="box-image" />
        <h2>Admin</h2>
        <Link to="/admin">
          <button className="box-button">Admin</button>
        </Link>
      </div>

      <div className="box user-box">
        <img src={userImage} alt="User" className="box-image" />
        <h2>User</h2>
        <Link to="/user">
          <button className="box-button">User</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
