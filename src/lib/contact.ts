import { CollaborationSchema, type CollaborationFormData } from '@/lib/validations/contact';
import { z } from 'zod';

export interface SendMessageResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function sendContactMessage(formData: CollaborationFormData): Promise<SendMessageResult> {
  try {
    // Validate data using Zod
    const validatedData = CollaborationSchema.parse(formData);

    // Honeypot check: If filled by spam bots, fake success silently
    if (validatedData._honeypot) {
      return { success: true, message: 'Your request has been sent successfully!' };
    }

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      process.env.WEB3FORMS_ACCESS_KEY ||
      '5ce770f5-a4eb-4420-8617-8c7423b864e3';

    if (!accessKey) {
      return {
        success: false,
        message: 'Web3Forms access key is missing. Please contact me directly via email.',
      };
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
      throw new Error(result.message || 'Failed to send message via Web3Forms');
    }

    return {
      success: true,
      message: 'Your request has been sent successfully! I will get back to you soon.',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors,
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send message. Please try again later.',
    };
  }
}
