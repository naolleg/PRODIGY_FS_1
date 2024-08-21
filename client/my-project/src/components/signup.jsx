import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    middleName:'',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const userData = {
      userEmail: credentials.email,
      firstName: credentials.firstName,
      middleName:credentials.middleName,  // You didn't provide a middle name field, so I left it empty
      lastName: credentials.lastName,
      userPassword: credentials.password,
      role: 'admin', // You didn't provide a role field, so I assumed it's 'admin'
    };

    axios.post('http://localhost:8888/api/user/register', userData)
      .then((response) => {
        console.log(response);
        alert('User created successfully!');
        // Redirect to the login page
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to create user');
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={credentials.firstName}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="middleName">
              middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={credentials.middleName}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={credentials.lastName}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
              required
            />
          </div>
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
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
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
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup