/** Hero showcase carousel — assets & layout from uiwithbugvi.com (Framer carousel) */
export const FRAMER_IMAGES = 'https://framerusercontent.com/images';

export const HERO_CARD_HEIGHT = 356;
export const HERO_CAROUSEL_GAP = 24;
export const HERO_CARD_PADDING_LEFT = 24;

/** 27 slides in reference order; widths from Framer `sizes` at ≥1200px */
export const HERO_SHOWCASE = [
  { label: 'Your Inner Voice', file: 'HcXdVuCnEZXfKp7xmCVUMyQ0mA.png', width: 164.5 },
  { label: 'Menni AI', file: '9h9GhpDCMNvh8FD7bkuC7OFme4.png', width: 238 },
  { label: 'Your Inner Voice', file: 'FkOEiXOGL73abjpdaVCl8uXIio.png', width: 164.5 },
  { label: 'LiftBuddy', file: 'wy5HaQPrX5P1h7q582JAuwjKWh0.png', width: 164.5 },
  { label: 'LiftBuddy', file: 'fAt0n4Nk7Q3xxBNbzTNOXwwEyTo.png', width: 164.5 },
  { label: 'LiftBuddy', file: 'f9Rc5X8skEGyswoBmxezidr6AQI.png', width: 164.5 },
  { label: 'Golden Ops', file: 'fuQFhwtqJAIpsmzL4Q3c4A9otQ.png', width: 200.5 },
  { label: 'Golden Ops', file: 'ckt0rzIcGlfBOVSylEoJUMPDbQ.png', width: 199.5 },
  { label: 'Golden Ops', file: 'MoNF2A3zb8rjVFfVr8kdO8YXnc.png', width: 438.5 },
  { label: 'move', file: 'Cos2uoxr3Eb8B3hEe0h1dBZcVo.png', width: 164.5 },
  { label: 'move', file: 'a0bNfpvWdI16xVw2OIxmUYza3w.png', width: 164.5 },
  { label: 'move', file: 'lSATYEhu3H6KXsYHFJcRbns9M.png', width: 164.5 },
  { label: 'Remembery (team)', file: 'W6LdbIy4KR7iaYA1eWpVFBTdysU.png', width: 164.5 },
  { label: 'The Human Blueprint (team)', file: 'DdLj0dTk4Wx5tfYYsoqCBLM7dI.png', width: 164.5 },
  { label: 'The Human Blueprint (team)', file: 'DMEmLXdz0znjyNHSHw8MdvMvkFE.png', width: 164.5 },
  { label: 'GameGrid', file: '95aJXJTWc9qx5SeDQlwZS6YME4.png', width: 164.5 },
  { label: 'GameGrid', file: 'nwEDd5hpnPQojTWt5TE1EUA9qYw.png', width: 164.5 },
  { label: 'Stock (team)', file: 'ouiWtXiOfyRgA3bUXB6RfiH71NQ.png', width: 164.5 },
  { label: 'Stock (team)', file: 'clqoh5KO1VQlFk61wGb8Uc2zYa0.png', width: 164.5 },
  { label: 'Eventmeet (team)', file: 'SnqMXzQOLUrufhbuWUBntUArFEY.png', width: 560 },
  { label: 'Eventmeet (team)', file: 'BEufq1n094vopOUvae2vAWFi26c.png', width: 164.5 },
  { label: 'Eventmeet (team)', file: 'Y016koZjyjWlfHayWy4m4mOiRoU.png', width: 164.5 },
  { label: 'TheWalt', file: 'eSh40wK8oJX9JEATIuQRQz8MIk.png', width: 560 },
  { label: 'Tecaudex', file: 'd4ZRscK2PXHCzU1fxkg0m6hYy2Q.png', width: 560 },
  { label: 'Sovereign Media', file: 'KsuRVDZIe4Q32F6guX4wpjUY3o.png', width: 415 },
  { label: 'Shift', file: '2sXWEQAGbJAHryvqzOoehzqVMn8.png', width: 501 },
  { label: 'Sovereign Media', file: '0j4rqulfjqJE3gX39CeRF0iw14.png', width: 515 },
].map((item) => ({
  ...item,
  image: `${FRAMER_IMAGES}/${item.file}`,
}));
