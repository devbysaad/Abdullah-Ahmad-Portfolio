const cloudinary = require('cloudinary').v2;
const { env } = require('./env');

let configured = false;

const isCloudinaryConfigured = () =>
  Boolean(env.cloudinary.cloudName && env.cloudinary.apiKey && env.cloudinary.apiSecret);

const ensureCloudinary = () => {
  if (!isCloudinaryConfigured()) {
    const err = new Error(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in server/.env'
    );
    err.statusCode = 503;
    throw err;
  }
  if (!configured) {
    cloudinary.config({
      cloud_name: env.cloudinary.cloudName,
      api_key: env.cloudinary.apiKey,
      api_secret: env.cloudinary.apiSecret,
      secure: true,
    });
    configured = true;
  }
  return cloudinary;
};

module.exports = { cloudinary, ensureCloudinary, isCloudinaryConfigured };
