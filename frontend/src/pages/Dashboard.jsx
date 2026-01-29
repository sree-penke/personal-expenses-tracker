/**
 * Dashboard.jsx - Main Dashboard Page Component
 *
 * WHAT THIS PAGE DOES:
 * This is the home/landing page of the app. It displays:
 * - Summary cards (balance, expenses, tasks)
 * - Recent activity list (last few transactions)
 * - Add new transaction modal
 *
 * LEARNING POINTS:
 * 1. Page components - Larger components that combine smaller ones
 * 2. State management - Using useState to control modal visibility
 * 3. Passing props - Sending data and functions to child components
 * 4. Array slicing - Showing only first N items with .slice()
 *
 * STATE VARIABLES:
 * - isModalOpen: Controls whether the add entry modal is visible
 * - transactionList: Local copy of transactions that can be updated
 */

import React, { useState } from 'react';
import Header from '../components/common/Header';
import SummaryCard from '../components/dashboard/SummaryCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import AddEntryModal from '../components/modals/AddEntryModal';
import { transactions, dashboardSummary } from '../data/mockData';

function Dashboard() {
  /**
   * State for controlling the modal
   * When true, the modal is visible; when false, it's hidden
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * State for transactions list
   * We use a local copy so we can add new transactions
   * In a real app, this would be fetched from an API
   */
  const [transactionList, setTransactionList] = useState(transactions);

  /**
   * Open the add entry modal
   * Called when user clicks the + button in header
   */
  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   * Called when user clicks outside modal, cancel, or X button
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Handle new transaction submission
   * Adds the new transaction to the beginning of the list
   *
   * @param {object} formData - The form data from AddEntryModal
   */
  const handleAddTransaction = (formData) => {
    // Create a new transaction object
    const newTransaction = {
      id: Date.now(), // Use timestamp as unique ID (simple approach)
      name: formData.name,
      category: formData.category,
      date: new Date(formData.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      amount: parseFloat(formData.amount), // Convert string to number
      type: 'expense', // Default to expense (could add type selection later)
      status: 'completed',
      description: formData.description,
    };

    // Add new transaction to beginning of list
    // The spread operator [...] creates a new array
    setTransactionList([newTransaction, ...transactionList]);
  };

  return (
    <div className="dashboard-page">
      {/* Page header with title and action buttons */}
      <Header
        title="Dashboard"
        showActions={true}
        onAddClick={handleAddClick}
      />

      {/* Summary cards section */}
      <div className="summary-cards">
        {/* Total Balance Card (Green) */}
        <SummaryCard
          type="balance"
          amount={dashboardSummary.totalBalance}
          label="Total Balance"
          badge="ACTIVE NOW"
        />

        {/* Monthly Expenses Card (Purple) */}
        <SummaryCard
          type="expenses"
          amount={dashboardSummary.monthlyExpenses}
          label="Monthly Expenses"
          badge={dashboardSummary.currentMonth.toUpperCase()}
        />

        {/* Pending Tasks Card (Orange) */}
        <SummaryCard
          type="tasks"
          amount={dashboardSummary.pendingTasks}
          label="Pending Tasks"
          badge="HIGH PRIORITY"
        />
      </div>

      {/* Recent Activity section header */}
      <div className="section-header">
        <h2 className="section-header__title">Recent Activity</h2>
        <a href="/activity" className="section-header__link">
          See All
        </a>
      </div>

      {/* Activity list - show only first 5 transactions */}
      <div className="activity-list">
        {transactionList.slice(0, 5).map((transaction) => (
          <ActivityItem key={transaction.id} transaction={transaction} />
        ))}
      </div>

      {/* Add Entry Modal - only visible when isModalOpen is true */}
      <AddEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}

export default Dashboard;
