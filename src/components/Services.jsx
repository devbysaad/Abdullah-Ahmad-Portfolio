import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, premiumEase, serviceFanHover, viewportOnce } from '../lib/motion';
import { SERVICE_CARDS } from './services/services.constants';
import ServiceCard from './services/ServiceCard';

function mergeCards(services) {
  return SERVICE_CARDS.map((card, index) => {
    const fromApi = services[index];
    if (!fromApi) return card;
    const title = fromApi.title?.endsWith('.') ? fromApi.title : `${fromApi.title}.`;
    return {
      ...card,
      title,
      description: fromApi.description || card.description,
    };
  });
}

const FAN_DESKTOP_MQ = '(min-width: 900px)';

export default function Services({ services = [] }) {
  const cards = useMemo(() => mergeCards(services), [services]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FAN_DESKTOP_MQ);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section
      id="services"
      className="overflow-x-clip bg-white section-pad py-16 md:py-[100px] lg:py-[120px]"
    >
      <div className="content-wrap mx-auto max-w-[1280px] px-4 sm:px-5 md:px-10">
        <motion.header
          className="services-header"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
        >
          <p className="services-eyebrow">SERVICES</p>
          <h2 className="services-title">My superpowers</h2>
          <p className="services-subtitle-italic">
            (no radioactive spider required — just years of shipping code)
          </p>
          <p className="services-subtitle">
            Full stack &amp; SaaS — SvelteKit, Next.js, Supabase &amp; MERN. Shipped for{' '}
            <strong>Zameen.com</strong>, <strong>Bayut.com</strong>, and 20+ clients.
          </p>
        </motion.header>
      </div>

      <div className={`services-cards ${isDesktop ? 'services-cards--fan' : 'services-cards--stack'}`}>
        {cards.map((card, index) => (
          <motion.div
            key={card.key}
            className="services-card-slot group"
            style={
              isDesktop
                ? {
                    zIndex: card.zIndex,
                    left: card.left != null ? `${card.left}px` : undefined,
                    right: card.right != null ? `${card.right}px` : undefined,
                    top: 'calc(49.28% - 122.5px)',
                  }
                : undefined
            }
            initial={{ y: isDesktop ? 72 : 24, rotate: 0, scale: isDesktop ? 0.94 : 1 }}
            whileInView={{
              y: 0,
              rotate: isDesktop ? card.rotate : 0,
              scale: 1,
              transition: {
                y: {
                  duration: isDesktop ? 0.55 : 0.45,
                  delay: index * (isDesktop ? 0.05 : 0.06),
                  ease: premiumEase,
                },
                rotate: {
                  duration: isDesktop ? 0.55 : 0.45,
                  delay: index * (isDesktop ? 0.05 : 0.06),
                  ease: premiumEase,
                },
                scale: {
                  duration: isDesktop ? 0.55 : 0.45,
                  delay: index * (isDesktop ? 0.05 : 0.06),
                  ease: premiumEase,
                },
              },
            }}
            whileHover={
              isDesktop
                ? { rotate: 0, scale: 1.12, y: -36, zIndex: 50 }
                : { scale: 1.025, y: -10, zIndex: 50 }
            }
            whileTap={{ scale: isDesktop ? 1.06 : 1.01, y: -4 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={serviceFanHover}
          >
            <ServiceCard card={card} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
