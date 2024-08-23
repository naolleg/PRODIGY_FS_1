import React, { useState } from 'react';

const OTPConfirmation = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (index) => (event) => {
    const { value } = event.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '') {
      const nextInput = document.querySelector(`input:nth-child(${index + 2})`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Verify the OTP with the server
    // For now, let's just simulate a successful response
    setTimeout(() => {
      setLoading(false);
      if (otp.join('') === '123456') { // Replace with the actual OTP sent to the user
        alert('OTP verified successfully!');
        // Redirect to the new password page
        window.location.href = '/newpassword';
      } else {
        setError('Invalid OTP');
      }
    }, 2000);
  };

  return (
    <div className="h-screen flex justify-center items-center" style={{ backgroundColor: '#fff' }}>
      <div
        className="max-w-md w-full p-4 bg-white rounded-lg shadow-md"
        style={{
          marginTop: '100px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '10px',
        }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center">OTP Confirmation</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={handleInputChange(index)}
                className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200 mr-2"
                maxLength={1}
                required
              />
            ))}
          </div>
          {error && (
            <div className="text-red-500 mb-4 text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg w-full disabled:opacity-50"
            style={{
              color: 'white',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
            }}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Didn't receive the OTP? <a href="/resend-otp" className="text-blue-500 hover:text-blue-700">Resend OTP</a>
        </p>
      </div>
    </div>
  );
};

export default OTPConfirmation;