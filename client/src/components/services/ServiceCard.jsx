import { CARD_SHADOW } from './services.constants';

export default function ServiceCard({ card }) {
  return (
    <article
      className="flex h-[245px] w-[200px] flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(119,119,119,0.25)] px-4 pb-4 pt-6"
      style={{
        backgroundColor: card.bg,
        color: card.titleColor,
        boxShadow: CARD_SHADOW,
      }}
    >
      <div className="relative mx-auto h-[104px] w-[160px] shrink-0">
        <img
          src={card.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-[5px] object-contain"
          style={{ objectPosition: card.imagePosition || 'center' }}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <h3
          className="font-[family-name:var(--font-display)] text-[18px] font-semibold leading-tight"
          style={{ color: card.titleColor }}
        >
          {card.title}
        </h3>
        <p
          className="text-[11px] leading-[1.45]"
          style={{ color: card.descriptionColor }}
        >
          {card.description}
        </p>
      </div>
    </article>
  );
}
