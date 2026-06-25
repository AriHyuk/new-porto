import { Certificate } from '@/types/certificate';

export const certificatesData: Certificate[] = [
  {
    id: 'cert-1',
    name: 'Sertifikat Penghargaan Pemateri Hackathon',
    issuer: 'HIMTIF Universitas Pamulang',
    issued_at: '2026-06-18',
    image_url: '/certificates/pemateri.webp',
    certificate_url: '',
  },
  {
    id: 'cert-2',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issued_at: '2024-01-10',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    certificate_url: 'https://aws.amazon.com/verify/example2',
  }
];
