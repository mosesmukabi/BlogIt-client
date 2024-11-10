import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <Link to="/">BlogIt</Link> {/* Using Link for the logo */}
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-4 items-center">
        {/* Use Link instead of anchor tags */}
        <Link to="/" className="text-lg text-gray-700 hover:text-gray-900">
          Home
        </Link>

        {/* Buttons */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </nav>
    </header>
  );
};

export default Header;
