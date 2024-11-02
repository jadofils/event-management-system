'use client';

import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/NavBar';
import { useSearchParams } from 'next/navigation';

// Frontend validation function to match backend expectations
const validateUserInput = (data) => {
  const { firstname, lastname, email, role } = data;
  
  if (!firstname || firstname.trim() === '') {
    return { valid: false, message: 'First name is required' };
  }
  
  if (!lastname || lastname.trim() === '') {
    return { valid: false, message: 'Last name is required' };
  }
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: 'Valid email is required' };
  }
  
  if (role && !['USER', 'ADMIN'].includes(role)) {
    return { valid: false, message: 'Invalid role specified' };
  }
  
  return { valid: true };
};

const UpdateForm = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: 'USER',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setIsLoading(false);
        setError('No user ID provided');
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to fetch user data: ${response.status}`);
        }
        const userData = await response.json();
        
        // Ensure we only set the fields we want to update
        setFormData({
          firstname: userData.firstname || '',
          lastname: userData.lastname || '',
          email: userData.email || '',
          role: userData.role || 'USER',
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form data
      const validationResult = validateUserInput(formData);
      if (!validationResult.valid) {
        throw new Error(validationResult.message);
      }

      if (!userId) {
        throw new Error('No user ID provided for update');
      }

      const confirmUpdate = window.confirm(
        `Do you want to update this user's information?`
      );

      if (!confirmUpdate) return;

      setIsLoading(true);
      setError(null);

      console.log('Sending update request with data:', formData);

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname.trim(),
          lastname: formData.lastname.trim(),
          email: formData.email.trim(),
          role: formData.role,
        }),
      });
      console.log('Data to be sent:', {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        role: formData.role,
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update user');
      }

      alert('User updated successfully');
      window.location.href = '/auth/dashboard';
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setError(error.message);
      alert(`Error updating user: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50">
            <p>Error: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-[60%] bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl text-center mb-4">Update Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['firstname', 'lastname'].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-sm font-medium">
                    {field === 'firstname' ? 'First Name' : 'Last Name'} *
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                    required
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-gray-300"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                disabled={isLoading}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </form>

          <p className="text-center mt-4">
            Want to go back?{' '}
            <Link href="/users" className="text-blue-500">Cancel</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateForm;
