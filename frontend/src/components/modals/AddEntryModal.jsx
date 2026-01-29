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
 */

import React, { useState } from 'react';
import { categories } from '../../data/mockData';

function AddEntryModal({ isOpen, onClose, onSubmit }) {
  /**
   * useState for form data
   *
   * We store all form fields in a single state object.
   * Initial values are empty strings or defaults.
   *
   * This approach is cleaner than having separate useState for each field.
   */
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  });

  /**
   * Handle input changes
   *
   * This function runs every time a user types in any input field.
   * It updates the formData state with the new value.
   *
   * @param {object} event - The event object from the input
   */
  const handleChange = (event) => {
    // Get the name and value from the input that triggered this
    const { name, value } = event.target;

    // Update formData, keeping all other fields the same
    // The [name] syntax lets us use a variable as the key
    setFormData({
      ...formData,      // Spread existing values
      [name]: value,    // Update the changed field
    });
  };

  /**
   * Handle form submission
   *
   * Prevents the default form behavior (page refresh)
   * and calls the onSubmit prop with the form data.
   *
   * @param {object} event - The form submit event
   */
  const handleSubmit = (event) => {
    // Prevent the default form submission (which would refresh the page)
    event.preventDefault();

    // Call the onSubmit function passed from parent with our form data
    onSubmit(formData);

    // Reset the form to empty values
    setFormData({
      name: '',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });

    // Close the modal
    onClose();
  };

  /**
   * Handle cancel button click
   *
   * Resets the form and closes the modal without saving.
   */
  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: '',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    // Close the modal
    onClose();
  };

  // Don't render anything if modal is not open
  // This is a common pattern for conditional rendering
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/*
        Stop click events from bubbling up to the overlay
        This prevents the modal from closing when clicking inside it
      */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Drag handle indicator */}
        <div className="modal__handle"></div>

        {/* Modal header with title and close button */}
        <div className="modal__header">
          <h2 className="modal__title">Create New Entry</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal body with form */}
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            {/* Row 1: Name and Amount side by side */}
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
                />
              </div>
            </div>

            {/* Row 2: Description (full width) */}
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
              ></textarea>
            </div>

            {/* Row 3: Category and Date side by side */}
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
                >
                  <option value="">Select Category</option>
                  {/* Map through categories to create options */}
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
                />
              </div>
            </div>
          </div>

          {/* Modal footer with action buttons */}
          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Create Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntryModal;
