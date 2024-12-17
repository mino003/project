import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};

export const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new UnauthorizedError('Insufficient permissions'));
    }
    next();
  };
};