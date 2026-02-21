'use server';

import { createStaticClient } from '@/lib/supabase/server';
import { Skill } from '@/types/skill';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all skills from Supabase (Cached)
 */
export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*');

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    return data as Skill[];
  },
  ['skills-list'],
  { revalidate: 3600, tags: ['skills'] }
);

