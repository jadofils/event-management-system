'use client'
// components/layout/Navbar.js
import { useState } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

export default function AdminNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className={`flex items-center justify-between p-4 transition duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 shadow-md'}`}>
      {/* Left Side: Logo */}
      <div className="text-xl font-bold hover:text-gray-300 transition duration-300 ease-in-out cursor-pointer">
        My Logo
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navbar Content */}
      <div className={`flex items-center space-x-4 md:space-x-6 ${isOpen ? 'flex flex-col md:flex-row absolute top-16 left-0 w-full bg-gray-800 md:static md:bg-transparent md:top-auto md:shadow-none transition-all duration-300' : 'hidden md:flex'}`}>
        {/* Theme Toggle Icon */}
        {isDarkMode ? (
          <FaSun onClick={toggleTheme} className="cursor-pointer hover:text-yellow-400 transition duration-300 ease-in-out" />
        ) : (
          <FaMoon onClick={toggleTheme} className="cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out" />
        )}

        {/* Login Button */}
        <button className={`px-3 py-1 rounded-md transition-colors duration-300 ease-in-out ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'}`}>
          Login
        </button>

        {/* Register Button */}
        <button className={`px-3 py-1 rounded-md transition-colors duration-300 ease-in-out ${isDarkMode ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-300 hover:bg-gray-400'}`}>
          Register
        </button>
      </div>
    </nav>
  );
}
