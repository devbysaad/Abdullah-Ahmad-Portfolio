const { Testimonial } = require('./testimonial.model');

const listTestimonials = () => Testimonial.find().sort({ order: 1, createdAt: 1 });
const createTestimonial = (payload) => Testimonial.create(payload);
const updateTestimonial = (id, payload) =>
  Testimonial.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
const deleteTestimonial = (id) => Testimonial.findByIdAndDelete(id);

module.exports = { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
