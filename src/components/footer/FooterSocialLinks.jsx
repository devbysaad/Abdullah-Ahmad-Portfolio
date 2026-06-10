import { SOCIAL_LINKS } from './footer.constants';
import { FooterSocialIcon } from './footerSocialIcons';

export default function FooterSocialLinks({ links = SOCIAL_LINKS }) {
  return (
    <nav className="footer-social" data-name="footer-social" aria-label="Social links">
      {links.map(({ key, href, label }) => {
        const url = href?.trim();

        if (!url) {
          return (
            <span
              key={key}
              className="footer-social-link footer-social-link--disabled"
              aria-label={`${label} (link coming soon)`}
              title={`${label} — add URL in footer.constants.js`}
            >
              <FooterSocialIcon platform={key} />
            </span>
          );
        }

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label={label}
          >
            <FooterSocialIcon platform={key} />
          </a>
        );
      })}
    </nav>
  );
}
