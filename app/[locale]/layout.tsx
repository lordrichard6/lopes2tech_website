import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter to match Angular project
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import JsonLd from '@/components/JsonLd';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import Clarity from '@/components/Clarity';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Viewport configuration (Next.js 14+ best practice)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  title: "Lopes2Tech - AI & Automations: Tech-Accelerated Growth for Modern Business.",
  description: "We help small and medium companies get more leads, automate admin, and scale without complexity.",
  manifest: '/manifest.json',
  themeColor: '#00f5ff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lopes2Tech',
  },
  keywords: ["lopes2tech", "website development", "SEO development", "AI workflows", "IT solutions Switzerland", "process automation", "app development", "custom software", "business automation", "Zurich"],
  authors: [{ name: "Paulo R. Lopes" }],
  metadataBase: new URL("https://lopes2tech.ch"),
  alternates: {
    canonical: "/",
    languages: {
      'en': '/en',
      'de': '/de',
      'pt': '/pt',
      'x-default': '/en',
    },
  },
  openGraph: {
    title: "Lopes2Tech - Websites & Automations for Service Businesses",
    description: "We help small and medium companies get more leads, automate admin, and scale without complexity.",
    url: "https://lopes2tech.ch",
    siteName: "Lopes2Tech",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lopes2Tech - Swiss IT Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lopes2Tech - Websites & Automations for Service Businesses",
    description: "We help small and medium companies get more leads, automate admin, and scale without complexity.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo_w.svg",
    shortcut: "/logo_w.svg",
    apple: "/logo_w.svg",
  },
  other: {
    'geo.region': 'CH-ZH',
    'geo.placename': 'Zurich',
    'geo.position': '47.3067;8.5550',
    'ICBM': '47.3067, 8.5550',
  },
};

export function generateStaticParams() {
  return ['en', 'pt', 'de'].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!['en', 'pt', 'de'].includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics />
          <GoogleAnalytics />
          <Clarity />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
