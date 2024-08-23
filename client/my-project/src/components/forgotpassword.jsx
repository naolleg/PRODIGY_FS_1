import React, { useState } from 'react';
import axios from 'axios';


const ForgotPassword = () => {
  const [credentials, setCredentials] = useState({
    email: '',
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    setLoading(true);
    
    const userData = {
      userEmail: credentials.email,
    };

    axios.post('http://localhost:8888/api/user/forget', userData)
      .then((response) => {
        setLoading(false);
        // Redirect to OTP confirmation page
        window.location.href = '/otp-confirmation';
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.error);
      });
  };
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Forgot Password</h1>
        <form onSubmit={handleInputChange}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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