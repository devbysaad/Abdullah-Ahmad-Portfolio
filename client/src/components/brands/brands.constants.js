/** Brand marquee — order & assets from uiwithbugvi.com (Framer “Logos” ticker) */
const FRAMER = 'https://framerusercontent.com/images';

import tecaudex from '../../assets/brands/tecaudex.svg';
import simplification from '../../assets/brands/simplification.svg';
import thewalt from '../../assets/brands/thewalt.svg';
import goldenOps from '../../assets/brands/golden-ops.svg';
import liftbuddyIcon from '../../assets/brands/liftbuddy-icon.svg';
import npcLabsLogo from '../../assets/brands/npc-labs.png';
import dropellaLogo from '../../assets/brands/dropella.png';
import socialBevyLogo from '../../assets/brands/social-bevy-icon.png';
import olxLogo from '../../assets/brands/olx.svg';

export const BRANDS_HEADING =
  "I've contributed to industry-leading platforms and shipped products for global startups";

/**
 * Companies Abdullah has worked with — logo strip (exact order).
 * Local assets for NPC Labs, Dropella, and Social Bevy; others load via domain favicon.
 */
export const COLLAB_BRANDS = [
  {
    key: 'tapforce',
    name: 'Tapforce',
    domain: 'tapforce.com',
    url: 'https://www.tapforce.com',
  },
  {
    key: 'npc-labs',
    name: 'NPC Labs',
    domain: 'npclabs.org',
    logo: npcLabsLogo,
    url: 'https://www.npclabs.org',
  },
  {
    key: 'nybble',
    name: 'Nybble',
    domain: 'nybble.co.uk',
    url: 'https://www.nybble.co.uk',
  },
  {
    key: 'dubizzle-labs',
    name: 'Dubizzle Labs',
    domain: 'dubizzle.com',
    url: 'https://www.dubizzle.com',
  },
  {
    key: 'bayut',
    name: 'Bayut',
    domain: 'bayut.com',
    url: 'https://www.bayut.com',
  },
  {
    key: 'olx',
    name: 'OLX',
    domain: 'olx.com.pk',
    logo: olxLogo,
    url: 'https://www.olx.com.pk',
  },
  {
    key: 'zameen',
    name: 'Zameen',
    domain: 'zameen.com',
    url: 'https://www.zameen.com',
  },
  {
    key: 'autodevice',
    name: 'AutoDevice',
    domain: 'autodevice.io',
    url: 'https://autodevice.io',
  },
  {
    key: 'social-bevy',
    name: 'Social Bevy',
    domain: 'socialbevy.com',
    logo: socialBevyLogo,
    badge: true,
    url: 'https://www.socialbevy.com',
  },
  {
    key: 'dropella',
    name: 'Dropella',
    domain: 'dropella.io',
    logo: dropellaLogo,
    url: 'https://dropella.vercel.app',
  },
];

export const BRAND_MARKS = [
  { key: 'tecaudex', type: 'image', src: tecaudex, alt: 'Tecaudex', height: 29 },
  {
    key: 'grinta',
    type: 'image',
    src: `${FRAMER}/9jKrOVCciBUYpRQaEAmt1jQvFQE.png`,
    alt: 'GRINTA',
    height: 32,
  },
  { key: 'liftbuddy', type: 'liftbuddy', alt: 'LiftBuddy' },
  { key: 'simplification', type: 'image', src: simplification, alt: 'Simplification', height: 36 },
  {
    key: 'lowermyrx',
    type: 'lowermyrx',
    heartSrc: `${FRAMER}/ZfeWnD5OAIeLXWyhQwHGF1vAXt0.png`,
    alt: 'LowerMyRx',
  },
  { key: 'thewalt', type: 'image', src: thewalt, alt: 'The Walt', height: 20 },
  { key: 'golden-ops', type: 'image', src: goldenOps, alt: 'Golden Ops', height: 28 },
  {
    key: 'smi',
    type: 'image',
    src: `${FRAMER}/QIR3SmVRR47KMX65PrMLUii0wbk.png`,
    alt: 'SMI',
    height: 28,
  },
];

export { liftbuddyIcon };
