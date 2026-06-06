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

export default function Services({ services = [] }) {
  const cards = useMemo(() => mergeCards(services), [services]);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
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
      <div className="content-wrap mx-auto max-w-[1280px]">
        <motion.header
          className="mb-10 text-center md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
        >
          <p className="mb-4 text-[13px] font-medium tracking-normal text-[#fe4b01]">SERVICES</p>
          <h2 className="heading-display text-[clamp(2rem,7vw,3.5625rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#171717] mb-2">
            My superpowers
          </h2>
          <p className="mx-auto mb-3 max-w-[640px] text-[15px] italic leading-relaxed text-black/55">
            (no radioactive spider required — just years of shipping code)
          </p>
          <p className="mx-auto max-w-[640px] text-[15px] leading-relaxed text-black/60">
            Full stack &amp; SaaS — SvelteKit, Next.js, Supabase &amp; MERN. Shipped for{' '}
            <strong className="font-semibold text-black/80">Zameen.com</strong>,{' '}
            <strong className="font-semibold text-black/80">Bayut.com</strong>, and 20+ clients.
          </p>
        </motion.header>

        <div className="services-fan-viewport">
          <div className="services-fan-stage">
            {cards.map((card, index) => {
              const restRotate = isDesktop ? card.rotate : 0;

              return (
                <motion.div
                  key={card.key}
                  className="services-fan-card absolute"
                  style={{
                    zIndex: card.zIndex,
                    left: card.left != null ? `${card.left}px` : undefined,
                    right: card.right != null ? `${card.right}px` : undefined,
                    top: 'calc(49.28% - 122.5px)',
                    transformOrigin: '50% 88%',
                  }}
                  initial={{
                    opacity: 0,
                    y: isDesktop ? 72 : 32,
                    rotate: 0,
                    scale: isDesktop ? 0.94 : 1,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: restRotate,
                    scale: 1,
                    transition: {
                      opacity: {
                        duration: isDesktop ? 0.55 : 0.45,
                        delay: index * (isDesktop ? 0.05 : 0.06),
                        ease: premiumEase,
                      },
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
                      ? {
                          rotate: 0,
                          scale: 1.14,
                          y: -40,
                          zIndex: 50,
                        }
                      : {
                          scale: 1.06,
                          y: -14,
                          zIndex: 50,
                        }
                  }
                  viewport={{ once: true, amount: 0.12, margin: '0px 0px -60px 0px' }}
                  transition={serviceFanHover}
                >
                  <ServiceCard card={card} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
