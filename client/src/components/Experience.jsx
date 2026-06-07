import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { fadeIn, viewportOnce } from '../lib/motion';
import npcLabsLogo from '../assets/brands/npc-labs.png';
import { EXPERIENCE_COMPANIES } from '../content/aak.constants';
import CompanyLogo from './ui/CompanyLogo';

const COMPANY_LOGOS = {
  'npc-labs': npcLabsLogo,
};

function CompanyPill({ name, domain, linkedin, logoKey }) {
  return (
    <a
      className="exp-company-pill"
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name} on LinkedIn in a new tab`}
    >
      <CompanyLogo
        name={name}
        domain={domain}
        localLogo={COMPANY_LOGOS[logoKey]}
        className="exp-company-pill-logo"
        badgeClassName="exp-company-pill-logo exp-company-pill-logo--initials"
        showInitials
      />
      <span className="exp-company-pill-label">{name}</span>
      <span className="brand-logo-tooltip" role="tooltip">
        {name}
        <span className="exp-company-pill-tooltip-hint">
          View on LinkedIn
          <ArrowUpRight size={11} strokeWidth={2.5} />
        </span>
        <span className="brand-logo-tooltip-arrow" aria-hidden="true" />
      </span>
    </a>
  );
}

export default function Experience({ experience = [] }) {
  const items = [...experience].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <section
      id="experience"
      className="section-pad experience-section bg-white"
      data-name="experience-section"
    >
      <div className="content-wrap max-w-[1280px]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="experience-header"
        >
          <p className="experience-label">EXPERIENCE</p>
          <h2 className="experience-title">Where I&apos;ve shipped</h2>
          <p className="experience-sub">4+ years building for startups and industry-leading platforms.</p>

          <div className="experience-companies" data-name="experience-company-pills">
            {EXPERIENCE_COMPANIES.map((company) => (
              <CompanyPill
                key={company.key}
                name={company.name}
                domain={company.domain}
                linkedin={company.linkedin}
                logoKey={company.key}
              />
            ))}
          </div>
        </motion.header>

        <div className="experience-list border-t border-border-light">
          {items.map((item, i) => (
            <motion.article
              key={item._id}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeIn}
              custom={i}
              className="experience-row"
            >
              <div className="experience-row-main">
                <p className="experience-company">{item.company}.</p>
                <h3 className="experience-role">{item.role}</h3>
                {item.description && (
                  <p className="experience-desc">{item.description}</p>
                )}
              </div>
              <div className="experience-row-meta">
                <p className="experience-period">{item.period}</p>
                {item.location && <p className="experience-location">{item.location}</p>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
