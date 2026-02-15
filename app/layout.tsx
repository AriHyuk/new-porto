import "./globals.css";
import type { Metadata } from 'next';
import { Providers } from "./providers";
import CustomCursor from "@/components/UI/CustomCursor";

export const metadata: Metadata = {
  metadataBase: new URL('https://new-porto-service-247210283088.us-central1.run.app'),
  title: {
    default: 'Ari Hyuk | Full-Stack Web Developer & Creative Engineer',
    template: '%s | Ari Hyuk'
  },
  description: 'Full-Stack Web Developer specializing in building modern, premium, and high-performance web applications.',
  keywords: ['Web Developer', 'Full-Stack', 'Next.js', 'React', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Ari Hyuk' }],
  creator: 'Ari Hyuk',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://new-porto-service-247210283088.us-central1.run.app',
    title: 'Ari Hyuk | Full-Stack Web Developer',
    description: 'Full-Stack Web Developer specializing in high-performance web applications.',
    siteName: 'Ari Hyuk Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ari Hyuk Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ari Hyuk | Full-Stack Web Developer',
    description: 'Full-Stack Web Developer specializing in high-performance web applications.',
    images: ['/images/og-image.png'],
  },
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
