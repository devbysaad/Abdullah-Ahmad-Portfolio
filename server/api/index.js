const serverless = require('serverless-http');
const { app } = require('../src/app');
const { connectDatabase } = require('../src/config/database');

const handler = serverless(app, {
  binary: ['image/*', 'application/octet-stream'],
});

module.exports = async (req, res) => {
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
