'use server';

import { Certificate } from '@/types/certificate';

const API_URL = 'https://admin-panel.oktovet.store/api/certificates';

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch certificates: ${res.status}`);
    }

    const data = await res.json();
    
    // Ensure data is an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return []; // Return empty array on error to prevent page crash
  }
}
