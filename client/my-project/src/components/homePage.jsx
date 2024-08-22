import React from 'react';

const HomePage = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Home Page!</h1>
        <p className="text-xl text-green-500 mb-8">You have successfully registered!</p>
      </div>
    </div>
  );
};

export default HomePage;