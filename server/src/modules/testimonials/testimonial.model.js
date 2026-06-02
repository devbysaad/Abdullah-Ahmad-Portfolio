const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, default: '' },
    text: { type: String, required: true },
    avatar: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = { Testimonial };
