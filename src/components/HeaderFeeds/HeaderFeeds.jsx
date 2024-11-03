import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Blogs</h1>
      <nav className="space-x-4">
        <Link to="/feeds/:id" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/write" className="text-gray-700 hover:text-blue-500">Write</Link>
        <Link to="/myblogs" className="text-gray-700 hover:text-blue-500">My Blogs</Link>
        <Link to="/profile" className="text-gray-700 hover:text-blue-500">My Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
