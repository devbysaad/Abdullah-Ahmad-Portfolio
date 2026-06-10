const express = require('express');
const cors = require('cors');
const { API_PATHS } = require('./config/constants');
const { env } = require('./config/env');
const { isAllowedOrigin } = require('./lib/corsOrigins');
const { loggerMiddleware } = require('./middleware/logger.middleware');
const { generalLimiter, contactLimiter } = require('./middleware/rateLimit.middleware');
const { errorMiddleware } = require('./middleware/error.middleware');

const { projectRouter } = require('./modules/projects/project.route');
const { testimonialRouter } = require('./modules/testimonials/testimonial.route');
const { serviceRouter } = require('./modules/services/service.route');
const { aboutRouter } = require('./modules/about/about.route');
const { experienceRouter } = require('./modules/experience/experience.route');
const { contactRouter } = require('./modules/contact/contact.route');
const { mediaRouter } = require('./modules/media/media.route');
const { portfolioRouter } = require('./modules/portfolio/portfolio.route');

const app = express();

if (env.isProduction) {
  app.set('trust proxy', 1);
}

app.use(
  cors({
    origin(origin, callback) {
      if (
        isAllowedOrigin(origin, env.clientUrls, {
          isProduction: env.isProduction,
        })
      ) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(loggerMiddleware);
app.use('/api', generalLimiter);

app.get(API_PATHS.HEALTH, (_req, res) => {
  res.json({
    ok: true,
    env: env.nodeEnv,
    mongo: require('mongoose').connection.readyState === 1,
  });
});

app.use(API_PATHS.PUBLIC.PORTFOLIO, portfolioRouter);
app.use(API_PATHS.PUBLIC.PROJECTS, projectRouter);
app.use(API_PATHS.PUBLIC.TESTIMONIALS, testimonialRouter);
app.use(API_PATHS.PUBLIC.SERVICES, serviceRouter);
app.use(API_PATHS.PUBLIC.ABOUT, aboutRouter);
app.use(API_PATHS.PUBLIC.EXPERIENCE, experienceRouter);
app.use(API_PATHS.PUBLIC.CONTACT, contactLimiter, contactRouter);
app.use(API_PATHS.PUBLIC.MEDIA, mediaRouter);

app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.use(errorMiddleware);

module.exports = { app };
