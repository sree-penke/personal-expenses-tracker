/**
 * Signup.jsx - Sign Up Page Component
 *
 * WHAT THIS PAGE DOES:
 * Allows new users to create an account with:
 * - Full name
 * - Email address
 * - Password (with confirmation)
 * - Terms acceptance
 *
 * LEARNING POINTS:
 * 1. Form validation - checking passwords match
 * 2. Multi-field form handling
 * 3. Terms and conditions checkbox
 * 4. Redirect to login after signup
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api';

function Signup() {
  /**
   * Form data state
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  /**
   * Loading state
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Error message state
   */
  const [error, setError] = useState('');

  /**
   * Success message state
   */
  const [success, setSuccess] = useState('');

  /**
   * Navigation hook
   */
  const navigate = useNavigate();

  /**
   * Handle input changes
   */
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    // Clear error when user starts typing
    setError('');
  };

  /**
   * Validate form data
   * Returns error message or empty string if valid
   */
  const validateForm = () => {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    // Check password length
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    // Check terms acceptance
    if (!formData.acceptTerms) {
      return 'Please accept the terms and conditions';
    }

    return '';
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      // Call signup API
      // Backend expects 'username' not 'name'
      await signup({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Show success message
      setSuccess('Account created successfully! Redirecting to login...');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start tracking your expenses today</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="auth-error">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="auth-success">
            <span>✓</span> {success}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

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
              placeholder="Create a password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Terms Checkbox */}
          <div className="form-group">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="auth-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="auth-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn--primary btn--full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
