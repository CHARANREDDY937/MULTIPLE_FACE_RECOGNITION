import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import User from "./pages/User";
import Reviews from "./pages/Reviews";
import AboutUs from "./pages/AboutUs";
import Help from "./pages/Help";
import AdminPhase1 from "./pages/AdminPhase1";
import AdminPhase2 from "./pages/AdminPhase2";
import AdminPhase3 from "./pages/AdminPhase3";
import AdminRegister from "./pages/AdminRegister";
import UserPhase1 from "./pages/UserPhase1";
import UserPhase2 from "./pages/UserPhase2";
import UserPhase3 from "./pages/UserPhase3";
import UserRegister from "./pages/UserRegister";
import SinglePhase from './pages/SinglePhase'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/adminphase1" element={<AdminPhase1 />} />
        <Route path="/adminphase2" element={<AdminPhase2 />} />
        <Route path="/adminphase3" element={<AdminPhase3 />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/userphase1" element={<UserPhase1 />} />
        <Route path="/userphase2" element={<UserPhase2 />} />
        <Route path="/userphase3" element={<UserPhase3 />} />
        <Route path="/userregister" element={<UserRegister />} />
        <Route path="/add-student" element={<SinglePhase />} /> 
      </Routes>
    </Router>
  );
};

export default App;
