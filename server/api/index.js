const serverless = require('serverless-http');
const { app } = require('../src/app');
const { connectDatabase } = require('../src/config/database');
const { env } = require('../src/config/env');
const { setCorsHeaders } = require('../src/lib/corsOrigins');

const handler = serverless(app, {
  binary: ['image/*', 'application/octet-stream'],
});

const corsOptions = { isProduction: env.isProduction };

module.exports = async (req, res) => {
  setCorsHeaders(req, res, env.clientUrls, corsOptions);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  try {
    await connectDatabase();
    return handler(req, res);
  } catch (err) {
    const isDbError =
      err.name === 'MongooseServerSelectionError' ||
      /Mongo|MONGODB|ECONNREFUSED|ENOTFOUND|timed out/i.test(err.message || '');

    console.error('API bootstrap failed:', err.message);

    setCorsHeaders(req, res, env.clientUrls, corsOptions);
    if (!res.headersSent) {
      res.status(503).json({
        success: false,
        message: 'Service unavailable',
        code: isDbError ? 'DATABASE_CONNECTION_FAILED' : 'BOOTSTRAP_FAILED',
        hint: isDbError
          ? 'Set MONGODB_URI to a cloud MongoDB Atlas URI on the Vercel backend project (not localhost). Allow 0.0.0.0/0 in Atlas Network Access.'
          : 'Check required server env vars: MONGODB_URI, JWT_SECRET, ADMIN_PASSWORD, CLIENT_URL.',
        detail: process.env.VERCEL ? undefined : err.message,
      });
    }
  }
};
