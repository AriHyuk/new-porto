export interface Certificate {
  id: string; // Changed from number to string (UUID)
  name: string;
  issuer: string;
  issued_at: string;
  image_url: string; // Changed from image to image_url to match Supabase
  certificate_url: string;
}
