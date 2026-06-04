import { Check, Clock, Globe, Video } from 'lucide-react';
import { REFERENCE_PROFILE_IMAGE } from '../about/about.constants';
import { resolveMediaUrl } from '../../lib/mediaUrl';
import {
  BOOKING_EVENT_DESCRIPTION,
  BOOKING_EVENT_TITLE,
  DURATION_OPTIONS,
} from './booking.constants';

export default function BookingSidebar({
  profileImageUrl,
  duration,
  onDurationChange,
  timezone,
  onTimezoneChange,
}) {
  const avatar = resolveMediaUrl(profileImageUrl, REFERENCE_PROFILE_IMAGE);

  return (
    <aside className="booking-sidebar" data-name="booking-sidebar">
      <div className="booking-host">
        <img src={avatar} alt="" className="booking-host-avatar" width={40} height={40} />
        <span className="booking-host-name">Abdullah Ahmad</span>
      </div>

      <h3 className="booking-event-title">{BOOKING_EVENT_TITLE}</h3>
      <p className="booking-event-desc">{BOOKING_EVENT_DESCRIPTION}</p>

      <div className="booking-meta-row">
        <Check size={16} strokeWidth={2} aria-hidden="true" />
        <span>Requires confirmation</span>
      </div>

      <div className="booking-duration" role="group" aria-label="Call duration">
        {DURATION_OPTIONS.map((mins) => (
          <button
            key={mins}
            type="button"
            className={`booking-duration-btn${duration === mins ? ' booking-duration-btn--active' : ''}`}
            onClick={() => onDurationChange(mins)}
            aria-pressed={duration === mins}
          >
            {mins}m
          </button>
        ))}
      </div>

      <div className="booking-meta-row">
        <Video size={16} strokeWidth={2} aria-hidden="true" />
        <span>Google Meet</span>
      </div>

      <div className="booking-meta-row booking-timezone-row">
        <Globe size={16} strokeWidth={2} aria-hidden="true" />
        <select
          className="booking-timezone-select"
          value={timezone}
          onChange={(e) => onTimezoneChange(e.target.value)}
          aria-label="Timezone"
        >
          <option value={timezone}>{timezone}</option>
          <option value="Asia/Karachi">Asia/Karachi</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Dubai">Asia/Dubai</option>
          <option value="UTC">UTC</option>
        </select>
      </div>

      <div className="booking-meta-row booking-meta-row--muted">
        <Clock size={16} strokeWidth={2} aria-hidden="true" />
        <span>{duration} min</span>
      </div>
    </aside>
  );
}
