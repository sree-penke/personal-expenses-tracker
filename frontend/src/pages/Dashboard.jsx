/**
 * Dashboard.jsx - Main Dashboard Page Component
 *
 * WHAT THIS PAGE DOES:
 * This is the home/landing page of the app. It displays:
 * - Summary cards (balance, expenses, tasks)
 * - Recent activity list (last few transactions)
 *
 * LEARNING POINTS:
 * 1. useEffect hook - Runs code when component loads (fetching data)
 * 2. Loading states - Showing feedback while data is being fetched
 * 3. Error handling - Displaying errors when API calls fail
 * 4. API integration - Fetching real data from backend
 */

import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import SummaryCard from '../components/dashboard/SummaryCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import { getDashboardSummary, getRecentSpends } from '../services/api';

function Dashboard() {
  /**
   * State for dashboard summary data
   */
  const [summary, setSummary] = useState({
    totalBalance: 0,
    monthlyExpenses: 0,
    pendingTasks: 0,
    currentMonth: 'Loading...',
  });

  /**
   * State for recent transactions
   */
  const [recentTransactions, setRecentTransactions] = useState([]);

  /**
   * State for loading indicator
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * State for error messages
   */
  const [error, setError] = useState(null);

  /**
   * useEffect - Fetch data when component mounts
   *
   * The empty array [] means this runs only once when page loads.
   * This is where we call our APIs to get real data.
   */
  useEffect(() => {
    // Function to fetch all dashboard data
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch both summary and transactions at the same time
        // Promise.all runs multiple async operations in parallel
        const [summaryData, transactionsData] = await Promise.all([
          getDashboardSummary(),
          getRecentSpends(5),
        ]);

        // Update state with fetched data
        setSummary(summaryData);
        setRecentTransactions(transactionsData);
      } catch (err) {
        // If API call fails, show error message
        setError('Failed to load dashboard data. Please try again.');
        console.error('Dashboard fetch error:', err);
      } finally {
        // Always turn off loading, whether success or error
        setIsLoading(false);
      }
    }

    // Call the fetch function
    fetchDashboardData();
  }, []); // Empty array = run once on mount

  /**
   * Show loading state
   */
  if (isLoading) {
    return (
      <div className="dashboard-page">
        <Header title="Dashboard" showActions={false} />
        <div className="empty-state">
          <div className="empty-state__icon">⏳</div>
          <p className="empty-state__message">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  /**
   * Show error state
   */
  if (error) {
    return (
      <div className="dashboard-page">
        <Header title="Dashboard" showActions={false} />
        <div className="empty-state">
          <div className="empty-state__icon">❌</div>
          <p className="empty-state__message">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Page header - no add button on dashboard */}
      <Header title="Dashboard" showActions={false} />

      {/* Summary cards section */}
      <div className="summary-cards">
        {/* Total Balance Card (Green) */}
        <SummaryCard
          type="balance"
          amount={summary.totalBalance}
          label="Total Balance"
          badge="ACTIVE NOW"
        />

        {/* Monthly Expenses Card (Purple) */}
        <SummaryCard
          type="expenses"
          amount={summary.monthlyExpenses}
          label="Monthly Expenses"
          badge={summary.currentMonth?.toUpperCase() || 'THIS MONTH'}
        />

        {/* Pending Tasks Card (Orange) */}
        <SummaryCard
          type="tasks"
          amount={summary.pendingTasks}
          label="Pending Tasks"
          badge="HIGH PRIORITY"
        />
      </div>

      {/* Recent Activity section header */}
      <div className="section-header">
        <h2 className="section-header__title">Recent Activity</h2>
        <a href="/spends" className="section-header__link">
          See All
        </a>
      </div>

      {/* Activity list */}
      <div className="activity-list">
        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => (
            <ActivityItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">📭</div>
            <p className="empty-state__message">No recent transactions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
