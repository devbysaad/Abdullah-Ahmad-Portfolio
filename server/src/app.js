const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { API_PATHS } = require('./config/constants');
const { env } = require('./config/env');
const { loggerMiddleware } = require('./middleware/logger.middleware');
const {
  generalLimiter,
  authLimiter,
  adminLimiter,
} = require('./middleware/rateLimit.middleware');
const { authMiddleware } = require('./middleware/auth.middleware');
const { errorMiddleware } = require('./middleware/error.middleware');

const { publicProjectRouter, adminProjectRouter } = require('./modules/projects/project.route');
const {
  publicTestimonialRouter,
  adminTestimonialRouter,
} = require('./modules/testimonials/testimonial.route');
const { publicServiceRouter, adminServiceRouter } = require('./modules/services/service.route');
const { publicAboutRouter, adminAboutRouter } = require('./modules/about/about.route');
const {
  publicExperienceRouter,
  adminExperienceRouter,
} = require('./modules/experience/experience.route');
const { authRouter } = require('./modules/auth/auth.route');
const { contactRouter } = require('./modules/contact/contact.route');
const { uploadRouter } = require('./modules/upload/upload.route');

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);
app.use('/api', generalLimiter);

app.get(API_PATHS.HEALTH, (_req, res) => res.json({ ok: true }));

app.use(API_PATHS.PUBLIC.PROJECTS, publicProjectRouter);
app.use(API_PATHS.PUBLIC.TESTIMONIALS, publicTestimonialRouter);
app.use(API_PATHS.PUBLIC.SERVICES, publicServiceRouter);
app.use(API_PATHS.PUBLIC.ABOUT, publicAboutRouter);
app.use(API_PATHS.PUBLIC.EXPERIENCE, publicExperienceRouter);
app.use(API_PATHS.PUBLIC.CONTACT, contactRouter);

app.use(API_PATHS.AUTH_BASE, authLimiter, authRouter);

app.use(`${API_PATHS.ADMIN_BASE}/projects`, adminLimiter, authMiddleware, adminProjectRouter);
app.use(
  `${API_PATHS.ADMIN_BASE}/testimonials`,
  adminLimiter,
  authMiddleware,
  adminTestimonialRouter
);
app.use(`${API_PATHS.ADMIN_BASE}/services`, adminLimiter, authMiddleware, adminServiceRouter);
app.use(`${API_PATHS.ADMIN_BASE}/about`, adminLimiter, authMiddleware, adminAboutRouter);
app.use(
  `${API_PATHS.ADMIN_BASE}/experience`,
  adminLimiter,
  authMiddleware,
  adminExperienceRouter
);
app.use(`${API_PATHS.ADMIN_BASE}/upload`, adminLimiter, authMiddleware, uploadRouter);

if (env.nodeEnv === 'production') {
  const clientDist = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDist));
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.use(errorMiddleware);

module.exports = { app };
