require('../src/config/env');
const mongoose = require('mongoose');
const { connectDatabase } = require('../src/config/database');
const { Project } = require('../src/modules/projects/project.model');
const { Testimonial } = require('../src/modules/testimonials/testimonial.model');
const { Service } = require('../src/modules/services/service.model');
const { About } = require('../src/modules/about/about.model');
const { Experience } = require('../src/modules/experience/experience.model');
const { resolveSeedProfileImageUrl } = require('../src/utils/cloudinaryUpload');
const {
  TESTIMONIAL_AVATARS,
  WHY_ME_INTRO,
  WHY_ME_HIGHLIGHTS,
  SKILLS,
  PROJECTS,
  EXPERIENCE,
  ABOUT_BIO,
} = require('./aak-content');

const seed = async () => {
  await connectDatabase();

  await Promise.all([
    Project.deleteMany({}),
    Testimonial.deleteMany({}),
    Service.deleteMany({}),
    Experience.deleteMany({}),
    About.deleteMany({}),
  ]);

  await Project.insertMany(
    PROJECTS.map((p) => ({
      name: p.name,
      summary: p.description,
      description: p.longDescription,
      techStack: p.techStack,
      imageUrl: p.imageUrl,
      badge: p.badge,
      badgeSub: p.badgeSub,
      order: p.order,
    }))
  );

  await Service.insertMany([
    {
      title: 'Web apps',
      description:
        'Sleek, responsive products — from SaaS dashboards to marketplace features at scale.',
      order: 0,
    },
    {
      title: 'SaaS builds',
      description:
        'Stripe, Supabase, multi-tenant flows — shipped Dropella, DeltaTest & more end-to-end.',
      order: 1,
    },
    {
      title: 'Full stack',
      description:
        'Next.js, SvelteKit, MERN & Node APIs — daily updates and on-time delivery.',
      order: 2,
    },
    {
      title: 'Scale & lead',
      description:
        'Legacy migrations, Redis perf wins, and leading teams to production launches.',
      order: 3,
    },
  ]);

  await Experience.insertMany(EXPERIENCE);

  await Testimonial.insertMany([
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
  ]);

  const profileImageUrl = await resolveSeedProfileImageUrl();
  if (profileImageUrl) {
    console.log('Profile image:', profileImageUrl);
  } else {
    console.log(
      'Profile image: skipped (set CLOUDINARY_* in .env and re-seed, or upload via Admin → About)'
    );
  }

  await About.create({
    bio: ABOUT_BIO,
    whyMeIntro: WHY_ME_INTRO,
    highlights: WHY_ME_HIGHLIGHTS,
    skills: SKILLS,
    stats: { years: '2+', clients: '20+', apps: '12+' },
    videoUrl: '',
    profileImageUrl,
    contactEmail: 'abdullah.ahmad@devnauts.io',
    linkedIn: 'https://linkedin.com/in/abdullahahmad',
    github: 'https://github.com/abdullahahmad',
  });

  console.log('Database seeded successfully (content from aak-tech.dev)');
  await mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
