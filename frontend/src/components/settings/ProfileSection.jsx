/**
 * ProfileSection.jsx - User Profile Display and Edit Component
 *
 * WHAT THIS COMPONENT DOES:
 * Displays the user's profile information including:
 * - Avatar/profile picture
 * - Name and account type
 * - Editable form fields for name and email
 *
 * LEARNING POINTS:
 * 1. Component composition - Breaking UI into smaller, reusable pieces
 * 2. Props for data - Passing user data from parent component
 * 3. Default values - Handling missing data gracefully
 *
 * PROPS EXPLAINED:
 * @param {object} user - User object with name, email, accountType
 * @param {function} onSave - Function to call when user saves changes
 */

import React, { useState, useEffect } from 'react';

function ProfileSection({ user, onSave }) {
  /**
   * Get safe user values with defaults
   */
  const userName = user?.name || 'User';
  const userEmail = user?.email || '';
  const userAccountType = user?.accountType || 'Personal Account';

  /**
   * Local state for form editing
   */
  const [formData, setFormData] = useState({
    name: userName,
    email: userEmail,
  });

  /**
   * Update form when user prop changes
   */
  useEffect(() => {
    setFormData({
      name: user?.name || 'User',
      email: user?.email || '',
    });
  }, [user]);

  /**
   * Handle input changes
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handle save button click
   */
  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="settings-card">
      <h3 className="settings-card__title">User Profile</h3>

      {/* Profile avatar and basic info section */}
      <div className="profile-section">
        {/* Avatar with edit icon */}
        <div className="profile-avatar">
          {userName.charAt(0).toUpperCase()}
          <span className="profile-avatar__edit">📷</span>
        </div>

        {/* User name and account type */}
        <h4 className="profile-name">{userName}</h4>
        <p className="profile-type">{userAccountType}</p>

        {/* Change photo button */}
        <button className="profile-change-btn">Change Photo</button>
      </div>

      {/* Editable form fields */}
      <div className="form-group">
        <label className="form-label" htmlFor="profile-name">
          Full Name
        </label>
        <input
          type="text"
          id="profile-name"
          name="name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="profile-email">
          Email Address
        </label>
        <input
          type="email"
          id="profile-email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Save button */}
      <button className="btn btn--primary btn--full" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}

export default ProfileSection;
