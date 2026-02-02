/**
 * Spends.jsx - Spends/Transactions Page Component
 *
 * WHAT THIS PAGE DOES:
 * Shows a complete list of all transactions (expenses and income).
 * Users can add new transactions using the + button.
 *
 * LEARNING POINTS:
 * 1. useEffect for data fetching - Load data when page opens
 * 2. API integration - GET and POST requests
 * 3. Optimistic updates - Update UI before server confirms (optional)
 * 4. Refetching data - Reload list after adding new item
 */

import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import ActivityItem from '../components/dashboard/ActivityItem';
import AddEntryModal from '../components/modals/AddEntryModal';
import { getSpends, createSpend } from '../services/api';

function Spends() {
  /**
   * State for transaction list
   */
  const [transactionList, setTransactionList] = useState([]);

  /**
   * State for modal visibility
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * State for loading
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * State for error
   */
  const [error, setError] = useState(null);

  /**
   * State for form submission loading
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Fetch transactions from API
   */
  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getSpends();
      setTransactionList(data);
    } catch (err) {
      setError('Failed to load transactions. Please try again.');
      console.error('Fetch transactions error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load transactions when component mounts
   */
  useEffect(() => {
    fetchTransactions();
  }, []);

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
   * Sends data to API and refreshes the list
   */
  const handleAddTransaction = async (formData) => {
    try {
      setIsSubmitting(true);

      // Prepare data for API
      const transactionData = {
        name: formData.name,
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        date: formData.date,
        type: 'expense', // Default to expense
      };

      // Send to API
      await createSpend(transactionData);

      // Refresh the list to show new transaction
      await fetchTransactions();

      // Close modal
      handleCloseModal();
    } catch (err) {
      alert('Failed to add transaction. Please try again.');
      console.error('Create transaction error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Show loading state
   */
  if (isLoading) {
    return (
      <div className="activity-page">
        <Header
          title="Spends"
          showBackButton={false}
          showActions={true}
          onAddClick={handleAddClick}
        />
        <div className="empty-state">
          <div className="empty-state__icon">⏳</div>
          <p className="empty-state__message">Loading transactions...</p>
        </div>
      </div>
    );
  }

  /**
   * Show error state
   */
  if (error) {
    return (
      <div className="activity-page">
        <Header
          title="Spends"
          showBackButton={false}
          showActions={true}
          onAddClick={handleAddClick}
        />
        <div className="empty-state">
          <div className="empty-state__icon">❌</div>
          <p className="empty-state__message">{error}</p>
          <button className="btn btn--primary" onClick={fetchTransactions}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="activity-page">
      {/* Page header with add button */}
      <Header
        title="Spends"
        showBackButton={false}
        showActions={true}
        onAddClick={handleAddClick}
      />

      {/* Transaction list or empty state */}
      {transactionList.length > 0 ? (
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
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Spends;
