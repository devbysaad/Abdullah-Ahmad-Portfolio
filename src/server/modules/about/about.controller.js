const service = require('./about.service');

const getAbout = async (_req, res, next) => {
  try {
    const about = await service.getAbout();
    return res.json(about);
  } catch (err) {
    return next(err);
  }
};

const updateAbout = async (req, res, next) => {
  try {
    const about = await service.updateAbout(req.validated.body);
    return res.json(about);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getAbout, updateAbout };
