import { createRequire } from 'module';

const require = createRequire(import.meta.url);

class PortfolioLoadError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = 'PortfolioLoadError';
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
        `Server configuration error: ${message}. Copy .env.example to .env.local and fill in all values.`,
        error,
      );
    }

    if (/ECONNREFUSED|MongoServerSelectionError|DATABASE_CONNECTION/i.test(message)) {
      throw new PortfolioLoadError(
        'Cannot connect to MongoDB. Start MongoDB locally (or fix MONGODB_URI in .env.local), then run npm run seed.',
        error,
      );
    }

    throw new PortfolioLoadError(`Failed to load portfolio data: ${message}`, error);
  }
}
