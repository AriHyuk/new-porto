-- 1. Create projects table if not exists
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE, -- Added slug directly here
    description TEXT,
    image_url TEXT,
    tech_stack TEXT[],
    demo_url TEXT,
    repo_url TEXT,
    user_id UUID REFERENCES auth.users(id), -- Link to auth.users for ownership
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Add slug column if it was missing (safe for existing table)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'slug') THEN
        ALTER TABLE public.projects ADD COLUMN slug TEXT UNIQUE;
    END IF;
END $$;

-- 3. Add user_id column if it was missing (safe for existing table)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'user_id') THEN
        ALTER TABLE public.projects ADD COLUMN user_id UUID REFERENCES auth.users(id);
    END IF;
END $$;

-- 4. Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.projects;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.projects;

-- 6. Re-create Policies

-- Public Read
CREATE POLICY "Allow public read access"
ON public.projects FOR SELECT
USING (true);

-- Authenticated Insert
CREATE POLICY "Allow authenticated insert"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Authenticated Update
CREATE POLICY "Allow authenticated update"
ON public.projects FOR UPDATE
TO authenticated
USING (true);

-- Authenticated Delete
CREATE POLICY "Allow authenticated delete"
ON public.projects FOR DELETE
TO authenticated
USING (true);

-- 7. Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
