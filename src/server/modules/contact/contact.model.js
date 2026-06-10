const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['message', 'appointment'], default: 'message' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    duration: { type: Number, default: null },
    appointmentDate: { type: String, default: '' },
    appointmentTime: { type: String, default: '' },
    timezone: { type: String, default: '' },
  },
  { timestamps: true }
);

const ContactMessage =
  mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);

module.exports = { ContactMessage };
