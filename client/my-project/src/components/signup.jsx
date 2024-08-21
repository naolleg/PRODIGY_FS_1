import React, { useState } from 'react';

const Signup = () => {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
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
    // Remove the axios call and error handling for now
    // We'll focus on the UI part only
  };
    
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="max-w-md mx-auto">
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
              className="w-full p-2 pl-10 text-sm text-gray-700"
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
              className="w-full p-2 pl-10 text-sm text-gray-700"
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
              className="w-full p-2 pl-10 text-sm text-gray-700"
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
              className="w-full p-2 pl-10 text-sm text-gray-700"
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
              className="w-full p-2 pl-10 text-sm text-gray-700"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <p className="text-sm text-gray-600">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;