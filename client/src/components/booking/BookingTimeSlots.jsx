import { buildTimeSlots, formatSelectedDay, formatSlotLabel } from './booking.utils';

export default function BookingTimeSlots({
  selectedDate,
  selectedTime,
  onSelectTime,
  use24h,
  onToggle24h,
  today = new Date(),
}) {
  if (!selectedDate) {
    return (
      <div className="booking-times booking-times--empty" data-name="booking-times">
        <p className="booking-times-placeholder">Select a date to see available times</p>
      </div>
    );
  }

  const slots = buildTimeSlots(selectedDate, today);

  return (
    <div className="booking-times" data-name="booking-times">
      <div className="booking-times-header">
        <p className="booking-times-day">{formatSelectedDay(selectedDate)}</p>
        <div className="booking-format-toggle" role="group" aria-label="Time format">
          <button
            type="button"
            className={`booking-format-btn${!use24h ? ' booking-format-btn--active' : ''}`}
            onClick={() => onToggle24h(false)}
            aria-pressed={!use24h}
          >
            12h
          </button>
          <button
            type="button"
            className={`booking-format-btn${use24h ? ' booking-format-btn--active' : ''}`}
            onClick={() => onToggle24h(true)}
            aria-pressed={use24h}
          >
            24h
          </button>
        </div>
      </div>

      <div className="booking-times-list" data-lenis-prevent>
        {slots.length === 0 ? (
          <p className="booking-times-placeholder">No slots left today — pick another day.</p>
        ) : (
          slots.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`booking-time-slot${selectedTime === slot ? ' booking-time-slot--selected' : ''}`}
              onClick={() => onSelectTime(slot)}
              aria-pressed={selectedTime === slot}
            >
              {formatSlotLabel(slot, use24h)}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
