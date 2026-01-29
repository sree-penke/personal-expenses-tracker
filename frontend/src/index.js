/**
 * index.js - The Entry Point of our React Application
 *
 * WHAT THIS FILE DOES:
 * This is the first JavaScript file that runs when our app starts.
 * It connects our React app to the HTML page.
 *
 * LEARNING POINTS:
 * 1. ReactDOM.createRoot() - Creates a "root" where React will render
 * 2. root.render() - Tells React what to display
 * 3. <React.StrictMode> - Helps find problems in your code during development
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

// Find the HTML element with id="root" and create a React root there
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render our main App component inside the root
// StrictMode helps catch common mistakes (only active in development)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
