import { Minus, Plus } from 'lucide-react';

export default function FaqToggle({ open, onBlack }) {
  if (open) {
    return (
      <span className="faq-toggle faq-toggle--open" aria-hidden="true">
        <Minus size={18} strokeWidth={2.5} />
      </span>
    );
  }

  if (onBlack) {
    return (
      <span className="faq-toggle faq-toggle--plus-black" aria-hidden="true">
        <Plus size={18} strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span className="faq-toggle faq-toggle--plus" aria-hidden="true">
      <Plus size={18} strokeWidth={2.5} />
    </span>
  );
}
