/** Testimonials — uiwithbugvi.com layout; avatars from aak-tech.dev (bundled in /public/testimonials) */
export const TESTIMONIALS_LABEL = 'TESTIMONIALS';
export const TESTIMONIALS_TITLE = 'Love letters';

/** Served from client/public/testimonials (fetched from https://www.aak-tech.dev/assets/testimonials/) */
export const TESTIMONIAL_AVATARS = {
  rob: '/testimonials/rob.png',
  saqib: '/testimonials/saqib.jpeg',
  salik: '/testimonials/salik.jpeg',
  ahsan: '/testimonials/ahsan.jpeg',
  hisham: '/testimonials/hisham.webp',
};

/** Map legacy aak-tech.dev (or other) URLs to bundled local assets */
export function resolveTestimonialAvatar(avatar) {
  if (!avatar?.trim()) return '';
  const value = avatar.trim();
  if (value.startsWith('/testimonials/')) return value;
  for (const local of Object.values(TESTIMONIAL_AVATARS)) {
    const file = local.split('/').pop();
    if (file && value.includes(file)) return local;
  }
  return value;
}

/** Fallback when API is empty */
export const FALLBACK_TESTIMONIALS = [
  {
    name: 'Rob Eccles',
    role: 'IT Manager at Nybble IT',
    company: '',
    text: `Abdullah Ahmad delivered exceptional services that exceeded my expectations. Working with him was a delight due to his politeness. Abdullah is a star. He was very polite, knowledgeable about the requirements and went above and beyond to help us. Highly recommend!`,
    avatar: TESTIMONIAL_AVATARS.rob,
    order: 0,
  },
  {
    name: 'Saqib Maqsood',
    role: 'Product Owner of Web Polygon Selector',
    company: '',
    text: `I couldn't be more satisfied with the work. Abdullah's communication skills, expertise in coding and attention to details are commendable. The follow-ups were timely and thoughtful, showing a genuine commitment to delivering the best possible outcome. Highly recommended!`,
    avatar: TESTIMONIAL_AVATARS.saqib,
    order: 1,
  },
  {
    name: 'Salik Javeed',
    role: 'Project Manager at Dropella',
    company: '',
    text: `I am pleased to recommend Mr. Abdullah Ahmad, who worked as a Senior Front-End Developer and Team Lead at Dropella since 2023. Throughout his tenure, Abdullah showcased exceptional technical skills and strong leadership abilities. I am confident that Abdullah will continue to achieve excellence in his future endeavors, and I wish him all the best in his career.`,
    avatar: TESTIMONIAL_AVATARS.salik,
    order: 2,
  },
  {
    name: 'Ahsan Sarwar',
    role: 'Senior Full-Stack Developer at Dropella',
    company: '',
    text: `Abdullah is one of the most talented and hardworking software engineers I have worked with, and it has been an absolute pleasure. What sets him apart is his sense of responsibility and honesty in his work. Having collaborated on numerous projects with him, I can say he is someone you can always trust to get the job done right.`,
    avatar: TESTIMONIAL_AVATARS.ahsan,
    order: 3,
  },
  {
    name: 'Muhammad Hisham',
    role: 'Product Owner of Dropella',
    company: '',
    text: `My experience with Abdullah has been exceptional. He is a true gentleman and a dedicated professional who has worked with unicorn companies worth over 1 BILLION USD!! His efforts are unmatched compared to other sellers on Fiverr.`,
    avatar: TESTIMONIAL_AVATARS.hisham,
    order: 4,
  },
];

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
