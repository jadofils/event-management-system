'use client';

import { useState, useEffect } from 'react';

export default function BookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings'); // Adjust the API endpoint as necessary
      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      } else {
        setError(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      setError('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-500">Loading bookings...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 px-4 py-2 text-left border border-gray-300">ID</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Booked By</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Event Name</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Date Booked</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id} className="text-gray-700">
                <td className="px-4 py-2 border border-gray-300">{booking.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {`${booking.user.firstname} ${booking.user.lastname}`}
                </td>
                <td className="px-4 py-2 border border-gray-300">{booking.event.title}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(booking.dateBooked).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">{booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center px-4 py-2 text-gray-500">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
