'use server';

import { Certificate } from '@/types/certificate';
import { certificatesData } from '@/constants/certificates';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all certificates from Local Static Data (Cached)
 */
export const getCertificates = unstable_cache(
  async (): Promise<Certificate[]> => {
    // Sort by issued_at descending (newest first)
    return [...certificatesData].sort(
      (a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime()
    );
  },
  ['certificates-list-static'],
  { revalidate: 3600, tags: ['certificates'] }
);
