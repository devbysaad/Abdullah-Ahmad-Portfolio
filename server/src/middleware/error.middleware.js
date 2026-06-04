const { error } = require('../utils/response');

const errorMiddleware = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;

  if (err?.name === 'ZodError') {
    return error(res, 'Validation failed', 400, err.issues);
  }

  if (err?.name === 'MulterError') {
    statusCode = 400;
    const message =
      err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 8 MB or smaller' : err.message;
    return error(res, message, statusCode);
  }

  return error(res, err.message || 'Internal server error', statusCode);
};

module.exports = { errorMiddleware };
