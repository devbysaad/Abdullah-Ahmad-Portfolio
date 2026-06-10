import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import { resolveMediaUrl } from '../lib/mediaUrl';
import BrandLogo from './brands/BrandLogo';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.44, 0, 0.56, 1] } },
};

export default function BrandsStrip({ site }) {
  const sections = site?.sections ?? {};
  const brands = [...(site?.brands ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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
          {sections.brandsLabel || 'Trusted by teams at'}
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
          className="brands-logo-strip"
          data-name="brands-logo-strip"
        >
          {brands.map((brand) => (
            <motion.div key={brand.key} variants={item}>
              <BrandLogo
                name={brand.name}
                domain={brand.domain}
                logo={resolveMediaUrl(brand.logoUrl)}
                badge={brand.badge}
                url={brand.url}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
