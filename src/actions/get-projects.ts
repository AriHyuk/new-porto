'use server';

import type { Project } from '@/types';
import { projectsData } from '@/constants/projects';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all projects from Local Static Data (Cached)
 */
export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    // Return static data sorted by sort_order
    return [...projectsData].sort((a, b) => a.sort_order - b.sort_order);
  },
  ['projects-list-static'],
  { revalidate: 3600, tags: ['projects'] }
);

