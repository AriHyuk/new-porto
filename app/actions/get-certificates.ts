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
    console.warn('⚠️ API Unreachable. Using Fallback Data for Certificates.');
    
    // Mock Data for fallback
    return [
      {
        id: 1,
        name: "Mock Certificate 1",
        issuer: "Coursera",
        issued_at: "2023-01-01",
        image: "https://via.placeholder.com/600x400?text=Certificate+1", 
        certificate_url: "#",
      },
      {
        id: 2,
        name: "Mock Certificate 2",
        issuer: "Udemy",
        issued_at: "2023-02-01",
        image: "https://via.placeholder.com/600x400?text=Certificate+2",
        certificate_url: "#",
      },
      {
        id: 3,
        name: "Mock Certificate 3",
        issuer: "Google",
        issued_at: "2023-03-01",
        image: "https://via.placeholder.com/600x400?text=Certificate+3",
        certificate_url: "#",
      },
       {
        id: 4,
        name: "Mock Certificate 4",
        issuer: "Dicoding",
        issued_at: "2023-04-01",
        image: "https://via.placeholder.com/600x400?text=Certificate+4",
        certificate_url: "#",
      },
    ];
  }
}
