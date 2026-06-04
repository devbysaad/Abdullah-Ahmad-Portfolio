/**
 * Frontend environment (Vite `VITE_*` only).
 * Safe to expose in the browser — never put JWT, admin password, or DB secrets here.
 */

function normalizeApiBase(value) {
  const raw = value?.trim();
  if (!raw) return '/api';
  return raw.replace(/\/$/, '');
}

const apiBase = normalizeApiBase(import.meta.env.VITE_API_URL);
const siteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '') || '';

export const env = {
  apiBase,
  siteUrl,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};

if (env.isProd && !import.meta.env.VITE_API_URL?.trim()) {
  console.warn(
    '[env] VITE_API_URL is not set. API requests use "/api" on the same host. ' +
      'On Vercel, set VITE_API_URL to your hosted API (e.g. https://your-api.railway.app/api).'
  );
}
