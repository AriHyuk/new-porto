-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Enable read access for all users" ON skills
    FOR SELECT USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users only" ON skills
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update
CREATE POLICY "Enable update for authenticated users only" ON skills
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete
CREATE POLICY "Enable delete for authenticated users only" ON skills
    FOR DELETE USING (auth.role() = 'authenticated');
