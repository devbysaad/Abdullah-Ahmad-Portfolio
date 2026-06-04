/** Content sourced from https://www.aak-tech.dev/ */

const AAK_ASSETS = 'https://www.aak-tech.dev/assets';

const TESTIMONIAL_AVATARS = {
  rob: `${AAK_ASSETS}/testimonials/rob.png`,
  saqib: `${AAK_ASSETS}/testimonials/saqib.jpeg`,
  salik: `${AAK_ASSETS}/testimonials/salik.jpeg`,
  ahsan: `${AAK_ASSETS}/testimonials/ahsan.jpeg`,
  hisham: `${AAK_ASSETS}/testimonials/hisham.webp`,
};

const WHY_ME_INTRO =
  'With 2+ years of software development experience and a portfolio of 8 web applications, I specialize in delivering scalable, custom software and SaaS solutions. My expertise includes SvelteKit, Next.js, Supabase, and MERN Stack. I follow a streamlined process: gathering requirements, documenting action items, providing daily updates, and ensuring timely delivery.';

const WHY_ME_HIGHLIGHTS = [
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

const SKILLS = [
  'Next.js',
  'Node.js',
  'Express.js',
  'Liveblocks',
  'REST APIs',
  'MySQL',
  'PostgreSQL',
  'Supabase',
  'SQL',
  'React.js',
  'Redux',
  'Svelte',
  'SvelteKit',
  'jQuery',
  'HTML',
  'CSS',
  'SCSS',
  'SASS',
  'JavaScript',
  'TypeScript',
  'Tailwind',
  'Bootstrap',
  'Git',
  'AWS S3',
  'OpenAI',
  'Prompt Engineering',
  'JWT',
  'Stripe',
  'Redis',
  'Daisy UI',
  'New Relic',
  'Jira',
  'Agile',
  'Kanban',
  'MERN Stack',
  'Firebase',
  'MongoDB',
];

const PROJECTS = [
  {
    name: 'Basemint',
    description:
      'Basemint is a social hub for artists to collaborate on drawings, pixel by pixel, and share them with the world.',
    longDescription:
      "Basemint is a social hub for artists to collaborate on drawings, pixel by pixel, and share them with the world. The drawings can then be minted, as well as its digital shares bought and sold by speculators. I ported the functionality from Liveblocks' SvelteKit pixel art repository, then extended features to include auth, notifications, home page, live previews, and much more.",
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'ShadCN', 'MongoDB', 'Liveblocks'],
    imageUrl:
      'https://www.aak-tech.dev/assets/projects/basemint-project.png',
    badge: 'Feb. 2025',
    badgeSub: 'May 2025',
    order: 0,
  },
  {
    name: 'Auto Device',
    description:
      'DeltaTest transforms app testing — run mobile apps in the browser and share links without the app store.',
    longDescription:
      'A groundbreaking SaaS platform that transforms app testing. Developers can upload their mobile apps and run them in the browser, instantly sharing links for seamless testing without the app store hassle. Fast, efficient, and effortless — I completely built this for the client.',
    techStack: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'ShadCN'],
    imageUrl:
      'https://www.aak-tech.dev/assets/projects/deltatest-mobile-emulator-saas-platform-project-image.png',
    badge: 'Jan. 2025',
    badgeSub: 'May 2025',
    order: 1,
  },
  {
    name: 'Dropella',
    description:
      "A comprehensive e-commerce toolkit for tracking sales, research, and advertising insights — the client's most trusted developer for over a year.",
    longDescription:
      "A web-based comprehensive suite of e-commerce tools, enabling users to effortlessly track sales, conduct competitive research, hunt for promising products, and gain valuable insights into advertising strategies. I was the client's most trusted developer on this, as recognized in testimonials below, working together for over a year.",
    techStack: ['SvelteKit', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
    imageUrl:
      'https://www.aak-tech.dev/assets/projects/dropella-sveltekit-supabase-project-image.jpg',
    badge: 'Sept. 2023',
    badgeSub: 'Aug 2024',
    order: 2,
  },
  {
    name: 'Designer Pro',
    description:
      'A collaborative platform for designers and clients with image comments, video annotations, and a drawing canvas.',
    longDescription:
      'Designer Pro is a platform for seamless communication between designers and clients, where I implemented new features like image commenting, video frame annotations, and a drawing canvas, enabling real-time feedback and enhanced collaboration.',
    techStack: ['SvelteKit', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    imageUrl:
      'https://www.aak-tech.dev/assets/projects/designer-pro-designers-tool-app-project-image.png',
    badge: 'Nov. 2024',
    badgeSub: 'Dec 2024',
    order: 3,
  },
];

const EXPERIENCE = [
  {
    company: 'Tapforce',
    role: 'Full Stack Engineer',
    period: 'Jun. 2025 – Present',
    location: 'Remote · Contract',
    description:
      'Developing and ideating new flows to optimize a legacy codebase/ed-tech platform in React, while occasionally handling back-end work in Node.js and MongoDB.',
    order: 0,
  },
  {
    company: 'NPC Labs',
    role: 'UX Engineer',
    period: 'Feb. 2025 – May 2025',
    location: 'Remote · Contract',
    description:
      "Migrated pixel art functionality from Liveblocks' SvelteKit pixel editor to the client's Next.js project. Converted Shoelace and vanilla CSS to ShadCN, refactored to TypeScript, and delivered pixel/layer management plus notifications, auth, artist invites, comments with mentions, drawing history previews, and distinct artist/speculator views.",
    order: 1,
  },
  {
    company: 'Auto Device',
    role: 'Full-Stack Developer',
    period: 'Jan. 2025 – May 2025',
    location: 'Remote · Contract',
    description:
      'Integrated with a backend emulator, implemented Stripe for plan management and real-time usage tracking, built a support ticket system and admin dashboard, and developed a responsive 12+ page UI with smooth navigation.',
    order: 2,
  },
  {
    company: 'Nybble IT',
    role: 'Full-Stack Software Engineer',
    period: 'Aug. 2024 – Dec. 2024',
    location: 'Remote · Contract',
    description:
      'Worked on the legacy React pantry app, then built a revamped version with smooth operations and RFID card scanning integration alongside their backend team.',
    order: 3,
  },
  {
    company: 'Dropella',
    role: 'Senior Frontend Developer',
    period: 'Jun. 2024 – Aug. 2024',
    location: 'Remote · Contract',
    description:
      'Led a team of 10 developers, improved delivery efficiency, increased conversions with a one-day Stripe trial, and launched the first version of Dropella on Vercel.',
    order: 4,
  },
  {
    company: 'Dubizzle Labs',
    role: 'Software Engineer',
    period: 'Mar. 2024 – May 2024',
    location: 'Lahore, Pakistan · Full-time',
    description:
      "Optimized Seller Center's shopping cart performance by 40% through Redis, developed secure 3-D Secure checkout, enhanced Zameen.com's credit system, and implemented AWS S3 presigned URL uploads for listings.",
    order: 5,
  },
  {
    company: 'Dubizzle Labs',
    role: 'Associate Software Engineer',
    period: 'Sept. 2023 – Mar. 2024',
    location: 'Lahore, Pakistan · Full-time',
    description:
      'Built Bayut.com invitation system with OTPs and shortened URLs, automated listing renewals, integrated Saudi REGA verification for 60,000+ users, migrated Zameen.com messages to Mailboxer, and implemented dual-language support on Bayut.com.',
    order: 6,
  },
  {
    company: 'Suave Solutions',
    role: 'PHP Intern Developer',
    period: 'Jun. 2023 – Sept. 2023',
    location: 'Lahore, Pakistan · Internship',
    description:
      'Revamped the company portal admin panel, designed REST APIs in PHP 7.0, implemented CRON jobs, and contributed to upgrading PHP 7.0 to 8.2.',
    order: 7,
  },
  {
    company: 'Smart Technology House',
    role: 'Software Engineer Intern',
    period: 'Jun. 2022 – Aug. 2022',
    location: 'Lahore, Pakistan · Internship',
    description:
      'Built HTML/CSS interfaces with SASS and jQuery, translated PSD designs to markup, and created a PHP 8.0 CRUD system for employee data management.',
    order: 8,
  },
];

const FAQ_ITEMS = [
  {
    question: 'What services do you provide?',
    answer:
      'I provide full stack development for SaaS applications, including frontend development with React, backend APIs with Node.js, database design, cloud integration, and DevOps support.',
  },
  {
    question: 'Do you offer custom SaaS solutions?',
    answer:
      'Yes, I specialize in building custom SaaS solutions tailored to your business needs. This includes scalable architectures, cloud deployments, and multi-tenant applications.',
  },
  {
    question: 'What are your rates?',
    answer:
      'My rates vary based on the complexity and duration of the project. I offer both fixed pricing for small projects and hourly rates for ongoing work, which are discussed during the initial consultation.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'I work with React, Node.js, Express, MongoDB, SvelteKit, Supabase, PostgreSQL, AWS, Docker, and CI/CD pipelines for full stack SaaS development.',
  },
];

const ABOUT_BIO = `Hellooo! I'm Abdullah Ahmad, a senior full stack software engineer from Pakistan with **2+ years in engineering**. I help transform ideas into functioning products!

I have shipped **20+ client engagements** and contributed to platforms like **Zameen.com** and **Bayut.com**. Building products from scratch is what excites me most.

Why choose me? Because I'm passionate about making you win. After all, **your win is my win.**`;

module.exports = {
  TESTIMONIAL_AVATARS,
  WHY_ME_INTRO,
  WHY_ME_HIGHLIGHTS,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  FAQ_ITEMS,
  ABOUT_BIO,
};
