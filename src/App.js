import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Changed BrowserRouter to HashRouter
import OAuthLogin from './OAuthLogin';
import Callback from './Callback';  // Import the Callback component
import Homepage from './Homepage';  // Updated from Recommendations
import {Settings } from './Settings';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="" element={<OAuthLogin />} />       
          <Route path="callback" element={<Callback />} />  
          <Route path="home" element={<Homepage />} />   
          <Route path="settings" element={<Settings/>} />   
          <Route path="oauthlogin" element={<OAuthLogin/>} />   

 

        </Routes>
      </div>
    </Router>
  );
}

export default App;
