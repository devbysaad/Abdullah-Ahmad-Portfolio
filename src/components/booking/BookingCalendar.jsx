import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WEEKDAY_LABELS } from './booking.constants';
import {
  buildCalendarMonth,
  formatMonthYear,
  isDateAvailable,
  isSameDay,
} from './booking.utils';

export default function BookingCalendar({
  viewDate,
  onViewDateChange,
  selectedDate,
  onSelectDate,
  today = new Date(),
}) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = buildCalendarMonth(year, month);

  const goMonth = (delta) => {
    const next = new Date(viewDate);
    next.setMonth(next.getMonth() + delta);
    onViewDateChange(next);
  };

  return (
    <div className="booking-calendar" data-name="booking-calendar">
      <div className="booking-calendar-header">
        <p className="booking-calendar-month">{formatMonthYear(viewDate)}</p>
        <div className="booking-calendar-nav">
          <button type="button" className="booking-icon-btn" onClick={() => goMonth(-1)} aria-label="Previous month">
            <ChevronLeft size={18} />
          </button>
          <button type="button" className="booking-icon-btn" onClick={() => goMonth(1)} aria-label="Next month">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="booking-calendar-weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="booking-calendar-weekday">
            {label}
          </span>
        ))}
      </div>

      <div className="booking-calendar-grid" role="grid">
        {cells.map((date, index) => {
          if (!date) {
            return <span key={`empty-${index}`} className="booking-day booking-day--empty" />;
          }
          const available = isDateAvailable(date, today);
          const selected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              type="button"
              role="gridcell"
              disabled={!available}
              className={[
                'booking-day',
                selected && 'booking-day--selected',
                isToday && !selected && 'booking-day--today',
                !available && 'booking-day--disabled',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                onSelectDate(date);
              }}
              aria-label={date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              aria-selected={selected}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
