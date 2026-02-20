-- Migration: Add category field to projects table
-- Description: Adding explicit category for better project classification.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'category') THEN
        ALTER TABLE public.projects ADD COLUMN category TEXT;
    END IF;
END $$;
