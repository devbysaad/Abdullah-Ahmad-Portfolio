/**
 * Frontend environment (Vite `VITE_*` only).
 * Safe to expose in the browser — never put JWT, admin password, or DB secrets here.
 */

function normalizeApiBase(value) {
  const raw = value?.trim();
  if (!raw) return '/api';

  let base = raw.replace(/\/$/, '');

  // Production URL must end with /api — routes are /api/projects, not /projects
  if (/^https?:\/\//i.test(base) && !base.endsWith('/api')) {
    base = `${base}/api`;
  }

  return base;
}

const apiBase = normalizeApiBase(import.meta.env.VITE_API_URL);
const siteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '') || '';

const trim = (key) => import.meta.env[key]?.trim() || '';

const EMAILJS_KEYS = [
  ['publicKey', 'VITE_EMAILJS_PUBLIC_KEY'],
  ['serviceId', 'VITE_EMAILJS_SERVICE_ID'],
  ['toEmail', 'VITE_EMAILJS_TO_EMAIL'],
  ['templateMessage', 'VITE_EMAILJS_TEMPLATE_MESSAGE'],
  ['templateAppointment', 'VITE_EMAILJS_TEMPLATE_APPOINTMENT'],
];

export const env = {
  apiBase,
  siteUrl,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  emailJs: {
    publicKey: trim('VITE_EMAILJS_PUBLIC_KEY'),
    serviceId: trim('VITE_EMAILJS_SERVICE_ID'),
    templateMessage: trim('VITE_EMAILJS_TEMPLATE_MESSAGE'),
    templateAppointment: trim('VITE_EMAILJS_TEMPLATE_APPOINTMENT'),
    toEmail: trim('VITE_EMAILJS_TO_EMAIL'),
  },
};

export function isEmailJsConfigured() {
  const { publicKey, serviceId, templateMessage, templateAppointment, toEmail } = env.emailJs;
  return Boolean(
    publicKey && serviceId && templateMessage && templateAppointment && toEmail
  );
}

/** Which .env keys are still missing (for dev setup banner). */
export function getEmailJsMissingVars() {
  return EMAILJS_KEYS.filter(([, envKey]) => !trim(envKey)).map(([, envKey]) => envKey);
}

if (env.isProd && !import.meta.env.VITE_API_URL?.trim()) {
  console.warn(
    '[env] VITE_API_URL is not set. API requests use "/api" on the same host. ' +
      'On Vercel, set VITE_API_URL to your hosted API (e.g. https://your-api.railway.app/api).'
  );
}

if (!isEmailJsConfigured()) {
  console.warn(
    '[env] EmailJS is not fully configured. Booking and contact forms are disabled until you set: ' +
      getEmailJsMissingVars().join(', ')
  );
}
