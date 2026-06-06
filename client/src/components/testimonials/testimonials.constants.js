/** Testimonials — content & order from devnauts.io/testimonials */
export const TESTIMONIALS_LABEL = 'TESTIMONIALS';
export const TESTIMONIALS_TITLE = 'Love letters';

const AAK_ASSETS = 'https://www.aak-tech.dev/assets';
const DEVNAUTS_CLIENTS = 'https://www.devnauts.io/clients';

export const TESTIMONIAL_ORDER = [
  'Alphonso Roundtree',
  'Bilal Bakht Ahmad',
  'Rob Eccles',
  'Saqib Maqsood',
  'Muhammad Hisham',
  'Kelebogile Mooketsi',
  'Salik Javeed',
  'Ahsan Sarwar',
];

export const TESTIMONIAL_AVATARS = {
  alphonso: `${DEVNAUTS_CLIENTS}/alroundtree.jpeg`,
  bilal: `${DEVNAUTS_CLIENTS}/bakht.jpg`,
  rob: `${DEVNAUTS_CLIENTS}/rob.png`,
  saqib: `${DEVNAUTS_CLIENTS}/saqib.jpg`,
  hisham: `${DEVNAUTS_CLIENTS}/hisham.jpg`,
  kelebogile: `${DEVNAUTS_CLIENTS}/Kelebogile.jpeg`,
  salik: `${AAK_ASSETS}/testimonials/salik.jpeg`,
  ahsan: `${AAK_ASSETS}/testimonials/ahsan.jpeg`,
};

export function resolveTestimonialAvatar(avatar) {
  return avatar?.trim() || '';
}

/** Fallback when API is empty — fixed order for marquee */
export const FALLBACK_TESTIMONIALS = [
  {
    name: 'Alphonso Roundtree',
    role: 'Founder & CEO Social Bevy, Former NFL Athlete',
    company: 'Abdullah',
    text: `I had the pleasure of hiring Abdullah and I gotta tell you man, I really enjoyed working with him. He was really fast, really understood the project, and really delivered. I must say that I do plan to continue to work with him. You got my recommendation for sure. Hire Abdullah to take care of your tech needs.`,
    avatar: TESTIMONIAL_AVATARS.alphonso,
    order: 0,
  },
  {
    name: 'Bilal Bakht Ahmad',
    role: 'Founder',
    company: 'AutoDevice.io',
    text: 'Talented, committed, expert on full stack projects',
    avatar: TESTIMONIAL_AVATARS.bilal,
    order: 1,
  },
  {
    name: 'Rob Eccles',
    role: 'Project Development Manager at Nybble',
    company: '',
    text: `I had the pleasure of working with Abdullah on our Pantry Application, and I couldn't be more impressed with his expertise and commitment to delivering a high-quality product. From the start, he demonstrated deep understanding of our requirements and delivered with excellence.`,
    avatar: TESTIMONIAL_AVATARS.rob,
    order: 2,
  },
  {
    name: 'Saqib Maqsood',
    role: 'Head of Data (Europe) at Delivery Hero',
    company: '',
    text: `I couldn't be more satisfied with the work. Abdullah's communication skills, expertise in coding and attention to details are commendable. The follow-ups were timely and thoughtful, showing a genuine commitment to delivering the best possible outcome. Highly recommended!`,
    avatar: TESTIMONIAL_AVATARS.saqib,
    order: 3,
  },
  {
    name: 'Muhammad Hisham',
    role: 'Founder of KWJA Agency and Dropella',
    company: '',
    text: `My experience with Abdullah has been exceptional. He is a true professional and dedicated expert who has worked with unicorn companies worth over 1 BILLION USD!! His efforts are unmatched compared to other agencies I've worked with.`,
    avatar: TESTIMONIAL_AVATARS.hisham,
    order: 4,
  },
  {
    name: 'Kelebogile Mooketsi',
    role: 'Founder @ Good Life Money-Mastery Solutions',
    company: '',
    text: `Wow! What a great team of experts who genuinely care about my work. Proactive and on point to make sure every inch of the development is done right and aligns with the big picture. They go the extra mile and have great attention to detail.`,
    avatar: TESTIMONIAL_AVATARS.kelebogile,
    order: 5,
  },
  {
    name: 'Salik Javeed',
    role: 'Project Manager at Dropella',
    company: '',
    text: `I am pleased to recommend Mr. Abdullah Ahmad, who worked as a Senior Front-End Developer and Team Lead at Dropella since 2023. Throughout his tenure, Abdullah showcased exceptional technical skills and strong leadership abilities. I am confident that Abdullah will continue to achieve excellence in his future endeavors, and I wish him all the best in his career.`,
    avatar: TESTIMONIAL_AVATARS.salik,
    order: 6,
  },
  {
    name: 'Ahsan Sarwar',
    role: 'Senior Full-Stack Developer at Dropella',
    company: '',
    text: `Abdullah is one of the most talented and hardworking software engineers I have worked with, and it has been an absolute pleasure. What sets him apart is his sense of responsibility and honesty in his work. Having collaborated on numerous projects with him, I can say he is someone you can always trust to get the job done right.`,
    avatar: TESTIMONIAL_AVATARS.ahsan,
    order: 7,
  },
];

export function normalizeTestimonials(testimonials) {
  const byName = new Map(FALLBACK_TESTIMONIALS.map((t) => [t.name, { ...t }]));

  for (const item of testimonials || []) {
    if (!item?.name) continue;
    const existing = byName.get(item.name);
    byName.set(item.name, { ...existing, ...item });
  }

  return TESTIMONIAL_ORDER.map((name, order) => {
    const item = byName.get(name);
    return item ? { ...item, order } : null;
  }).filter(Boolean);
}

export function formatTestimonialRole(role, company) {
  if (!company?.trim()) return role;
  return `${role}, ${company}`;
}

export function splitTestimonialParagraphs(text) {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
