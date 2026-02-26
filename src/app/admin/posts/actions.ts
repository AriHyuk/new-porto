'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
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

// Helper to upload image to Supabase Storage
async function uploadPostImage(file: File) {
  const supabase = createAdminClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `blog/${fileName}`;

  const { data, error } = await supabase.storage
    .from('porto')
    .upload(filePath, file);

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data: { publicUrl } } = supabase.storage
    .from('porto')
    .getPublicUrl(filePath);

  return publicUrl;
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const tagsRaw = formData.get('tags') as string;
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];
  
  let cover_image = formData.get('cover_image') as string;
  const cover_image_file = formData.get('cover_image_file') as File | null;

  // Handle file upload if present
  if (cover_image_file && cover_image_file.size > 0) {
    cover_image = await uploadPostImage(cover_image_file);
  }

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
  const tagsRaw = formData.get('tags') as string;
  const tags = tagsRaw ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean) : [];

  let cover_image = formData.get('cover_image') as string;
  const cover_image_file = formData.get('cover_image_file') as File | null;

  // Handle file upload if present
  if (cover_image_file && cover_image_file.size > 0) {
    cover_image = await uploadPostImage(cover_image_file);
  }

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
