import React from 'react';

const HomePage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-blue-500 mb-4">Welcome to Home Page!</h1>
        <p className="text-2xl text-gray-600 mb-8">You have successfully registered!</p>
      </div>
    </div>
  );
};

export default HomePage;