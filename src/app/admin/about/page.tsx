import { getAboutStats } from '@/actions/get-about-stats';
import AboutStatsClient from '@/components/Admin/AboutStats/AboutStatsClient';

export const dynamic = 'force-dynamic';

export default async function AdminAboutPage() {
  const stats = await getAboutStats();
  return <AboutStatsClient initialStats={stats} />;
}
