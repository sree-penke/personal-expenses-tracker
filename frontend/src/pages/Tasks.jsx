/**
 * Tasks.jsx - Tasks Management Page Component
 *
 * WHAT THIS PAGE DOES:
 * Displays a list of financial tasks/reminders like:
 * - Bills to pay
 * - Reports to submit
 * - Financial reviews to do
 *
 * Users can check off tasks and add new ones.
 *
 * LEARNING POINTS:
 * 1. State updates with arrays - Modifying items in an array
 * 2. Immutable updates - Creating new arrays instead of modifying existing ones
 * 3. Array.map() for updates - Transforming array items
 * 4. Modal integration - Opening/closing modal for adding tasks
 *
 * STATE:
 * - taskList: Array of task objects that can be toggled complete/incomplete
 * - isModalOpen: Controls visibility of AddTaskModal
 */

import React, { useState } from 'react';
import Header from '../components/common/Header';
import AddTaskModal from '../components/modals/AddTaskModal';
import { tasks } from '../data/mockData';

function Tasks() {
  /**
   * Local state for task list
   */
  const [taskList, setTaskList] = useState(tasks);

  /**
   * State for modal visibility
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

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
   * Adds the new task to the list
   */
  const handleAddTask = (formData) => {
    const newTask = {
      id: Date.now(),
      title: formData.title,
      dueDate: new Date(formData.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      priority: formData.priority,
      completed: false,
      description: formData.description,
    };

    setTaskList([newTask, ...taskList]);
  };

  /**
   * Toggle a task's completed status
   */
  const handleToggleTask = (taskId) => {
    const updatedTasks = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    setTaskList(updatedTasks);
  };

  /**
   * Get CSS class for priority badge
   */
  const getPriorityClass = (priority) => {
    return `task-item__priority task-item__priority--${priority}`;
  };

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

      {/* Show message if all tasks are completed */}
      {taskList.every((task) => task.completed) && (
        <div className="empty-state">
          <div className="empty-state__icon">🎉</div>
          <p className="empty-state__message">
            All tasks completed! Great job!
          </p>
        </div>
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
      />
    </div>
  );
}

export default Tasks;
