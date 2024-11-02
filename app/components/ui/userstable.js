'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Make sure to import Link

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(null);
  const CACHE_TIMEOUT = 60000; // 1-minute cache timeout

  useEffect(() => {
    fetchUsers();

    const cacheClearTimer = setTimeout(() => {
      setUsers([]); // Clear cached data
      fetchUsers(); // Fetch fresh data
    }, CACHE_TIMEOUT);

    return () => clearTimeout(cacheClearTimer); // Clean up on unmount
  }, []);

  async function fetchUsers() {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        setError(data.message || 'Failed to fetch users');
      }
    } catch (error) {
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    // Confirm deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return; // Exit if the user cancels
  
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }
  
      // Refresh the user list
      await fetchUsers(); // Fetch fresh data after deletion
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(`Error deleting user: ${error.message}`);
    }
  };

  const handleUpdateClick = (e, userId) => {
    e.preventDefault(); // Prevent the default link behavior
    alert(userId); // Alert the user ID
    // After alert, navigate to the update page
    window.location.href = `/auth/edituser?id=${userId}`; // Using Next.js routing with query parameter
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">User List</h2>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-blue-500">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/6 px-4 py-2 text-left border border-gray-300">ID</th>
                <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Last Name</th>
                <th className="w-1/4 px-4 py-2 text-left border border-gray-300">First Name</th>
                <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Role</th>
                <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Email</th>
                <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Status</th>
                <th className="w-1/4 px-4 py-2 text-center border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.slice(0, showMore ? users.length : 5).map((user) => (
                  <tr key={user.id} className="text-gray-700">
                    <td className="px-4 py-2 border border-gray-300">{user.id}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.lastname}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.firstname}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.role}</td>
                    <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                    <td className="px-4 py-2 border border-gray-300">
                      {user.isActive ? 'Active' : 'Inactive'}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">
                      <Link
                        href={`/users/${user.id}/update`}
                        onClick={(e) => handleUpdateClick(e, user.id)} // Add onClick handler here
                        className="text-blue-500 hover:text-blue-700 mr-3"
                      >

                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-2 text-gray-500">No users found</td>
                </tr>
              )}
            </tbody>
          </table>

          {users.length > 5 && (
            <button
              className="mt-2 text-blue-500 hover:text-blue-700"
              onClick={() => setShowMore(prev => !prev)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </>
      )}
    </div>
  );
}
