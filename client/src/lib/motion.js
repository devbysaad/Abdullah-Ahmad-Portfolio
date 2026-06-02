export const fadeIn = {
  hidden: { opacity: 0.001 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.3 + i * 0.08,
      ease: [0.44, 0, 0.56, 1],
    },
  }),
};

export const viewportOnce = { once: true, amount: 0.25 };

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};
