/**
 * App.jsx - Main Application Component
 *
 * WHAT THIS FILE DOES:
 * This is the root component of our React application. It:
 * - Sets up React Router for navigation between pages
 * - Defines the app's layout structure
 * - Includes the bottom navigation that appears on all pages
 *
 * LEARNING POINTS:
 * 1. React Router setup - BrowserRouter, Routes, Route components
 * 2. Layout components - Wrapping pages with common elements
 * 3. Route definitions - Mapping URLs to page components
 *
 * REACT ROUTER EXPLAINED:
 * - BrowserRouter: Enables navigation without page refresh
 * - Routes: Container for all route definitions
 * - Route: Maps a URL path to a component
 *
 * URL PATHS:
 * - "/" -> Dashboard (home page)
 * - "/activity" -> Activity page (all transactions)
 * - "/tasks" -> Tasks page
 * - "/settings" -> Settings page
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';

// Import shared components
import BottomNav from './components/common/BottomNav';

/**
 * Main App Component
 *
 * This component is rendered by index.js and contains the entire application.
 * It sets up the routing and layout structure.
 */
function App() {
  return (
    // BrowserRouter wraps the entire app to enable routing
    <BrowserRouter>
      <div className="app">
        {/*
          Main content area
          This is where page components will be rendered
          The padding-bottom in CSS ensures content doesn't hide behind bottom nav
        */}
        <main className="app__content">
          {/*
            Routes component contains all our route definitions
            Only one route will be rendered at a time based on the URL
          */}
          <Routes>
            {/* Dashboard - the home page, shown at root URL "/" */}
            <Route path="/" element={<Dashboard />} />

            {/* Activity - shows all transactions */}
            <Route path="/activity" element={<Activity />} />

            {/* Tasks - task management page */}
            <Route path="/tasks" element={<Tasks />} />

            {/* Settings - user preferences and profile */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/*
          Bottom Navigation
          This appears on all pages because it's outside the Routes component
        */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
