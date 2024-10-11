import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import OAuthLogin from './pages/OAuthLogin';
import Callback from './pages/Callback';  // Import the Callback component
import Homepage from './pages/Homepage';  // Updated from Recommendations
import {Settings } from './pages/Settings';


function App() {
  const navigate = useNavigate();

  // Function to handle logo click
 /* const handleClick = () => {
    // Check if the "logged_in" cookie exists and is set to true
    const isLoggedIn = getCookie("logged_in") === "true";

    if (isLoggedIn) {
      navigate('/home'); // If logged in, redirect to home page
    } else {
      navigate('/login'); // If not logged in, redirect to login page
    }
  };
  */

  const handleClick = () => {
    navigate('/oauthlogin');
  };
  return (
    <div className="container">
      <div className="centered-circle" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <p>TBD</p>
      </div>
      <div className="footer-text">
        Click logo to continue
      </div>
    </div>
  );
}

// Utility function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function AppWrapper() {
  return (
    <Router basename="/">
      <Routes>
        {/* Check login status and redirect accordingly */}
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="oauthlogin" element={<OAuthLogin/>}/>
      </Routes>
    </Router>
  );
}