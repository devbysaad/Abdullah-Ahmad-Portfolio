/** Static site chrome seeded into MongoDB — edit via seed script, not hardcoded in React */

const HERO = {
  greeting: 'Hi, there',
  line1: "I'm Abdullah Ahmad,",
  line2: 'Senior full stack software engineer.',
  subcopy:
    'I ship scalable SaaS and web platforms — daily updates, on-time every time.',
  ctaPrimary: "Let's Ship",
  ctaSecondary: 'Work with me',
  roles: [
    'Senior Full Stack Engineer',
    'SaaS Product Builder',
    'MERN & SvelteKit Expert',
    'Unicorn Platform Dev',
  ],
};

const SECTIONS = {
  brandsLabel: 'Trusted by teams at',
  brandsHeading:
    "I've contributed to industry-leading platforms and shipped products for global startups",
  whyMeTitle: 'WHY ME ?',
  experienceTitle: 'WORK EXPERIENCE (4+ YOE)',
  faqLabel: 'FREQUENTLY ASKED QUESTIONS',
  faqTitle: 'Have a question?',
};

const BRANDS = [
  { key: 'tapforce', name: 'Tapforce', domain: 'tapforce.com', url: 'https://www.tapforce.com', order: 0 },
  { key: 'npc-labs', name: 'NPC Labs', domain: 'npclabs.org', localFile: 'public/brands/npc-labs.png', url: 'https://www.npclabs.org', order: 1 },
  { key: 'nybble', name: 'Nybble', domain: 'nybble.co.uk', url: 'https://www.nybble.co.uk', order: 2 },
  { key: 'dubizzle-labs', name: 'Dubizzle Labs', domain: 'dubizzle.com', url: 'https://www.dubizzle.com', order: 3 },
  { key: 'bayut', name: 'Bayut', domain: 'bayut.com', url: 'https://www.bayut.com', order: 4 },
  { key: 'olx', name: 'OLX', domain: 'olx.com.pk', localFile: 'public/brands/olx.svg', url: 'https://www.olx.com.pk', order: 5 },
  { key: 'zameen', name: 'Zameen', domain: 'zameen.com', url: 'https://www.zameen.com', order: 6 },
  { key: 'autodevice', name: 'AutoDevice', domain: 'autodevice.io', url: 'https://autodevice.io', order: 7 },
  { key: 'social-bevy', name: 'Social Bevy', domain: 'socialbevy.com', localFile: 'public/brands/social-bevy-icon.png', url: 'https://www.socialbevy.com', badge: true, order: 8 },
  { key: 'dropella', name: 'Dropella', domain: 'dropella.io', localFile: 'public/brands/dropella.png', url: 'https://dropella.vercel.app', order: 9 },
];

const EXPERIENCE_COMPANIES = [
  { key: 'tapforce', name: 'Tapforce', domain: 'tapforce.com', linkedin: 'https://www.linkedin.com/company/tapforce', order: 0 },
  { key: 'npc-labs', name: 'NPC Labs', domain: 'npclabs.org', localFile: 'public/brands/npc-labs.png', linkedin: 'https://www.linkedin.com/company/npc-labs-inc', order: 1 },
  { key: 'nybble', name: 'Nybble', domain: 'nybble.co.uk', linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Nybble.co.uk%20Ltd', order: 2 },
  { key: 'dropella', name: 'Dropella', domain: 'dropella.io', localFile: 'public/brands/dropella.png', linkedin: 'https://www.linkedin.com/company/dropellaa', order: 3 },
  { key: 'dubizzle-labs', name: 'Dubizzle Labs', domain: 'dubizzle.com', linkedin: 'https://www.linkedin.com/company/dubizzlelabs', order: 4 },
];

const YOUTUBE_VIDEO_ID = 'NsJcgmyiYfo';

module.exports = {
  HERO,
  SECTIONS,
  BRANDS,
  EXPERIENCE_COMPANIES,
  YOUTUBE_VIDEO_ID,
};
