-- Migration: Add sort_order and additional_images to projects
-- Description: Supports manual project sorting and multi-image gallery.

ALTER TABLE projects ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS additional_images TEXT[] DEFAULT '{}';

-- Update existing dummy projects if needed
-- (They were likely already updated manually, but this ensures consistency)
UPDATE projects SET sort_order = 10 WHERE slug LIKE 'agenticscholar%';
UPDATE projects SET sort_order = 20 WHERE slug LIKE 'cloud-native%';
UPDATE projects SET sort_order = 30 WHERE slug LIKE 'sequential%';
