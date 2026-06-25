'use server';

import type { Project } from '@/types';
import { projectsData } from '@/constants/projects';

/**
 * Fetch a single project by slug from Local Static Data
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const project = projectsData.find((p) => p.slug === slug);
  return project || null;
}

