const { MESSAGES } = require('../config/constants');
const { sendError } = require('../utils/response.util');


//Global error handler middleware
 
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma errors
  if (err.code === 'P2002') {
    return sendError(res, 'A record with this value already exists', 409);
  }

  if (err.code === 'P2025') {
    return sendError(res, 'Record not found', 404);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 401);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    return sendError(res, err.message, 400);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || MESSAGES.ERROR;

  return sendError(res, message, statusCode);
};

//404 Not Found handler
const notFoundHandler = (req, res) => {
  return sendError(res, `Route ${req.originalUrl} not found`, 404);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};

