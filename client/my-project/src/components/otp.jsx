import React, { useState } from 'react';

const OTPConfirmation = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOtp(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Verify the OTP with the server
    // For now, let's just simulate a successful response
    setTimeout(() => {
      setLoading(false);
      if (otp === '123456') { // Replace with the actual OTP sent to the user
        alert('OTP verified successfully!');
        // Redirect to the new password page
        window.location.href = '/new-password';
      } else {
        setError('Invalid OTP');
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="max-w-md mx-auto bg-white p-4 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4">OTP Confirmation</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="otp">
              Enter the OTP sent to your email
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
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
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Didn't receive the OTP? <a href="/resend-otp">Resend OTP</a>
        </p>
      </div>
    </div>
  );
};

export default OTPConfirmation;