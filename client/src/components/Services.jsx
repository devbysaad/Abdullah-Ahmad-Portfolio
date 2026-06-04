import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
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
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);

  const cards = useMemo(() => mergeCards(services), [services]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 700px)', () => {
        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          gsap.set(el, {
            opacity: 0,
            y: 80,
            rotation: 0,
            scale: 0.92,
            zIndex: cards[idx].zIndex,
          });
        });

        gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          rotation: (i) => cards[i].rotate,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        });
      });

      mm.add('(max-width: 699px)', () => {
        gsap.from(cardRefs.current, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [cards]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-white section-pad py-[100px] md:py-[120px]"
    >
      <div className="content-wrap mx-auto max-w-[1280px]">
        <header className="mb-10 text-center md:mb-14">
          <p className="mb-4 text-[13px] font-medium tracking-normal text-[#fe4b01]">SERVICES</p>
          <h2 className="heading-display text-[40px] md:text-[57px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#171717] mb-3">
            My superpowers
          </h2>
          <p className="mx-auto max-w-[640px] text-[15px] leading-relaxed text-black/60">
            Full stack &amp; SaaS — SvelteKit, Next.js, Supabase &amp; MERN. Shipped for{' '}
            <strong className="font-semibold text-black/80">Zameen.com</strong>,{' '}
            <strong className="font-semibold text-black/80">Bayut.com</strong>, and 20+ clients.
          </p>
        </header>

        <div className="flex justify-center overflow-visible px-2">
          <div className="services-fan-stage" ref={stageRef}>
            {cards.map((card, index) => (
              <div
                key={card.key}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="services-fan-card absolute cursor-default"
                style={{
                  zIndex: card.zIndex,
                  left: card.left != null ? `${card.left}px` : undefined,
                  right: card.right != null ? `${card.right}px` : undefined,
                  top: 'calc(49.28% - 122.5px)',
                }}
              >
                <ServiceCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
