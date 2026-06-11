import HomePage from '@/features/home/HomePage';
import SetupErrorPage from '@/components/SetupErrorPage';
import { loadPortfolio, PortfolioLoadError } from '@/lib/portfolio.server';

/** Always fetch fresh data — avoids stale static pages when the DB is empty or offline */
export const dynamic = 'force-dynamic';

export default async function Page() {
  try {
    const portfolio = await loadPortfolio();
    return <HomePage portfolio={portfolio} />;
  } catch (error) {
    if (error instanceof PortfolioLoadError) {
      return <SetupErrorPage message={error.message} code={error.code} />;
    }
    throw error;
  }
}
