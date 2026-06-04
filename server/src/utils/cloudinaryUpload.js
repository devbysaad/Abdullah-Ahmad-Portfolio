const fs = require('fs');
const path = require('path');
const { ensureCloudinary } = require('../config/cloudinary');
const { env } = require('../config/env');

/**
 * Upload a buffer to Cloudinary. Returns secure_url.
 */
const uploadBuffer = (buffer, options = {}) => {
  const cld = ensureCloudinary();
  const folder = options.folder || env.cloudinary.folder;

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      resource_type: 'image',
      overwrite: Boolean(options.overwrite),
    };
    if (options.publicId) {
      uploadOptions.public_id = options.publicId;
    }

    const stream = cld.uploader.upload_stream(uploadOptions, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
};

const uploadFilePath = async (filePath, options = {}) => {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`);
  }
  const buffer = fs.readFileSync(resolved);
  return uploadBuffer(buffer, options);
};

/** Resolve profile URL for seed: env override → upload local public file → empty */
const resolveSeedProfileImageUrl = async () => {
  if (process.env.CLOUDINARY_PROFILE_URL?.trim()) {
    return process.env.CLOUDINARY_PROFILE_URL.trim();
  }

  const { isCloudinaryConfigured } = require('../config/cloudinary');
  if (!isCloudinaryConfigured()) return '';

  const candidates = [
    path.join(__dirname, '../../../client/public/abdullah.avif'),
  ];
  const local = candidates.find((p) => fs.existsSync(p));
  if (!local) return '';

  const result = await uploadFilePath(local, {
    folder: `${env.cloudinary.folder}/profile`,
    publicId: 'abdullah-profile',
    overwrite: true,
  });
  return result.secure_url;
};

module.exports = { uploadBuffer, uploadFilePath, resolveSeedProfileImageUrl };
