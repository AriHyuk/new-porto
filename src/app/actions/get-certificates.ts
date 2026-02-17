'use server';

import { createStaticClient } from '@/lib/supabase/server';
import { Certificate } from '@/types/certificate';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all certificates from Supabase (Cached)
 */
export const getCertificates = unstable_cache(
  async (): Promise<Certificate[]> => {
    try {
      const supabase = createStaticClient();
      
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
  },
  ['certificates-list'],
  { revalidate: 3600, tags: ['certificates'] }
);
