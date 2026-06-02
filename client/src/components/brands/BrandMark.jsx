import { liftbuddyIcon } from './brands.constants';

export default function BrandMark({ brand }) {
  if (brand.type === 'liftbuddy') {
    return (
      <div className="inline-flex items-center gap-2" data-name={`brand-${brand.key}`}>
        <img
          src={liftbuddyIcon}
          alt=""
          className="h-[28px] w-auto shrink-0"
          aria-hidden="true"
        />
        <span
          className="font-bold leading-none text-black"
          style={{
            fontFamily: '"Clash Display", var(--font-display)',
            fontSize: '18.52px',
          }}
        >
          LiftBuddy
        </span>
      </div>
    );
  }

  if (brand.type === 'lowermyrx') {
    return (
      <div className="inline-flex items-center gap-2" data-name={`brand-${brand.key}`}>
        <img
          src={brand.heartSrc}
          alt=""
          className="h-[22px] w-[22px] shrink-0 object-contain"
          aria-hidden="true"
        />
        <span
          className="font-semibold leading-none text-black"
          style={{
            fontFamily: 'Raleway, var(--font-body)',
            fontSize: '17px',
            fontWeight: 600,
          }}
        >
          LowerMyRx
        </span>
      </div>
    );
  }

  return (
    <img
      src={brand.src}
      alt={brand.alt}
      className="w-auto max-w-none shrink-0 object-contain object-center"
      style={{ height: `${brand.height}px` }}
      data-name={`brand-${brand.key}`}
      loading="lazy"
      decoding="async"
    />
  );
}
