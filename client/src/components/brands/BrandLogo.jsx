import CompanyLogo from '../ui/CompanyLogo';

/**
 * Brand strip logo with custom animated tooltip on hover/focus.
 */
export default function BrandLogo({ name, domain, logo, badge = false }) {
  const imgClass = badge ? 'brand-logo-img brand-logo-img--badge' : 'brand-logo-img';

  return (
    <div className="brand-logo-chip" tabIndex={0} aria-label={name} data-name={`brand-${name}`}>
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
    </div>
  );
}
