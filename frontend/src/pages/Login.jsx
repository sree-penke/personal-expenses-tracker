/**
 * Login.jsx - Sign In Page Component
 *
 * WHAT THIS PAGE DOES:
 * Allows users to sign in to their account with:
 * - Email address
 * - Password
 * - Remember me option
 * - Link to sign up page
 *
 * LEARNING POINTS:
 * 1. Form handling for authentication
 * 2. Password input type for security
 * 3. Navigation after successful login
 * 4. Error handling for invalid credentials
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  /**
   * Form data state
   */
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  /**
   * Loading state for form submission
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Error message state
   */
  const [error, setError] = useState('');

  /**
   * Navigation hook - used to redirect after login
   */
  const navigate = useNavigate();

  /**
   * Handle input changes
   */
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      // For checkboxes use 'checked', for other inputs use 'value'
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call login API (token and user are stored automatically)
      // Backend expects 'username' not 'email'
      await login(
        {
          username: formData.email,
          password: formData.password,
        },
        formData.rememberMe
      );

      // Redirect to dashboard (force page reload to update auth state)
      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Logo/Brand */}
        <div className="auth-header">
          <div className="auth-logo">💰</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your expense tracker account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="auth-options">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
