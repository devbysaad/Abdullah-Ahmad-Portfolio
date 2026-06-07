/** uiwithbugvi.com — smooth deceleration, no bounce */
export const premiumEase = [0.22, 1, 0.36, 1];

/** Trigger early so fast scrollers see content without waiting */
export const viewportOnce = { once: true, amount: 0.08, margin: '0px 0px -80px 0px' };

export const fadeIn = {
  hidden: { opacity: 0.001 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.35,
      delay: i * 0.04,
      ease: premiumEase,
    },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0.001, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.03,
      ease: premiumEase,
    },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

/** Fan card pop-up on hover — straighten, lift, scale */
export const serviceFanHover = {
  duration: 0.48,
  ease: premiumEase,
};

export const serviceFanEntrance = {
  hidden: { opacity: 0, y: 72, rotate: 0, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.05,
      ease: premiumEase,
    },
  }),
};

export const serviceFanEntranceMobile = {
  hidden: { opacity: 0, y: 32, rotate: 0, scale: 1 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.06,
      ease: premiumEase,
    },
  }),
};

/** FAQ question — quick pop from top, then static */
export const faqQuestionPop = {
  hidden: { opacity: 0, y: -14, scale: 0.94 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 620,
      damping: 28,
      mass: 0.65,
      delay: i * 0.05,
    },
  }),
};
