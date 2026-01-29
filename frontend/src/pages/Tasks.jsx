/**
 * Tasks.jsx - Tasks Management Page Component
 *
 * WHAT THIS PAGE DOES:
 * Displays a list of financial tasks/reminders like:
 * - Bills to pay
 * - Reports to submit
 * - Financial reviews to do
 *
 * Users can check off tasks as they complete them.
 *
 * LEARNING POINTS:
 * 1. State updates with arrays - Modifying items in an array
 * 2. Immutable updates - Creating new arrays instead of modifying existing ones
 * 3. Array.map() for updates - Transforming array items
 * 4. Callback functions - Passing data back from child interactions
 *
 * STATE:
 * - taskList: Array of task objects that can be toggled complete/incomplete
 */

import React, { useState } from 'react';
import Header from '../components/common/Header';
import { tasks } from '../data/mockData';

function Tasks() {
  /**
   * Local state for task list
   * We keep a copy so we can update task completion status
   */
  const [taskList, setTaskList] = useState(tasks);

  /**
   * Toggle a task's completed status
   *
   * When user clicks a task's checkbox, this function:
   * 1. Finds the task by its ID
   * 2. Flips its 'completed' property (true -> false, false -> true)
   * 3. Updates the state with the modified list
   *
   * @param {number} taskId - The ID of the task to toggle
   */
  const handleToggleTask = (taskId) => {
    // Create a new array with the updated task
    // map() creates a new array by transforming each item
    const updatedTasks = taskList.map((task) => {
      // Check if this is the task we want to update
      if (task.id === taskId) {
        // Return a new object with completed flipped
        return {
          ...task, // Keep all other properties
          completed: !task.completed, // Flip the completed value
        };
      }
      // For other tasks, return them unchanged
      return task;
    });

    // Update state with the new array
    setTaskList(updatedTasks);
  };

  /**
   * Get CSS class for priority badge
   * Different priorities have different colors
   *
   * @param {string} priority - 'high', 'medium', or 'low'
   * @returns {string} CSS class name
   */
  const getPriorityClass = (priority) => {
    return `task-item__priority task-item__priority--${priority}`;
  };

  return (
    <div className="tasks-page">
      {/* Page header */}
      <Header title="Tasks" showBackButton={false} showActions={false} />

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
              {/* Show checkmark when completed */}
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
    </div>
  );
}

export default Tasks;
