import { DEFAULT_PROFILE_IMAGE } from '../content/aak.constants';

export function isCloudinaryUrl(url) {
  return Boolean(url?.includes('res.cloudinary.com'));
}

/**
 * Resolve image URLs from the API: Cloudinary/CDN https URLs or paths in public.
 */
export function resolveMediaUrl(url, fallback = '') {
  const value = url?.trim();
  if (!value) return fallback;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('//')) return `https:${value}`;
  if (value.startsWith('/')) return value;
  return `/${value}`;
}

/** Hero, drumroll, booking — local PNG wins over legacy Cloudinary seed (.avif). */
export function getProfileImageUrl(apiUrl) {
  const value = apiUrl?.trim();
  if (!value) return DEFAULT_PROFILE_IMAGE;
  if (
    value.includes('abdullah-profile') ||
    value.includes('abdullah.avif') ||
    value.endsWith('.avif')
  ) {
    return DEFAULT_PROFILE_IMAGE;
  }
  return resolveMediaUrl(value, DEFAULT_PROFILE_IMAGE);
}
