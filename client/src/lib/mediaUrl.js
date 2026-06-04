export function isCloudinaryUrl(url) {
  return Boolean(url?.includes('res.cloudinary.com'));
}

/**
 * Resolve image URLs from the API: Cloudinary/CDN https URLs or /abdullah.avif in public.
 */
export function resolveMediaUrl(url, fallback = '') {
  const value = url?.trim();
  if (!value) return fallback;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('//')) return `https:${value}`;
  if (value.startsWith('/')) return value;
  return `/${value}`;
}
