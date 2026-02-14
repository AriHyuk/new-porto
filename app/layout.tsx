import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio v2',
  description: 'Portfolio v2 Coming Soon',
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
