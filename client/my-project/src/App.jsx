import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import ForgotPassword from "./components/forgotpassword";
 import OTPConfirmation from "./components/otp";
import NewPassword from "./components/newpassword";
import HomePage from './components/homePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/getOtp" element={<OTPConfirmation />} />
          <Route path="/newPassword" element={<NewPassword />} 
          />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;