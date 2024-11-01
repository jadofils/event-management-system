'use client'

// components/layout/Footer.jsx
import { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(true); // State for dark mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <footer className={`py-8 transition duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <p>&copy; {new Date().getFullYear()} Your Event Management. All rights reserved.</p>
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className={`mt-4 px-3 py-1 rounded-md transition duration-300 ease-in-out ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className={`transition duration-300 ease-in-out ${isDarkMode ? 'text-white hover:text-blue-600' : 'text-gray-800 hover:text-blue-600'}`} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className={`transition duration-300 ease-in-out ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-400'}`} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className={`transition duration-300 ease-in-out ${isDarkMode ? 'text-white hover:text-blue-700' : 'text-gray-800 hover:text-blue-700'}`} />
          </a>
        </div>
      </div>
    </footer>
  );
}
