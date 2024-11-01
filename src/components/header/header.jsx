import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Define navigate using useNavigate

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">BlogIt</div>
      
      {/* Navigation Links */}
      <nav className="flex space-x-4 items-center">
        <a href="/" className="text-lg text-gray-700 hover:text-gray-900">Home</a>
        
        {/* Buttons */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => navigate('/signup')} // Use navigate here
        >
          Sign Up
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => navigate('/login')} // Add navigate for Login as well
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
