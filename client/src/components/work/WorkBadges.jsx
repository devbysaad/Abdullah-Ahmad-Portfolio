import laurelSvg from '../../assets/laurel-left.svg?raw';
import dumbbellSvg from '../../assets/dumbbell.svg?raw';

function LaurelGraphic({ flip = false }) {
  return (
    <span
      className={`inline-flex h-[72px] w-[44px] shrink-0 md:h-[87px] md:w-[53px] [&_svg]:h-full [&_svg]:w-full ${
        flip ? '-scale-x-100' : ''
      }`}
      aria-hidden
      dangerouslySetInnerHTML={{ __html: laurelSvg }}
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
          <p className="mt-0.5 font-[family-name:var(--font-display)] text-[10.2px] font-semibold leading-[10px] tracking-[0.03em] text-[#797b7c]">
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
        <span
          className="inline-flex h-[28px] w-[56px] md:h-[35px] md:w-[69px] [&_svg]:h-full [&_svg]:w-full"
          aria-hidden
          dangerouslySetInnerHTML={{ __html: dumbbellSvg }}
        />
        <p className="font-[family-name:var(--font-display)] text-[22.5px] font-bold leading-[26px] tracking-[0.03em] text-black">
          {main}
        </p>
        {sub ? (
          <p className="font-[family-name:var(--font-display)] text-[11px] font-semibold leading-[21px] tracking-[0.03em] text-[#797b7c]">
            {sub}
          </p>
        ) : null}
      </div>
      <LaurelGraphic flip />
    </div>
  );
}
