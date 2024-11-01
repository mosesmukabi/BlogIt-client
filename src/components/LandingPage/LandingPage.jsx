import React from 'react';
import blogImage from '../../assets/blog.jpg';

const LandingPage = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${blogImage})` }}>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content on top of the image */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to BlogIt</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          Discover insightful articles, connect with others, and start your own journey of sharing knowledge and experiences. BlogIt is your go-to platform for everything blogging.
        </p>

        {/* Get Started Button */}
        <button className="bg-blue-500 text-white font-semibold text-lg px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
