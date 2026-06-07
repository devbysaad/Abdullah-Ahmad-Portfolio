/** Testimonials — content & order from devnauts.io/testimonials */
export const TESTIMONIALS_LABEL = 'TESTIMONIALS';
export const TESTIMONIALS_TITLE = 'Love letters';

const DEVNAUTS_CLIENTS = 'https://www.devnauts.io/clients';
const AAK_ASSETS = 'https://www.aak-tech.dev/assets';

export const TESTIMONIAL_ORDER = [
  'Alphonso Roundtree',
  'Rob Eccles',
  'Kelebogile Mooketsi',
  'Saqib Maqsood',
  'Muhammad Hisham',
  'Saiyed Sarosh Anis',
  'Bilal Bakht Ahmad',
  'Salik Javeed',
  'Ahsan Sarwar',
];

export const TESTIMONIAL_FLAG_BASE =
  'https://purecatamphetamine.github.io/country-flag-icons/3x2';

export function testimonialFlagUrl(countryCode) {
  const code = countryCode?.trim().toUpperCase();
  if (!code) return '';
  return `${TESTIMONIAL_FLAG_BASE}/${code}.svg`;
}

export const TESTIMONIAL_AVATARS = {
  alphonso: `${DEVNAUTS_CLIENTS}/alroundtree.jpeg`,
  rob: `${DEVNAUTS_CLIENTS}/rob.png`,
  kelebogile: `${DEVNAUTS_CLIENTS}/Kelebogile.jpeg`,
  saqib: `${DEVNAUTS_CLIENTS}/saqib.jpg`,
  hisham: `${DEVNAUTS_CLIENTS}/hisham.jpg`,
  sarosh: `${DEVNAUTS_CLIENTS}/sarosh.jpg`,
  bilal: `${DEVNAUTS_CLIENTS}/bakht.jpg`,
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
    company: '',
    profileUrl: 'https://www.linkedin.com/in/alphonsoroundtree/',
    countryCode: 'US',
    text: `I had the pleasure of hiring Abdullah and I gotta tell you man, I really enjoyed working with him. He was really fast, really understood the project, and really delivered. I must say that I do plan to continue to work with him. You got my recommendation for sure. Hire Abdullah to take care of your tech needs.`,
    avatar: TESTIMONIAL_AVATARS.alphonso,
    order: 0,
  },
  {
    name: 'Rob Eccles',
    role: 'Project Development Manager at Nybble',
    company: '',
    profileUrl: 'https://nybble.co.uk/team/rob-eccles/',
    countryCode: 'GB',
    text: `I had the pleasure of working with Abdullah on our Pantry Application, and I couldn't be more impressed with his expertise and commitment to delivering a high-quality product. From the start, he demonstrated a deep understanding of our project requirements, ensuring every technical detail was addressed. His skills in the technology stack were top-notch, and he consistently provided innovative solutions to challenges, streamlining our application's functionality beyond what we initially envisioned. His proactive approach, strong communication skills, and dedication to excellence made him an invaluable asset to our team. I highly recommend Abdullah for any development project — his brilliance and professionalism set him apart!`,
    avatar: TESTIMONIAL_AVATARS.rob,
    order: 1,
  },
  {
    name: 'Kelebogile Mooketsi',
    role: 'Founder @ Good Life Money-Mastery Solutions',
    company: '',
    profileUrl: 'https://kelebogile.me/',
    countryCode: 'ZA',
    text: `Wow! What a great expert who genuinely cares about my work. Proactive and on point to make sure every inch of the development is done right and aligns with the big picture. Abdullah goes the extra mile and has great and timely communication skills. This is the developer to pick for your backend project. I look forward to more milestones in my project with him.`,
    avatar: TESTIMONIAL_AVATARS.kelebogile,
    order: 2,
  },
  {
    name: 'Saqib Maqsood',
    role: 'Head of Data (Europe) at Delivery Hero',
    company: '',
    profileUrl: 'https://www.linkedin.com/in/saqibawan112/',
    countryCode: 'DE',
    text: `I couldn't be more satisfied with the work. Abdullah's communication skills, expertise in coding and attention to details are commendable. The follow-ups were timely and thoughtful, showing a genuine commitment to delivering the best possible outcome. Highly recommended!`,
    avatar: TESTIMONIAL_AVATARS.saqib,
    order: 3,
  },
  {
    name: 'Muhammad Hisham',
    role: 'Founder of KWJA Agency and Dropella',
    company: '',
    profileUrl: 'https://www.linkedin.com/in/hisham-kwja/',
    countryCode: 'MY',
    text: `My experience with Abdullah has been exceptional. He is a true professional and dedicated expert who has worked with unicorn companies worth over 1 BILLION USD!! His efforts are unmatched compared to other agencies on Fiverr.`,
    avatar: TESTIMONIAL_AVATARS.hisham,
    order: 4,
  },
  {
    name: 'Saiyed Sarosh Anis',
    role: 'Founder @ Drico Digital',
    company: '',
    profileUrl: 'https://www.linkedin.com/in/saiyedsaroshanis/',
    countryCode: 'CA',
    text: `I had the pleasure of working with Abdullah, and I must say he is a thorough professional. He not only completed all the tasks on time but also created my website with exceptional precision. Abdullah clearly understood what I was looking for and delivered exactly what I needed. His dedication and attention to detail made the entire process smooth and stress-free. I highly recommend his services!`,
    avatar: TESTIMONIAL_AVATARS.sarosh,
    order: 5,
  },
  {
    name: 'Bilal Bakht Ahmad',
    role: 'Founder',
    company: 'AutoDevice.io',
    profileUrl: 'https://www.linkedin.com/in/bilalba/',
    countryCode: 'US',
    text: 'Talented, committed, expert on full stack projects',
    avatar: TESTIMONIAL_AVATARS.bilal,
    order: 6,
  },
  {
    name: 'Salik Javeed',
    role: 'Project Manager at Dropella',
    company: '',
    profileUrl: '',
    countryCode: 'PK',
    text: `I am pleased to recommend Mr. Abdullah Ahmad, who worked as a Senior Front-End Developer and Team Lead at Dropella since 2023. Throughout his tenure, Abdullah showcased exceptional technical skills and strong leadership abilities. I am confident that Abdullah will continue to achieve excellence in his future endeavors, and I wish him all the best in his career.`,
    avatar: TESTIMONIAL_AVATARS.salik,
    order: 7,
  },
  {
    name: 'Ahsan Sarwar',
    role: 'Senior Full-Stack Developer at Dropella',
    company: '',
    profileUrl: '',
    countryCode: 'PK',
    text: `Abdullah is one of the most talented and hardworking software engineers I have worked with, and it has been an absolute pleasure. What sets him apart is his sense of responsibility and honesty in his work. Having collaborated on numerous projects with him, I can say he is someone you can always trust to get the job done right.`,
    avatar: TESTIMONIAL_AVATARS.ahsan,
    order: 8,
  },
];

export function normalizeTestimonials(testimonials) {
  const byName = new Map(FALLBACK_TESTIMONIALS.map((t) => [t.name, { ...t }]));

  for (const item of testimonials || []) {
    if (!item?.name) continue;
    const existing = byName.get(item.name) || {};
    byName.set(item.name, {
      ...existing,
      ...item,
      profileUrl: item.profileUrl?.trim() || existing.profileUrl || '',
      countryCode: item.countryCode?.trim() || existing.countryCode || '',
    });
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
