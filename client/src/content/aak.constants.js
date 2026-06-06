/** Fallback content from https://www.aak-tech.dev/ when API is empty */

export const HERO_GREETING = 'Hi, there';
export const HERO_LINE_1 = "I'm Abdullah Ahmad,";
export const HERO_LINE_2 = 'Senior full stack software engineer.';
export const HERO_SUBCOPY =
  'I help businesses ship scalable SaaS products, from idea to production — with daily updates and on-time delivery.';
export const HERO_CTA_PRIMARY = "Let's Ship";
export const HERO_CTA_SECONDARY = 'Work with me';

export const WHY_ME_TITLE = 'WHY ME ?';
export const EXPERIENCE_TITLE = 'WORK EXPERIENCE (4+ YOE)';
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
      'Bringing over four years of hands-on experience in developing robust, scalable applications.',
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

/** Experience-section company pills → logo + link to the company's LinkedIn page */
export const EXPERIENCE_COMPANIES = [
  { key: 'tapforce', name: 'Tapforce', domain: 'tapforce.com', linkedin: 'https://www.linkedin.com/company/tapforce' },
  { key: 'npc-labs', name: 'NPC Labs', domain: 'npclabs.org', linkedin: 'https://www.linkedin.com/company/npc-labs-inc' },
  { key: 'nybble', name: 'Nybble', domain: 'nybble.co.uk', linkedin: 'https://www.linkedin.com/search/results/all/?keywords=Nybble.co.uk%20Ltd' },
  { key: 'dropella', name: 'Dropella', domain: 'dropella.io', linkedin: 'https://www.linkedin.com/company/dropellaa' },
  { key: 'dubizzle-labs', name: 'Dubizzle Labs', domain: 'dubizzle.com', linkedin: 'https://www.linkedin.com/company/dubizzlelabs' },
];

/** Shown when /api/projects is unavailable or empty */
export const FALLBACK_PROJECTS = [
  {
    _id: 'proj-fallback-0',
    name: 'Basemint',
    description:
      'Basemint is a social hub for artists to collaborate on drawings, pixel by pixel, and share them with the world.',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'ShadCN', 'MongoDB', 'Liveblocks'],
    imageUrl: 'https://www.aak-tech.dev/assets/projects/basemint-project.png',
    order: 0,
  },
  {
    _id: 'proj-fallback-1',
    name: 'Auto Device',
    description:
      'DeltaTest transforms app testing — run mobile apps in the browser and share links without the app store.',
    techStack: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'ShadCN'],
    imageUrl:
      'https://www.aak-tech.dev/assets/projects/deltatest-mobile-emulator-saas-platform-project-image.png',
    order: 1,
  },
  {
    _id: 'proj-fallback-2',
    name: 'Dropella',
    description:
      'A comprehensive e-commerce toolkit for tracking sales, research, and advertising insights.',
    techStack: ['SvelteKit', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
    imageUrl:
      'https://www.aak-tech.dev/assets/projects/dropella-sveltekit-supabase-project-image.jpg',
    order: 2,
  },
  {
    _id: 'proj-fallback-3',
    name: 'Designer Pro',
    description:
      'A collaborative platform for designers and clients with image comments, video annotations, and a drawing canvas.',
    techStack: ['SvelteKit', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    imageUrl:
      'https://www.aak-tech.dev/assets/projects/designer-pro-designers-tool-app-project-image.png',
    order: 3,
  },
];

/** Shown when /api/experience is unavailable or empty */
export const FALLBACK_EXPERIENCE = [
  {
    _id: 'exp-fallback-0',
    company: 'Tapforce',
    role: 'Full Stack Engineer',
    period: 'Jun. 2025 – Present',
    location: 'Remote · Contract',
    description:
      'Developing and ideating new flows to optimize a legacy codebase/ed-tech platform in React, while occasionally handling back-end work in Node.js and MongoDB.',
    order: 0,
  },
  {
    _id: 'exp-fallback-1',
    company: 'NPC Labs',
    role: 'UX Engineer',
    period: 'Feb. 2025 – May 2025',
    location: 'Remote · Contract',
    description:
      "Migrated pixel art functionality from Liveblocks' SvelteKit pixel editor to the client's Next.js project.",
    order: 1,
  },
  {
    _id: 'exp-fallback-2',
    company: 'Dropella',
    role: 'Senior Frontend Developer',
    period: 'Jun. 2024 – Aug. 2024',
    location: 'Remote · Contract',
    description:
      'Led a team of 10 developers and launched the first version of Dropella on Vercel.',
    order: 2,
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
