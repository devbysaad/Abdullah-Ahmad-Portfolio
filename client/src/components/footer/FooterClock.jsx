import { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';
import { FOOTER_LOCATION, FOOTER_TIMEZONE } from './footer.constants';

function formatLahoreTime(date) {
  return date.toLocaleTimeString('en-US', {
    timeZone: FOOTER_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function FooterClock() {
  const [time, setTime] = useState(() => formatLahoreTime(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatLahoreTime(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="footer-bar-meta" data-name="footer-clock">
      <span>
        {FOOTER_LOCATION} {time}
      </span>
      <Cloud size={16} strokeWidth={1.75} className="footer-bar-weather" aria-hidden="true" />
    </span>
  );
}
