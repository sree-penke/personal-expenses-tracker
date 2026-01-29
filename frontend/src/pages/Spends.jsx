/**
 * Spends.jsx - Spends/Transactions Page Component
 *
 * WHAT THIS PAGE DOES:
 * Shows a complete list of all transactions (expenses and income).
 * Users can add new transactions using the + button.
 *
 * LEARNING POINTS:
 * 1. Reusing components - Using ActivityItem for each transaction
 * 2. Modal integration - AddEntryModal for new transactions
 * 3. State management - Managing transaction list
 */

import React, { useState } from 'react';
import Header from '../components/common/Header';
import ActivityItem from '../components/dashboard/ActivityItem';
import AddEntryModal from '../components/modals/AddEntryModal';
import { transactions } from '../data/mockData';

function Spends() {
  /**
   * State for transaction list
   */
  const [transactionList, setTransactionList] = useState(transactions);

  /**
   * State for modal visibility
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Open the add entry modal
   */
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Handle new transaction submission
   */
  const handleAddTransaction = (formData) => {
    const newTransaction = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      date: new Date(formData.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      amount: parseFloat(formData.amount),
      type: 'expense',
      status: 'completed',
      description: formData.description,
    };

    setTransactionList([newTransaction, ...transactionList]);
  };

  /**
   * Check if we have any transactions
   */
  const hasTransactions = transactionList.length > 0;

  return (
    <div className="activity-page">
      {/* Page header with add button */}
      <Header
        title="Spends"
        showBackButton={false}
        showActions={true}
        onAddClick={handleAddClick}
      />

      {/* Conditional rendering: show list or empty state */}
      {hasTransactions ? (
        <div className="activity-page__list">
          {transactionList.map((transaction) => (
            <ActivityItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state__icon">📭</div>
          <p className="empty-state__message">
            No transactions yet. Add your first expense or income!
          </p>
        </div>
      )}

      {/* Add Entry Modal */}
      <AddEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}

export default Spends;
