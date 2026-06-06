import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_CTA_PRIMARY, HERO_CTA_SECONDARY } from '../content/aak.constants';
import TelegramIcon from './hero/TelegramIcon';

const UNDERLINE_ID = 'hero-ul';

const ROLES = [
  'Senior Full Stack Engineer',
  'SaaS Product Builder',
  'MERN & SvelteKit Expert',
  'Unicorn Platform Dev',
];

function PktClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hero-clock" aria-label={`Current time in Lahore: ${time}`}>
      <span className="hero-clock-dot" aria-hidden />
      {time} PKT
    </span>
  );
}

function RoleCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROLES.length);
        setVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="hero-role-cycler"
      style={{ opacity: visible ? 1 : 0 }}
      aria-live="polite"
    >
      {ROLES[index]}
    </span>
  );
}

export default function HeroHeadingSection() {
  return (
    <section
      className="hero-heading-section section-pad"
      data-name="hero-heading-section-root"
      aria-label="Hero"
    >
      {/* Squiggly underline symbol */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
        <defs>
          <symbol id={UNDERLINE_ID} viewBox="0 0 157 21">
            <path
              d="M 130.23 16.539 C 131.221 13.74 98.752 6.956 95.785 6.464 C 71.739 2.481 48.042 2.24 23.943 5.672 C 16.99 6.663 10.15 8.342 3.298 9.792 C 1.04 10.27 3.231 10.261 4.412 10.427 C 14.912 11.909 25.43 13.261 36.002 14.24 C 66.83 17.093 97.718 17.68 128.659 18.489 C 137.063 18.709 145.815 19.018 154.176 18.11 C 155.079 18.012 155.246 17.754 154.341 17.328 C 150.668 15.602 146.349 14.527 142.365 13.66 C 116.129 7.952 88.69 6.852 61.846 8.522 C 51.806 9.147 41.521 9.994 31.67 12.003 C 30.52 12.237 29.373 12.489 28.225 12.732 C 27.041 12.983 30.555 13.421 31.764 13.539 C 53.179 15.633 74.907 16.573 96.436 16.388 C 111.175 16.26 126.484 15.837 140.918 12.783 C 141.774 12.602 153.008 10.961 149.263 9.275 C 145.349 7.513 140.837 6.913 136.581 6.316 C 122.725 4.371 108.716 3.075 94.713 2.501 C 76.459 1.751 58.502 3.05 40.339 4.484 C 36.723 4.77 32.594 5.779 29.019 5.469"
              fill="transparent" strokeWidth="3.52" stroke="#FE4B01"
              strokeLinecap="round" strokeMiterlimit="10"
            />
          </symbol>
        </defs>
      </svg>

      <div className="content-wrap hero-body">

        {/* ── TOP META ROW ── */}
        <motion.div
          className="hero-meta-row"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.44, 0, 0.56, 1] }}
        >
          <div className="hero-available-badge">
            <span className="hero-available-dot" aria-hidden />
            Available for new projects
          </div>
          <PktClock />
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="hero-main-grid">

          {/* LEFT — copy */}
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
          >
            <p className="hero-greeting">Hi, there</p>

            <div className="hero-name-block">
              <h1 className="hero-name-line">I&rsquo;m Abdullah</h1>
              <div className="hero-name-line-wrap">
                <h1 className="hero-name-line hero-name-accent">Ahmad,</h1>
                <svg viewBox="0 0 157 21" className="hero-name-underline" aria-hidden>
                  <use href={`#${UNDERLINE_ID}`} />
                </svg>
              </div>
            </div>

            <p className="hero-role-line">
              <RoleCycler />
            </p>

            <p className="hero-subcopy">
              Your win is my win.{' '}
              <span className="hero-subcopy-dim">
                I ship scalable SaaS and web platforms — daily updates, on-time every time.
              </span>
            </p>

            <div className="hero-cta-row">
              <a href="#contact" className="hero-cta-primary">{HERO_CTA_PRIMARY}</a>
              <a href="#contact" className="hero-cta-chat">
                <span className="hero-cta-chat-icon">
                  <TelegramIcon className="h-5 w-5" />
                </span>
                {HERO_CTA_SECONDARY}
              </a>
            </div>

            <div className="hero-proof-row" aria-label="Notable clients">
              {['Zameen.com', 'Bayut.com', 'Dubizzle Labs', 'Dropella', 'NPC Labs'].map((name) => (
                <span key={name} className="hero-proof-chip">{name}</span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — photo */}
          <motion.div
            className="hero-photo-col"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.44, 0, 0.56, 1] }}
          >
            {/* Badge TL */}
            <motion.div
              className="hero-badge hero-badge--tl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <span className="hero-badge-value">500K+</span>
              <span className="hero-badge-label">Daily users · Zameen.com</span>
            </motion.div>

            {/* Photo slot — empty until final image is ready */}
            <div className="hero-photo-frame" aria-hidden="true" />

            {/* Badge BR */}
            <motion.div
              className="hero-badge hero-badge--br"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <span className="hero-badge-value">20+ clients</span>
              <span className="hero-badge-label">On-time · Every time</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── STATS BAR ── */}
        <motion.div
          className="hero-stats-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55, ease: [0.44, 0, 0.56, 1] }}
        >
          {[
            { value: '4+', label: 'Years in Engineering' },
            { value: '20+', label: 'Satisfied Clients' },
            { value: '12+', label: 'Apps Shipped' },
            { value: '60K+', label: 'Users Empowered' },
          ].map((s, i) => (
            <div key={s.label} className="hero-stat">
              <span className="hero-stat-value">{s.value}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
