/**
 * Settings.jsx - Settings Page Component
 *
 * WHAT THIS PAGE DOES:
 * Provides user settings and preferences including:
 * - User profile management
 * - Data export functionality
 * - Account deletion (danger zone)
 * - Success notifications
 *
 * LEARNING POINTS:
 * 1. Multiple useState calls - Managing different pieces of state
 * 2. Conditional rendering - Showing/hiding alerts
 * 3. Composing components - Using ProfileSection and DataExportSection
 * 4. Tab navigation - Switching between different setting views
 *
 * STATE:
 * - showAlert: Controls visibility of success message
 * - activeTab: Which settings tab is currently active
 */

import React, { useState } from 'react';
import Header from '../components/common/Header';
import ProfileSection from '../components/settings/ProfileSection';
import DataExportSection from '../components/settings/DataExportSection';
import { userProfile } from '../data/mockData';

function Settings() {
  /**
   * State for showing/hiding success alert
   * Initially true to demonstrate the alert design
   */
  const [showAlert, setShowAlert] = useState(true);

  /**
   * State for active tab
   * Possible values: 'general', 'security', 'notifications', 'billing'
   */
  const [activeTab, setActiveTab] = useState('general');

  /**
   * Handle profile save
   * Shows success alert when user saves changes
   *
   * @param {object} updatedData - The updated profile data
   */
  const handleProfileSave = (updatedData) => {
    // In a real app, this would send data to the backend
    console.log('Saving profile:', updatedData);

    // Show success message
    setShowAlert(true);

    // Auto-hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  /**
   * Handle data export
   * Would trigger a data download in a real app
   */
  const handleExport = () => {
    console.log('Export requested');
    // Backend integration will go here
  };

  /**
   * Handle account deletion
   * Shows a confirmation before proceeding
   */
  const handleDeleteAccount = () => {
    // Using browser's built-in confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmed) {
      alert('Account deletion will be available when backend is connected.');
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
   * Makes it easy to add/remove tabs later
   */
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'billing', label: 'Billing' },
  ];

  return (
    <div className="settings-page">
      {/* Page header with back button */}
      <Header title="Settings" showBackButton={true} showActions={false} />

      {/* Success alert - only shown when showAlert is true */}
      {showAlert && (
        <div className="alert alert--success">
          <span className="alert__icon">✓</span>
          <div className="alert__content">
            <div className="alert__title">Changes saved successfully</div>
            <div className="alert__message">Your profile has been updated.</div>
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

      {/* Tab content - show different content based on active tab */}
      {activeTab === 'general' && (
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
