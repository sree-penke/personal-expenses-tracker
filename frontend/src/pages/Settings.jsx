/**
 * Settings.jsx - Settings Page Component
 *
 * WHAT THIS PAGE DOES:
 * Provides user settings and preferences including:
 * - User profile management
 * - Data export functionality
 * - Account deletion (danger zone)
 *
 * LEARNING POINTS:
 * 1. useEffect for fetching user profile
 * 2. API calls for profile update, export, delete
 * 3. Loading and error states
 * 4. Tab navigation
 */

import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import ProfileSection from '../components/settings/ProfileSection';
import DataExportSection from '../components/settings/DataExportSection';
import {
  getUserProfile,
  updateUserProfile,
  exportUserData,
  deleteUserAccount,
  getCurrentUser,
  updateStoredUser,
  logout,
} from '../services/api';

function Settings() {
  /**
   * State for user profile data
   * Initialize with stored user data for instant display
   */
  const [userProfile, setUserProfile] = useState(getCurrentUser());

  /**
   * State for loading
   * If we have stored user, don't show loading initially
   */
  const [isLoading, setIsLoading] = useState(!getCurrentUser());

  /**
   * State for error
   */
  const [error, setError] = useState(null);

  /**
   * State for showing/hiding success alert
   */
  const [showAlert, setShowAlert] = useState(false);

  /**
   * State for alert message
   */
  const [alertMessage, setAlertMessage] = useState('');

  /**
   * State for active tab
   */
  const [activeTab, setActiveTab] = useState('general');

  /**
   * Fetch user profile from API
   */
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserProfile();
      setUserProfile(data);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      console.error('Fetch profile error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load profile when component mounts
   */
  useEffect(() => {
    fetchProfile();
  }, []);

  /**
   * Show success alert with message
   */
  const showSuccessAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  /**
   * Handle profile save
   */
  const handleProfileSave = async (updatedData) => {
    try {
      await updateUserProfile(updatedData);
      // Update local state
      setUserProfile({ ...userProfile, ...updatedData });
      // Update stored user data
      updateStoredUser(updatedData);
      showSuccessAlert('Your profile has been updated.');
    } catch (err) {
      alert('Failed to save profile. Please try again.');
      console.error('Update profile error:', err);
    }
  };

  /**
   * Handle data export
   */
  const handleExport = async () => {
    try {
      await exportUserData();
      showSuccessAlert('Data export started. Check your email.');
    } catch (err) {
      alert('Failed to export data. Please try again.');
      console.error('Export error:', err);
    }
  };

  /**
   * Handle account deletion
   */
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmed) {
      try {
        await deleteUserAccount();
        alert('Account deleted successfully.');
        // Logout and redirect to login
        logout();
      } catch (err) {
        alert('Failed to delete account. Please try again.');
        console.error('Delete account error:', err);
      }
    }
  };

  /**
   * Dismiss the alert manually
   */
  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  /**
   * List of setting tabs
   */
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'billing', label: 'Billing' },
  ];

  /**
   * Show loading state
   */
  if (isLoading) {
    return (
      <div className="settings-page">
        <Header title="Settings" showBackButton={false} showActions={false} />
        <div className="empty-state">
          <div className="empty-state__icon">⏳</div>
          <p className="empty-state__message">Loading settings...</p>
        </div>
      </div>
    );
  }

  /**
   * Show error state
   */
  if (error) {
    return (
      <div className="settings-page">
        <Header title="Settings" showBackButton={false} showActions={false} />
        <div className="empty-state">
          <div className="empty-state__icon">❌</div>
          <p className="empty-state__message">{error}</p>
          <button className="btn btn--primary" onClick={fetchProfile}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      {/* Page header */}
      <Header title="Settings" showBackButton={false} showActions={false} />

      {/* Success alert */}
      {showAlert && (
        <div className="alert alert--success">
          <span className="alert__icon">✓</span>
          <div className="alert__content">
            <div className="alert__title">Changes saved successfully</div>
            <div className="alert__message">{alertMessage}</div>
            <button className="alert__dismiss" onClick={handleDismissAlert}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Settings tabs navigation */}
      <div className="settings-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`settings-tab ${
              activeTab === tab.id ? 'settings-tab--active' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content - General tab */}
      {activeTab === 'general' && userProfile && (
        <>
          {/* Profile section */}
          <ProfileSection user={userProfile} onSave={handleProfileSave} />

          {/* Data export section */}
          <DataExportSection onExport={handleExport} />

          {/* Danger zone - account deletion */}
          <div className="danger-zone">
            <div className="danger-zone__header">DANGER ZONE</div>
            <div className="danger-zone__item">
              <div>
                <div className="danger-zone__title">Delete Account</div>
                <div className="danger-zone__description">
                  Permanently delete your profile and all data.
                </div>
              </div>
              <button className="btn btn--danger" onClick={handleDeleteAccount}>
                Delete
              </button>
            </div>
          </div>
        </>
      )}

      {/* Placeholder content for other tabs */}
      {activeTab !== 'general' && (
        <div className="empty-state">
          <div className="empty-state__icon">🚧</div>
          <p className="empty-state__message">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings
            coming soon!
          </p>
        </div>
      )}
    </div>
  );
}

export default Settings;
