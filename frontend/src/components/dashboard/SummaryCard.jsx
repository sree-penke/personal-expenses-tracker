/**
 * SummaryCard.jsx - Dashboard Summary Card Component
 *
 * WHAT THIS COMPONENT DOES:
 * Displays a colored card showing key statistics like:
 * - Total Balance (green card)
 * - Monthly Expenses (purple card)
 * - Pending Tasks (orange card)
 *
 * LEARNING POINTS:
 * 1. Props destructuring - Extracting values from props object { type, amount, label }
 * 2. Number formatting - Using toLocaleString() to format currency
 * 3. Switch statement alternative - Using object lookup for variant styles
 *
 * PROPS EXPLAINED:
 * @param {string} type - Card type: 'balance', 'expenses', or 'tasks'
 * @param {number} amount - The number/amount to display
 * @param {string} label - Description text below the amount
 * @param {string} badge - Small text in top right (e.g., "ACTIVE NOW")
 */

import React from 'react';

function SummaryCard({ type, amount, label, badge }) {
  /**
   * Format the amount based on card type
   * - For money (balance/expenses): Add $ and format with commas
   * - For tasks: Just show the number with "Tasks" text
   */
  const formatAmount = () => {
    if (type === 'tasks') {
      // For tasks, show number followed by "Tasks"
      return `${amount} Tasks`;
    }
    // For money, format with $ sign, commas, and 2 decimal places
    // toLocaleString makes 12450 become "12,450.00"
    return `$${amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  /**
   * Get the icon based on card type
   * Each type has a different icon to help users quickly identify it
   */
  const getIcon = () => {
    switch (type) {
      case 'balance':
        return '💳'; // Credit card icon for balance
      case 'expenses':
        return '📅'; // Calendar icon for monthly expenses
      case 'tasks':
        return '📋'; // Clipboard icon for tasks
      default:
        return '📊'; // Default chart icon
    }
  };

  return (
    <div className={`summary-card summary-card--${type}`}>
      {/* Badge in top right corner */}
      {badge && <span className="summary-card__badge">{badge}</span>}

      {/* Icon */}
      <div className="summary-card__icon">{getIcon()}</div>

      {/* Amount - the main number displayed */}
      <div className="summary-card__amount">{formatAmount()}</div>

      {/* Label - description of what this number represents */}
      <div className="summary-card__label">{label}</div>
    </div>
  );
}

export default SummaryCard;
