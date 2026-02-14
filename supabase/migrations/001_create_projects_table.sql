-- =====================================================
-- Migration: Create Projects Table
-- Description: Portfolio projects showcase table
-- Author: Ari Awaludin
-- Date: 2026-02-14
-- =====================================================

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    tech_stack TEXT[],
    demo_url TEXT,
    repo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create RLS Policy: Allow public read access (SELECT)
CREATE POLICY "Allow public read access"
    ON public.projects
    FOR SELECT
    USING (true);

-- Optional: Create RLS Policy for authenticated insert/update/delete
-- Uncomment if you want to allow authenticated users to manage projects
-- CREATE POLICY "Allow authenticated insert"
--     ON public.projects
--     FOR INSERT
--     TO authenticated
--     WITH CHECK (true);

-- CREATE POLICY "Allow authenticated update"
--     ON public.projects
--     FOR UPDATE
--     TO authenticated
--     USING (true)
--     WITH CHECK (true);

-- CREATE POLICY "Allow authenticated delete"
--     ON public.projects
--     FOR DELETE
--     TO authenticated
--     USING (true);

-- =====================================================
-- Seed Data: Insert dummy project for testing
-- =====================================================

INSERT INTO public.projects (
    title,
    description,
    image_url,
    tech_stack,
    demo_url,
    repo_url
) VALUES (
    'Portfolio Website v2',
    'Modern portfolio website built with Next.js 15, Supabase, and Docker. Features server-side rendering, optimized for performance, and deployed on Google Cloud Run with a $5 budget constraint.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    ARRAY['Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Docker', 'Google Cloud Run'],
    'https://new-porto.example.com',
    'https://github.com/AriHyuk/new-porto'
);

-- =====================================================
-- Verification Queries
-- =====================================================

-- Check if table was created successfully
-- SELECT * FROM public.projects;

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'projects';

-- Count total projects
-- SELECT COUNT(*) FROM public.projects;
