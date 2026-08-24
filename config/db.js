const mongoose = require('mongoose'); // Import Mongoose so the application can connect to MongoDB.

const connectDB = async () => { // Define a reusable asynchronous database connection function.
  const mongoUri = process.env.MONGODB_URI; // Read the connection string from the environment.

  if (!mongoUri) { // Stop early when the required configuration is missing.
    throw new Error('MONGODB_URI is not defined in the environment.'); // Provide a useful startup error.
  }

  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 }); // Try MongoDB for five seconds before reporting a connection failure.
  console.log('MongoDB connected successfully.'); // Confirm a successful connection in development.
};

module.exports = connectDB; // Export the connection function for server.js.
