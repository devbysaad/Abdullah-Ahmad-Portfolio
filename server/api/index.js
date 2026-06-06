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
    console.error('API bootstrap failed:', err.message);
    setCorsHeaders(req, res, env.clientUrls, corsOptions);
    if (!res.headersSent) {
      res.status(503).json({
        success: false,
        message: 'Service unavailable',
        detail: process.env.VERCEL ? undefined : err.message,
      });
    }
  }
};
