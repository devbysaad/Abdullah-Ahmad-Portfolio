import { STAT_PHONE_DECOR } from './about.constants';

export default function AboutStatCard({ value, lines, decoration }) {
  return (
    <div
      className="about-stat-card relative flex min-h-[97px] flex-1 flex-col items-center justify-center overflow-hidden rounded-[21px] px-6 py-7"
      data-name="about-stat-card"
    >
      <p
        className="relative z-[1] m-0 text-center font-bold tracking-[0.03em] text-white"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(30px, 4vw, 42px)',
          lineHeight: 1.1,
        }}
      >
        {value}
      </p>
      <div
        className="relative z-[1] mt-1 flex flex-col items-center gap-0 text-center font-semibold"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(8px, 1.2vw, 13px)',
          lineHeight: 1.2,
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
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
