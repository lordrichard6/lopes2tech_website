import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/seo-development";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "SEO Development | Lopes2Tech - Technical SEO for Swiss Businesses",
    description: "Technical SEO and content optimization for Swiss companies. Rank higher on Google with structured data, Core Web Vitals optimization, and multilingual SEO. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: "SEO Development | Lopes2Tech",
      description: "Technical SEO and content optimization to help Swiss businesses rank higher and attract more qualified leads.",
      url: canonical,
    },
  };
}

export default function SeoDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
