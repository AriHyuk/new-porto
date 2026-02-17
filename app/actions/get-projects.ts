'use server';

import { createStaticClient } from '@/lib/supabase/server';
import type { Project } from '@/types';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all projects from Supabase (Cached)
 */
export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      const supabase = createStaticClient();

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching projects:', error);
      return [];
    }
  },
  ['projects-list'],
  { revalidate: 3600, tags: ['projects'] }
);

