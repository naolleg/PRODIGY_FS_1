import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Signup from "./components/signup";
import Login from "./components/login";
import ForgotPassword from "./components/forgotpassword";
 import OTPConfirmation from "./components/otp";
import NewPassword from "./components/newpassword";
import HomePage from './components/homePage';
import AdminDashboard from './components/admindashboard';
import ProtectedRoute from '../../../utils/protectedRoute';

function App() {
  return (
    <BrowserRouter>
  
        <Routes>
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgotPassword />} />
          <Route path="/getOtp" element={<OTPConfirmation />} />
          <Route path="/newPassword" element={<NewPassword />} />  
          <Route path="/changePassword" element={<NewPassword />}  />   
         <Route path="/newPassword" element={<NewPassword />}  />
         <Route path="/admindashboard" element={ 
     <ProtectedRoute role="admin"> <AdminDashboard />
     </ProtectedRoute>
  }/>
        </Routes>

      </BrowserRouter>
  );
}

export default App;