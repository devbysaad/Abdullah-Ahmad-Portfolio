import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, viewportOnce } from '../lib/motion';
import BookingFlow from './booking/BookingFlow';
import EmailJsSetupBanner from './booking/EmailJsSetupBanner';
import QuickMessagePanel from './booking/QuickMessagePanel';
import {
  BOOKING_LABEL,
  BOOKING_SUBTITLE,
  BOOKING_TITLE,
  FOOTER_MESSAGE_LINK,
  FOOTER_MESSAGE_PROMPT,
} from './booking/booking.constants';

export default function Contact({ about }) {
  const [showMessage, setShowMessage] = useState(false);

  const openMessage = () => {
    setShowMessage(true);
    requestAnimationFrame(() => {
      document.getElementById('contact-message')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <section id="contact" className="section-pad booking-section" data-name="contact-section">
      <div className="content-wrap booking-section-inner">
        <motion.header
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="booking-page-header"
          data-name="booking-page-header"
        >
          <p className="booking-page-label">{BOOKING_LABEL}</p>
          <h2 className="booking-page-title">{BOOKING_TITLE}</h2>
          <p className="booking-page-subtitle">{BOOKING_SUBTITLE}</p>
        </motion.header>

        <EmailJsSetupBanner contactEmail={about?.contactEmail} />

        <BookingFlow about={about} />

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeIn}
          className="booking-footer-prompt"
        >
          {FOOTER_MESSAGE_PROMPT}{' '}
          <button type="button" className="booking-footer-link" onClick={openMessage}>
            {FOOTER_MESSAGE_LINK}
          </button>
        </motion.p>

        {showMessage && <QuickMessagePanel onClose={() => setShowMessage(false)} />}
      </div>
    </section>
  );
}
