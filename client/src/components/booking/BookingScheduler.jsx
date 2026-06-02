import BookingCalendar from './BookingCalendar';
import BookingSidebar from './BookingSidebar';
import BookingTimeSlots from './BookingTimeSlots';

export default function BookingScheduler({
  about,
  duration,
  onDurationChange,
  viewDate,
  onViewDateChange,
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  timezone,
  onTimezoneChange,
  use24h,
  onToggle24h,
  onContinue,
  canContinue,
}) {
  return (
    <div className="booking-widget" data-name="booking-widget">
      <div className="booking-widget-grid">
        <BookingSidebar
          profileImageUrl={about?.profileImageUrl}
          duration={duration}
          onDurationChange={onDurationChange}
          timezone={timezone}
          onTimezoneChange={onTimezoneChange}
        />
        <BookingCalendar
          viewDate={viewDate}
          onViewDateChange={onViewDateChange}
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            onSelectDate(date);
            onSelectTime(null);
          }}
        />
        <BookingTimeSlots
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectTime={onSelectTime}
          use24h={use24h}
          onToggle24h={onToggle24h}
        />
      </div>

      <div className="booking-widget-footer">
        <p className="booking-widget-hint">
          {canContinue
            ? 'Review your slot, then continue to share details.'
            : 'Pick a date and time to continue.'}
        </p>
        <button
          type="button"
          className="booking-continue-btn"
          disabled={!canContinue}
          onClick={onContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
