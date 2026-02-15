-- Enable RLS
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Policy: Public Read
CREATE POLICY "Allow public read access"
ON public.experiences
FOR SELECT
USING (true);

-- Policy: Authenticated Insert
CREATE POLICY "Enable insert for authenticated users"
ON public.experiences
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Authenticated Update
CREATE POLICY "Enable update for authenticated users"
ON public.experiences
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Authenticated Delete
CREATE POLICY "Enable delete for authenticated users"
ON public.experiences
FOR DELETE
TO authenticated
USING (true);
