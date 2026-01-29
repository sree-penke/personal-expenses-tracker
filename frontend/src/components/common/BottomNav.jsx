/**
 * BottomNav.jsx - Bottom Navigation Bar Component
 *
 * WHAT THIS COMPONENT DOES:
 * Displays a fixed navigation bar at the bottom of the screen.
 * Users can tap/click to navigate between different pages.
 *
 * LEARNING POINTS:
 * 1. useLocation hook - Gets the current URL path from React Router
 * 2. Link component - Creates navigation links that don't refresh the page
 * 3. Array.map() - Loops through an array to create multiple elements
 * 4. Template literals - Using `${}` inside backticks for dynamic strings
 *
 * HOW IT WORKS:
 * - We define an array of navigation items (icon, label, path)
 * - We loop through this array to create each nav button
 * - We check if current path matches to highlight the active tab
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
  // useLocation gives us information about the current URL
  // pathname is the part after the domain (e.g., "/dashboard", "/settings")
  const location = useLocation();

  // Define all navigation items in an array
  // This makes it easy to add/remove/modify nav items
  const navItems = [
    {
      icon: '📊',      // Icon to display
      label: 'Dashboard', // Text label
      path: '/',        // URL path
    },
    {
      icon: '📋',
      label: 'Activity',
      path: '/activity',
    },
    {
      icon: '✓',
      label: 'Tasks',
      path: '/tasks',
    },
    {
      icon: '⚙️',
      label: 'Settings',
      path: '/settings',
    },
  ];

  return (
    <nav className="bottom-nav">
      {/* Loop through each nav item and create a Link */}
      {navItems.map((item) => {
        // Check if this item's path matches the current URL
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}  // Unique key required when using map()
            to={item.path}   // Where the link goes
            className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
          >
            <span className="bottom-nav__icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;
