const { error } = require('../utils/response');

const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;

  if (err?.name === 'ZodError') {
    return error(res, 'Validation failed', 400, err.issues);
  }

  return error(res, err.message || 'Internal server error', statusCode);
};

module.exports = { errorMiddleware };
