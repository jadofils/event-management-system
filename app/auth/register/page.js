'use client';

import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/NavBar';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState({});

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
      setSuccess('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [errors, success]);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstname':
      case 'lastname':
      case 'username':
        return value.trim().length >= 2 ? '' : `${name} must be at least 2 characters`;
      case 'email':
        return emailRegex.test(value) ? '' : 'Invalid email format';
      case 'password':
        return passwordRegex.test(value)
          ? ''
          : 'Password must be at least 8 characters and contain at least one uppercase letter, lowercase letter, number, and special character';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      case 'agreeToTerms':
        return value ? '' : 'You must agree to the terms and conditions';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Object.keys(formData).map((key) => validateField(key, formData[key])).filter(Boolean);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submissionData = {
      ...formData,
      email: formData.email.toLowerCase().trim(),
    };

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(Array.isArray(data.errors) ? data.errors : [data.message || 'Registration failed']);
        return;
      }

      setSuccess('Registration successful!');
      setFormData({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
        agreeToTerms: false,
      });
      setTouched({});
    } catch (error) {
      setErrors(['Network error. Please try again later.']);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-[60%] bg-white rounded-md shadow-md p-6">
          <h2 className="text-2xl text-center mb-4">Create Account</h2>
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
              {['firstname', 'lastname', 'username'].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md ${
                      touched[field] && validateField(field, formData[field]) ? 'border-red-500' : 'border-gray-300'
                    }`}
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
                className={`w-full p-2 border rounded-md ${
                  touched.email && validateField('email', formData.email) ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>

            {['password', 'confirmPassword'].map((field) => (
              <div key={field} className="space-y-2">
                <label className="text-sm font-medium">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                <input
                  type="password"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${
                    touched[field] && validateField(field, formData[field]) ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label className="text-sm">I agree to the terms and conditions</label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-500">Login here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterForm;
