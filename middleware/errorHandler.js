const errorHandler = (error, request, response, next) => { // Centralize errors from every route.
  console.error(error); // Log diagnostic details for the developer without exposing them to clients.

  if (error.name === 'ValidationError' || error.name === 'CastError') { // Handle Mongoose input errors.
    const message = error.name === 'CastError' ? 'Invalid data format' : Object.values(error.errors)[0].message; // Select a clean message.
    return response.status(400).json({ message }); // Tell the client that its request is invalid.
  }

  if (error.type === 'entity.parse.failed') { // Handle malformed JSON request bodies.
    return response.status(400).json({ message: 'Request body contains invalid JSON' }); // Return a safe client error.
  }

  return response.status(500).json({ message: 'Internal server error' }); // Hide stack traces for unexpected errors.
};

module.exports = errorHandler; // Export the middleware for server.js.
