import { CARD_SHADOW } from './services.constants';
import { VisualWebApps, VisualSaaS, VisualFullStack, VisualLead } from './CardVisuals';

const VISUALS = {
  web:        <VisualWebApps />,
  mobile:     <VisualSaaS />,
  consulting: <VisualFullStack />,
  nocode:     <VisualLead />,
};

export default function ServiceCard({ card }) {
  const visual = VISUALS[card.key];

  return (
    <article
      className="flex h-[245px] w-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(119,119,119,0.25)] px-4 pb-4 pt-5"
      style={{ backgroundColor: card.bg, boxShadow: CARD_SHADOW }}
    >
      {/* Visual area */}
      <div className="relative h-[108px] w-full shrink-0 flex items-center justify-center overflow-hidden">
        {visual}
      </div>

      {/* Text area */}
      <div className="flex w-full flex-col gap-0.5">
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
