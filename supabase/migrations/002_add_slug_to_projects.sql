-- Migration: Add slug to projects table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'slug') THEN
        ALTER TABLE public.projects ADD COLUMN slug TEXT;
        UPDATE public.projects SET slug = LOWER(REPLACE(title, ' ', '-'));
        ALTER TABLE public.projects ALTER COLUMN slug SET NOT NULL;
        ALTER TABLE public.projects ADD CONSTRAINT projects_slug_key UNIQUE (slug);
    END IF;
END $$;
