/** Brand marquee — order & assets from uiwithbugvi.com (Framer “Logos” ticker) */
const FRAMER = 'https://framerusercontent.com/images';

import tecaudex from '../../assets/brands/tecaudex.svg';
import simplification from '../../assets/brands/simplification.svg';
import thewalt from '../../assets/brands/thewalt.svg';
import goldenOps from '../../assets/brands/golden-ops.svg';
import liftbuddyIcon from '../../assets/brands/liftbuddy-icon.svg';

export const BRANDS_HEADING = "Over the years, I've collaborated with some amazing brands";

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
