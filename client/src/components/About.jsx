import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import AboutBio from './about/AboutBio';
import AboutStatCard from './about/AboutStatCard';
import { resolveMediaUrl } from '../lib/mediaUrl';
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
  const profileSrc = resolveMediaUrl(about?.profileImageUrl, REFERENCE_PROFILE_IMAGE);

  return (
    <section id="about" className="about-section section-pad" data-name="about-section">
      <div className="content-wrap">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="about-drumroll-panel"
          data-name="about-drumroll-panel"
        >
          <header className="about-drumroll-header" data-name="about-drumroll-header">
            <p className="about-drumroll-label">{ABOUT_LABEL}</p>
            <h2 className="about-drumroll-title">{ABOUT_TITLE}</h2>
          </header>

          <div className="about-drumroll-body" data-name="about-drumroll-body">
            <div className="about-drumroll-media" data-name="about-photo">
              <div className="about-photo-frame">
                {profileSrc ? (
                  <img
                    src={profileSrc}
                    alt="Abdullah Ahmad"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="about-photo-placeholder" aria-hidden>
                    Add profile photo in Admin
                  </div>
                )}
              </div>
            </div>

            <div className="about-drumroll-content" data-name="about-copy-column">
              <div className="about-drumroll-stats" data-name="about-stats-row">
                {stats.map((stat) => (
                  <AboutStatCard
                    key={stat.key}
                    value={stat.value}
                    lines={stat.lines}
                    decoration={stat.decoration}
                  />
                ))}
              </div>

              <div className="about-drumroll-copy">
                <AboutBio paragraphs={bioParagraphs} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
