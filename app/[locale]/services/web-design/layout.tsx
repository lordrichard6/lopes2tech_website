import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/web-design";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Web Design for Zurich Businesses | From CHF 600 | Lopes2Tech",
    description: "Professional website design and development for Swiss businesses. Fast delivery, mobile-responsive, SEO optimized. Packages from CHF 600 to CHF 2,450.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "Web Design for Zurich Businesses | Lopes2Tech", description: "Professional websites from CHF 600. Fast delivery, mobile-responsive, SEO optimized.", url: canonical },
  };
}

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
