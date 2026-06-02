const success = (res, data = null, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const error = (res, message = 'Something went wrong', statusCode = 500, details = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};

const paginated = (
  res,
  data = [],
  pagination = { page: 1, limit: 10, total: data.length, totalPages: 1 },
  message = 'Success',
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination,
  });
};

module.exports = { success, error, paginated };
