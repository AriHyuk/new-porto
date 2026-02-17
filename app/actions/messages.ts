'use server';

import { Message } from '@/types/message';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { createClient, createAdminClient } from '@/lib/supabase/server';

/**
 * Fetch all collaboration messages (Admin Only, Cached if Admin Key exists)
 */
export async function getMessages(): Promise<Message[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  // If Service Role Key is missing, we fetch directly using the dynamic user session.
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { data, error } = await supabase
      .from('collaborations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages (Dynamic):', error);
      return [];
    }
    return data as Message[];
  }

  // If Key exists, use the Elite Cache approach
  return unstable_cache(
    async () => {
      const adminClient = createAdminClient();
      const { data, error } = await adminClient
        .from('collaborations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages (Cached):', error);
        return [];
      }
      return data as Message[];
    },
    ['admin-messages-list'],
    { revalidate: 30, tags: ['messages'] }
  )();
}

/**
 * Get count of unread messages for sidebar badge
 */
export async function getUnreadMessagesCount(): Promise<number> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return 0;

  // Fallback if Service Key is missing
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { count, error } = await supabase
      .from('collaborations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (error) return 0;
    return count || 0;
  }

  return unstable_cache(
    async () => {
      const adminClient = createAdminClient();
      const { count, error } = await adminClient
        .from('collaborations')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending'); 

      if (error) return 0;
      return count || 0;
    },
    ['admin-messages-unread-count'],
    { revalidate: 30, tags: ['messages'] }
  )();
}

export async function markAsRead(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('collaborations')
    .update({ status: 'read' })
    .eq('id', id);

  if (error) {
    console.error('Error marking message as read:', error);
    throw new Error('Failed to mark message as read');
  }

  revalidatePath('/admin/messages', 'page');
  revalidateTag('messages', 'default');
  return { success: true, message: 'Message acknowledged.' };
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  
  // 1. Verify Authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error('Unauthorized');
  }

  // 2. Use Admin Client to bypass RLS and ensure deletion
  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from('collaborations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    throw new Error('Failed to delete message');
  }

  revalidatePath('/admin/messages', 'page');
  revalidateTag('messages', 'default');
  return { success: true, message: 'Message permanently removed.' };
}
