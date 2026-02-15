import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Ari Hyuk | Full-Stack Web Developer & Creative Engineer',
    template: '%s | Ari Hyuk'
  },
  description: 'Full-Stack Web Developer specializing in building modern, premium, and high-performance web applications using React, Next.js, and TypeScript.',
  keywords: ['Web Developer', 'Full-Stack', 'Next.js', 'React', 'TypeScript', 'Portfolio', 'Indonesia', 'Creative Developer'],
  authors: [{ name: 'Ari Hyuk' }],
  creator: 'Ari Hyuk',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://arihyuk.dev',
    title: 'Ari Hyuk | Full-Stack Web Developer',
    description: 'Transforming ideas into premium digital experiences.',
    siteName: 'Ari Hyuk Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ari Hyuk | Full-Stack Web Developer',
    description: 'Transforming ideas into premium digital experiences.',
    creator: '@arihyuk',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Providers } from "./providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import CustomCursor from "@/components/UI/CustomCursor";
import ScrollProgress from "@/components/UI/ScrollProgress";
import MeshBackground from "@/components/UI/MeshBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MeshBackground />
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
