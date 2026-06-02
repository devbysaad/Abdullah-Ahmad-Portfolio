import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';

export default function Marquee({ projects }) {
  if (!projects?.length) return null;

  return (
    <section className="section-pad py-10 md:py-14">
      <div className="content-wrap">
        <motion.div
          className="relative fade-mask-left"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
        >
          <ul
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none]"
            data-lenis-prevent
            style={{ msOverflowStyle: 'none' }}
          >
            {projects.concat(projects).map((project, i) => (
              <li
                key={`${project._id}-${i}`}
                className="snap-center shrink-0 w-[280px] md:w-[360px] rounded-[16px] overflow-hidden border"
                style={{
                  borderColor: 'var(--color-border)',
                  boxShadow: '-3.2px 1.07px 8.57px rgba(0,0,0,0.1), -12px 8px 28px rgba(0,0,0,0.06)',
                }}
              >
                <div className="aspect-[1/1.1] md:aspect-[1/1] overflow-hidden bg-white">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
