import { useMemo } from 'react';
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
  const items = useMemo(() => {
    const list = testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS;
    return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [testimonials]);

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
          data-lenis-prevent
        data-name="testimonials-track-outer"
      >
        <div className="testimonials-track" data-name="testimonials-track">
          {items.map((t) => (
            <TestimonialCard key={t._id ?? `${t.name}-${t.order}`} testimonial={t} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
