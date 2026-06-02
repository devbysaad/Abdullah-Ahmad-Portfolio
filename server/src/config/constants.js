const API_PATHS = {
  HEALTH: '/api/health',
  AUTH_BASE: '/api/auth',
  ADMIN_BASE: '/api/admin',
  PUBLIC: {
    PROJECTS: '/api/projects',
    TESTIMONIALS: '/api/testimonials',
    SERVICES: '/api/services',
    ABOUT: '/api/about',
    EXPERIENCE: '/api/experience',
    CONTACT: '/api/contact',
  },
  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    ME: '/me',
  },
};

module.exports = { API_PATHS };
