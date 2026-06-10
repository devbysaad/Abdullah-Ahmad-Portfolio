import { SERVICE_IMAGES } from './services.constants';

/** Web apps card — layered dashboards like Framer EEOB1 + hero screenshot */
export default function WebIllustration() {
  return (
    <div className="relative mx-auto h-[104px] w-[160px] shrink-0">
      <div
        className="absolute left-1/2 top-6 h-14 w-[87px] -translate-x-1/2 rounded-[7px] bg-illustration-light shadow-[0_4px_12px_var(--color-black-a12)]"
        style={{ transform: 'translateX(-50%) rotate(4deg)' }}
        aria-hidden
      />
      <div
        className="absolute left-1/2 top-6 h-14 w-[87px] -translate-x-1/2 rounded-[7px] bg-illustration-mid shadow-[0_6px_16px_var(--color-black-a14)]"
        style={{ transform: 'translateX(-50%) rotate(8deg)' }}
        aria-hidden
      />
      <img
        src={SERVICE_IMAGES.web}
        alt=""
        loading="lazy"
        decoding="async"
        className="relative z-10 h-full w-full rounded-[5px] object-contain object-center"
      />
    </div>
  );
}
