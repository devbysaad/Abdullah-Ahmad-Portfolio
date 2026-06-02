const express = require('express');
const controller = require('./testimonial.controller');
const { validate } = require('../../middleware/validate.middleware');
const {
  createTestimonialSchema,
  updateTestimonialSchema,
} = require('./testimonial.validation');

const publicTestimonialRouter = express.Router();
publicTestimonialRouter.get('/', controller.getTestimonials);

const adminTestimonialRouter = express.Router();
adminTestimonialRouter.get('/', controller.getTestimonials);
adminTestimonialRouter.post('/', validate(createTestimonialSchema), controller.createTestimonial);
adminTestimonialRouter.put('/:id', validate(updateTestimonialSchema), controller.updateTestimonial);
adminTestimonialRouter.delete('/:id', controller.removeTestimonial);

module.exports = { publicTestimonialRouter, adminTestimonialRouter };
