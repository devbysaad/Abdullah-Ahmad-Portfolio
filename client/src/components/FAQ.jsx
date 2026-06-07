import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import FaqBookCallCard from './faq/FaqBookCallCard';
import FaqChatItem from './faq/FaqChatItem';
import { FAQ_ITEMS, FAQ_LABEL, FAQ_TITLE } from './faq/faq.constants';

export default function FAQ({ about }) {
  const [openSet, setOpenSet] = useState(() => new Set());

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
          <p className="faq-label">{FAQ_LABEL}</p>
          <h2 className="faq-title">{FAQ_TITLE}</h2>
        </motion.header>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="faq-layout"
          data-name="faq-layout"
        >
          <FaqBookCallCard profileImageUrl={about?.profileImageUrl} />

          <div className="faq-chat-list" data-name="faq-chat-list">
            {FAQ_ITEMS.map((item, index) => (
              <FaqChatItem
                key={item.q}
                item={item}
                index={index}
                open={openSet.has(index)}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
