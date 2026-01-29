/**
 * ActivityItem.jsx - Single Transaction/Activity Item Component
 *
 * WHAT THIS COMPONENT DOES:
 * Displays a single transaction in a list format showing:
 * - Category icon
 * - Transaction name and category
 * - Date
 * - Amount (with + for income, - for expense)
 * - Status (completed/pending)
 *
 * LEARNING POINTS:
 * 1. Conditional CSS classes - Adding different styles based on data
 * 2. Ternary operator - condition ? valueIfTrue : valueIfFalse
 * 3. Number formatting - Displaying currency properly
 *
 * PROPS EXPLAINED:
 * @param {object} transaction - Object containing all transaction data
 *   - name: Name of the transaction (e.g., "Apple Store")
 *   - category: Category name (e.g., "Electronics")
 *   - date: Date string (e.g., "Oct 24")
 *   - amount: Number amount
 *   - type: 'income' or 'expense'
 *   - status: 'completed' or 'pending'
 */

import React from 'react';
import { categories } from '../../data/mockData';

function ActivityItem({ transaction }) {
  // Destructure transaction object to get individual values
  // This is cleaner than writing transaction.name, transaction.amount, etc.
  const { name, category, date, amount, type, status } = transaction;

  /**
   * Find the icon for this transaction's category
   * We search the categories array for a matching category name
   */
  const getCategoryIcon = () => {
    // find() returns the first item that matches the condition
    const categoryData = categories.find((cat) => cat.name === category);
    // Return the icon if found, otherwise return a default icon
    return categoryData ? categoryData.icon : '📄';
  };

  /**
   * Format the amount for display
   * - Income shows as "+$2,400.00" in green
   * - Expense shows as "-$999.00" in regular color
   */
  const formatAmount = () => {
    const formattedNumber = amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    // Add + or - prefix based on transaction type
    if (type === 'income') {
      return `+$${formattedNumber}`;
    }
    return `-$${formattedNumber}`;
  };

  return (
    <div className="activity-item">
      {/* Left: Category icon */}
      <div className="activity-item__icon">{getCategoryIcon()}</div>

      {/* Middle: Transaction details */}
      <div className="activity-item__details">
        <div className="activity-item__name">{name}</div>
        <div className="activity-item__meta">
          {category} • {date}
        </div>
      </div>

      {/* Right: Amount and status */}
      <div className="activity-item__amount">
        {/* Amount with conditional styling based on type */}
        <div
          className={`activity-item__value activity-item__value--${type}`}
        >
          {formatAmount()}
        </div>

        {/* Status badge with conditional styling */}
        <div
          className={`activity-item__status activity-item__status--${status}`}
        >
          {status === 'pending' ? 'Pending' : 'Completed'}
        </div>
      </div>
    </div>
  );
}

export default ActivityItem;
