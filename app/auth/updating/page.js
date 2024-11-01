'use client';

import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/NavBar';
import { useRouter } from 'next/router';

const UpdateUserForm = () => {
  const router = useRouter();
  const { id } = router.query; // Get the user ID from the URL

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: 'USER',
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
          const user = await response.json();
          setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
          });
        } else {
          setErrors(['Failed to fetch user details.']);
        }
      } catch (error) {
        setErrors(['Network error. Please try again later.']);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstname':
      case 'lastname':
        return value.trim().length >= 2 ? '' : `${name} must be at least 2 characters`;
      case 'email':
        return emailRegex.test(value) ? '' : 'Invalid email format';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Object.keys(formData)
      .map((key) => validateField(key, formData[key]))
      .filter(Boolean);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(Array.isArray(data.errors) ? data.errors : [data.message || 'Update failed']);
        return;
      }

      setSuccess('User updated successfully!');
      setTimeout(() => {
        router.push('/users'); // Redirect to the users list after successful update
      }, 2000);
    } catch (error) {
      setErrors(['Network error. Please try again later.']);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-[60%] bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl text-center mb-4">Update User</h2>
          {loading && <p>Loading user details...</p>}
          {errors.length > 0 && (
            <div className="mb-4 bg-red-100 text-red-800 p-4 rounded">
              <ul className="list-disc pl-4">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {success && <div className="mb-4 bg-green-100 text-green-800 p-4 rounded">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['firstname', 'lastname'].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Update User
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdateUserForm;
