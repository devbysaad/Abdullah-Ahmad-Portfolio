import { useState } from 'react';
import toast from 'react-hot-toast';
import { isEmailJsConfigured } from '../../lib/env';
import { getEmailJsErrorMessage, sendContactMessage } from '../../lib/emailjs';

export default function QuickMessagePanel({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const emailJsReady = isEmailJsConfigured();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendContactMessage(form);
      toast.success('Message sent — talk soon!');
      setForm({ name: '', email: '', message: '' });
      onClose?.();
    } catch (err) {
      toast.error(getEmailJsErrorMessage(err, 'Could not send message. Try again.'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="contact-message" className="booking-message-panel" data-name="contact-message">
      <h3 className="booking-message-title">Drop a message</h3>
      <p className="booking-message-sub">
        Prefer email over scheduling? Send a note and I&apos;ll get back to you.
      </p>
      <form onSubmit={handleSubmit} className="booking-message-form">
        <div className="booking-message-row">
          <div>
            <label htmlFor="msg-name" className="booking-field-label">
              Name
            </label>
            <input
              id="msg-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="booking-field-input booking-field-input--light"
            />
          </div>
          <div>
            <label htmlFor="msg-email" className="booking-field-label booking-field-label--light">
              Email
            </label>
            <input
              id="msg-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="booking-field-input booking-field-input--light"
            />
          </div>
        </div>
        <div>
          <label htmlFor="msg-body" className="booking-field-label booking-field-label--light">
            Message
          </label>
          <textarea
            id="msg-body"
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="booking-field-input booking-field-input--light booking-field-textarea"
          />
        </div>
        <div className="booking-message-actions">
          <button type="submit" className="btn-primary" disabled={sending || !emailJsReady}>
            {sending ? 'Sending…' : 'Send message'}
          </button>
          {onClose && (
            <button type="button" className="booking-text-btn" onClick={onClose}>
              Back to scheduling
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
