import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import { DEFAULT_SKILLS, SKILLS_TITLE } from '../content/aak.constants';

export default function Skills({ about }) {
  const skills = useMemo(() => {
    const fromApi = about?.skills?.filter(Boolean);
    return fromApi?.length ? fromApi : DEFAULT_SKILLS;
  }, [about]);

  return (
    <section id="skills" className="section-pad py-14 md:py-18 bg-[#f4f4f4]" data-name="skills-section">
      <div className="content-wrap max-w-[1100px]">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="mb-8"
        >
          <h2
            className="m-0 font-semibold tracking-tight text-black"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 5vw, 40px)',
            }}
          >
            {SKILLS_TITLE}
          </h2>
        </motion.header>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="m-0 flex flex-wrap gap-2.5 list-none p-0"
        >
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-black/12 bg-white px-4 py-2 text-[14px] font-medium text-black/85"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {skill}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
