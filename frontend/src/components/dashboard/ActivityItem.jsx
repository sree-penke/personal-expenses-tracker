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
 * 4. Default values - Using fallbacks when data is missing
 *
 * PROPS EXPLAINED:
 * @param {object} transaction - Object containing all transaction data
 *   - name: Name of the transaction (e.g., "Apple Store")
 *   - category: Category name (e.g., "Electronics")
 *   - date: Date string (e.g., "Oct 24")
 *   - amount: Number amount
 *   - type: 'income' or 'expense'
 *   - status: 'completed' or 'pending'
 *   - icon: (optional) Category icon from API
 */

import React from 'react';

/**
 * Default category icons mapping
 * Used when API doesn't provide an icon
 */
const categoryIcons = {
  Food: '🍔',
  Electronics: '📱',
  Health: '💪',
  Business: '💼',
  Income: '💰',
  Transport: '🚗',
  Entertainment: '🎬',
  Shopping: '🛒',
  Utilities: '💡',
  Rent: '🏠',
  Other: '📄',
};

function ActivityItem({ transaction }) {
  // Destructure transaction object with default values
  const {
    name = 'Unknown',
    category = 'Other',
    date = '',
    amount = 0,
    type = 'expense',
    status = 'completed',
    icon, // Optional icon from API
  } = transaction;

  /**
   * Get the icon for this transaction's category
   * Uses icon from API if available, otherwise uses local mapping
   */
  const getCategoryIcon = () => {
    // If API provides icon, use it
    if (icon) return icon;
    // Otherwise, look up in our local mapping
    return categoryIcons[category] || categoryIcons.Other;
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
        <div className={`activity-item__value activity-item__value--${type}`}>
          {formatAmount()}
        </div>
        <div className={`activity-item__status activity-item__status--${status}`}>
          {status === 'pending' ? 'Pending' : 'Completed'}
        </div>
      </div>
    </div>
  );
}

export default ActivityItem;
