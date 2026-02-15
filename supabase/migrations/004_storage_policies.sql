-- Create the 'porto' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('porto', 'porto', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public read access to the 'porto' bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'porto' );

-- Policy: Allow authenticated users to upload files to 'porto' bucket
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'porto' );

-- Policy: Allow authenticated users to update files in 'porto' bucket
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'porto' );

-- Policy: Allow authenticated users to delete files in 'porto' bucket
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'porto' );
