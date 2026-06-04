const { env } = require('../../config/env');
const { isCloudinaryConfigured } = require('../../config/cloudinary');
const { uploadBuffer } = require('../../utils/cloudinaryUpload');

const uploadImage = async (req, res, next) => {
  try {
    if (!isCloudinaryConfigured()) {
      const err = new Error(
        'Cloudinary is not configured. Add CLOUDINARY_* variables to server/.env'
      );
      err.statusCode = 503;
      throw err;
    }

    if (!req.file) {
      const err = new Error('No image file provided (field name: file)');
      err.statusCode = 400;
      throw err;
    }

    const subfolder = (req.body?.folder || 'images').replace(/[^a-zA-Z0-9_-]/g, '');
    const folder = `${env.cloudinary.folder}/${subfolder}`;

    const result = await uploadBuffer(req.file.buffer, { folder });

    return res.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (err) {
    if (err.message?.includes('Only JPEG')) err.statusCode = 400;
    return next(err);
  }
};

module.exports = { uploadImage };
