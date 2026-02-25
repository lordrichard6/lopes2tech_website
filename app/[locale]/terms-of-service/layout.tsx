import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/terms-of-service";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Terms of Service | Lopes2Tech",
    description: "Terms of service for Lopes2Tech. Read our terms and conditions for web development, SEO, and business automation services.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    robots: { index: false, follow: true },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
