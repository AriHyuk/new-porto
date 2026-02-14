// Database Types

export interface Project {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  tech_stack: string[] | null;
  demo_url: string | null;
  repo_url: string | null;
  created_at: string;
}
