-- =====================================================
-- Migration: Create Collaborations Table
-- Description: Table to store meeting requests and collaboration messages
-- Author: Ari Awaludin
-- Date: 2026-02-14
-- =====================================================

-- Create collaborations table
CREATE TABLE IF NOT EXISTS public.collaborations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT NOT NULL,
    budget TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;

-- Create RLS Policy: Allow public INSERT access
CREATE POLICY "Allow public insert"
    ON public.collaborations
    FOR INSERT
    WITH CHECK (true);

-- Create RLS Policy: Restrict SELECT to authenticated users (admin)
CREATE POLICY "Allow authenticated read"
    ON public.collaborations
    FOR SELECT
    TO authenticated
    USING (true);

-- Comment on table for clarity
COMMENT ON TABLE public.collaborations IS 'Stores user inquiries from the Hire Me / Contact form.';
