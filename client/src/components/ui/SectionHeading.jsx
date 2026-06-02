import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../../lib/motion';

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      className="mb-10 md:mb-14"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeIn}
    >
      {label && <p className="label-caps mb-3">{label}</p>}
      <h2 className="heading-display text-[36px] leading-[1.2] font-semibold max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] md:text-[17px] max-w-xl" style={{ color: 'var(--color-muted)' }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
