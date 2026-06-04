import { useCallback, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import LoveLettersHeart from './testimonials/LoveLettersHeart';
import TestimonialCard from './testimonials/TestimonialCard';
import {
  FALLBACK_TESTIMONIALS,
  TESTIMONIALS_LABEL,
  TESTIMONIALS_TITLE,
} from './testimonials/testimonials.constants';

export default function Testimonials({ testimonials }) {
  const trackRef = useRef(null);

  const items = useMemo(() => {
    const list = testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS;
    return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [testimonials]);

  const scrollTrack = useCallback((e) => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft + clientWidth >= scrollWidth - 2;
    const scrollingLeft = delta < 0;
    const scrollingRight = delta > 0;
    const canScroll = (scrollingLeft && !atStart) || (scrollingRight && !atEnd);

    if (canScroll) {
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += delta;
    }
  }, []);

  /** Capture phase so Lenis does not swallow wheel over love letters */
  useEffect(() => {
    const section = document.getElementById('testimonials');
    if (!section) return undefined;

    const onWheel = (e) => {
      const track = trackRef.current;
      if (!track?.contains(e.target)) return;
      scrollTrack(e);
    };

    section.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => section.removeEventListener('wheel', onWheel, { capture: true });
  }, [scrollTrack]);

  return (
    <section
      id="testimonials"
      className="section-pad testimonials-section"
      data-name="testimonials-section"
      aria-labelledby="testimonials-heading"
    >
      <div className="content-wrap testimonials-header-wrap" data-name="testimonials-header-wrap">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="testimonials-header"
          data-name="testimonials-header"
        >
          <p className="testimonials-label">{TESTIMONIALS_LABEL}</p>
          <div className="testimonials-title-row">
            <h2 id="testimonials-heading" className="testimonials-title">
              {TESTIMONIALS_TITLE}
            </h2>
            <LoveLettersHeart className="testimonials-heart" />
          </div>
        </motion.header>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeIn}
        className="testimonials-track-outer no-scrollbar"
        data-name="testimonials-track-outer"
      >
        <div
          ref={trackRef}
          className="testimonials-track"
          data-name="testimonials-track"
        >
          {items.map((t) => (
            <TestimonialCard key={t._id ?? `${t.name}-${t.order}`} testimonial={t} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
