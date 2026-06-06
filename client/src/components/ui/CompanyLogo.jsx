import { useMemo, useState } from 'react';
import { companyInitials, companyLogoSources } from '../../lib/companyLogo';

/**
 * Company logo with favicon fallback chain (Google → site favicon → DuckDuckGo).
 * Falls back to initials badge, then optional text wordmark.
 */
export default function CompanyLogo({
  name,
  domain,
  localLogo,
  className = '',
  badgeClassName = '',
  showInitials = true,
  showWordmark = false,
  wordmarkClassName = 'brand-logo-wordmark',
}) {
  const sources = useMemo(
    () => (localLogo ? [localLogo] : companyLogoSources(domain)),
    [domain, localLogo]
  );
  const [sourceIndex, setSourceIndex] = useState(0);

  const src = sources[sourceIndex];
  const exhausted = !src || sourceIndex >= sources.length;

  if (exhausted) {
    if (showWordmark) {
      return <span className={wordmarkClassName}>{name}</span>;
    }
    if (showInitials) {
      return (
        <span className={`company-logo-initials ${badgeClassName}`} aria-hidden="true">
          {companyInitials(name)}
        </span>
      );
    }
    return null;
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setSourceIndex((i) => i + 1)}
    />
  );
}
