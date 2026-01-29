/**
 * Dashboard.jsx - Main Dashboard Page Component
 *
 * WHAT THIS PAGE DOES:
 * This is the home/landing page of the app. It displays:
 * - Summary cards (balance, expenses, tasks)
 * - Recent activity list (last few transactions)
 *
 * LEARNING POINTS:
 * 1. Page components - Larger components that combine smaller ones
 * 2. Passing props - Sending data to child components
 * 3. Array slicing - Showing only first N items with .slice()
 */

import React from 'react';
import Header from '../components/common/Header';
import SummaryCard from '../components/dashboard/SummaryCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import { transactions, dashboardSummary } from '../data/mockData';

function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* Page header - no add button on dashboard */}
      <Header
        title="Dashboard"
        showActions={false}
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
        <a href="/spends" className="section-header__link">
          See All
        </a>
      </div>

      {/* Activity list - show only first 5 transactions */}
      <div className="activity-list">
        {transactions.slice(0, 5).map((transaction) => (
          <ActivityItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
