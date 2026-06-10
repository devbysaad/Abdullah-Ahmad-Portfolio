/** Normalize origin/URL for comparison (no trailing slash). */
function normalizeOrigin(value) {
  return value?.trim().replace(/\/$/, '') || '';
}

function parseClientUrls(raw) {
  return (raw || 'http://localhost:5173')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

/**
 * Allow exact CLIENT_URL matches + Vercel preview deploys for the same project slug.
 * e.g. CLIENT_URL=https://foo.vercel.app also allows https://foo-git-branch-team.vercel.app
 */
function isAllowedOrigin(origin, clientUrls, { allowDev = false, isProduction = false } = {}) {
  if (!origin) return true;

  const normalized = normalizeOrigin(origin);

  if (clientUrls.includes(normalized)) return true;

  for (const allowed of clientUrls) {
    if (!allowed.includes('.vercel.app')) continue;
    const slug = allowed.replace(/^https?:\/\//, '').split('.vercel.app')[0];
    if (slug && normalized.includes(slug)) return true;
  }

  if (!isProduction || allowDev) return true;

  return false;
}

function setCorsHeaders(req, res, clientUrls, options = {}) {
  const origin = req.headers.origin;
  if (!origin) return;

  if (isAllowedOrigin(origin, clientUrls, options)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
}

module.exports = { normalizeOrigin, parseClientUrls, isAllowedOrigin, setCorsHeaders };
