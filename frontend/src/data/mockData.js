/**
 * mockData.js - Sample Data for Our Application
 *
 * WHAT THIS FILE DOES:
 * Since we don't have a backend yet, this file provides fake (mock) data
 * that our app can use. Later, you'll replace this with real API calls.
 *
 * LEARNING POINTS:
 * 1. Exporting data - We use 'export const' so other files can import this data
 * 2. Arrays of objects - Each transaction is an object with properties
 * 3. Data structure - Notice how we organize related information together
 */

// List of categories for expenses and income
// Each category has an id, name, icon, and color for styling
export const categories = [
  { id: 1, name: 'Food', icon: '🍔', color: '#FF6B6B' },
  { id: 2, name: 'Electronics', icon: '📱', color: '#4ECDC4' },
  { id: 3, name: 'Health', icon: '💪', color: '#45B7D1' },
  { id: 4, name: 'Business', icon: '💼', color: '#96CEB4' },
  { id: 5, name: 'Income', icon: '💰', color: '#52D681' },
  { id: 6, name: 'Transport', icon: '🚗', color: '#DDA0DD' },
  { id: 7, name: 'Entertainment', icon: '🎬', color: '#FFB347' },
  { id: 8, name: 'Shopping', icon: '🛒', color: '#87CEEB' },
];

// Sample transactions - each transaction represents money in or out
// 'type' can be 'expense' (money out) or 'income' (money in)
export const transactions = [
  {
    id: 1,
    name: 'Apple Store',
    category: 'Electronics',
    date: 'Oct 24',
    amount: 999.00,
    type: 'expense',
    status: 'completed',
    description: 'New iPhone purchase',
  },
  {
    id: 2,
    name: 'Grocery Mart',
    category: 'Food',
    date: 'Oct 23',
    amount: 120.40,
    type: 'expense',
    status: 'completed',
    description: 'Weekly groceries',
  },
  {
    id: 3,
    name: 'Q4 Tax Report',
    category: 'Business',
    date: 'Oct 22',
    amount: 0,
    type: 'expense',
    status: 'pending',
    description: 'Tax filing for Q4',
  },
  {
    id: 4,
    name: 'Gym Membership',
    category: 'Health',
    date: 'Oct 21',
    amount: 55.00,
    type: 'expense',
    status: 'completed',
    description: 'Monthly gym subscription',
  },
  {
    id: 5,
    name: 'Freelance Payment',
    category: 'Income',
    date: 'Oct 20',
    amount: 2400.00,
    type: 'income',
    status: 'completed',
    description: 'Website development project',
  },
];

// Sample tasks for the task management feature
export const tasks = [
  { id: 1, title: 'Pay electricity bill', dueDate: 'Oct 28', priority: 'high', completed: false },
  { id: 2, title: 'Submit expense report', dueDate: 'Oct 30', priority: 'medium', completed: false },
  { id: 3, title: 'Review subscription costs', dueDate: 'Nov 1', priority: 'low', completed: false },
  { id: 4, title: 'Update budget plan', dueDate: 'Nov 5', priority: 'medium', completed: false },
];

// User profile data
export const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  accountType: 'Personal Account',
  avatar: null, // Will use a placeholder
};

// Dashboard summary data
// This would normally be calculated from transactions
export const dashboardSummary = {
  totalBalance: 12450.00,
  monthlyExpenses: 3240.50,
  pendingTasks: 12,
  currentMonth: 'October',
};
