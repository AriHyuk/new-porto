-- =====================================================
-- Migration: Create Certificates Table
-- Description: Professional certifications showcase table
-- Author: Ari Awaludin
-- Date: 2026-02-14
-- =====================================================

-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issued_at DATE NOT NULL,
    image_url TEXT NOT NULL,
    certificate_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS Policy: Allow public read access (SELECT)
CREATE POLICY "Allow public read access"
    ON public.certificates
    FOR SELECT
    USING (true);

-- =====================================================
-- Seed Data: Insert initial certificates
-- =====================================================

INSERT INTO public.certificates (
    name,
    issuer,
    issued_at,
    image_url,
    certificate_url
) VALUES 
(
    'Advanced React & Next.js',
    'Coursera',
    '2023-01-15',
    'https://via.placeholder.com/600x400?text=React+Nextjs+Cert',
    'https://example.com/verify/1'
),
(
    'TypeScript Mastery',
    'Udemy',
    '2023-03-20',
    'https://via.placeholder.com/600x400?text=TypeScript+Cert',
    'https://example.com/verify/2'
),
(
    'Professional Cloud Developer',
    'Google Cloud',
    '2023-06-10',
    'https://via.placeholder.com/600x400?text=GCP+Cert',
    'https://example.com/verify/3'
),
(
    'Modern Web Security',
    'Dicoding',
    '2023-08-05',
    'https://via.placeholder.com/600x400?text=Web+Security+Cert',
    'https://example.com/verify/4'
);
