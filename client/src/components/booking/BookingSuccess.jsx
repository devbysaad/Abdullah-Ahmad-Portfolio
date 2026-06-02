import { CheckCircle2 } from 'lucide-react';
import { formatAppointmentSummary } from './booking.utils';

export default function BookingSuccess({
  duration,
  selectedDate,
  selectedTime,
  timezone,
  use24h,
  onBookAnother,
}) {
  const { dateStr, timeStr } = formatAppointmentSummary(
    selectedDate,
    selectedTime,
    duration,
    use24h
  );

  return (
    <div className="booking-success" data-name="booking-success">
      <CheckCircle2 size={48} className="booking-success-icon" aria-hidden="true" />
      <h3 className="booking-success-title">You&apos;re booked!</h3>
      <p className="booking-success-text">
        Thanks for scheduling. I&apos;ll confirm your discovery call shortly at{' '}
        <strong>{timeStr}</strong> on <strong>{dateStr}</strong> ({timezone}).
      </p>
      <button type="button" className="booking-continue-btn" onClick={onBookAnother}>
        Book another time
      </button>
    </div>
  );
}
