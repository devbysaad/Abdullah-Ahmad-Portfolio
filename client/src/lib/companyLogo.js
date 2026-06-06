/** Domains with no reliable public favicon — skip remote requests, use wordmark/initials. */
/** Domains with no reliable public favicon — use initials/wordmark only (no network 404s). */
const NO_REMOTE_LOGO = new Set(['dropella.io', 'npclabs.org']);

/** Logo sources — direct site favicon, then DuckDuckGo (no Google/gstatic — avoids 404 noise). */
export function companyLogoSources(domain) {
  if (!domain) return [];

  const host = domain.replace(/^https?:\/\//, '').split('/')[0];
  if (NO_REMOTE_LOGO.has(host)) return [];

  return [
    `https://${host}/favicon.ico`,
    `https://icons.duckduckgo.com/ip3/${host}.ico`,
  ];
}

export function companyInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
