'use server';

import { createClient } from '@/lib/supabase/server';
import { Message } from '@/types/message';
import { revalidatePath } from 'next/cache';

export async function getMessages(): Promise<Message[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('collaborations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data as Message[];
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

  revalidatePath('/admin/messages');
  return { success: true };
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('collaborations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    throw new Error('Failed to delete message');
  }

  revalidatePath('/admin/messages');
  return { success: true };
}
