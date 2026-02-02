/**
 * api.js - API Service for Backend Communication
 *
 * WHAT THIS FILE DOES:
 * Contains all functions to communicate with the backend API.
 * Each function makes HTTP requests (GET, POST, PUT, DELETE) to the server.
 *
 * LEARNING POINTS:
 * 1. fetch() - Built-in browser function to make HTTP requests
 * 2. async/await - Modern way to handle asynchronous operations
 * 3. try/catch - Error handling for API calls
 * 4. JSON - Data format used to send/receive data from server
 *
 * HOW TO USE:
 * Import the functions you need in your components:
 * import { getSpends, createSpend } from '../services/api';
 */

// Base URL for all API requests
// Change this to your actual backend URL when deployed
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Get auth token from storage
 * Checks both localStorage and sessionStorage
 */
function getAuthToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
}

/**
 * Helper function to make API requests
 * This reduces code duplication across all API functions
 *
 * @param {string} endpoint - The API endpoint (e.g., '/spends/')
 * @param {object} options - Fetch options (method, body, etc.)
 * @param {boolean} requiresAuth - Whether to include auth token (default: true)
 * @returns {Promise} - The response data or error
 */
async function apiRequest(endpoint, options = {}, requiresAuth = true) {
  try {
    // Set default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if required and available
    if (requiresAuth) {
      const token = getAuthToken();
      if (token) {
        headers['Authorization'] = `Token ${token}`;
      }
    }

    // Make the request
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      let errorMessage = 'Something went wrong';

      try {
        const errorData = await response.json();
        // Handle different Django error formats
        errorMessage = errorData.message
          || errorData.error
          || errorData.detail
          || errorData.non_field_errors?.[0]
          || JSON.stringify(errorData);
      } catch {
        errorMessage = `HTTP Error: ${response.status}`;
      }

      // Handle unauthorized (token expired or invalid)
      if (response.status === 401) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = '/login';
      }

      throw new Error(errorMessage);
    }

    // Parse and return JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/* ============================================
   AUTHENTICATION APIs
   ============================================ */

/**
 * Login user
 * @param {object} credentials - { username, password }
 * @param {boolean} rememberMe - Whether to persist login
 * Returns: { token, user }
 */
export async function login(credentials, rememberMe = false) {
  const response = await apiRequest('/login/', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }, false);

  // Store token
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('token', response.token);

  // Store user data (create basic user if not returned by backend)
  const userData = response.user || {
    name: credentials.username,
    email: credentials.username,
  };
  storage.setItem('user', JSON.stringify(userData));

  return response;
}

/**
 * Register new user
 * @param {object} userData - { username, email, password }
 * Returns: { message, token, user }
 */
export async function signup(userData) {
  const response = await apiRequest('/register/', {
    method: 'POST',
    body: JSON.stringify(userData),
  }, false);

  // Store token and user data after registration
  if (response.token) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
}

/**
 * Logout user
 * Clears tokens and user data from storage
 */
export async function logout() {
  try {
    // Call logout API to delete token on server
    await apiRequest('/logout/', {
      method: 'POST',
    }, true);
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getAuthToken();
}

/**
 * Get current user data from storage
 * @returns {object|null} User object or null
 */
export function getCurrentUser() {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Update stored user data
 * @param {object} userData - Updated user data
 */
export function updateStoredUser(userData) {
  const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
  const currentUser = getCurrentUser();
  if (currentUser) {
    storage.setItem('user', JSON.stringify({ ...currentUser, ...userData }));
  }
}

/* ============================================
   DASHBOARD APIs
   ============================================ */

/**
 * Get dashboard summary data
 * Returns: { totalBalance, monthlyExpenses, pendingTasks, currentMonth }
 */
export async function getDashboardSummary() {
  return apiRequest('/dashboard/summary/');
}

/**
 * Get recent spends (limited)
 * @param {number} limit - Number of spends to fetch (default: 5)
 */
export async function getRecentSpends(limit = 5) {
  return apiRequest(`/spends/?limit=${limit}`);
}

/* ============================================
   SPENDS APIs
   ============================================ */

/**
 * Get all spends
 * Returns: Array of spend objects
 */
export async function getSpends() {
  return apiRequest('/spends/');
}

/**
 * Create a new spend
 * @param {object} spendData - { name, amount, description, category, date }
 */
export async function createSpend(spendData) {
  return apiRequest('/spends/', {
    method: 'POST',
    body: JSON.stringify(spendData),
  });
}

/**
 * Update a spend
 * @param {string} id - Spend ID (UUID)
 * @param {object} spendData - Updated spend data
 */
export async function updateSpend(id, spendData) {
  return apiRequest(`/spends/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(spendData),
  });
}

/**
 * Delete a spend
 * @param {string} id - Spend ID (UUID)
 */
export async function deleteSpend(id) {
  return apiRequest(`/spends/${id}/`, {
    method: 'DELETE',
  });
}

/* ============================================
   TASKS APIs
   ============================================ */

/**
 * Get all tasks
 * Returns: Array of task objects
 */
export async function getTasks() {
  return apiRequest('/tasks/');
}

/**
 * Create a new task
 * @param {object} taskData - { title, description, due_date, priority }
 */
export async function createTask(taskData) {
  return apiRequest('/tasks/', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
}

/**
 * Update a task (e.g., toggle completed)
 * @param {string} id - Task ID (UUID)
 * @param {object} taskData - Updated task data
 */
export async function updateTask(id, taskData) {
  return apiRequest(`/tasks/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(taskData),
  });
}

/**
 * Delete a task
 * @param {string} id - Task ID (UUID)
 */
export async function deleteTask(id) {
  return apiRequest(`/tasks/${id}/`, {
    method: 'DELETE',
  });
}

/* ============================================
   USER/SETTINGS APIs
   ============================================ */

/**
 * Get user profile
 * Returns: { name, email, accountType, avatar }
 */
export async function getUserProfile() {
  return apiRequest('/user/profile/');
}

/**
 * Update user profile
 * @param {object} profileData - { name, email }
 */
export async function updateUserProfile(profileData) {
  return apiRequest('/user/profile/', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
}

/**
 * Export all user data
 * Returns: Download link or data blob
 */
export async function exportUserData() {
  return apiRequest('/user/export/');
}

/**
 * Delete user account
 */
export async function deleteUserAccount() {
  return apiRequest('/user/account/', {
    method: 'DELETE',
  });
}

/* ============================================
   CATEGORIES API
   ============================================ */

/**
 * Get all categories
 * Returns: Array of category objects
 */
export async function getCategories() {
  return apiRequest('/categories/');
}
