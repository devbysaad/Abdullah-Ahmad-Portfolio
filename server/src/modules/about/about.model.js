const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, default: '' },
    whyMeIntro: { type: String, default: '' },
    highlights: [
      {
        title: { type: String, required: true },
        description: { type: String, default: '' },
      },
    ],
    skills: [{ type: String }],
    stats: {
      years: { type: String, default: '2+' },
      clients: { type: String, default: '30+' },
      apps: { type: String, default: '12+' },
    },
    videoUrl: { type: String, default: '' },
    profileImageUrl: { type: String, default: '' },
    contactEmail: { type: String, default: 'hello@abdullahahmad.dev' },
    linkedIn: { type: String, default: 'https://linkedin.com/in/abdullahahmad' },
    github: { type: String, default: 'https://github.com/abdullahahmad' },
  },
  { timestamps: true }
);

const About = mongoose.model('About', aboutSchema);

module.exports = { About };
