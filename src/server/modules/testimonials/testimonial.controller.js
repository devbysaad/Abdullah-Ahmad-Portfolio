const service = require('./testimonial.service');

const getTestimonials = async (_req, res, next) => {
  try {
    return res.json(await service.listTestimonials());
  } catch (err) {
    return next(err);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const item = await service.createTestimonial(req.validated.body);
    return res.status(201).json(item);
  } catch (err) {
    return next(err);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const item = await service.updateTestimonial(req.params.id, req.validated.body);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json(item);
  } catch (err) {
    return next(err);
  }
};

const removeTestimonial = async (req, res, next) => {
  try {
    const item = await service.deleteTestimonial(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

module.exports = { getTestimonials, createTestimonial, updateTestimonial, removeTestimonial };
