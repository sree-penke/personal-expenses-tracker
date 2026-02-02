/**
 * AddEntryModal.jsx - Modal for Creating New Transactions
 *
 * WHAT THIS COMPONENT DOES:
 * Displays a popup form that allows users to add new expenses or income.
 * The form includes fields for:
 * - Name (e.g., "Grocery Mart")
 * - Amount (e.g., 120.40)
 * - Description (optional details)
 * - Category (dropdown selection)
 * - Date (date picker)
 *
 * LEARNING POINTS:
 * 1. useState hook - Managing form data in React
 * 2. Controlled components - Form inputs controlled by React state
 * 3. Form handling - Collecting and processing form data
 * 4. Event handlers - onChange, onSubmit
 *
 * PROPS EXPLAINED:
 * @param {boolean} isOpen - Whether the modal should be visible
 * @param {function} onClose - Function to call when modal should close
 * @param {function} onSubmit - Function to call with form data when submitted
 * @param {boolean} isSubmitting - Whether form is currently being submitted
 */

import React, { useState } from 'react';

/**
 * Default categories list
 * In future, this could be fetched from API
 */
const categories = [
  { id: 1, name: 'Food', icon: '🍔' },
  { id: 2, name: 'Electronics', icon: '📱' },
  { id: 3, name: 'Health', icon: '💪' },
  { id: 4, name: 'Business', icon: '💼' },
  { id: 5, name: 'Income', icon: '💰' },
  { id: 6, name: 'Transport', icon: '🚗' },
  { id: 7, name: 'Entertainment', icon: '🎬' },
  { id: 8, name: 'Shopping', icon: '🛒' },
  { id: 9, name: 'Utilities', icon: '💡' },
  { id: 10, name: 'Rent', icon: '🏠' },
];

function AddEntryModal({ isOpen, onClose, onSubmit, isSubmitting = false }) {
  /**
   * Form data state
   */
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  /**
   * Handle input changes
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  /**
   * Handle cancel button click
   */
  const handleCancel = () => {
    setFormData({
      name: '',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  // Don't render if modal is closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__handle"></div>

        <div className="modal__header">
          <h2 className="modal__title">Create New Entry</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            {/* Row 1: Name and Amount */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Grocery"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  className="form-input"
                  placeholder="$ 0.00"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Row 2: Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-input form-textarea"
                placeholder="Add more details about this transaction..."
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
            </div>

            {/* Row 3: Category and Date */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-input form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;
