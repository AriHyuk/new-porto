'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { CollaborationSchema } from '@/lib/validations/contact';
import type { CollaborationFormData } from '@/lib/validations/contact';

// Simple in-memory rate limiter (Works best in standalone Node.js, but acts as basic protection in serverless)
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

    // WEB3FORMS INTEGRATION
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('Missing WEB3FORMS_ACCESS_KEY in environment variables.');
      return { success: false, message: 'Server configuration error. Please contact me directly via email.' };
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: validatedData.name,
        email: validatedData.email,
        subject: `New Collaboration Request: ${validatedData.category}`,
        budget: validatedData.budget,
        message: validatedData.message,
        from_name: 'Portfolio Contact Form',
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error('Web3Forms Error:', result);
      throw new Error(result.message || 'Failed to send email via Web3Forms');
    }

    return { success: true, message: 'Your request has been sent successfully! I will get back to you soon.' };
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
