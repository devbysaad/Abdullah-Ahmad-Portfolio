const serviceService = require('./service.service');

const getServices = async (_req, res, next) => {
  try {
    return res.json(await serviceService.listServices());
  } catch (err) {
    return next(err);
  }
};

const createService = async (req, res, next) => {
  try {
    const item = await serviceService.createService(req.validated.body);
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
};

const updateService = async (req, res, next) => {
  try {
    const item = await serviceService.updateService(req.params.id, req.validated.body);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

const removeService = async (req, res, next) => {
  try {
    const item = await serviceService.deleteService(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getServices, createService, updateService, removeService };
