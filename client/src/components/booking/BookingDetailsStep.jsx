import { ArrowLeft, Calendar, Clock, Globe } from 'lucide-react';
import { BOOKING_EVENT_TITLE } from './booking.constants';
import { formatAppointmentSummary } from './booking.utils';

export default function BookingDetailsStep({
  duration,
  selectedDate,
  selectedTime,
  timezone,
  use24h,
  form,
  onChange,
  onBack,
  onSubmit,
  submitting,
  emailJsReady = true,
}) {
  const { dateStr, timeStr } = formatAppointmentSummary(
    selectedDate,
    selectedTime,
    duration,
    use24h
  );

  return (
    <div className="booking-details" data-name="booking-details">
      <button type="button" className="booking-back-link" onClick={onBack}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to calendar
      </button>

      <div className="booking-details-layout">
        <div className="booking-details-summary">
          <p className="booking-details-step-label">Step 2 of 2</p>
          <h3 className="booking-details-title">Confirm &amp; book</h3>
          <p className="booking-details-sub">
            Share a few details so I can prepare for our call.
          </p>

          <div className="booking-summary-card">
            <p className="booking-summary-event">{BOOKING_EVENT_TITLE}</p>
            <ul className="booking-summary-list">
              <li>
                <Calendar size={16} aria-hidden="true" />
                <span>{dateStr}</span>
              </li>
              <li>
                <Clock size={16} aria-hidden="true" />
                <span>
                  {timeStr} ({duration} min)
                </span>
              </li>
              <li>
                <Globe size={16} aria-hidden="true" />
                <span>{timezone}</span>
              </li>
            </ul>
          </div>
        </div>

        <form className="booking-details-form" onSubmit={onSubmit} noValidate>
          <div>
            <label htmlFor="booking-name" className="booking-field-label">
              Your name
            </label>
            <input
              id="booking-name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => onChange({ ...form, name: e.target.value })}
              className="booking-field-input"
            />
          </div>
          <div>
            <label htmlFor="booking-email" className="booking-field-label">
              Email address
            </label>
            <input
              id="booking-email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => onChange({ ...form, email: e.target.value })}
              className="booking-field-input"
            />
          </div>
          <div>
            <label htmlFor="booking-message" className="booking-field-label">
              What would you like to discuss?
            </label>
            <textarea
              id="booking-message"
              required
              rows={5}
              placeholder="Tell me about your project, goals, and timeline…"
              value={form.message}
              onChange={(e) => onChange({ ...form, message: e.target.value })}
              className="booking-field-input booking-field-textarea"
            />
          </div>
          <button
            type="submit"
            className="booking-submit-btn"
            disabled={submitting || !emailJsReady}
          >
            {submitting ? 'Booking…' : 'Book appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}
