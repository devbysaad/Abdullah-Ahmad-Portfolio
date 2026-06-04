import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';

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
          <p className="experience-sub">2+ years building for startups and industry-leading platforms.</p>
        </motion.header>

        <div className="experience-list border-t border-[#e8e8e8]">
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
