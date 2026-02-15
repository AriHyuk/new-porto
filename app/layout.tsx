import "./globals.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";
import CustomCursor from "@/components/UI/CustomCursor";

export const metadata: Metadata = {
  title: {
    default: 'Ari Hyuk | Full-Stack Web Developer & Creative Engineer',
    template: '%s | Ari Hyuk'
  },
  description: 'Full-Stack Web Developer specializing in building modern, premium, and high-performance web applications.',
  keywords: ['Web Developer', 'Full-Stack', 'Next.js', 'React', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Ari Hyuk' }],
  creator: 'Ari Hyuk',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
