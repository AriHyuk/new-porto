-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    position text NOT NULL,
    company text NOT NULL,
    period text NOT NULL,
    description text,
    sort_order int DEFAULT 0,
    created_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    category text NOT NULL,
    icon_key text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Insert experience data
INSERT INTO experiences (position, company, period, description, sort_order)
VALUES 
('Software Engineer', 'Freelance', '2020 - Present', 'Engineering scalable web solutions and high-performance applications. Focused on clean architecture, seamless user experiences, and modern backend integration.', 1),
('Web Developer Intern', 'Tech Solutions', '2019 - 2020', 'Assisted in building responsive websites and implementing UI/UX designs. Gained experience in modern frontend workflows.', 2);

-- Insert dummy skills data (MongoDB, Express, React, Node.js)
INSERT INTO skills (name, category, icon_key)
VALUES 
('MongoDB', 'Database', 'mongodb'),
('Express', 'Backend', 'express'),
('React', 'Frontend', 'react'),
('Node.js', 'Backend', 'node');
