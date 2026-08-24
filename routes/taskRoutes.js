const express = require('express'); // Import Express for route creation.
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController'); // Import task actions.

const router = express.Router(); // Create an isolated router for task endpoints.

router.route('/').post(createTask).get(getTasks); // Register create and collection-read operations.
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask); // Register single-task operations.

module.exports = router; // Export the router for server.js.
