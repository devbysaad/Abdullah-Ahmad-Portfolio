const PANEL_SHADOW =
  '0 0.7065919983928324px 0.49461439887498265px -0.375px var(--color-shadow-a5), 0 1.8065619053231785px 1.264593333726225px -0.75px var(--color-shadow-a5), 0 3.6217592146567767px 2.5352314502597437px -1.125px var(--color-shadow-a5), 0 6.8655999097303715px 4.80591993681126px -1.5px var(--color-shadow-a5), 0 13.646761411524492px 9.552732988067145px -1.875px var(--color-shadow-a5), 0 30px 21px -2.25px var(--color-shadow-a6)';

/**
 * Desktop + mobile device mockups (uiwithbugvi.com selected-work style).
 */
function PlaceholderScreen({ name }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-darker via-gradient-warm-mid to-gradient-warm-end">
      <span className="px-3 text-center font-[family-name:var(--font-display)] text-[clamp(13px,2vw,18px)] font-semibold tracking-tight text-white/85">
        {name}
      </span>
    </div>
  );
}

export default function WorkDeviceShowcase({ imageUrl, alt = '', layout = 'phone-left', name = '' }) {
  const phoneFirst = layout === 'phone-left';
  const hasImage = Boolean(imageUrl);

  return (
    <div
      className="work-device-stage relative mx-auto w-full max-w-[552px]"
      style={{ aspectRatio: '552 / 386', boxShadow: PANEL_SHADOW, borderRadius: '16px' }}
      data-name="work-device-stage"
    >
      {/* Desktop */}
      <div
        className={`work-device-desktop absolute ${phoneFirst ? 'right-0 top-0' : 'left-0 top-0'} z-[1]`}
        style={{ width: '78%', height: '88%' }}
      >
        <div className="work-device-desktop-chrome flex items-center gap-1.5 rounded-t-xl border border-b-0 border-black-a10 bg-surface-chrome px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-window-red" />
          <span className="h-2 w-2 rounded-full bg-window-yellow" />
          <span className="h-2 w-2 rounded-full bg-window-green" />
        </div>
        <div className="work-device-desktop-screen overflow-hidden rounded-b-xl border border-black-a10 bg-white">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={alt}
              className="block h-full w-full object-cover object-top"
              loading="lazy"
            />
          ) : (
            <PlaceholderScreen name={name} />
          )}
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`work-device-phone absolute bottom-0 z-[2] ${phoneFirst ? 'left-0' : 'right-0'}`}
        style={{ width: '28%', maxWidth: '156px' }}
      >
        <div className="rounded-[22px] border-[3px] border-surface-darker bg-surface-darker p-1 shadow-lg">
          <div className="overflow-hidden rounded-[16px] bg-white aspect-[9/19.5]">
            {hasImage ? (
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className="block h-full w-full object-cover object-top"
                loading="lazy"
              />
            ) : (
              <PlaceholderScreen name={name} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
