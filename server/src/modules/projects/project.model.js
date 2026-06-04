const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    /** One-line headline on Selected work */
    summary: { type: String, default: '' },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    imageUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    badge: { type: String, default: '' },
    badgeSub: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project };
