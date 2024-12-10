import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo.png" alt="Logo" className="navbar-logo" />
        <h1 className="navbar-title">SCAMVRP</h1>
      </div>
      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/reviews" className="navbar-link">Reviews</Link>
        <Link to="/about-us" className="navbar-link">About Us</Link>
        <Link to="/help" className="navbar-link">Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;
