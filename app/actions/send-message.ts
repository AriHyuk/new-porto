'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { headers } from 'next/headers';

import { CollaborationSchema } from '@/lib/validations/contact';
import type { CollaborationFormData } from '@/lib/validations/contact';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const LIMIT = 3; // requests
const WINDOW = 60 * 1000; // 1 minute

export async function sendMessage(formData: CollaborationFormData) {
  try {
    // Rate Limiting Logic
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    const record = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - record.lastReset > WINDOW) {
      record.count = 0;
      record.lastReset = now;
    }

    if (record.count >= LIMIT) {
      return { success: false, message: 'Too many requests. Please try again later.' };
    }

    record.count += 1;
    rateLimitMap.set(ip, record);

    // Validate data using Zod
    const validatedData = CollaborationSchema.parse(formData);

    // Honeypot check: If filled, it's likely a bot
    if (validatedData._honeypot) {
      // Return success to deceive bot, but do nothing
      return { success: true, message: 'Your request has been sent successfully!' };
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('collaborations')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          category: validatedData.category,
          budget: validatedData.budget,
          message: validatedData.message,
          status: 'pending',
        },
      ]);

    if (error) {
      throw error;
    }

    return { success: true, message: 'Your request has been sent successfully!' };
  } catch (error) {
    console.error('Error in sendMessage:', error);
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: 'Validation failed', 
        errors: error.flatten().fieldErrors 
      };
    }
    return { 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    };
  }
}
