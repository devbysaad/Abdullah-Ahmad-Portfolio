const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'main', unique: true },
    hero: {
      greeting: { type: String, default: '' },
      line1: { type: String, default: '' },
      line2: { type: String, default: '' },
      subcopy: { type: String, default: '' },
      ctaPrimary: { type: String, default: "Let's Ship" },
      ctaSecondary: { type: String, default: 'Work with me' },
      roles: [{ type: String }],
    },
    sections: {
      brandsLabel: { type: String, default: 'Trusted by teams at' },
      brandsHeading: { type: String, default: '' },
      whyMeTitle: { type: String, default: 'WHY ME ?' },
      experienceTitle: { type: String, default: 'WORK EXPERIENCE (4+ YOE)' },
      faqLabel: { type: String, default: 'FREQUENTLY ASKED QUESTIONS' },
      faqTitle: { type: String, default: 'Have a question?' },
    },
    faqItems: [
      {
        question: { type: String, required: true },
        answer: { type: String, default: '' },
        variant: { type: String, enum: ['grey', 'black'], default: 'grey' },
        order: { type: Number, default: 0 },
      },
    ],
    brands: [
      {
        key: { type: String, required: true },
        name: { type: String, required: true },
        domain: { type: String, default: '' },
        logoUrl: { type: String, default: '' },
        url: { type: String, default: '' },
        badge: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
    ],
    experienceCompanies: [
      {
        key: { type: String, required: true },
        name: { type: String, required: true },
        domain: { type: String, default: '' },
        logoUrl: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        order: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const SiteConfig =
  mongoose.models.SiteConfig || mongoose.model('SiteConfig', siteConfigSchema);

module.exports = { SiteConfig };
