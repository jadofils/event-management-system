'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function EventsTable() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const CACHE_TIMEOUT = 60000; // 1-minute cache expiration

  useEffect(() => {
    fetchEvents();

    const cacheClearTimer = setTimeout(() => {
      setEvents([]);
      fetchEvents();
    }, CACHE_TIMEOUT);

    return () => clearTimeout(cacheClearTimer);
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        console.error('Failed to fetch events:', data.message);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    const confirmDeletion = confirm("Do you really want to delete the Event?");
    if (!confirmDeletion) {
      alert('Event deletion canceled!');
      return;
    }
  
    try {
      const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete event');
      }
  
      // Update the events state by filtering out the deleted event
      setEvents(events.filter(event => event.id !== id));
      alert('Event deleted successfully');
      console.log('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event: ' + error.message);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-500">Loading events...</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 px-4 py-2 text-left border border-gray-300">ID</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Event Name</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Date</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Location</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Seats</th>
            <th className="w-1/4 px-4 py-2 text-left border border-gray-300">Status</th>
            <th className="w-1/4 px-4 py-2 text-center border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.slice(0, showMore ? events.length : 5).map((event) => (
              <tr key={event.id} className="text-gray-700">
                <td className="px-4 py-2 border border-gray-300">{event.id}</td>
                <td className="px-4 py-2 border border-gray-300">{event.title}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border border-gray-300">{event.description}</td>
                <td className="px-4 py-2 border border-gray-300">{event.availableSeats}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {event.isActive ? 'Active' : 'Inactive'}
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
  <Link
    href={`/auth/editevents?id=${event.id}`}  // Corrected URL formatting
    className="text-blue-500 hover:text-blue-700 mr-3"
  >
    Update
  </Link>
  <button
    onClick={() => handleDelete(event.id)}
    className="text-red-500 hover:text-red-700"
  >
Delete
</button>
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center px-4 py-2 text-gray-500">No events found</td>
            </tr>
          )}
        </tbody>
      </table>
      {events.length > 5 && (
        <button
          className="mt-2 text-blue-500 hover:text-blue-700"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}
