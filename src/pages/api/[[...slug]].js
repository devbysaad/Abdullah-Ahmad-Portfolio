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

export default async function handler(req, res) {
  const run = await getHandler();
  await run(req, res);
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
