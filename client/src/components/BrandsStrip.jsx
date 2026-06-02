import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import BrandMark from './brands/BrandMark';
import { BRAND_MARKS, BRANDS_HEADING } from './brands/brands.constants';

const marqueeMarks = [...BRAND_MARKS, ...BRAND_MARKS];

export default function BrandsStrip() {
  return (
    <section
      className="w-full pt-[60px] pb-14 md:pb-16"
      data-name="brands-section"
      aria-label="Collaborated brands"
    >
      <div className="content-wrap px-5 md:px-10" data-name="brands-marquee-section">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="mx-auto mb-10 max-w-[640px] text-center font-semibold md:mb-12"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.4,
            color: 'rgba(0, 0, 0, 0.6)',
          }}
          data-name="brands-heading"
        >
          {BRANDS_HEADING}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="brands-marquee-window"
          data-name="brands-marquee-window"
        >
          <div className="brands-marquee-track" data-name="brands-marquee-track">
            {marqueeMarks.map((brand, index) => (
              <div
                key={`${brand.key}-${index}`}
                className="brands-logo-item"
                data-name="brands-logo-item"
              >
                <BrandMark brand={brand} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
