-- Enable insert for authenticated users
CREATE POLICY "Enable insert for authenticated users"
ON public.certificates
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Enable update for authenticated users
CREATE POLICY "Enable update for authenticated users"
ON public.certificates
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Enable delete for authenticated users
CREATE POLICY "Enable delete for authenticated users"
ON public.certificates
FOR DELETE
TO authenticated
USING (true);
