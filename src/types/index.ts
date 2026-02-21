// Database Types

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  summary?: string | null;
  challenge?: string | null;
  contribution?: string | null;
  key_features?: string[] | null;
  category?: string | null;
  image_url: string | null;
  tech_stack: string[] | null;
  demo_url: string | null;
  repo_url: string | null;
  sort_order: number;
  additional_images?: string[] | null;
  created_at: string;
}
