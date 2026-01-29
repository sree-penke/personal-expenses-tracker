/**
 * DataExportSection.jsx - Data Export Feature Component
 *
 * WHAT THIS COMPONENT DOES:
 * Allows users to export their expense data. Currently shows:
 * - Empty state when no exports exist
 * - Export button to trigger data download
 *
 * LEARNING POINTS:
 * 1. Empty states - Showing helpful UI when there's no data
 * 2. Future-ready design - Component structure ready for backend integration
 *
 * PROPS EXPLAINED:
 * @param {function} onExport - Function to call when export button is clicked
 */

import React from 'react';

function DataExportSection({ onExport }) {
  /**
   * Handle export button click
   * In the future, this will trigger an actual data download
   * For now, it just calls the parent's onExport function
   */
  const handleExport = () => {
    // Call the function passed from parent component
    if (onExport) {
      onExport();
    }
    // For now, just show an alert
    alert('Export feature will be available when backend is connected!');
  };

  return (
    <div className="settings-card">
      <h3 className="settings-card__title">Data Export</h3>

      {/* Empty state - shown when no previous exports exist */}
      <div className="export-empty">
        {/* Cloud icon */}
        <div className="export-empty__icon">☁️</div>

        {/* Title and description */}
        <h4 className="export-empty__title">No previous exports</h4>
        <p className="export-empty__message">
          You haven't requested any data exports yet. Your export history will
          appear here.
        </p>

        {/* Export button */}
        <button className="export-btn" onClick={handleExport}>
          ⬇️ Export All Data
        </button>
      </div>
    </div>
  );
}

export default DataExportSection;
