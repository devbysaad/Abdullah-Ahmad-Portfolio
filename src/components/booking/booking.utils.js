import { AVAILABLE_WEEKDAYS, SLOT_END_HOUR, SLOT_INTERVAL_MIN, SLOT_START_HOUR } from './booking.constants';

export function getDefaultTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Karachi';
  } catch {
    return 'Asia/Karachi';
  }
}

export function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isDateAvailable(date, today = new Date()) {
  const day = startOfDay(date);
  const now = startOfDay(today);
  if (day < now) return false;
  const max = new Date(now);
  max.setDate(max.getDate() + 60);
  if (day > max) return false;
  return AVAILABLE_WEEKDAYS.includes(day.getDay());
}

export function buildCalendarMonth(year, month) {
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startPad; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function formatMonthYear(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function formatSelectedDay(date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
}

export function formatAppointmentSummary(date, time, duration, use24h) {
  const [h, m] = time.split(':').map(Number);
  const start = new Date(date);
  start.setHours(h, m, 0, 0);
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + duration);
  const dateStr = start.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const opts = { hour: 'numeric', minute: '2-digit', hour12: !use24h };
  const timeStr = `${start.toLocaleTimeString('en-US', opts)} – ${end.toLocaleTimeString('en-US', opts)}`;
  return { dateStr, timeStr };
}

export function buildTimeSlots(date, today = new Date()) {
  const slots = [];
  for (let hour = SLOT_START_HOUR; hour < SLOT_END_HOUR; hour += 1) {
    for (let min = 0; min < 60; min += SLOT_INTERVAL_MIN) {
      if (hour === SLOT_END_HOUR - 1 && min >= 30) break;
      const hh = String(hour).padStart(2, '0');
      const mm = String(min).padStart(2, '0');
      const value = `${hh}:${mm}`;
      if (isSlotPast(date, value, today)) continue;
      slots.push(value);
    }
  }
  return slots;
}

function isSlotPast(date, time, today) {
  if (!isSameDay(date, today)) return false;
  const [h, m] = time.split(':').map(Number);
  const slot = new Date(date);
  slot.setHours(h, m, 0, 0);
  return slot <= today;
}

export function formatSlotLabel(time, use24h) {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !use24h,
  });
}

export function toISODateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
