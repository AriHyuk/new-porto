'use server';

import { createClient } from '@/lib/supabase/server';
import { Project } from '@/types';

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();

  try {
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching project by slug:', error);
      return null;
    }

    return project as Project;
  } catch (error) {
    console.error('Unexpected error fetching project:', error);
    return null;
  }
}
