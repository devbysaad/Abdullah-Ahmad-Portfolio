const service = require('./experience.service');

const getExperience = async (_req, res, next) => {
  try {
    return res.json(await service.listExperience());
  } catch (err) {
    return next(err);
  }
};

const createExperience = async (req, res, next) => {
  try {
    const item = await service.createExperience(req.validated.body);
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
};

const updateExperience = async (req, res, next) => {
  try {
    const item = await service.updateExperience(req.params.id, req.validated.body);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

const removeExperience = async (req, res, next) => {
  try {
    const item = await service.deleteExperience(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getExperience, createExperience, updateExperience, removeExperience };
