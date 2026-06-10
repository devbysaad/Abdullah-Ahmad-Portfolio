function LaurelGraphic({ flip = false }) {
  return (
    <img
      src="/laurel-left.svg"
      alt=""
      aria-hidden
      className={`inline-block h-[72px] w-[44px] shrink-0 object-contain md:h-[87px] md:w-[53px] ${
        flip ? '-scale-x-100' : ''
      }`}
    />
  );
}

export function AwardBadge({ lines, sub }) {
  return (
    <div className="inline-flex items-center gap-2 md:gap-3">
      <LaurelGraphic />
      <div className="flex min-w-[110px] flex-col items-center text-center">
        {lines.map((line) => (
          <p
            key={line}
            className="font-[family-name:var(--font-display)] text-[17px] font-bold leading-[20px] tracking-[0.03em] text-black"
          >
            {line}
          </p>
        ))}
        {sub ? (
          <p className="mt-0.5 font-[family-name:var(--font-display)] text-[10.2px] font-semibold leading-[10px] tracking-[0.03em] text-caption">
            {sub}
          </p>
        ) : null}
      </div>
      <LaurelGraphic flip />
    </div>
  );
}

export function StatBadge({ main, sub }) {
  return (
    <div className="inline-flex items-center gap-2 md:gap-3">
      <LaurelGraphic />
      <div className="flex min-w-[110px] flex-col items-center gap-1 text-center">
        <img
          src="/dumbbell.svg"
          alt=""
          aria-hidden
          className="inline-block h-[28px] w-[56px] object-contain md:h-[35px] md:w-[69px]"
        />
        <p className="font-[family-name:var(--font-display)] text-[22.5px] font-bold leading-[26px] tracking-[0.03em] text-black">
          {main}
        </p>
        {sub ? (
          <p className="font-[family-name:var(--font-display)] text-[11px] font-semibold leading-[21px] tracking-[0.03em] text-caption">
            {sub}
          </p>
        ) : null}
      </div>
      <LaurelGraphic flip />
    </div>
  );
}
