const mongoose = require('mongoose'); // Import Mongoose for ObjectId validation.
const Task = require('../models/Task'); // Import the task model for database operations.

const validateTaskId = (id, response) => { // Validate route IDs before querying MongoDB.
  if (!mongoose.Types.ObjectId.isValid(id)) { // Check whether the ID has MongoDB ObjectId format.
    response.status(400).json({ message: 'Invalid task ID' }); // Return a clear client error.
    return false; // Tell the caller not to continue.
  }
  return true; // Allow a valid ID to continue.
};

const createTask = async (request, response, next) => { // Create and save one task.
  try {
    const task = await Task.create(request.body); // Let Mongoose validate and persist the submitted data.
    return response.status(201).json(task); // Return the created resource with HTTP 201.
  } catch (error) {
    return next(error); // Forward errors to the global handler.
  }
};

const getTasks = async (request, response, next) => { // Return all tasks or filtered tasks.
  try {
    const { completed } = request.query; // Read the optional completed query parameter.
    const filter = {}; // Start with no filter so the default returns all tasks.

    if (completed !== undefined) { // Validate the filter only when it was supplied.
      if (completed !== 'true' && completed !== 'false') { // Accept only the two documented values.
        return response.status(400).json({ message: 'completed must be either true or false' }); // Reject invalid filters.
      }
      filter.isCompleted = completed === 'true'; // Convert the string query value into a Boolean.
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 }); // Query tasks newest first.
    return response.status(200).json(tasks); // Return the collection.
  } catch (error) {
    return next(error); // Forward database errors safely.
  }
};

const getTaskById = async (request, response, next) => { // Return one task by ID.
  try {
    if (!validateTaskId(request.params.id, response)) return; // Stop when the route ID is invalid.
    const task = await Task.findById(request.params.id); // Look up the task in MongoDB.
    if (!task) return response.status(404).json({ message: 'Task not found' }); // Handle a valid but unknown ID.
    return response.status(200).json(task); // Return the matching task.
  } catch (error) {
    return next(error); // Forward unexpected errors.
  }
};

const updateTask = async (request, response, next) => { // Apply a partial update to one task.
  try {
    if (!validateTaskId(request.params.id, response)) return; // Stop when the route ID is invalid.
    const task = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }); // Update only supplied fields.
    if (!task) return response.status(404).json({ message: 'Task not found' }); // Handle an unknown task.
    return response.status(200).json(task); // Return the complete updated document.
  } catch (error) {
    return next(error); // Forward validation and database errors.
  }
};

const deleteTask = async (request, response, next) => { // Permanently remove one task.
  try {
    if (!validateTaskId(request.params.id, response)) return; // Stop when the route ID is invalid.
    const task = await Task.findByIdAndDelete(request.params.id); // Delete the matching document.
    if (!task) return response.status(404).json({ message: 'Task not found' }); // Handle an unknown task.
    return response.status(200).json({ message: 'Task deleted successfully' }); // Confirm deletion.
  } catch (error) {
    return next(error); // Forward unexpected errors.
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask }; // Export controller actions for the routes.
