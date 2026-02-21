'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidateTag } from 'next/cache';

export async function updateAboutStat(id: string, formData: FormData) {
  const supabase = await createClient();
  const value = formData.get('value') as string;
  const suffix = formData.get('suffix') as string;
  const label = formData.get('label') as string;

  const { error } = await supabase
    .from('about_stats')
    .update({ value, suffix, label })
    .eq('id', id);

  if (error) throw new Error(error.message);
  revalidateTag('about-stats', 'default');
}

export async function createAboutStat(formData: FormData) {
  const supabase = await createClient();
  const label = formData.get('label') as string;
  const value = formData.get('value') as string;
  const suffix = formData.get('suffix') as string;

  const { data: existing } = await supabase
    .from('about_stats')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single();

  const { error } = await supabase.from('about_stats').insert({
    label,
    value,
    suffix,
    sort_order: (existing?.sort_order ?? 0) + 1,
  });

  if (error) throw new Error(error.message);
  revalidateTag('about-stats', 'default');
}

export async function deleteAboutStat(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('about_stats').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidateTag('about-stats', 'default');
}
