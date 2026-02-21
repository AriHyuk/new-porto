'use server';

import { createStaticClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[];
  is_published: boolean;
  view_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Fetch all published posts (for public blog listing)
 */
export const getPublishedPosts = unstable_cache(
  async (): Promise<Post[]> => {
    try {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        return [];
      }
      return data || [];
    } catch (error) {
      console.error('Unexpected error:', error);
      return [];
    }
  },
  ['posts-published'],
  { revalidate: 300, tags: ['posts'] }
);

/**
 * Fetch a single post by slug (public)
 */
export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    try {
      const supabase = createStaticClient();
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) return null;
      return data;
    } catch {
      return null;
    }
  },
  ['post-by-slug'],
  { revalidate: 300, tags: ['posts'] }
);

/**
 * Fetch ALL posts (for admin panel)
 */
export async function getAllPostsAdmin(): Promise<Post[]> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admin posts:', error);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }
}
