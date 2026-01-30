/**
 * AddTaskModal.jsx - Modal for Creating New Tasks
 *
 * WHAT THIS COMPONENT DOES:
 * Displays a popup form to add new tasks with:
 * - Task Name
 * - Description
 * - Due Date
 * - Priority (Low, Medium, High)
 * - Assignee
 *
 * LEARNING POINTS:
 * 1. Form handling with multiple field types
 * 2. Select dropdowns for predefined options
 * 3. Reusing modal styling from AddEntryModal
 *
 * PROPS EXPLAINED:
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Function to close the modal
 * @param {function} onSubmit - Function to handle form submission
 */

import React, { useState } from 'react';

function AddTaskModal({ isOpen, onClose, onSubmit }) {
  /**
   * Form state - stores all input values
   */
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low',
  });

  /**
   * Handle input changes
   * Updates the corresponding field in formData
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

    // Reset form
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
    });

    onClose();
  };

  /**
   * Handle cancel - reset and close
   */
  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'low',
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
        {/* Drag handle */}
        <div className="modal__handle"></div>

        {/* Header */}
        <div className="modal__header">
          <h2 className="modal__title">Add New Task</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="modal__body">
            {/* Task Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Task Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="e.g. Design System Update"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-input form-textarea"
                placeholder="Enter task details and requirements..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Due Date and Priority - side by side */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="dueDate">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-input"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="priority">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="form-input form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer with buttons */}
          <div className="modal__footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
