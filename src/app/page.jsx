import HomePage from '@/features/home/HomePage';
import { loadPortfolio } from '@/lib/portfolio.server';

/** Always fetch fresh data — avoids stale static pages when the DB is empty or offline */
export const dynamic = 'force-dynamic';

export default async function Page() {
  const portfolio = await loadPortfolio();
  return <HomePage portfolio={portfolio} />;
}
