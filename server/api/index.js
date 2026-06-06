const serverless = require('serverless-http');
const { app } = require('../src/app');
const { connectDatabase } = require('../src/config/database');
const { env } = require('../src/config/env');

const handler = serverless(app, {
  binary: ['image/*', 'application/octet-stream'],
});

function applyCors(req, res) {
  const origin = req.headers.origin;

  if (!origin) return;

  const allowed =
    env.clientUrls.includes(origin) || (!env.isProduction && origin);

  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
}

module.exports = async (req, res) => {
  applyCors(req, res);

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
    if (!res.headersSent) {
      res.status(503).json({
        success: false,
        message: 'Service unavailable',
        detail: process.env.VERCEL ? undefined : err.message,
      });
    }
  }
};
