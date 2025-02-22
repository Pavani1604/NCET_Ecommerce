import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetail from "./pages/ProductDetail";
import AvailableProducts from "./pages/AvailableProducts";
import MyCart from "./pages/MyCart";

import Home from "./pages/Home";
import "./App.css";

export const UserContext = createContext();

const App = () => {
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setUserData(user);
          setUserLoggedIn(true);
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <Router>
        
          {/* Main Content */}
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<MyCart />} /> {/* New Route */}

              <Route path="/available-products" element={<AvailableProducts />} />
            </Routes>
          </div>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
