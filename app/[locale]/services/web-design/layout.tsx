import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/web-design";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Web Design & Development | Lopes2Tech - Swiss Websites That Convert",
    description: "Custom website design and development for Swiss SMEs and startups. Fast, SEO-optimized, mobile-first sites built in Next.js. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: "Web Design & Development | Lopes2Tech",
      description: "Custom, high-performance websites for Swiss businesses. SEO-ready, mobile-first, built to convert visitors into clients.",
      url: canonical,
    },
  };
}

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
