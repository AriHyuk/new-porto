export interface Message {
  id: string;
  name: string;
  email: string;
  category: string;
  budget: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  created_at: string;
}
