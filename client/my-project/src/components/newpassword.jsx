import React, { useState } from 'react';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Check if the passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    // Send a request to the server to update the password
    // For now, let's just simulate a successful response
    setTimeout(() => {
      setLoading(false);
      alert('Password updated successfully!');
      // Redirect to the login page
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">New Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default NewPassword;