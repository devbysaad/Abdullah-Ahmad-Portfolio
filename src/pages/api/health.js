import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const REQUIRED_FOR_SITE = ['MONGODB_URI'];
const REQUIRED_FOR_EMAIL = ['RESEND_API_KEY', 'RESEND_FROM_EMAIL', 'RESEND_TO_EMAIL'];

function missingVars(names) {
  return names.filter((name) => !process.env[name]?.trim());
}

/** Lightweight health check — no Express bridge */
export default async function handler(_req, res) {
  const missingSite = missingVars(REQUIRED_FOR_SITE);
  const missingEmail = missingVars(REQUIRED_FOR_EMAIL);
  const clientUrl =
    process.env.CLIENT_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');

  if (missingSite.length) {
    return res.status(503).json({
      ok: false,
      mongo: false,
      message: `Missing: ${missingSite.join(', ')}`,
      missing: { site: missingSite, email: missingEmail },
      clientUrl: clientUrl || null,
    });
  }

  const mongoUri = process.env.MONGODB_URI.trim();
  if (/localhost|127\.0\.0\.1/.test(mongoUri) && process.env.VERCEL) {
    return res.status(503).json({
      ok: false,
      mongo: false,
      message: 'MONGODB_URI points to localhost — use MongoDB Atlas on Vercel',
      missing: { site: [], email: missingEmail },
      clientUrl: clientUrl || null,
    });
  }

  try {
    const { connectDatabase } = require('../../server/config/database');
    await connectDatabase();
    const mongo = require('mongoose').connection.readyState === 1;

    return res.status(200).json({
      ok: true,
      mongo,
      resend: missingEmail.length === 0,
      env: process.env.NODE_ENV || 'development',
      onVercel: Boolean(process.env.VERCEL),
      clientUrl: clientUrl || null,
      missing: { site: [], email: missingEmail },
      hint:
        missingEmail.length > 0
          ? 'Booking form needs RESEND_* env vars'
          : mongo
            ? 'All systems go — run npm run seed if sections are empty'
            : 'MongoDB connecting…',
    });
  } catch (err) {
    return res.status(503).json({
      ok: false,
      mongo: false,
      message: err?.message || 'Database unavailable',
      missing: { site: missingSite, email: missingEmail },
      clientUrl: clientUrl || null,
      hint: 'Check Atlas Network Access allows 0.0.0.0/0 and credentials in MONGODB_URI',
    });
  }
}
