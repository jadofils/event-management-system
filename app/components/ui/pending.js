'use client';
import { useEffect, useState } from 'react';

const PendingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings/pendings');
        if (!response.ok) {
          throw new Error('Failed to fetch pending bookings');
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
        <span className="ml-3 text-blue-500">Loading pending bookings...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Pending Bookings</h2>
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
              <td colSpan="5" className="text-center px-4 py-2 text-gray-500">No pending bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingBookings;
