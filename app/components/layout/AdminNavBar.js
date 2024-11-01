'use client';

import { FaMoon } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Update this import

export default function AdminNavBar({ user }) {
  const router = useRouter(); // Get the router instance

  const handleLogout = () => {
    // Perform logout logic here, like clearing tokens or user data
    // Then redirect to the login page
    router.push('/auth/login'); // Redirect to /auth/login
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      {/* Left Side: Logo */}
      <div className="text-xl font-bold">My Logo</div>

      {/* Right Side: Moon Icon, Logout, Profile */}
      <div className="flex items-center space-x-4">
        {/* Moon Icon */}
        <FaMoon className="cursor-pointer hover:text-gray-400" />

        {/* Logout Button */}
        <button
          onClick={handleLogout} // Call handleLogout on click
          className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-500 transition-colors"
        >
          Logout
        </button>

        {/* Profile Section */}
        <div className="flex items-center space-x-2">
          <div>
            <p className="font-semibold">{user?.name || 'User Name'}</p>
            <span className="text-green-400 text-sm">Active</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
