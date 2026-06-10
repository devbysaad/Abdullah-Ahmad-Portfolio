const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    filename: { type: String, default: '' },
    mimeType: { type: String, required: true },
    size: { type: Number, default: 0 },
    folder: { type: String, default: 'images' },
    data: { type: Buffer, required: true, select: false },
  },
  { timestamps: true }
);

mediaSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.data;
    return ret;
  },
});

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema);

module.exports = { Media };
