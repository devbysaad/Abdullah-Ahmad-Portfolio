import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import FaqBookCallCard from './faq/FaqBookCallCard';
import FaqChatItem from './faq/FaqChatItem';

export default function FAQ({ about, site }) {
  const [openSet, setOpenSet] = useState(() => new Set());
  const sections = site?.sections ?? {};
  const faqItems = [...(site?.faqItems ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const handleToggle = useCallback((index) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  return (
    <section id="faq" className="section-pad faq-section py-0" data-name="faq-section">
      <div className="content-wrap mx-auto max-w-[1280px]" data-name="faq-content-wrap">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="faq-header"
          data-name="faq-header"
        >
          <p className="faq-label">{sections.faqLabel}</p>
          <h2 className="faq-title">{sections.faqTitle}</h2>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="faq-layout"
          data-name="faq-layout"
        >
          <div className="faq-chat-list" data-name="faq-chat-list">
            {faqItems.map((item, index) => (
              <FaqChatItem
                key={item.question}
                index={index}
                item={{
                  q: item.question,
                  a: item.answer,
                  variant: item.variant,
                }}
                open={openSet.has(index)}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          <FaqBookCallCard about={about} />
        </motion.div>
      </div>
    </section>
  );
}
