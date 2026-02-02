/**
 * Header.jsx - Top Navigation Bar Component
 *
 * WHAT THIS COMPONENT DOES:
 * Displays the header at the top of each page with:
 * - User avatar with name initial
 * - Page title
 * - Action buttons (search, add new)
 * - User menu with logout option
 *
 * LEARNING POINTS:
 * 1. Getting user data from storage
 * 2. Dropdown menu toggle
 * 3. Logout functionality
 *
 * PROPS EXPLAINED:
 * @param {string} title - The text to display as the page title
 * @param {boolean} showBackButton - If true, shows back arrow instead of avatar
 * @param {boolean} showActions - If true, shows search and add buttons
 * @param {function} onAddClick - Function to call when + button is clicked
 * @param {function} onBackClick - Function to call when back button is clicked
 */

import React, { useState } from 'react';
import { getCurrentUser, logout } from '../../services/api';

function Header({ title, showBackButton, showActions, onAddClick, onBackClick }) {
  /**
   * State for user menu dropdown
   */
  const [showUserMenu, setShowUserMenu] = useState(false);

  /**
   * Get current user from storage
   */
  const user = getCurrentUser();
  const userName = user?.name || 'User';
  const userInitial = userName.charAt(0).toUpperCase();

  /**
   * Toggle user menu dropdown
   */
  const handleAvatarClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    logout();
  };

  /**
   * Close menu when clicking outside
   */
  const handleCloseMenu = () => {
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        {/* Left side: Back button or Avatar with Title */}
        <div className="header__middle">
          {showBackButton ? (
            <button className="header__back-btn" onClick={onBackClick}>
              ←
            </button>
          ) : (
            <div className="header__user">
              <div
                className="header__avatar"
                onClick={handleAvatarClick}
                title={userName}
              >
                {userInitial}
              </div>
              {/* User dropdown menu */}
              {showUserMenu && (
                <>
                  <div className="header__menu-overlay" onClick={handleCloseMenu}></div>
                  <div className="header__menu">
                    <div className="header__menu-header">
                      <span className="header__menu-name">{userName}</span>
                      <span className="header__menu-email">{user?.email || ''}</span>
                    </div>
                    <div className="header__menu-divider"></div>
                    <button className="header__menu-item" onClick={handleLogout}>
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          <h1 className="header__titles">{title}</h1>
        </div>

        {/* Right side: Action buttons */}
        {showActions && (
          <div className="header__actions">
            <button className="icon-btn icon-btn--secondary">
              🔍
            </button>
            <button className="icon-btn icon-btn--primary" onClick={onAddClick}>
              +
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
