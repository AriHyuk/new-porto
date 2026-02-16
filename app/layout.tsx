import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import VisualEffects from '@/components/UI/VisualEffects';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ari Awaludin | Senior Software Engineer',
  description: 'Portfolio of Ari Awaludin, a Senior Software Engineer specializing in modern web technologies.',
  metadataBase: new URL('https://new-porto-service-247210283088.us-central1.run.app'),
  openGraph: {
    title: 'Ari Awaludin | Senior Software Engineer',
    description: 'Portfolio of Ari Awaludin, a Senior Software Engineer specializing in modern web technologies.',
    url: 'https://new-porto-service-247210283088.us-central1.run.app',
    siteName: 'Ari Awaludin Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ari Awaludin Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ari Awaludin | Senior Software Engineer',
    description: 'Portfolio of Ari Awaludin, a Senior Software Engineer specializing in modern web technologies.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <VisualEffects />
          <Navbar />
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
