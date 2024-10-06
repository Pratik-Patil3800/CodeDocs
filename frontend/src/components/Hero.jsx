import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Tutorial from "./Tutorial";
import Features from "./Features";
import { useState, useEffect } from 'react';

function Hero() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Navbar  />
      <Home/>
      <Features/>
      <Tutorial/>
      <Footer />
    </div>
  );
}

export default Hero;



