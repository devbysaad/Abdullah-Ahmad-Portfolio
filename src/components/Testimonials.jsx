import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDragScroll } from '../hooks/useDragScroll';
import { fadeIn, viewportOnce } from '../lib/motion';
import LoveLettersHeart from './testimonials/LoveLettersHeart';
import TestimonialCard from './testimonials/TestimonialCard';
import {
  normalizeTestimonials,
  TESTIMONIALS_LABEL,
  TESTIMONIALS_TITLE,
} from './testimonials/testimonials.constants';

export default function Testimonials({ testimonials }) {
  const scrollerRef = useRef(null);
  useDragScroll(scrollerRef);

  const items = useMemo(
    () => normalizeTestimonials(testimonials),
    [testimonials],
  );

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
        ref={scrollerRef}
        className="testimonials-marquee-window"
        data-name="testimonials-marquee-window"
      >
        <div className="testimonials-marquee-track" data-name="testimonials-marquee-track">
          <div className="testimonials-marquee-set" aria-label="Client testimonials">
            {items.map((t) => (
              <TestimonialCard key={t._id || t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
