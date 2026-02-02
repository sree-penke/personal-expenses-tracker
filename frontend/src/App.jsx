/**
 * App.jsx - Main Application Component
 *
 * WHAT THIS FILE DOES:
 * This is the root component of our React application. It:
 * - Sets up React Router for navigation between pages
 * - Handles authentication routing (login, signup, protected routes)
 * - Defines the app's layout structure
 *
 * LEARNING POINTS:
 * 1. React Router setup - BrowserRouter, Routes, Route components
 * 2. Protected routes - Redirecting unauthenticated users to login
 * 3. Conditional rendering - Showing nav only when logged in
 * 4. Navigate component - Programmatic redirection
 *
 * URL PATHS:
 * - "/login" -> Login page (public)
 * - "/signup" -> Signup page (public)
 * - "/" -> Dashboard (protected)
 * - "/spends" -> Spends page (protected)
 * - "/tasks" -> Tasks page (protected)
 * - "/settings" -> Settings page (protected)
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import page components
import Dashboard from './pages/Dashboard';
import Spends from './pages/Spends';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Import shared components
import BottomNav from './components/common/BottomNav';

// Import auth helper
import { isAuthenticated } from './services/api';

/**
 * ProtectedRoute Component
 *
 * Wraps routes that require authentication.
 * If user is not logged in, redirects to login page.
 *
 * LEARNING POINT:
 * This is a common pattern called "Higher Order Component" (HOC)
 * It wraps other components to add functionality (auth check)
 *
 * @param {ReactNode} children - The component to render if authenticated
 */
function ProtectedRoute({ children }) {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
}

/**
 * PublicRoute Component
 *
 * Wraps routes that should only be accessible when NOT logged in.
 * If user is already logged in, redirects to dashboard.
 *
 * @param {ReactNode} children - The component to render if not authenticated
 */
function PublicRoute({ children }) {
  // Check if user is authenticated
  if (isAuthenticated()) {
    // Redirect to dashboard if already logged in
    return <Navigate to="/" replace />;
  }

  // Render the public component if not authenticated
  return children;
}

/**
 * AppContent Component
 *
 * Handles the main app layout and conditionally shows navigation.
 * Separated from App to use useLocation hook (must be inside Router)
 */
function AppContent() {
  const location = useLocation();

  // Routes where we don't show the navigation
  const authRoutes = ['/login', '/signup'];
  const showNav = !authRoutes.includes(location.pathname);

  return (
    <div className="app">
      <main className={showNav ? 'app__content' : 'app__content--full'}>
        <Routes>
          {/* Public Routes - Only accessible when NOT logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected Routes - Only accessible when logged in */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/spends"
            element={
              <ProtectedRoute>
                <Spends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to dashboard or login */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated() ? '/' : '/login'} replace />}
          />
        </Routes>
      </main>

      {/* Only show navigation when logged in and not on auth pages */}
      {showNav && <BottomNav />}
    </div>
  );
}

/**
 * Main App Component
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
