import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      userEmail: credentials.email,
      userPassword: credentials.password,
    };

    axios.post('http://localhost:8888/api/user/login', userData)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        const userProfile = response.data.user; // assume the API returns the user's profile data
        localStorage.setItem('token', token);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        window.location.href = '/';
      })
      .catch((error) => {
        console.error(error);
        setError('Invalid email or password');
        setLoading(false);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</a>
        </p>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Forgot password? <a href="/forgetpassword" className="text-blue-500 hover:text-blue-700">Reset password</a>
        </p>
      </div>
    </div>
  );
};

export default Login;