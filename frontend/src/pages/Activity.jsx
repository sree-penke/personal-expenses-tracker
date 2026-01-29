/**
 * Activity.jsx - Activity/Transactions Page Component
 *
 * WHAT THIS PAGE DOES:
 * Shows a complete list of all transactions (expenses and income).
 * Unlike the dashboard, this shows ALL transactions, not just recent ones.
 *
 * LEARNING POINTS:
 * 1. Reusing components - Using the same ActivityItem from Dashboard
 * 2. List rendering - Mapping through an array to display items
 * 3. Conditional rendering - Showing empty state when no data
 *
 * FUTURE IMPROVEMENTS (for when you learn more):
 * - Add filtering by category
 * - Add search functionality
 * - Add sorting options
 * - Add pagination for large lists
 */

import React from 'react';
import Header from '../components/common/Header';
import ActivityItem from '../components/dashboard/ActivityItem';
import { transactions } from '../data/mockData';

function Activity() {
  /**
   * Check if we have any transactions to display
   * This determines whether to show the list or empty state
   */
  const hasTransactions = transactions.length > 0;

  return (
    <div className="activity-page">
      {/* Page header */}
      <Header title="Activity" showBackButton={false} showActions={false} />

      {/* Conditional rendering: show list or empty state */}
      {hasTransactions ? (
        // If we have transactions, display them
        <div className="activity-page__list">
          {/*
            Map through each transaction and create an ActivityItem
            key prop is required for React to track items efficiently
          */}
          {transactions.map((transaction) => (
            <ActivityItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        // If no transactions, show empty state
        <div className="empty-state">
          <div className="empty-state__icon">📭</div>
          <p className="empty-state__message">
            No transactions yet. Add your first expense or income!
          </p>
        </div>
      )}
    </div>
  );
}

export default Activity;
