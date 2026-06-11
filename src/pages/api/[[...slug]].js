import { createRequire } from 'module';

const require = createRequire(import.meta.url);

let expressHandler;

async function getHandler() {
  if (!expressHandler) {
    const serverless = require('serverless-http');
    const { connectDatabase } = require('../../server/config/database');
    const { app } = require('../../server/app');

    const handler = serverless(app, {
      binary: ['image/*', 'application/octet-stream'],
    });

    expressHandler = async (req, res) => {
      try {
        await connectDatabase();
        await handler(req, res);
      } catch (err) {
        console.error('API bootstrap failed:', err.message);
        if (!res.headersSent) {
          res.status(503).json({
            success: false,
            message: 'Service unavailable',
            code: 'DATABASE_CONNECTION_FAILED',
          });
        }
      }
    };
  }
  return expressHandler;
}

function fixExpressUrl(req) {
  const { slug } = req.query;
  if (!slug) return req.url;

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;
  const qs = req.url?.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  return `/api/${slugPath}${qs}`;
}

export default async function handler(req, res) {
  const before = req.url;
  req.url = fixExpressUrl(req);
  console.log('[api:slug]', req.method, before, '→', req.url);
  const run = await getHandler();
  await run(req, res);
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
