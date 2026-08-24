require('dotenv').config(); // Load private configuration from .env before other startup work.
const express = require('express'); // Import Express to create the HTTP server.
const connectDB = require('./config/db'); // Import the MongoDB connection function.
const taskRoutes = require('./routes/taskRoutes'); // Import the task route module.
const errorHandler = require('./middleware/errorHandler'); // Import centralized error handling.

const app = express(); // Create the Express application.
const port = process.env.PORT || 5000; // Use the configured port or a safe default.

app.use(express.json()); // Parse JSON request bodies.
app.get('/', (request, response) => response.json({ message: 'Collaborative To-Do List API is running' })); // Provide a simple health response.
app.use('/api/tasks', taskRoutes); // Mount all task endpoints under the required base URL.
app.use((request, response) => response.status(404).json({ message: 'Route not found' })); // Handle unknown routes.
app.use(errorHandler); // Register the error handler after all routes.

const startServer = async () => { // Connect to MongoDB before accepting API traffic.
  try {
    await connectDB(); // Verify the database is available.
    app.listen(port, () => console.log(`Server running on port ${port}`)); // Start listening for requests.
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`); // Log startup failure details.
    process.exit(1); // Exit so deployment tools can detect the failure.
  }
};

startServer(); // Begin application startup.

module.exports = app; // Export the app for future automated tests.
