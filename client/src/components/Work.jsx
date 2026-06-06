import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { fadeIn, viewportOnce } from '../lib/motion';
import WorkDeviceShowcase from './work/WorkDeviceShowcase';
import { WORK_COPY } from './work/work.constants';
import { AwardBadge, StatBadge } from './work/WorkBadges';

function ViewProjectButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 font-[family-name:var(--font-display)] text-base sm:text-[18px] font-semibold leading-[1.8] text-black transition-colors hover:bg-neutral-50"
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
    summary:
      project?.summary?.trim() ||
      copy.description ||
      project?.description?.split('.')[0] ||
      copy.name,
    description: project?.description || copy.description,
    techStack: project?.techStack || [],
    imageUrl: project?.imageUrl?.trim() || '',
    badge: copy.badge,
    layout: copy.layout || 'phone-left',
  };
}

export default function Work({ projects = [] }) {
  const [active, setActive] = useState(null);
  const items = useMemo(() => {
    const sorted = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const count = Math.max(sorted.length, WORK_COPY.length);
    return Array.from({ length: Math.min(count, 4) }, (_, i) =>
      mergeItem(sorted[i], i)
    );
  }, [projects]);

  return (
    <section id="work" className="bg-white section-pad py-16 md:py-20 lg:py-24">
      <div className="content-wrap max-w-[1280px]">
        <header className="mb-10 text-center md:mb-12">
          <p className="mb-4 text-[13px] font-medium tracking-normal text-[#fe4b01]">SELECTED WORK</p>
          <h2 className="heading-display text-[clamp(2rem,7vw,3.3125rem)] font-semibold tracking-[-0.83px] text-black m-0">
            Selected work
          </h2>
        </header>

        <div className="border-t border-[#e8e8e8]">
          {items.map((project, i) => (
            <motion.article
              key={project._id}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeIn}
              custom={i}
              className="border-b border-[#e8e8e8] py-10 sm:py-12 md:py-[48px]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0">
                <div className="flex flex-1 flex-col gap-9 lg:pr-6 min-w-0">
                  <div className="flex flex-col gap-0">
                    <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,5vw,2.25rem)] font-semibold leading-[1.35] tracking-[-0.23px] text-[#6f6f71]">
                      {project.name}.
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,5vw,2.25rem)] font-semibold leading-[1.35] tracking-[-0.02em] text-[#171717] max-w-[520px]">
                      {project.summary}
                    </h3>
                  </div>

                  <WorkBadge badge={project.badge} />
                  <ViewProjectButton onClick={() => setActive(project)} />
                </div>

                <div className="flex flex-1 justify-center lg:justify-end min-w-0 w-full">
                  <WorkDeviceShowcase
                    imageUrl={project.imageUrl}
                    alt={`${project.name} project preview`}
                    layout={project.layout}
                    name={project.name}
                  />
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
