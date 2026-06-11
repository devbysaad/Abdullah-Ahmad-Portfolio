import { Inter_Tight, Sora } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata = {
  title: 'Abdullah Ahmad — Senior Full Stack Engineer',
  description:
    'Abdullah Ahmad — Senior full stack software engineer shipping for 500K users daily.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  ),
  icons: {
    icon: '/abdullah.png',
    apple: '/abdullah.png',
  },
  openGraph: {
    title: 'Abdullah Ahmad — Senior Full Stack Engineer',
    description:
      'Senior full stack software engineer shipping for 500K users daily.',
    type: 'website',
    images: [{ url: '/abdullah.png', width: 800, height: 800, alt: 'Abdullah Ahmad' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah Ahmad — Senior Full Stack Engineer',
    description:
      'Senior full stack software engineer shipping for 500K users daily.',
    images: ['/abdullah.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${interTight.variable}`}>
      <head>
        <link rel="preload" href="/abdullah.png" as="image" type="image/png" />
      </head>
      <body>
        {children}
        <Providers />
      </body>
    </html>
  );
}
