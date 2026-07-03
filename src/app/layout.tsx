import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gatekeeper-dusun-dictionary.vercel.app'),
  title: 'Gatekeeper Dusun Dictionary V1',
  description: 'Preserving the Language, Culture and Heritage of Borneo.',
  keywords: [
    'Dusun Dictionary',
    'Dusun Language',
    'Sabah',
    'Borneo',
    'Kadazan Dusun',
    'Common Phrases',
    'Native Language',
    'Language Learning',
    'Malaysia',
    'Heritage',
    'Culture',
    'Translation',
    'Gatekeeper Dusun Dictionary',
  ],
  authors: [{ name: 'Almond Gabu', url: 'https://gatekeeper-dusun-dictionary.vercel.app' }],
  creator: 'Almond Gabu',
  publisher: 'Borneo Land Gatekeeper',
  openGraph: {
    title: 'Gatekeeper Dusun Dictionary V1',
    description: 'Preserving the Language, Culture and Heritage of Borneo.',
    url: 'https://gatekeeper-dusun-dictionary.vercel.app',
    siteName: 'Gatekeeper Dusun Dictionary V1',
    type: 'website',
    locale: 'en_MY',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gatekeeper Dusun Dictionary V1',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gatekeeper Dusun Dictionary V1',
    description: 'Preserving the Language, Culture and Heritage of Borneo.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F1E6] text-[#1A1A1A]">{children}</body>
    </html>
  );
}
