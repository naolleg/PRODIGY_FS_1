import React, { useState } from 'react';
import axios from 'axios';
import FormValidator from '../utilities/formvalidator';


const Signup = () => {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
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
    const { firstName, lastName, middleName, email, password, confirmPassword } = credentials;
    const form = { firstName, lastName, middleName, email, password, confirmPassword };
    const { success, error: validationError } = FormValidator.signup(form);

    if (!success) {
      setError(validationError);
      return;
    }

    setLoading(true);

    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const userData = {
      userEmail: credentials.email,
      firstName: credentials.firstName,
      middleName: credentials.middleName,
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
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Sign up</h1>
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
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="middleName">
              Middle Name
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={credentials.middleName}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
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
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
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
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;