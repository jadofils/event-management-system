"use client"; // This directive allows you to use React hooks and client-side features

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router
import Link from 'next/link';
import Navbar from '../../components/layout/NavBar';
import Footer from '../../components/layout/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('user'); // Default role set to 'user'
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [user, setUser] = useState(null); // State to hold user data
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true

    // Validate input
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false); // Reset loading on error
      return;
    }

    // Send login request
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe, role: role.toUpperCase() }), // Normalize role to uppercase
    });

    if (response.ok) {
      const data = await response.json();
      // Store token in session storage
      sessionStorage.setItem('token', data.token);

      // Fetch user data after successful login
      const userResponse = await fetch('/api/users/', {
        headers: {
          'Authorization': `Bearer ${data.token}`, // Include the token for authentication
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData); // Set user data in state
        router.push('/auth/dashboard'); // Redirect to dashboard on success
      } else {
        const { message } = await userResponse.json();
        setErrorMessage(message || 'Failed to fetch user data.'); // Handle user fetch error
      }
    } else {
      const { message } = await response.json();
      setErrorMessage(message || 'Login failed. Please try again.'); // Handle login error message
    }

    setLoading(false); // Reset loading state after processing
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-accent rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-secondary">Welcome Back</h2>
            <p className="text-secondary/60 mt-2">Please sign in to your account</p>
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}

          {loading ? (
            <div className="text-center text-blue-500">Loading...</div> // Loading state message
          ) : (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-secondary"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-500 hover:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition-colors"
              >
                Sign In
              </button>
            </form>
          )}

          <p className="text-center mt-6 text-secondary/60">
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
