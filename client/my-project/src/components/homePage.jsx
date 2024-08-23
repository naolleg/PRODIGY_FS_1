import React from 'react';

const HomePage = () => {
  const handleLogout = () => {
    // Add your logout logic here, e.g. remove token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Welcome to Home Page!</h1>
        <p className="text-2xl text-gray-600 mb-8">You have successfully registered!</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;