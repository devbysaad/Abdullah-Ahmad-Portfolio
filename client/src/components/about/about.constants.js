/** About / “drumroll” — layout & assets from uiwithbugvi.com */
const FRAMER = 'https://framerusercontent.com/images';

/** Hassan profile photo (reference site) — fallback when admin has no image */
export const REFERENCE_PROFILE_IMAGE = `${FRAMER}/eBm5wYezkYOY3b7kYReVxx6HVo.png`;

/** iPhone decoration on downloads / apps stat card */
export const STAT_PHONE_DECOR = `${FRAMER}/Ug5v6flKtGwbk0rzaKgz426w5Q.png`;

export const ABOUT_LABEL = 'MEET ABDULLAH';
export const ABOUT_TITLE = '*drumroll*';

export const DEFAULT_STATS = [
  {
    key: 'years',
    value: '2+',
    lines: ['Years in', 'Engineering'],
  },
  {
    key: 'projects',
    value: '30+',
    lines: ['Completed', 'Projects'],
  },
  {
    key: 'apps',
    value: '12+',
    lines: ['Applications', 'Built'],
    decoration: 'phone',
  },
];

export const DEFAULT_BIO_PARAGRAPHS = [
  {
    text: "Hellooo! I'm Abdullah Ahmad, a senior full stack software engineer from Pakistan with an experience of **2+ years in engineering**. I help transform ideas into functioning products!",
    highlights: ['2+ years in engineering'],
  },
  {
    text: 'I have headlined **~30+ projects** and helped teams ship products that scale. The idea of taking products from scratch and building them is what excites me!',
    highlights: ['~30+ projects'],
  },
  {
    text: "Why choose me? Because I'm very passionate to make you win. Because, after all, **your win is my win.**",
    highlights: ['your win is my win.'],
  },
];
