/** Abdullah profile photo (public/abdullah.png) */
export const DEFAULT_PROFILE_IMAGE = '/abdullah.png';

/**
 * Resolve image URLs from MongoDB media API, absolute URLs, or public assets.
 */
export function resolveMediaUrl(url, fallback = '') {
  const value = url?.trim();
  if (!value) return fallback;

  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('//')) return `https:${value}`;

  // Same-origin API media + public static files
  if (value.startsWith('/api/media/') || value.startsWith('/')) return value;

  return `/${value}`;
}

export function getProfileImageUrl(apiUrl) {
  return resolveMediaUrl(apiUrl, DEFAULT_PROFILE_IMAGE);
}
