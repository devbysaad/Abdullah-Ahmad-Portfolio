const express = require('express');
const controller = require('./testimonial.controller');

const testimonialRouter = express.Router();
testimonialRouter.get('/', controller.getTestimonials);

module.exports = { testimonialRouter };
