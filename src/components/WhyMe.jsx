import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';

export default function WhyMe({ about, site }) {
  const intro = about?.whyMeIntro?.trim() ?? '';
  const highlights = useMemo(
    () => about?.highlights?.filter((h) => h?.title) ?? [],
    [about],
  );
  const title = site?.sections?.whyMeTitle || 'WHY ME ?';

  return (
    <section
      id="why-me"
      className="section-pad why-me-section bg-bg"
      data-name="why-me-section"
    >
      <div className="content-wrap max-w-[1280px]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="why-me-header"
        >
          <p className="why-me-label">{title}</p>
          <h2 className="why-me-title">Why work with me?</h2>
          <p className="why-me-intro">{intro}</p>
        </motion.header>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="why-me-grid"
        >
          {highlights.map((item) => (
            <li key={item.title} className="why-me-card">
              <h3 className="why-me-card-title">{item.title}</h3>
              <p className="why-me-card-desc">{item.description}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
