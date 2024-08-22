import React, { useState } from 'react';

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
    axios.post('http://localhost:8888/api/user/',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Send a request to the server to send a password reset email
    // For now, let's just simulate a successful response
    setTimeout(() => {
      setLoading(false);
      alert('Password reset email sent successfully!');
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
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
            {loading ? 'Sending...' : 'Send Password Reset Email'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;