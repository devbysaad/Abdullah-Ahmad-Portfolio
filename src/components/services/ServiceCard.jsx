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
  const isLight = card.bg === 'var(--color-service-gold)';

  return (
    <article
      className={`service-card group relative flex cursor-default flex-col overflow-hidden rounded-2xl border shrink-0${isLight ? ' service-card--light' : ''}`}
      style={{
        backgroundColor: card.bg,
        boxShadow: CARD_SHADOW,
        borderColor: 'var(--color-gray-a25)',
      }}
    >
      <span
        className="service-card-glow pointer-events-none absolute inset-0 rounded-2xl opacity-0"
        aria-hidden="true"
      />

      <div className="service-card-visual relative z-[1] flex w-full shrink-0 items-center justify-center overflow-hidden">
        {visual}
      </div>

      <div className="service-card-copy relative z-[1] flex w-full flex-col">
        <h3
          className="service-card-title font-[family-name:var(--font-display)] font-semibold leading-tight"
          style={{ color: card.titleColor }}
        >
          {card.title}
        </h3>
        <p className="service-card-desc leading-[1.45]" style={{ color: card.descriptionColor }}>
          {card.description}
        </p>
      </div>
    </article>
  );
}
