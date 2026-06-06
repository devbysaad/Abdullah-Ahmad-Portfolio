const icons = {
  youtube: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9.5v5l5.5-2.5L10 9.5z" fill="currentColor" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="9" width="4" height="12" fill="currentColor" />
      <circle cx="4" cy="4" r="2" fill="currentColor" />
      <path
        d="M10 9h4v1.6c.7-1.2 2-2 3.6-2 3.2 0 4.4 2.1 4.4 5.4V21h-4v-6.8c0-1.6-.3-2.8-2.2-2.8-1.1 0-1.8.7-2.1 1.5-.1.2-.1.5-.1.8V21h-4V9z"
        fill="currentColor"
      />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 18 4.77 5.07 5.07 0 0 0 17.91 1S16.73.65 13 2.48a13.38 13.38 0 0 0-7 0C2.27.65 1.09 1 1.09 1A5.07 5.07 0 0 0 1 4.77 5.44 5.44 0 0 0 3.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  medium: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="6" cy="12" rx="4" ry="7" fill="currentColor" />
      <ellipse cx="13.5" cy="12" rx="2.5" ry="6" fill="currentColor" />
      <ellipse cx="19" cy="12" rx="2" ry="5" fill="currentColor" />
    </svg>
  ),
  upwork: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 20V8.5c0-1.1.9-2 2-2h1.2c2.2 0 4 1.8 4 4v9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 14h5.5c1.4 0 2.5 1.1 2.5 2.5S13.9 19 12.5 19H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 20V10l3-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  fiverr: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.5 15.5V8.5h2.2c1.6 0 2.8 1 2.8 2.4 0 1.1-.6 2-1.6 2.4l2.1 2.2H11l-2.5-2.7v2.7H8.5z"
        fill="currentColor"
      />
    </svg>
  ),
};

export default function FooterSocialLinks({ links }) {
  const items = links.filter((l) => l.href?.trim());

  if (!items.length) return null;

  return (
    <nav className="footer-social" data-name="footer-social" aria-label="Social links">
      {items.map(({ key, href, label }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label={label}
        >
          {icons[key]}
        </a>
      ))}
    </nav>
  );
}
