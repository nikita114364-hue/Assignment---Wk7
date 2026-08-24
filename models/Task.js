const mongoose = require('mongoose'); // Import Mongoose to define the task schema.

const taskSchema = new mongoose.Schema( // Define the shape and validation rules for each task.
  {
    title: { // Store the required task title.
      type: String, // Accept title text only.
      required: [true, 'Title is required'], // Reject missing titles.
      trim: true, // Remove whitespace around the title.
      maxlength: [100, 'Title cannot exceed 100 characters'], // Enforce the assignment limit.
    },
    description: { // Store optional supporting information.
      type: String, // Accept description text only.
      trim: true, // Remove unnecessary surrounding whitespace.
    },
    isCompleted: { // Store the completion state.
      type: Boolean, // Accept true or false values.
      default: false, // New tasks start incomplete.
    },
    dueDate: { // Store an optional due date.
      type: Date, // Convert valid date values into MongoDB dates.
    },
  },
  { timestamps: true } // Automatically maintain createdAt and updatedAt.
);

module.exports = mongoose.model('Task', taskSchema); // Export the model used by the controller.
