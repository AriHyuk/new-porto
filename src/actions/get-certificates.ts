'use server';

import { Certificate } from '@/types/certificate';
import { certificatesData } from '@/constants/certificates';

/**
 * Fetch all certificates from Local Static Data
 */
export async function getCertificates(): Promise<Certificate[]> {
  // Sort by issued_at descending (newest first)
  return [...certificatesData].sort(
    (a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime()
  );
}
