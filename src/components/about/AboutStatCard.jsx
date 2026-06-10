import { STAT_PHONE_DECOR } from './about.constants';

export default function AboutStatCard({ value, lines, decoration }) {
  return (
    <div className="about-stat-card" data-name="about-stat-card">
      <p className="about-stat-value">{value}</p>
      <div className="about-stat-lines">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>

      {decoration === 'phone' && (
        <img
          src={STAT_PHONE_DECOR}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 right-0 h-[121px] w-auto max-w-[53px] object-contain object-bottom opacity-90"
          loading="lazy"
        />
      )}
    </div>
  );
}
