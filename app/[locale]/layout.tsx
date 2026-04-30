import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
// Side-effect import — runs the Zod env validation on every server boot
// and prints warnings if any vars are missing. Defined in lib/env.ts.
import "@/lib/env";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import JsonLd from '@/components/JsonLd';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import Clarity from '@/components/Clarity';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import AppChrome from '@/components/AppChrome';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Viewport configuration (Next.js 14+ best practice)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

// Map next-intl locale → BCP-47 / OpenGraph locale tag.
const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  de: 'de_CH',
  pt: 'pt_PT',
  fr: 'fr_CH',
  it: 'it_CH',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = OG_LOCALE[locale] ?? OG_LOCALE.en;
  return {
    // 57 chars — fits Google's ~60 char SERP limit with geographic keyword intact
    title: "Lopes2Tech | Premium Websites & Digital Marketing — Zurich",
    description: "Premium websites, automation, AI, and digital marketing for Swiss SMEs. More leads, less admin — built fast and priced below Zurich market rates.",
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Lopes2Tech',
    },
    authors: [{ name: "Paulo R. Lopes" }],
    metadataBase: new URL("https://www.lopes2tech.ch"),
    // NOTE: No `alternates.canonical` at the root layout on purpose — each page
    // sets its own locale-specific canonical via its own generateMetadata. A
    // root-level canonical would be inherited by any page missing an override
    // and point every locale at the English homepage (CLAUDE.md landmine #2).
    openGraph: {
      title: "Lopes2Tech — Premium Websites, Automation & Digital Marketing for Swiss Businesses",
      description: "Premium websites, automation, AI, and digital marketing for Swiss SMEs. More leads, less admin — built fast and priced below Zurich market rates.",
      url: "https://www.lopes2tech.ch",
      siteName: "Lopes2Tech",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Lopes2Tech — Premium Websites & Digital Marketing, Zurich",
        },
      ],
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALE).filter(l => l !== ogLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Lopes2Tech — Premium Websites, Automation & Digital Marketing for Swiss Businesses",
      description: "Premium websites, automation, AI, and digital marketing for Swiss SMEs. More leads, less admin — built fast and priced below Zurich market rates.",
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    other: {
      'geo.region': 'CH-ZH',
      'geo.placename': 'Zurich',
      'geo.position': '47.3067;8.5550',
      'ICBM': '47.3067, 8.5550',
    },
  };
}

export function generateStaticParams() {
  return ['en', 'pt', 'de', 'fr', 'it'].map((locale) => ({ locale }));
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
  if (!['en', 'pt', 'de', 'fr', 'it'].includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Layout' });

  return (
    <html lang={locale}>
      <head>
        <JsonLd />
        <link rel="alternate" type="application/rss+xml" title="Lopes2Tech Insights" href={`/${locale}/insights/feed.xml`} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none"
        >
          {t('skipToContent')}
        </a>
        <NextIntlClientProvider messages={messages}>
          <AppChrome>{children}</AppChrome>
          <Analytics />
          <GoogleAnalytics />
          <Clarity />
          <CookieConsent />
          <ServiceWorkerRegister />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
