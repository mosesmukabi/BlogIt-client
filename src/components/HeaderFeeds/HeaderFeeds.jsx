import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const Header = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/"); // Redirect to landing page after logout
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Blogs</h1>
      <nav className="space-x-4">
        <Link to="/feeds" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <Link to="/write" className="text-gray-700 hover:text-blue-500">
          Write
        </Link>
        <Link to="/myblogs" className="text-gray-700 hover:text-blue-500">
          My Blogs
        </Link>
        <Link
          to={`/updateProfile`}
          className="text-gray-700 hover:text-blue-500"
        >
          My Profile
        </Link>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-blue-500 focus:outline-none"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
