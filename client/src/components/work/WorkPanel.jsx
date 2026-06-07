import { WORK_PANELS } from './work.constants';

const PANEL_SHADOW =
  '0 0.7065919983928324px 0.49461439887498265px -0.375px var(--color-shadow-a5), 0 1.8065619053231785px 1.264593333726225px -0.75px var(--color-shadow-a5), 0 3.6217592146567767px 2.5352314502597437px -1.125px var(--color-shadow-a5), 0 6.8655999097303715px 4.80591993681126px -1.5px var(--color-shadow-a5), 0 13.646761411524492px 9.552732988067145px -1.875px var(--color-shadow-a5), 0 30px 21px -2.25px var(--color-shadow-a6)';

export default function WorkPanel({ imageUrl, panelKey, alt = '' }) {
  const src = imageUrl?.trim() || (panelKey && WORK_PANELS[panelKey]);
  if (!src) return null;

  return (
    <div
      className="work-panel relative w-full overflow-hidden rounded-2xl aspect-[552/386] max-h-[420px]"
      style={{ boxShadow: PANEL_SHADOW }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover object-center"
        sizes="(min-width: 1200px) 552px, (min-width: 810px) calc(100vw - 200px), calc(100vw - 40px)"
      />
    </div>
  );
}
