/**
 * Header.jsx - Top Navigation Bar Component
 *
 * WHAT THIS COMPONENT DOES:
 * Displays the header at the top of each page with:
 * - Back button (optional) or avatar
 * - Page title
 * - Action buttons (search, add new)
 *
 * LEARNING POINTS:
 * 1. Props - Data passed from parent component (title, showBackButton, etc.)
 * 2. Conditional rendering - Using && and ternary operators to show/hide elements
 * 3. Event handlers - Functions that run when user clicks buttons
 *
 * PROPS EXPLAINED:
 * @param {string} title - The text to display as the page title
 * @param {boolean} showBackButton - If true, shows back arrow instead of avatar
 * @param {boolean} showActions - If true, shows search and add buttons
 * @param {function} onAddClick - Function to call when + button is clicked
 * @param {function} onBackClick - Function to call when back button is clicked
 */

import React from 'react';

function Header({ title, showBackButton, showActions, onAddClick, onBackClick }) {
  return (
    <header className="header">
      {/* Left side: Either back button or avatar */}
      <div className="header__left">
        {showBackButton ? (
          // Show back button if showBackButton is true
          <button className="header__back-btn" onClick={onBackClick}>
            ←
          </button>
        ) : (
          // Show avatar if showBackButton is false
          <div className="header__avatar">
            {/* Display first letter of title or 'U' for User */}
            {title ? title.charAt(0) : 'U'}
          </div>
        )}
        <h1 className="header__title">{title}</h1>
      </div>

      {/* Right side: Action buttons (only show if showActions is true) */}
      {showActions && (
        <div className="header__actions">
          {/* Search button */}
          <button className="icon-btn icon-btn--secondary">
            🔍
          </button>
          {/* Add new button */}
          <button className="icon-btn icon-btn--primary" onClick={onAddClick}>
            +
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
