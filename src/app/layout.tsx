import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Geist, Geist_Mono } from 'next/font/google';

import { isProd } from '@/utils';

import './global.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans'
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

const SITE_TITLE = 'Tailwind Variants';
const SITE_DESCRIPTION = 'A first-class variant API for Tailwind CSS.';
const SITE_IMAGE = 'https://tailwind-variants.org/banner.png';

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s – ${SITE_TITLE}`
  },
  description: SITE_DESCRIPTION,
  applicationName: 'tailwind-variants',
  appleWebApp: {
    title: 'tailwind-variants'
  },
  other: {
    'msapplication-TileColor': '#ffffff'
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#000000'
      }
    ]
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hero_ui',
    images: [SITE_IMAGE]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider dir="ltr">{children}</RootProvider>
        {isProd && <Analytics />}
      </body>
    </html>
  );
}
