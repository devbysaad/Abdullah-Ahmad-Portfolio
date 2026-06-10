import { resolveMediaUrl } from '../../lib/mediaUrl';

/** Testimonials section chrome — content lives in MongoDB */
export const TESTIMONIALS_LABEL = 'TESTIMONIALS';
export const TESTIMONIALS_TITLE = 'Love letters';

export const TESTIMONIAL_FLAG_BASE =
  'https://purecatamphetamine.github.io/country-flag-icons/3x2';

export function testimonialFlagUrl(countryCode) {
  const code = countryCode?.trim().toUpperCase();
  if (!code) return '';
  return `${TESTIMONIAL_FLAG_BASE}/${code}.svg`;
}

export function resolveTestimonialAvatar(url) {
  return resolveMediaUrl(url, '');
}

export function normalizeTestimonials(testimonials) {
  return [...(testimonials || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function formatTestimonialRole(role, company) {
  if (!company?.trim()) return role;
  return `${role}, ${company}`;
}

export function splitTestimonialParagraphs(text) {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
