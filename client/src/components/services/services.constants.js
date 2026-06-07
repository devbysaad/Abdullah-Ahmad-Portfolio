/** Card fan layout + assets from uiwithbugvi.com (Framer 2hZVO component) */
const FRAMER = 'https://framerusercontent.com/images';

export const SERVICE_IMAGES = {
  /** Dashboard mockup (Web apps card) */
  web: `${FRAMER}/HYXL85Ca5ekMek0aQbYB45chjM.png`,
  mobile: `${FRAMER}/Rf2RARuV6kho3HJuHJF8q0Pk.png`,
  consulting: `${FRAMER}/ypJVVdgAZv4JMrI5N2nGz8LLxMg.png`,
  /** No-code tools panel — same Framer asset as reference site */
  nocode: `${FRAMER}/HYXL85Ca5ekMek0aQbYB45chjM.png`,
};

export const CARD_SHADOW =
  '0 0.7065919983928324px 0.49461439887498265px -0.375px var(--color-shadow-a5), 0 1.8065619053231785px 1.264593333726225px -0.75px var(--color-shadow-a5), 0 3.6217592146567767px 2.5352314502597437px -1.125px var(--color-shadow-a5), 0 6.8655999097303715px 4.80591993681126px -1.5px var(--color-shadow-a5), 0 13.646761411524492px 9.552732988067145px -1.875px var(--color-shadow-a5), 0 30px 21px -2.25px var(--color-shadow-a6)';

export const CARD_SHADOW_HOVER =
  '0 12px 32px var(--color-black-a14), 0 28px 56px var(--color-primary-a10), 0 0 0 1px var(--color-white-a8)';

/** Default copy; API may override title/description by card index */
export const SERVICE_CARDS = [
  {
    key: 'web',
    title: 'Web apps.',
    description: 'Sleek, responsive products — from SaaS dashboards to marketplace features at scale.',
    bg: 'var(--color-service-teal)',
    titleColor: 'var(--color-white)',
    descriptionColor: 'var(--color-white-a60)',
    image: SERVICE_IMAGES.web,
    imagePosition: 'center',
    rotate: -8,
    left: 0,
    right: null,
    zIndex: 1,
  },
  {
    key: 'mobile',
    title: 'SaaS builds.',
    description: 'Stripe, Supabase, multi-tenant flows — shipped Dropella, DeltaTest & more end-to-end.',
    bg: 'var(--color-service-gold)',
    titleColor: 'var(--color-black)',
    descriptionColor: 'var(--color-muted)',
    image: SERVICE_IMAGES.mobile,
    imagePosition: 'center top',
    rotate: 8,
    left: 170,
    right: null,
    zIndex: 2,
  },
  {
    key: 'consulting',
    title: 'Full stack.',
    description: 'Next.js, SvelteKit, MERN & Node APIs — daily updates and on-time delivery.',
    bg: 'var(--color-service-plum)',
    titleColor: 'var(--color-white)',
    descriptionColor: 'var(--color-white-a60)',
    image: SERVICE_IMAGES.consulting,
    imagePosition: 'center',
    rotate: -6,
    left: null,
    right: 155,
    zIndex: 3,
  },
  {
    key: 'nocode',
    title: 'Scale & lead.',
    description: 'Legacy migrations, Redis perf wins, and leading teams to production launches.',
    bg: 'var(--color-service-indigo)',
    titleColor: 'var(--color-white)',
    descriptionColor: 'var(--color-white-a60)',
    image: SERVICE_IMAGES.nocode,
    imagePosition: 'center',
    rotate: 8,
    left: null,
    right: 0,
    zIndex: 4,
  },
];
