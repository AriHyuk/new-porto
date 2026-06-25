'use server';

import type { Project } from '@/types';
import { projectsData } from '@/constants/projects';

/**
 * Fetch all projects from Local Static Data
 */
export async function getProjects(): Promise<Project[]> {
  // Return static data sorted by sort_order
  return [...projectsData].sort((a, b) => a.sort_order - b.sort_order);
}


