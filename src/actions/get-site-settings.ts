'use server';

import { createStaticClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';

/**
 * Fetch a single site setting by key
 */
export const getSiteSetting = unstable_cache(
  async (key: string): Promise<string | null> => {
    try {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .single();

      if (error) return null;
      return data?.value ?? null;
    } catch {
      return null;
    }
  },
  ['site-settings'],
  { revalidate: 60, tags: ['site-settings'] }
);

/**
 * Check if "available for work" is enabled
 */
export async function getAvailableForWork(): Promise<boolean> {
  const value = await getSiteSetting('available_for_work');
  return value === 'true';
}
