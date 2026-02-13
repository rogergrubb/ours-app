// Global error handler — catches all unhandled errors
// Owner: Chief Programmer

export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  // Known error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message, details: err.details });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Authentication required' });
  }
  if (err.name === 'ForbiddenError') {
    return res.status(403).json({ error: 'Access denied' });
  }
  if (err.name === 'NotFoundError') {
    return res.status(404).json({ error: err.message || 'Not found' });
  }

  // Default: 500
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
  });
};

// Custom error classes
export class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class UnauthorizedError extends Error {
  constructor(message = 'Authentication required') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Access denied') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}
