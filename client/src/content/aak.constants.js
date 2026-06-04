/** Fallback content from https://www.aak-tech.dev/ when API is empty */

export const HERO_GREETING = 'Hi, there';
export const HERO_LINE_1 = "I'm Abdullah Ahmad,";
export const HERO_LINE_2 = 'Senior full stack software engineer.';
export const HERO_SUBCOPY =
  'I help businesses ship scalable SaaS products, from idea to production — with daily updates and on-time delivery.';
export const HERO_CTA_PRIMARY = "Let's Ship";
export const HERO_CTA_SECONDARY = 'Work with me';

export const WHY_ME_TITLE = 'WHY ME ?';
export const EXPERIENCE_TITLE = 'WORK EXPERIENCE (2+ YOE)';
export const SKILLS_TITLE = 'SKILLS';

/** Local fallback in public/; production profile comes from Cloudinary via API */
export const DEFAULT_PROFILE_IMAGE = '/abdullah.avif';

export const DEFAULT_WHY_ME_INTRO =
  'Full stack engineer focused on scalable SaaS and product delivery. I have shipped for Zameen.com and Bayut.com, partnered with 20+ clients, and work across SvelteKit, Next.js, Supabase, and the MERN stack—with clear requirements, daily updates, and on-time releases.';

export const DEFAULT_HIGHLIGHTS = [
  {
    title: 'Proven Track Record',
    description:
      'Successfully collaborated with 20+ satisfied clients, consistently delivering exceptional results.',
  },
  {
    title: 'Extensive Experience',
    description:
      'Contributed to industry-leading platforms like Zameen.com and Bayut.com, demonstrating my ability to handle high-impact projects.',
  },
  {
    title: 'Professional Expertise',
    description:
      'Bringing over two years of hands-on experience in developing robust, scalable applications.',
  },
  {
    title: 'Unmatched Work Ethic',
    description:
      'Known for my dedication, reliability, and commitment to delivering top-tier solutions on time.',
  },
  {
    title: 'Effective Communication',
    description:
      'Prioritizing transparency and active collaboration to ensure project success.',
  },
  {
    title: 'Track Record of Innovation',
    description:
      'Created 12+ cutting-edge applications, showcasing a diverse skill set and adaptability to various project needs.',
  },
];

export const DEFAULT_SKILLS = [
  'Next.js',
  'Node.js',
  'Express.js',
  'React.js',
  'TypeScript',
  'SvelteKit',
  'Supabase',
  'MongoDB',
  'PostgreSQL',
  'Tailwind',
  'AWS S3',
  'Stripe',
  'Redis',
  'MERN Stack',
  'Liveblocks',
  'REST APIs',
];

export const DEFAULT_FAQ_ITEMS = [
  {
    q: 'What services do you provide?',
    a: 'I provide full stack development for SaaS applications, including frontend development with React, backend APIs with Node.js, database design, cloud integration, and DevOps support.',
    variant: 'grey',
  },
  {
    q: 'Do you offer custom SaaS solutions?',
    a: 'Yes, I specialize in building custom SaaS solutions tailored to your business needs. This includes scalable architectures, cloud deployments, and multi-tenant applications.',
    variant: 'grey',
  },
  {
    q: 'What are your rates?',
    a: 'My rates vary based on the complexity and duration of the project. I offer both fixed pricing for small projects and hourly rates for ongoing work, which are discussed during the initial consultation.',
    variant: 'black',
  },
  {
    q: 'What technologies do you work with?',
    a: 'I work with React, Node.js, Express, MongoDB, SvelteKit, Supabase, PostgreSQL, AWS, Docker, and CI/CD pipelines for full stack SaaS development.',
    variant: 'black',
  },
];
