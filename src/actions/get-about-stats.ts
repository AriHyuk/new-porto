'use server';

import { createStaticClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';

export interface AboutStat {
  id: string;
  label: string;
  value: string;
  suffix: string;
  sort_order: number;
}

/**
 * Fetch about stats from DB (with cache)
 */
export const getAboutStats = unstable_cache(
  async (): Promise<AboutStat[]> => {
    try {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from('about_stats')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching about stats:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Unexpected error:', error);
      return [];
    }
  },
  ['about-stats'],
  { revalidate: 3600, tags: ['about-stats'] }
);
