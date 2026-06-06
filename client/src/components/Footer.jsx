import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { fadeIn, viewportOnce } from '../lib/motion';
import FooterClock from './footer/FooterClock';
import FooterLikeButton from './footer/FooterLikeButton';
import FooterSocialLinks from './footer/FooterSocialLinks';
import {
  DEFAULT_CONTACT_EMAIL,
  FOOTER_BLURB,
  FOOTER_CONTACT_LABEL,
  FOOTER_CTA_LABEL,
  FOOTER_CTA_TEXT,
  FOOTER_HEADLINE,
  FOOTER_LIKE_LABEL,
  FOOTER_WATERMARK,
  SOCIAL_LINKS,
} from './footer/footer.constants';

export default function Footer({ about }) {
  const email = about?.contactEmail?.trim() || DEFAULT_CONTACT_EMAIL;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer section-pad" data-name="site-footer">
      <div className="content-wrap site-footer-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="footer-panel"
          data-name="footer-panel"
        >
          <p className="footer-watermark" aria-hidden="true">
            {FOOTER_WATERMARK}
          </p>

          <div className="footer-grid">
            <div className="footer-col footer-col--intro" data-name="footer-intro">
              <h2 className="footer-headline">
                {FOOTER_HEADLINE.before}
                <span className="footer-headline-accent">{FOOTER_HEADLINE.accent}</span>
                {FOOTER_HEADLINE.after}
              </h2>
              <p className="footer-blurb">{FOOTER_BLURB}</p>
              <FooterSocialLinks links={SOCIAL_LINKS} />
            </div>

            <div className="footer-col footer-col--work" data-name="footer-work">
              <p className="footer-field-label">{FOOTER_CTA_LABEL}</p>
              <a href="#contact" className="footer-cta">
                <span className="footer-cta-text">{FOOTER_CTA_TEXT}</span>
                <span className="footer-cta-arrow" aria-hidden="true">
                  <ArrowRight size={18} strokeWidth={2.25} />
                </span>
              </a>

              <p className="footer-field-label footer-field-label--spaced">{FOOTER_CONTACT_LABEL}</p>
              <a href={`mailto:${email}`} className="footer-email">
                {email}
              </a>
            </div>

            <div className="footer-col footer-col--like" data-name="footer-like">
              <p className="footer-field-label">{FOOTER_LIKE_LABEL}</p>
              <FooterLikeButton />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="footer-bar"
          data-name="footer-bar"
        >
          <span className="footer-bar-copy">© {year}</span>
          <FooterClock />
        </motion.div>
      </div>
    </footer>
  );
}
