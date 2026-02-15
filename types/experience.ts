export interface Experience {
  id: string;
  position: string;
  company: string;
  period: string; // e.g., "Jan 2023 - Present"
  description: string;
  sort_order: number;
  created_at?: string;
}
