import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/insights";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Insights & Blog | Lopes2Tech - AI, Web Development & SEO",
    description: "Expert articles on AI workflows, technical SEO, web development, and business automation for Swiss businesses. Practical guides and case studies.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    openGraph: { title: "Insights & Blog | Lopes2Tech", description: "Expert articles on AI, web development, SEO, and business automation.", url: canonical },
  };
}

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
