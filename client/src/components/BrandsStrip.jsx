import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import BrandLogo from './brands/BrandLogo';
import { COLLAB_BRANDS } from './brands/brands.constants';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.44, 0, 0.56, 1] } },
};

export default function BrandsStrip() {
  return (
    <section
      className="w-full pt-[60px] pb-14 md:pb-16"
      data-name="brands-section"
      aria-label="Companies Abdullah has worked with"
    >
      <div className="content-wrap px-5 md:px-10" data-name="brands-logo-strip-section">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="brands-strip-label"
          data-name="brands-strip-label"
        >
          Trusted by teams at
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
          className="brands-logo-strip"
          data-name="brands-logo-strip"
        >
          {COLLAB_BRANDS.map((brand) => (
            <motion.div key={brand.key} variants={item} className="brands-logo-strip-cell">
              <BrandLogo
                name={brand.name}
                domain={brand.domain}
                logo={brand.logo}
                badge={brand.badge}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
