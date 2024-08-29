import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ForgotPassword= () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("gfdcgr");
      
      const response = await axios.put('http://localhost:8888/api/user/forget', { userEmail:email });
      console.log(response.data);
      
      if (response.status === 200) {
        setSuccess("OTP sent to email!");
        setError("");
        // Navigate to OTP verification page with email as state
        navigate("/getOtp", { state: { email } });
      } else {
        setError("Error sending OTP. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      console.error("An error occurred during password recovery:", err);
      setError("An error occurred. Please try again later.");
      setSuccess("");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Password Reset Email'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;