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
 * 3. Callback functions - Passing functions to handle events in parent
 *
 * PROPS EXPLAINED:
 * @param {object} user - User object with name, email, accountType
 * @param {function} onSave - Function to call when user saves changes
 */

import React, { useState } from 'react';

function ProfileSection({ user, onSave }) {
  /**
   * Local state for form editing
   *
   * We keep a local copy of the user data that can be edited.
   * This way, changes aren't saved until the user clicks "Save".
   */
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  /**
   * Handle input changes
   * Updates our local form state as user types
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
   * Calls the parent's onSave function with updated data
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
          {/* Display first letter of name as avatar placeholder */}
          {user.name.charAt(0).toUpperCase()}
          <span className="profile-avatar__edit">📷</span>
        </div>

        {/* User name and account type */}
        <h4 className="profile-name">{user.name}</h4>
        <p className="profile-type">{user.accountType}</p>

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
