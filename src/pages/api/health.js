import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** Lightweight health check — no Express bridge */
export default async function handler(_req, res) {
  try {
    const { connectDatabase } = require('../../server/config/database');
    await connectDatabase();
    const mongo = require('mongoose').connection.readyState === 1;

    return res.status(200).json({
      ok: true,
      mongo,
      env: process.env.NODE_ENV || 'development',
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      mongo: false,
      message: err?.message || 'Database unavailable',
    });
  }
}
