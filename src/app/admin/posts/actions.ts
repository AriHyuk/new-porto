'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

// Helper to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const cover_image = formData.get('cover_image') as string;
  const tagsRaw = formData.get('tags') as string;
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];

  const { error } = await supabase.from('posts').insert({
    title,
    slug: generateSlug(title),
    excerpt: excerpt || null,
    content,
    cover_image: cover_image || null,
    tags,
    is_published: false,
  });

  if (error) throw new Error(error.message);

  revalidateTag('posts', 'default');
  redirect('/admin/posts');
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const cover_image = formData.get('cover_image') as string;
  const tagsRaw = formData.get('tags') as string;
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      slug: generateSlug(title),
      excerpt: excerpt || null,
      content,
      cover_image: cover_image || null,
      tags,
    })
    .eq('id', id);

  if (error) throw new Error(error.message);

  revalidateTag('posts', 'default');
  redirect('/admin/posts');
}

export async function togglePostPublish(id: string, currentStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('posts')
    .update({
      is_published: !currentStatus,
      published_at: !currentStatus ? new Date().toISOString() : null,
    })
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidateTag('posts', 'default');
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidateTag('posts', 'default');
}
