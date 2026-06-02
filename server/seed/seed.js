require('../src/config/env');
const mongoose = require('mongoose');
const { connectDatabase } = require('../src/config/database');
const { Project } = require('../src/modules/projects/project.model');
const { Testimonial } = require('../src/modules/testimonials/testimonial.model');
const { Service } = require('../src/modules/services/service.model');
const { About } = require('../src/modules/about/about.model');
const { Experience } = require('../src/modules/experience/experience.model');

const placeholder =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';

const seed = async () => {
  await connectDatabase();

  await Promise.all([
    Project.deleteMany({}),
    Testimonial.deleteMany({}),
    Service.deleteMany({}),
    Experience.deleteMany({}),
    About.deleteMany({}),
  ]);

  await Project.insertMany([
    {
      name: 'FleetOps Dashboard',
      description:
        'A real-time operations platform for logistics teams with live tracking, role-based access, and analytics built for scale.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      imageUrl: placeholder,
      badge: '500K+',
      badgeSub: 'daily active users',
      order: 0,
    },
    {
      name: 'PayFlow SaaS',
      description:
        'Subscription billing and merchant dashboard with Stripe integrations, invoicing, and multi-tenant architecture.',
      techStack: ['Next.js', 'Express', 'PostgreSQL', 'Stripe'],
      imageUrl: placeholder,
      badge: '30+',
      badgeSub: 'global clients',
      order: 1,
    },
    {
      name: 'HealthSync Mobile',
      description:
        'Cross-platform patient engagement app with appointment booking, push notifications, and secure health records.',
      techStack: ['React Native', 'Firebase', 'Node.js'],
      imageUrl: placeholder,
      badge: '12+',
      badgeSub: 'apps shipped',
      order: 2,
    },
    {
      name: 'CommerceHub',
      description:
        'Multi-vendor marketplace with inventory sync, admin tooling, and performance-optimized checkout flows.',
      techStack: ['React', 'GraphQL', 'Redis', 'AWS'],
      imageUrl: placeholder,
      order: 3,
    },
  ]);

  await Service.insertMany([
    {
      title: 'Full Stack Development',
      description:
        'End-to-end web application development, from database architecture to pixel-perfect frontend.',
      order: 0,
    },
    {
      title: 'SaaS Development',
      description:
        'Building scalable software-as-a-service products with subscription models, dashboards, and integrations.',
      order: 1,
    },
    {
      title: 'Mobile App Development',
      description:
        'Cross-platform mobile experiences that are fast, intuitive, and production-ready.',
      order: 2,
    },
    {
      title: 'Software Maintenance & Consulting',
      description:
        'Ongoing support, performance optimization, and technical advisory for existing products.',
      order: 3,
    },
  ]);

  await Experience.insertMany([
    {
      company: 'Tapforce',
      role: 'Full Stack Engineer',
      period: 'Jun 2025 – Present',
      description:
        'Shipping production features across the stack for high-traffic SaaS products.',
      order: 0,
    },
    {
      company: 'NPC Labs',
      role: 'UX Engineer',
      period: 'Feb 2025 – May 2025',
      description:
        'Bridged design and engineering with component systems and polished user flows.',
      order: 1,
    },
    {
      company: 'Auto Device',
      role: 'Full Stack Developer',
      period: 'Jan 2025 – May 2025',
      description:
        'Built APIs and dashboards for IoT device management and monitoring.',
      order: 2,
    },
    {
      company: 'Nybble IT',
      role: 'Full-Stack Software Engineer',
      period: 'Aug 2024 – Jan 2025',
      description:
        'Delivered client platforms end-to-end with React, Node, and cloud deployments.',
      order: 3,
    },
    {
      company: 'Dropella',
      role: 'Senior Frontend Developer',
      period: 'Jun 2024 – Aug 2024',
      description:
        'Led frontend architecture and performance for a fast-growing delivery product.',
      order: 4,
    },
    {
      company: 'Dubizzle Labs',
      role: 'Software Engineer',
      period: 'Mar 2024 – May 2024',
      description:
        'Contributed to marketplace features used by hundreds of thousands of users.',
      order: 5,
    },
  ]);

  /* Avatars: client/public/testimonials/ (from https://www.aak-tech.dev/assets/testimonials/) */
  await Testimonial.insertMany([
    {
      name: 'Rob Eccles',
      role: 'IT Manager at Nybble IT',
      company: '',
      text: `Abdullah Ahmad delivered exceptional services that exceeded my expectations. Working with him was a delight due to his politeness. Abdullah is a star. He was very polite, knowledgeable about the requirements and went above and beyond to help us. Highly recommend!`,
      avatar: '/testimonials/rob.png',
      order: 0,
    },
    {
      name: 'Saqib Maqsood',
      role: 'Product Owner of Web Polygon Selector',
      company: '',
      text: `I couldn't be more satisfied with the work. Abdullah's communication skills, expertise in coding and attention to details are commendable. The follow-ups were timely and thoughtful, showing a genuine commitment to delivering the best possible outcome. Highly recommended!`,
      avatar: '/testimonials/saqib.jpeg',
      order: 1,
    },
    {
      name: 'Salik Javeed',
      role: 'Project Manager at Dropella',
      company: '',
      text: `I am pleased to recommend Mr. Abdullah Ahmad, who worked as a Senior Front-End Developer and Team Lead at Dropella since 2023. Throughout his tenure, Abdullah showcased exceptional technical skills and strong leadership abilities. I am confident that Abdullah will continue to achieve excellence in his future endeavors, and I wish him all the best in his career.`,
      avatar: '/testimonials/salik.jpeg',
      order: 2,
    },
    {
      name: 'Ahsan Sarwar',
      role: 'Senior Full-Stack Developer at Dropella',
      company: '',
      text: `Abdullah is one of the most talented and hardworking software engineers I have worked with, and it has been an absolute pleasure. What sets him apart is his sense of responsibility and honesty in his work. Having collaborated on numerous projects with him, I can say he is someone you can always trust to get the job done right.`,
      avatar: '/testimonials/ahsan.jpeg',
      order: 3,
    },
    {
      name: 'Muhammad Hisham',
      role: 'Product Owner of Dropella',
      company: '',
      text: `My experience with Abdullah has been exceptional. He is a true gentleman and a dedicated professional who has worked with unicorn companies worth over 1 BILLION USD!! His efforts are unmatched compared to other sellers on Fiverr.`,
      avatar: '/testimonials/hisham.webp',
      order: 4,
    },
  ]);

  await About.create({
    bio: `Hellooo! I'm Abdullah Ahmad, a senior full stack software engineer from Pakistan with an experience of **2+ years in engineering**. I help transform ideas into functioning products!

I have headlined **~30+ projects** and helped teams ship products that scale. The idea of taking products from scratch and building them is what excites me!

Why choose me? Because I'm very passionate to make you win. Because, after all, **your win is my win.**`,
    stats: { years: '2+', clients: '30+', apps: '12+' },
    videoUrl: '',
    profileImageUrl: '',
    contactEmail: 'hello@abdullahahmad.dev',
    linkedIn: 'https://linkedin.com/in/abdullahahmad',
    github: 'https://github.com/abdullahahmad',
  });

  console.log('Database seeded successfully');
  await mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
