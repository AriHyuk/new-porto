-- Migration: Add storytelling fields to projects table
-- Description: Adding summary, challenge, contribution, and key_features for better project narratives.

DO $$
BEGIN
    -- 1. Add summary column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'summary') THEN
        ALTER TABLE public.projects ADD COLUMN summary TEXT;
    END IF;

    -- 2. Add challenge column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'challenge') THEN
        ALTER TABLE public.projects ADD COLUMN challenge TEXT;
    END IF;

    -- 3. Add contribution column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'contribution') THEN
        ALTER TABLE public.projects ADD COLUMN contribution TEXT;
    END IF;

    -- 4. Add key_features column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'key_features') THEN
        ALTER TABLE public.projects ADD COLUMN key_features TEXT[];
    END IF;
END $$;

-- Update RLS (Policies should already be open for authenticated based on 005)
-- No changes needed to existing policies as they usually cover ALL columns.

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
