import { AnimatePresence, motion } from 'framer-motion';
import FaqToggle from './FaqToggle';
import { FAQ_COLORS } from './faq.constants';

function questionStyles(open, variant) {
  if (open) {
    return {
      backgroundColor: FAQ_COLORS.questionOpen,
      color: FAQ_COLORS.questionTextOpen,
    };
  }
  return {
    backgroundColor: variant === 'black' ? FAQ_COLORS.questionBlack : FAQ_COLORS.questionGrey,
    color: '#ffffff',
  };
}

export default function FaqChatItem({ item, open, onToggle }) {
  const styles = questionStyles(open, item.variant);

  return (
    <div className="faq-chat-item" data-name="faq-chat-item">
      <div className="flex w-full items-center justify-start gap-2">
        <button
          type="button"
          className="flex min-w-0 max-w-[calc(100%-44px)] items-center border-0 bg-transparent p-0 text-left"
          onClick={onToggle}
          aria-expanded={open}
        >
          <span
            className="faq-question-bubble inline-block px-5 py-3.5 text-[18px] font-medium leading-[1.3] tracking-[-0.02em]"
            style={{
              fontFamily: 'var(--font-body)',
              ...styles,
            }}
          >
            {item.q}
          </span>
        </button>
        <button
          type="button"
          className="shrink-0 border-0 bg-transparent p-0"
          onClick={onToggle}
          aria-label={open ? 'Collapse answer' : 'Expand answer'}
        >
          <FaqToggle open={open} onBlack={item.variant === 'black' && !open} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.44, 0, 0.56, 1] }}
            className="faq-answer-wrap overflow-hidden"
          >
            <p
              className="faq-answer-bubble ml-auto mt-3 w-fit max-w-[min(100%,520px)] px-5 py-3.5 text-[18px] font-medium leading-[1.3] tracking-[-0.02em] text-white"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
