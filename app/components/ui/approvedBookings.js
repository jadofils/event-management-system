'use client';

import { useEffect, useState } from 'react';

const ApprovedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/approved');
        if (!response.ok) {
          throw new Error('Failed to fetch approved bookings');
        }
        const data = await response.json();
        setBookings(data.bookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-500">Loading approved bookings...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Approved Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left border border-gray-300">ID</th>
              <th className="px-4 py-2 text-left border border-gray-300">Booked By</th>
              <th className="px-4 py-2 text-left border border-gray-300">Event Name</th>
              <th className="px-4 py-2 text-left border border-gray-300">Date Booked</th>
              <th className="px-4 py-2 text-left border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedBookings;
