import { useLayoutEffect, useMemo, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { SERVICE_CARDS } from './services/services.constants';
import ServiceCard from './services/ServiceCard';
import WebIllustration from './services/WebIllustration';

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
          <p className="text-[15px] leading-relaxed text-black/60">
            (because even Batman needs a day job, right?)
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
                {card.key === 'web' ? (
                  <article
                    className="flex h-[245px] w-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(119,119,119,0.25)] px-4 pb-4 pt-6"
                    style={{
                      backgroundColor: card.bg,
                      boxShadow:
                        '0 0.7065919983928324px 0.49461439887498265px -0.375px rgba(5,5,5,0.05), 0 1.8065619053231785px 1.264593333726225px -0.75px rgba(5,5,5,0.05), 0 3.6217592146567767px 2.5352314502597437px -1.125px rgba(5,5,5,0.05), 0 6.8655999097303715px 4.80591993681126px -1.5px rgba(5,5,5,0.05), 0 13.646761411524492px 9.552732988067145px -1.875px rgba(5,5,5,0.05), 0 30px 21px -2.25px rgba(5,5,5,0.06)',
                    }}
                  >
                    <WebIllustration />
                    <div className="flex w-full flex-col gap-1">
                      <h3 className="font-[family-name:var(--font-display)] text-[18px] font-semibold leading-tight text-white">
                        {card.title}
                      </h3>
                      <p className="text-[11px] leading-[1.45] text-white/60">{card.description}</p>
                    </div>
                  </article>
                ) : (
                  <ServiceCard card={card} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
