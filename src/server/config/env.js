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

function optionalEnv(name) {
  return process.env[name]?.trim() || '';
}

const onVercel = Boolean(process.env.VERCEL);
const nodeEnv = runtimeNodeEnv || process.env.NODE_ENV || 'development';

const { normalizeMongoUri } = require('./mongo-uri');
const mongoUri = normalizeMongoUri(requireEnv('MONGODB_URI'));

if ((nodeEnv === 'production' || onVercel) && /localhost|127\.0\.0\.1/.test(mongoUri)) {
  throw new Error(
    'MONGODB_URI points to localhost — use a MongoDB Atlas connection string in Vercel environment variables',
  );
}

/** CLIENT_URL — auto-derive from Vercel host when not set */
let clientUrlRaw = optionalEnv('CLIENT_URL') || optionalEnv('NEXT_PUBLIC_SITE_URL');
if (!clientUrlRaw && onVercel) {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelHost) {
    clientUrlRaw = vercelHost.startsWith('http') ? vercelHost : `https://${vercelHost}`;
  }
}
if (!clientUrlRaw) {
  throw new Error('Missing required environment variable: CLIENT_URL');
}

/** Resend — only required when sending email, not for homepage SSR */
const resendApiKey = optionalEnv('RESEND_API_KEY');
const resendFromEmail = optionalEnv('RESEND_FROM_EMAIL');
const resendToEmail = optionalEnv('RESEND_TO_EMAIL');

const { parseClientUrls } = require('../lib/corsOrigins');

const clientUrls = parseClientUrls(clientUrlRaw);

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
    configured: Boolean(resendApiKey && resendFromEmail && resendToEmail),
  },
};

if (!globalThis.__portfolioEnvLogged) {
  globalThis.__portfolioEnvLogged = true;
  console.log('[env] loaded', {
    nodeEnv: env.nodeEnv,
    onVercel: env.onVercel,
    mongoUri: env.mongoUri?.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'),
    clientUrl: env.clientUrl,
    resendConfigured: env.resend.configured,
  });
}

module.exports = { env };
