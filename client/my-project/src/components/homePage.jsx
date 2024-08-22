import React from 'react';

const HomePage = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1556740714-b6b9cb7f8d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold text-white mb-4">
          Welcome to your home page!
        </h1>
        <p className="text-lg text-white">
          You have registered successfully!
        </p>
      </div>
    </div>
  );
};

export default HomePage;