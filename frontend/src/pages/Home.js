import React from "react";
import { useState } from "react";
import Register from "../pages/Register";
import Login from "../pages/Login";
import "../style/HomeStyle.css"; // Ensure you have this CSS file

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="navbar">
      <h1>Welcome to the NCET Cart</h1>
      <div className="nav-links">
      <button className="btn-login" onClick={() => setShowLogin(true)}>Login</button>
      <button className="btn-register" onClick={() => setShowRegister(true)}>Register</button>

      {showLogin && <Login closeLogin={() => setShowLogin(false)} />}
      {showRegister && <Register closeRegister={() => setShowRegister(false)} />}
      </div>
    </div>
  );
};

export default Home;
