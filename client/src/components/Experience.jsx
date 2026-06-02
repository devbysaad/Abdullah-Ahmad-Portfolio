import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import { fadeUp, viewportOnce } from '../lib/motion';

export default function Experience({ experience }) {
  return (
    <section
      id="experience"
      className="section-pad py-24 md:py-32 border-t"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <SectionHeading label="Experience" title="Where I've shipped" />

      <div className="relative max-w-3xl">
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ background: 'var(--color-border)' }}
        />
        <ul className="space-y-10">
          {experience.map((item, i) => (
            <motion.li
              key={item._id}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              custom={i}
              className="relative pl-10"
            >
              <span
                className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2"
                style={{ borderColor: 'var(--color-accent)', background: 'var(--color-bg)' }}
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {item.role}
                </h3>
                <span style={{ color: 'var(--color-muted)' }}>— {item.company}</span>
              </div>
              <p className="text-sm mb-2 label-caps !text-muted" style={{ color: 'var(--color-muted)' }}>
                {item.period}
              </p>
              {item.description && (
                <p className="leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {item.description}
                </p>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
