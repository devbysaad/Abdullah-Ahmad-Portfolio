const path = require('path');
const dotenv = require('dotenv');

/** Preserve NODE_ENV from the shell (e.g. npm start) — do not let .env override it */
const runtimeNodeEnv = process.env.NODE_ENV;

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
  override: false,
});

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET', 'ADMIN_PASSWORD'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const nodeEnv = runtimeNodeEnv || process.env.NODE_ENV || 'development';

/** Comma-separated in CLIENT_URL for preview + production domains */
const clientUrls = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const isLocalClient = clientUrls.some((u) => /localhost|127\.0\.0\.1/.test(u));

const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  /** Secure cookies in production unless testing locally or COOKIE_SECURE=false */
  cookieSecure:
    process.env.COOKIE_SECURE === 'true' ||
    (nodeEnv === 'production' && process.env.COOKIE_SECURE !== 'false' && !isLocalClient),
  port: Number(process.env.PORT || 5001),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  adminPassword: process.env.ADMIN_PASSWORD,
  clientUrl: clientUrls[0] || 'http://localhost:5173',
  clientUrls,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    folder: process.env.CLOUDINARY_FOLDER || 'abdullah-portfolio',
  },
};

module.exports = { env };
