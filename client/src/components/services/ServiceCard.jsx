import { CARD_SHADOW } from './services.constants';
import { VisualWebApps, VisualSaaS, VisualFullStack, VisualLead } from './CardVisuals';

const VISUALS = {
  web: <VisualWebApps />,
  mobile: <VisualSaaS />,
  consulting: <VisualFullStack />,
  nocode: <VisualLead />,
};

export default function ServiceCard({ card }) {
  const visual = VISUALS[card.key];
  const isLight = card.bg === '#fece7a';

  return (
    <article
      className={`service-card group relative flex h-[245px] w-[200px] cursor-default flex-col justify-between overflow-hidden rounded-2xl border px-4 pb-4 pt-5 shrink-0${isLight ? ' service-card--light' : ''}`}
      style={{
        backgroundColor: card.bg,
        boxShadow: CARD_SHADOW,
        borderColor: 'rgba(119, 119, 119, 0.25)',
      }}
    >
      <span
        className="service-card-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0"
        aria-hidden="true"
      />

      <div className="relative z-[1] flex h-[108px] w-full shrink-0 items-center justify-center overflow-hidden">
        {visual}
      </div>

      <div className="relative z-[1] flex w-full flex-col gap-0.5">
        <h3
          className="font-[family-name:var(--font-display)] text-[18px] font-semibold leading-tight"
          style={{ color: card.titleColor }}
        >
          {card.title}
        </h3>
        <p className="text-[10.5px] leading-[1.45]" style={{ color: card.descriptionColor }}>
          {card.description}
        </p>
      </div>
    </article>
  );
}
