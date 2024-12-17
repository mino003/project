import logger from '../utils/logger';
import { AppError } from '../utils/errors';

function errorHandler(err, req, res, next) {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  // Handle Stripe errors
  if (err.type && err.type.startsWith('Stripe')) {
    return res.status(402).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      status: 'error',
      message: err.message
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }

  // Default error
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
}

export default errorHandler;
