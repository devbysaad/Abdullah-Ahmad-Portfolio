/**
 * Frontend environment — Next.js public vars only.
 */

function normalizeApiBase(value) {
  const raw = value?.trim();
  if (!raw) return '/api';
  let base = raw.replace(/\/$/, '');
  if (/^https?:\/\//i.test(base) && !base.endsWith('/api')) {
    base = `${base}/api`;
  }
  return base;
}

const apiBase = normalizeApiBase(
  process.env.NEXT_PUBLIC_API_URL || process.env.VITE_API_URL
);
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') ||
  process.env.VITE_SITE_URL?.trim().replace(/\/$/, '') ||
  '';

export const env = {
  apiBase,
  siteUrl,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
};
