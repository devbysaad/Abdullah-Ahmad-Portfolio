import { useCallback, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../lib/motion';
import {
  HERO_CARD_HEIGHT,
  HERO_CARD_PADDING_LEFT,
  HERO_CAROUSEL_GAP,
  HERO_SHOWCASE,
} from './hero/hero.constants';

export default function Hero() {
  const scrollerRef = useRef(null);

  const scrollNext = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.55, 420);
    el.scrollBy({ left: step, behavior: 'smooth' });
  }, []);

  return (
    <section
      className="relative mt-20 w-full md:mt-24"
      style={{ padding: '10px 0' }}
      data-name="hero-showcase-section"
      aria-label="Featured work showcase"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        custom={0}
        className="relative w-full"
        data-name="hero-showcase-root"
      >
        <div
          ref={scrollerRef}
          className="w-full overflow-x-auto no-scrollbar [scrollbar-width:none]"
          style={{ msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          data-name="hero-showcase-scroller"
          data-lenis-prevent
        >
          <ul
            className="flex min-w-max no-scrollbar m-0 p-0 list-none"
            style={{
              gap: `${HERO_CAROUSEL_GAP}px`,
              alignItems: 'center',
              scrollSnapType: 'x mandatory',
            }}
            role="list"
          >
            {HERO_SHOWCASE.map((card, index) => {
              const frameWidth = card.width;
              return (
                <li
                  key={`${card.file}-${index}`}
                  className="shrink-0"
                  style={{ scrollSnapAlign: 'center', scrollSnapStop: 'always' }}
                  aria-label={`${index + 1} of ${HERO_SHOWCASE.length}`}
                >
                  <div
                    className="flex flex-col justify-center overflow-hidden"
                    style={{
                      paddingLeft: `${HERO_CARD_PADDING_LEFT}px`,
                      gap: '2px',
                    }}
                    data-name="hero-card-item"
                  >
                    <div
                      className="relative overflow-hidden bg-white"
                      style={{
                        width: `${frameWidth}px`,
                        height: `${HERO_CARD_HEIGHT}px`,
                        borderRadius: '16px',
                        border: '0.5px solid rgba(0, 0, 0, 0.15)',
                      }}
                      data-name="hero-card-frame"
                    >
                      <img
                        src={card.image}
                        alt={card.label}
                        width={frameWidth}
                        height={HERO_CARD_HEIGHT}
                        className="h-full w-full object-cover object-top"
                        loading={index < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                    <p
                      className="m-0 font-medium"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '12px',
                        lineHeight: '1.35',
                        color: 'rgb(128, 128, 128)',
                      }}
                    >
                      {card.label}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="button"
          onClick={scrollNext}
          className="hidden md:flex absolute right-4 lg:right-8 top-[42%] -translate-y-1/2 h-[42px] w-[42px] rounded-full items-center justify-center text-white/90 transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'rgba(120, 120, 120, 0.85)' }}
          aria-label="Scroll showcase forward"
          data-name="hero-showcase-next"
        >
          <ChevronRight size={18} strokeWidth={2.25} />
        </button>
      </motion.div>
    </section>
  );
}
