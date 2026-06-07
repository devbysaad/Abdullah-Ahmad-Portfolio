require('../src/config/env');
const mongoose = require('mongoose');
const { connectDatabase } = require('../src/config/database');
const { Project } = require('../src/modules/projects/project.model');
const { Testimonial } = require('../src/modules/testimonials/testimonial.model');
const { Service } = require('../src/modules/services/service.model');
const { About } = require('../src/modules/about/about.model');
const { Experience } = require('../src/modules/experience/experience.model');
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
      name: 'Alphonso Roundtree',
      role: 'Founder & CEO Social Bevy, Former NFL Athlete',
      company: '',
      text: `I had the pleasure of hiring Abdullah and I gotta tell you man, I really enjoyed working with him. He was really fast, really understood the project, and really delivered. I must say that I do plan to continue to work with him. You got my recommendation for sure. Hire Abdullah to take care of your tech needs.`,
      avatar: TESTIMONIAL_AVATARS.alphonso,
      order: 0,
    },
    {
      name: 'Rob Eccles',
      role: 'Project Development Manager at Nybble',
      company: '',
      text: `I had the pleasure of working with Abdullah on our Pantry Application, and I couldn't be more impressed with his expertise and commitment to delivering a high-quality product. From the start, he demonstrated a deep understanding of our project requirements, ensuring every technical detail was addressed. His skills in the technology stack were top-notch, and he consistently provided innovative solutions to challenges, streamlining our application's functionality beyond what we initially envisioned. His proactive approach, strong communication skills, and dedication to excellence made him an invaluable asset to our team. I highly recommend Abdullah for any development project — his brilliance and professionalism set him apart!`,
      avatar: TESTIMONIAL_AVATARS.rob,
      order: 1,
    },
    {
      name: 'Kelebogile Mooketsi',
      role: 'Founder @ Good Life Money-Mastery Solutions',
      company: '',
      text: `Wow! What a great expert who genuinely cares about my work. Proactive and on point to make sure every inch of the development is done right and aligns with the big picture. Abdullah goes the extra mile and has great and timely communication skills. This is the developer to pick for your backend project. I look forward to more milestones in my project with him.`,
      avatar: TESTIMONIAL_AVATARS.kelebogile,
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
      text: `My experience with Abdullah has been exceptional. He is a true professional and dedicated expert who has worked with unicorn companies worth over 1 BILLION USD!! His efforts are unmatched compared to other agencies on Fiverr.`,
      avatar: TESTIMONIAL_AVATARS.hisham,
      order: 4,
    },
    {
      name: 'Saiyed Sarosh Anis',
      role: 'Founder @ Drico Digital',
      company: '',
      text: `I had the pleasure of working with Abdullah, and I must say he is a thorough professional. He not only completed all the tasks on time but also created my website with exceptional precision. Abdullah clearly understood what I was looking for and delivered exactly what I needed. His dedication and attention to detail made the entire process smooth and stress-free. I highly recommend his services!`,
      avatar: TESTIMONIAL_AVATARS.sarosh,
      order: 5,
    },
    {
      name: 'Bilal Bakht Ahmad',
      role: 'Founder',
      company: 'AutoDevice.io',
      text: 'Talented, committed, expert on full stack projects',
      avatar: TESTIMONIAL_AVATARS.bilal,
      order: 6,
    },
    {
      name: 'Salik Javeed',
      role: 'Project Manager at Dropella',
      company: '',
      text: `I am pleased to recommend Mr. Abdullah Ahmad, who worked as a Senior Front-End Developer and Team Lead at Dropella since 2023. Throughout his tenure, Abdullah showcased exceptional technical skills and strong leadership abilities. I am confident that Abdullah will continue to achieve excellence in his future endeavors, and I wish him all the best in his career.`,
      avatar: TESTIMONIAL_AVATARS.salik,
      order: 7,
    },
    {
      name: 'Ahsan Sarwar',
      role: 'Senior Full-Stack Developer at Dropella',
      company: '',
      text: `Abdullah is one of the most talented and hardworking software engineers I have worked with, and it has been an absolute pleasure. What sets him apart is his sense of responsibility and honesty in his work. Having collaborated on numerous projects with him, I can say he is someone you can always trust to get the job done right.`,
      avatar: TESTIMONIAL_AVATARS.ahsan,
      order: 8,
    },
  ]);

  // Profile photo is served from client/public/abdullah.png — leave empty unless using Admin upload
  const profileImageUrl = '';

  await About.create({
    bio: ABOUT_BIO,
    whyMeIntro: WHY_ME_INTRO,
    highlights: WHY_ME_HIGHLIGHTS,
    skills: SKILLS,
    stats: { years: '4+', clients: '20+', apps: '12+' },
    videoUrl: '',
    profileImageUrl,
    contactEmail: 'abdullah.ahmad@devnauts.io',
    linkedIn: 'https://www.linkedin.com/in/abdullah-ahmad-aak/',
    github: 'https://github.com/AbdullahAhmadAAK',
  });

  console.log('Database seeded successfully (content from aak-tech.dev)');
  await mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
