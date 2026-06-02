import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { fadeIn, viewportOnce } from '../lib/motion';
import { WORK_COPY } from './work/work.constants';
import WorkPanel from './work/WorkPanel';
import { AwardBadge, StatBadge } from './work/WorkBadges';

function ViewProjectButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 font-[family-name:var(--font-display)] text-[18px] font-semibold leading-[1.8] text-black transition-colors hover:bg-neutral-50"
    >
      View project
      <ArrowUpRight size={16} strokeWidth={2.25} className="shrink-0" />
    </button>
  );
}

function WorkBadge({ badge }) {
  if (!badge) return null;
  if (badge.type === 'award') {
    return (
      <div className="mb-0">
        <AwardBadge lines={badge.lines} sub={badge.sub} />
      </div>
    );
  }
  if (badge.type === 'stat') {
    return (
      <div className="mb-0">
        <StatBadge main={badge.main} sub={badge.sub} />
      </div>
    );
  }
  return null;
}

function mergeItem(project, index) {
  const copy = WORK_COPY[index] || WORK_COPY[0];
  return {
    _id: project?._id || `work-${index}`,
    name: project?.name || copy.name,
    description: project?.description || copy.description,
    techStack: project?.techStack || [],
    badge: copy.badge,
    panel: copy.panel,
  };
}

export default function Work({ projects = [] }) {
  const [active, setActive] = useState(null);
  const items = Array.from({ length: 4 }, (_, i) => mergeItem(projects[i], i));

  return (
    <section id="work" className="bg-white section-pad py-16 md:py-20 lg:py-24">
      <div className="content-wrap max-w-[1280px]">
        <h2 className="heading-display text-center text-[36px] md:text-[53px] font-semibold md:font-semibold tracking-[-0.83px] text-black mb-10 md:mb-12">
          Selected work
        </h2>

        <div className="border-t border-[#e8e8e8]">
          {items.map((project, i) => (
            <motion.article
              key={project._id}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeIn}
              custom={i}
              className="border-b border-[#e8e8e8] py-12 md:py-[48px]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">
                <div className="flex flex-1 flex-col gap-9 lg:pr-6 min-w-0">
                  <div className="flex flex-col gap-0">
                    <p className="font-[family-name:var(--font-display)] text-[32px] md:text-[36px] font-semibold leading-[1.44] tracking-[-0.23px] text-[#6f6f71]">
                      {project.name}.
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-[32px] md:text-[36px] font-semibold leading-[1.44] tracking-[-0.02em] text-[#171717] max-w-[520px]">
                      {project.description}
                    </h3>
                  </div>

                  <WorkBadge badge={project.badge} />
                  <ViewProjectButton onClick={() => setActive(project)} />
                </div>

                <div className="flex flex-1 justify-center lg:justify-end min-w-0 w-full">
                  <div className="w-full max-w-[552px]">
                    <WorkPanel panelKey={project.panel} alt={`${project.name} project preview`} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
