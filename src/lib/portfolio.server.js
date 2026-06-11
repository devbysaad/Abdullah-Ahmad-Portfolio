import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export class PortfolioLoadError extends Error {
  constructor(message, cause, code = 'PORTFOLIO_LOAD_FAILED') {
    super(message);
    this.name = 'PortfolioLoadError';
    this.code = code;
    this.cause = cause;
  }
}

/** Server-only portfolio loader for App Router pages */
export async function loadPortfolio() {
  try {
    const { connectDatabase } = require('../server/config/database');
    const { getPortfolioBundle } = require('../server/services/portfolio.service');

    await connectDatabase();
    const data = await getPortfolioBundle();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    const message = error?.message || 'Unknown error';

    if (message.includes('Missing required environment variable')) {
      throw new PortfolioLoadError(
        `${message}. Add it in Vercel → Project → Settings → Environment Variables, then redeploy.`,
        error,
        'MISSING_ENV',
      );
    }

    if (message.includes('MONGODB_URI points to localhost')) {
      throw new PortfolioLoadError(message, error, 'LOCAL_MONGO');
    }

    if (/whitelist|IP that isn't whitelisted|ServerSelectionTimedOut/i.test(message)) {
      throw new PortfolioLoadError(
        'MongoDB Atlas is blocking Vercel. In Atlas → Network Access → Add IP Address → choose "Allow Access from Anywhere" (0.0.0.0/0), wait 1–2 minutes, then redeploy.',
        error,
        'MONGO_IP_WHITELIST',
      );
    }

    if (/ECONNREFUSED|MongoServerSelectionError|MongoNetworkError|DATABASE_CONNECTION/i.test(message)) {
      throw new PortfolioLoadError(
        'Cannot connect to MongoDB. Set MONGODB_URI in Vercel (Atlas mongodb+srv://…), allow 0.0.0.0/0 in Atlas Network Access, then redeploy.',
        error,
        'MONGO_CONNECTION',
      );
    }

    if (/authentication failed|bad auth|SCRAM/i.test(message)) {
      throw new PortfolioLoadError(
        'MongoDB authentication failed. Check your Atlas username/password in MONGODB_URI.',
        error,
        'MONGO_AUTH',
      );
    }

    throw new PortfolioLoadError(`Failed to load portfolio data: ${message}`, error);
  }
}
