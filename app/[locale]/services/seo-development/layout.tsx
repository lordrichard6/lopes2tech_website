import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/seo-development";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "SEO Development for Swiss Businesses | Technical SEO | Lopes2Tech",
    description: "Technical SEO audits, programmatic SEO, on-page optimization, and Core Web Vitals improvement. SEO packages from CHF 450 to CHF 1,200/mo.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "SEO Development for Swiss Businesses | Lopes2Tech", description: "Technical SEO audits, on-page optimization, and Core Web Vitals. Packages from CHF 450.", url: canonical },
  };
}

export default function SEODevelopmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
