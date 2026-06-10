const projectService = require('../modules/projects/project.service');
const testimonialService = require('../modules/testimonials/testimonial.service');
const serviceService = require('../modules/services/service.service');
const aboutService = require('../modules/about/about.service');
const experienceService = require('../modules/experience/experience.service');
const { getSiteConfig } = require('../modules/site-config/site-config.service');

/** Single bundle for homepage — used by API route and Next.js server components */
const getPortfolioBundle = async () => {
  const [projects, testimonials, services, about, experience, site] = await Promise.all([
    projectService.listProjects(),
    testimonialService.listTestimonials(),
    serviceService.listServices(),
    aboutService.getAbout(),
    experienceService.listExperience(),
    getSiteConfig(),
  ]);

  return {
    projects,
    testimonials,
    services,
    about,
    experience,
    site,
  };
};

module.exports = { getPortfolioBundle };
