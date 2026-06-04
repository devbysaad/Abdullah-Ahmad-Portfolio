import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import {
  DEFAULT_HIGHLIGHTS,
  DEFAULT_WHY_ME_INTRO,
} from '../content/aak.constants';

export default function WhyMe({ about }) {
  const intro = about?.whyMeIntro?.trim() || DEFAULT_WHY_ME_INTRO;
  const highlights = useMemo(() => {
    const fromApi = about?.highlights?.filter((h) => h?.title);
    return fromApi?.length ? fromApi : DEFAULT_HIGHLIGHTS;
  }, [about]);

  return (
    <section
      id="why-me"
      className="section-pad why-me-section bg-[#f4f4f4]"
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
          <p className="why-me-label">WHY ME</p>
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
          {highlights.map((item, i) => (
            <motion.li
              key={item.title}
              custom={i}
              variants={fadeIn}
              className="why-me-card"
            >
              <span className="why-me-card-index">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="why-me-card-title">{item.title}</h3>
              <p className="why-me-card-desc">{item.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
