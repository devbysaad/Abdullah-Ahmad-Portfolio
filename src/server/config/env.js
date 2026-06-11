const path = require('path');
const dotenv = require('dotenv');

/** Preserve NODE_ENV from the shell — do not let .env override it */
const runtimeNodeEnv = process.env.NODE_ENV;

const envPaths = [
  path.resolve(process.cwd(), '.env.local'),
  path.resolve(process.cwd(), '.env'),
];

for (const envPath of envPaths) {
  dotenv.config({ path: envPath, override: false });
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const mongoUri = requireEnv('MONGODB_URI');
const clientUrlRaw = requireEnv('CLIENT_URL');
const resendApiKey = requireEnv('RESEND_API_KEY');
const resendFromEmail = requireEnv('RESEND_FROM_EMAIL');
const resendToEmail = requireEnv('RESEND_TO_EMAIL');

const nodeEnv = runtimeNodeEnv || process.env.NODE_ENV || 'development';
const onVercel = Boolean(process.env.VERCEL);

const { parseClientUrls } = require('../lib/corsOrigins');

const clientUrls = parseClientUrls(clientUrlRaw);

/** Auto-allow Vercel deployment URLs (production + preview) */
if (onVercel) {
  for (const key of ['VERCEL_URL', 'VERCEL_BRANCH_URL']) {
    const host = process.env[key]?.trim();
    if (!host) continue;
    const origin = host.startsWith('http') ? host.replace(/\/$/, '') : `https://${host}`;
    if (!clientUrls.includes(origin)) clientUrls.push(origin);
  }
}

const isLocalClient = clientUrls.some((u) => /localhost|127\.0\.0\.1/.test(u));

const env = {
  nodeEnv,
  onVercel,
  isProduction: nodeEnv === 'production' || onVercel,
  port: Number(process.env.PORT || 3000),
  mongoUri,
  clientUrl: clientUrls[0] || 'http://localhost:3000',
  clientUrls,
  isLocalClient,
  resend: {
    apiKey: resendApiKey,
    fromEmail: resendFromEmail,
    toEmail: resendToEmail,
  },
};

if (!globalThis.__portfolioEnvLogged) {
  globalThis.__portfolioEnvLogged = true;
  console.log('[env] loaded', {
    nodeEnv: env.nodeEnv,
    mongoUri: env.mongoUri?.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'),
    resendFrom: env.resend.fromEmail,
    resendTo: env.resend.toEmail,
    resendKey: env.resend.apiKey ? `${env.resend.apiKey.slice(0, 8)}…` : 'MISSING',
  });
}

module.exports = { env };
