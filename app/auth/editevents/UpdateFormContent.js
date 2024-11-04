// app/auth/editevents/page.js
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/layout/NavBar';
import Footer from  '../../components/layout/Footer';

const validateEventInput = (data) => {
  const { title, date, description, availableSeats } = data;

  if (!title || title.trim() === '') {
    return { valid: false, message: 'Event name is required' };
  }

  if (!date) {
    return { valid: false, message: 'Event date is required' };
  }

  if (!description || description.trim() === '') {
    return { valid: false, message: 'Description is required' };
  }

  if (!availableSeats || availableSeats < 1) {
    return { valid: false, message: 'Available seats must be a positive number' };
  }

  return { valid: true };
};

const UpdateFormContent = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    availableSeats: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) {
        setIsLoading(false);
        setError('No event ID provided');
        return;
      }

      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch event data');
        }

        const eventData = await response.json();
        
        const formattedDate = eventData.date 
          ? new Date(eventData.date).toISOString().split('T')[0]
          : '';

        setFormData({
          title: eventData.title || '',
          date: formattedDate,
          description: eventData.description || '',
          availableSeats: eventData.availableSeats || '',
        });
      } catch (error) {
        console.error('Error fetching event:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    const validationResult = validateEventInput(formData);
    if (!validationResult.valid) {
      setValidationError(validationResult.message);
      return;
    }

    try {
      const apiData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        availableSeats: parseInt(formData.availableSeats, 10)
      };

      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update event');
      }

      window.location.href = '/auth/dashboard';
    } catch (error) {
      console.error('Error updating event:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl text-center mb-4">Update Event</h2>

          {error ? (
            <div className="text-red-500 text-center mb-4">{error}</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">
                  Event Name *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  required
                  disabled={isLoading}
                />
                {validationError === 'Event name is required' && (
                  <p className="text-red-500 text-sm">{validationError}</p>
                )}
              </div>

              {/* Event Date Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="date">
                  Event Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  required
                  disabled={isLoading}
                />
                {validationError === 'Event date is required' && (
                  <p className="text-red-500 text-sm">{validationError}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="description">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  required
                  disabled={isLoading}
                ></textarea>
                {validationError === 'Description is required' && (
                  <p className="text-red-500 text-sm">{validationError}</p>
                )}
              </div>

              {/* Available Seats Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="availableSeats">
                  Available Seats *
                </label>
                <input
                  type="number"
                  id="availableSeats"
                  name="availableSeats"
                  value={formData.availableSeats}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md border-gray-300"
                  required
                  disabled={isLoading}
                />
                {validationError === 'Available seats must be a positive number' && (
                  <p className="text-red-500 text-sm">{validationError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </form>
          )}

          <p className="text-center mt-4">
            Want to go back?{' '}
            <Link href="/events" className="text-blue-500 hover:underline">
              Cancel
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateFormContent;