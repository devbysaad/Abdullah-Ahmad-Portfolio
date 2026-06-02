import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import AboutBio from './about/AboutBio';
import AboutStatCard from './about/AboutStatCard';
import {
  ABOUT_LABEL,
  ABOUT_TITLE,
  DEFAULT_BIO_PARAGRAPHS,
  DEFAULT_STATS,
  REFERENCE_PROFILE_IMAGE,
} from './about/about.constants';

function buildStats(about) {
  const years = about?.stats?.years || DEFAULT_STATS[0].value;
  const clients = about?.stats?.clients || DEFAULT_STATS[1].value;
  const apps = about?.stats?.apps || DEFAULT_STATS[2].value;

  return [
    { ...DEFAULT_STATS[0], value: years },
    { ...DEFAULT_STATS[1], value: clients },
    { ...DEFAULT_STATS[2], value: apps },
  ];
}

function buildBioParagraphs(about) {
  const raw = (about?.bio || '').trim();
  if (!raw) return DEFAULT_BIO_PARAGRAPHS;

  return raw.split('\n\n').filter(Boolean).map((text) => ({ text, highlights: [] }));
}

export default function About({ about }) {
  const stats = useMemo(() => buildStats(about), [about]);
  const bioParagraphs = useMemo(() => buildBioParagraphs(about), [about]);
  const profileSrc = about?.profileImageUrl?.trim() || REFERENCE_PROFILE_IMAGE;

  return (
    <section id="about" className="section-pad py-16 md:py-20 lg:py-24" data-name="about-section">
      <div className="content-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="about-drumroll-panel w-full"
          data-name="about-drumroll-panel"
        >
          <header
            className="mb-10 flex flex-col items-center gap-5 text-center md:mb-12 md:gap-8"
            data-name="about-drumroll-header"
          >
            <p
              className="m-0 uppercase tracking-normal"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 500,
                color: '#fe4b01',
              }}
            >
              {ABOUT_LABEL}
            </p>
            <h2
              className="m-0 font-semibold text-white"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6vw, 53px)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {ABOUT_TITLE}
            </h2>
          </header>

          <div
            className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-9"
            data-name="about-drumroll-body"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeIn}
              className="about-photo-frame w-full shrink-0 lg:w-[470px]"
              data-name="about-photo"
            >
              <img
                src={profileSrc}
                alt="Abdullah Ahmad"
                className="h-[min(306px,56vw)] w-full rounded-2xl object-cover object-center lg:h-[306px]"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeIn}
              custom={0.1}
              className="flex w-full min-w-0 flex-1 flex-col gap-8 md:gap-10"
              data-name="about-copy-column"
            >
              <div
                className="flex w-full flex-row gap-2.5 md:gap-[10px]"
                data-name="about-stats-row"
              >
                {stats.map((stat) => (
                  <AboutStatCard
                    key={stat.key}
                    value={stat.value}
                    lines={stat.lines}
                    decoration={stat.decoration}
                  />
                ))}
              </div>

              <AboutBio paragraphs={bioParagraphs} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
