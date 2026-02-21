'use server';

import { createStaticClient } from '@/lib/supabase/server';

/**
 * Increment view_count for a project by slug
 */
export async function incrementProjectView(slug: string): Promise<void> {
  try {
    const supabase = createStaticClient();
    // Use RPC for atomic increment to avoid race conditions
    await supabase.rpc('increment_project_views', { project_slug: slug });
  } catch (error) {
    // Non-critical: fail silently so the page still loads
    console.error('Failed to increment project view:', error);
  }
}

/**
 * Increment view_count for a post by slug
 */
export async function incrementPostView(slug: string): Promise<void> {
  try {
    const supabase = createStaticClient();
    await supabase.rpc('increment_post_views', { post_slug: slug });
  } catch (error) {
    console.error('Failed to increment post view:', error);
  }
}
