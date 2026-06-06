/** Brand marquee — order & assets from uiwithbugvi.com (Framer “Logos” ticker) */
const FRAMER = 'https://framerusercontent.com/images';

import tecaudex from '../../assets/brands/tecaudex.svg';
import simplification from '../../assets/brands/simplification.svg';
import thewalt from '../../assets/brands/thewalt.svg';
import goldenOps from '../../assets/brands/golden-ops.svg';
import liftbuddyIcon from '../../assets/brands/liftbuddy-icon.svg';

export const BRANDS_HEADING =
  "I've contributed to industry-leading platforms and shipped products for global startups";

/**
 * Companies Abdullah has worked with — rendered as a logo strip.
 * Logos load via Google favicon / site favicon; missing logos fall back to wordmark.
 */
export const COLLAB_BRANDS = [
  { key: 'dubizzle-labs', name: 'Dubizzle Labs', domain: 'dubizzle.com' },
  { key: 'olx', name: 'OLX', domain: 'olx.com' },
  { key: 'zameen', name: 'Zameen', domain: 'zameen.com' },
  { key: 'bayut', name: 'Bayut', domain: 'bayut.com' },
  { key: 'npc-labs', name: 'NPC Labs', domain: 'npclabs.org' },
  { key: 'tapforce', name: 'Tapforce', domain: 'tapforce.com' },
  { key: 'autodevice', name: 'AutoDevice', domain: 'autodevice.io' },
  { key: 'nybble', name: 'Nybble', domain: 'nybble.co.uk' },
  { key: 'social-bevy', name: 'Social Bevy', domain: 'socialbevy.com' },
  { key: 'dropella', name: 'Dropella', domain: 'dropella.io' },
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
