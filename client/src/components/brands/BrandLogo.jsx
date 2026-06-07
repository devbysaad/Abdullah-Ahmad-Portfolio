import CompanyLogo from '../ui/CompanyLogo';

/**
 * Brand strip logo — hover tooltip (company name) + website link.
 */
export default function BrandLogo({ name, domain, logo, badge = false, url }) {
  const imgClass = badge ? 'brand-logo-img brand-logo-img--badge' : 'brand-logo-img';

  const content = (
    <>
      <CompanyLogo
        name={name}
        domain={domain}
        localLogo={logo}
        className={imgClass}
        showWordmark
        wordmarkClassName="brand-logo-wordmark"
      />

      <span className="brand-logo-tooltip" role="tooltip">
        {name}
        <span className="brand-logo-tooltip-arrow" aria-hidden="true" />
      </span>
    </>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="brand-logo-chip brand-logo-chip--link"
        aria-label={`${name} — open website`}
        data-name={`brand-${name}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="brand-logo-chip" tabIndex={0} aria-label={name} data-name={`brand-${name}`}>
      {content}
    </div>
  );
}
