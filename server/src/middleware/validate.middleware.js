const validate = (schema) => (req, _res, next) => {
  try {
    req.validated = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

module.exports = { validate };
