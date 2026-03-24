import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'react-hot-toast';
import VisualEffects from '@/components/UI/VisualEffects';
import { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
    display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  title: 'Ari Hyuk — Fullstack Software Engineer',
  description: 'I design and build end-to-end web applications — from intuitive frontend interfaces to scalable backend systems. Fullstack Software Engineer.',
  metadataBase: new URL('https://ariawaludin.my.id'),
  keywords: [
    'fullstack engineer', 'frontend', 'react', 'next.js',
    'backend engineer', 'systems architect', 'cloud engineer', 'GCP',
    'Kubernetes', 'Go', 'Golang', 'Node.js', 'software architecture',
    'clean architecture', 'software engineer Indonesia',
  ],
  openGraph: {
    title: 'Ari Hyuk — Fullstack Software Engineer',
    description: 'End-to-end web applications. From intuitive UIs to scalable backends. Fullstack Software Engineer.',
    url: 'https://ariawaludin.my.id',
    siteName: 'Ari Hyuk Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ari Hyuk | Fullstack Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ari Hyuk — Fullstack Software Engineer',
    description: 'End-to-end web applications. From intuitive UIs to scalable backends. Fullstack Software Engineer.',
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
      <body className={`${inter.className} antialiased selection:bg-blue-500/30`} suppressHydrationWarning>
        <Providers>
          <VisualEffects />
          <main className="min-h-screen bg-gray-50 dark:bg-[#030712] transition-colors overflow-x-hidden">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
