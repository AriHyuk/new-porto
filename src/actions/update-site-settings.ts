'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidateTag } from 'next/cache';

export async function updateSiteSetting(key: string, value: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
  revalidateTag('site-settings', 'default');
}

export async function toggleAvailableForWork(current: boolean) {
  await updateSiteSetting('available_for_work', (!current).toString());
}
