'use server';

import { createClient } from '@/lib/supabase/server';
import { Certificate } from '@/types/certificate';

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('issued_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data as Certificate[];
  } catch (error) {
    console.error('Error fetching certificates from Supabase:', error);
    
    // Fallback Mock Data as safety net
    return [
      {
        id: 'mock-1',
        name: "Mock Certificate 1",
        issuer: "Coursera",
        issued_at: "2023-01-01",
        image_url: "https://via.placeholder.com/600x400?text=Certificate+1", 
        certificate_url: "#",
      },
      {
        id: 'mock-2',
        name: "Mock Certificate 2",
        issuer: "Udemy",
        issued_at: "2023-02-01",
        image_url: "https://via.placeholder.com/600x400?text=Certificate+2",
        certificate_url: "#",
      }
    ];
  }
}
