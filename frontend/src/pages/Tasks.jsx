/**
 * Tasks.jsx - Tasks Management Page Component
 *
 * WHAT THIS PAGE DOES:
 * Displays a list of financial tasks/reminders.
 * Users can add new tasks and mark them as complete.
 *
 * LEARNING POINTS:
 * 1. CRUD operations - Create, Read, Update tasks via API
 * 2. useEffect for initial data loading
 * 3. Handling multiple API operations (toggle, create)
 * 4. State synchronization with backend
 */

import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import AddTaskModal from '../components/modals/AddTaskModal';
import { getTasks, createTask, updateTask } from '../services/api';

function Tasks() {
  /**
   * State for task list
   */
  const [taskList, setTaskList] = useState([]);

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
   * State for form submission
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Fetch tasks from API
   */
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTasks();
      setTaskList(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Fetch tasks error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Load tasks when component mounts
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Open the add task modal
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
   * Handle new task submission
   */
  const handleAddTask = async (formData) => {
    try {
      setIsSubmitting(true);

      const taskData = {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
      };

      await createTask(taskData);
      await fetchTasks(); // Refresh list
      handleCloseModal();
    } catch (err) {
      alert('Failed to add task. Please try again.');
      console.error('Create task error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Toggle task completed status
   * Sends PATCH request to update task on server
   */
  const handleToggleTask = async (taskId) => {
    // Find the task to toggle
    const task = taskList.find((t) => t.id === taskId);
    if (!task) return;

    try {
      // Optimistic update - update UI immediately
      setTaskList((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );

      // Send update to API
      await updateTask(taskId, { completed: !task.completed });
    } catch (err) {
      // Revert on error
      setTaskList((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, completed: task.completed } : t
        )
      );
      alert('Failed to update task. Please try again.');
      console.error('Update task error:', err);
    }
  };

  /**
   * Get CSS class for priority badge
   */
  const getPriorityClass = (priority) => {
    return `task-item__priority task-item__priority--${priority}`;
  };

  /**
   * Show loading state
   */
  if (isLoading) {
    return (
      <div className="tasks-page">
        <Header
          title="Tasks"
          showBackButton={false}
          showActions={true}
          onAddClick={handleAddClick}
        />
        <div className="empty-state">
          <div className="empty-state__icon">⏳</div>
          <p className="empty-state__message">Loading tasks...</p>
        </div>
      </div>
    );
  }

  /**
   * Show error state
   */
  if (error) {
    return (
      <div className="tasks-page">
        <Header
          title="Tasks"
          showBackButton={false}
          showActions={true}
          onAddClick={handleAddClick}
        />
        <div className="empty-state">
          <div className="empty-state__icon">❌</div>
          <p className="empty-state__message">{error}</p>
          <button className="btn btn--primary" onClick={fetchTasks}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      {/* Page header with add button */}
      <Header
        title="Tasks"
        showBackButton={false}
        showActions={true}
        onAddClick={handleAddClick}
      />

      {/* Task list */}
      {taskList.length > 0 ? (
        <div className="task-list">
          {taskList.map((task) => (
            <div key={task.id} className="task-item">
              {/* Clickable checkbox */}
              <div
                className={`task-item__checkbox ${
                  task.completed ? 'task-item__checkbox--checked' : ''
                }`}
                onClick={() => handleToggleTask(task.id)}
              >
                {task.completed && '✓'}
              </div>

              {/* Task content */}
              <div className="task-item__content">
                <div
                  className={`task-item__title ${
                    task.completed ? 'task-item__title--completed' : ''
                  }`}
                >
                  {task.title}
                </div>
                <div className="task-item__due">Due: {task.dueDate}</div>
              </div>

              {/* Priority badge */}
              <span className={getPriorityClass(task.priority)}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state__icon">📋</div>
          <p className="empty-state__message">
            No tasks yet. Add your first task!
          </p>
        </div>
      )}

      {/* Show message if all tasks are completed */}
      {taskList.length > 0 && taskList.every((task) => task.completed) && (
        <div className="empty-state">
          <div className="empty-state__icon">🎉</div>
          <p className="empty-state__message">All tasks completed! Great job!</p>
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Tasks;
