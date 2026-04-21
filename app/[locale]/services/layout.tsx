import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Services | Lopes2Tech - Web Development, SEO, AI & Automation",
    description: "Full-service digital solutions for Swiss businesses: custom web development, SEO engineering, AI integration, social media marketing, and business automation. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    openGraph: { title: "Services | Lopes2Tech", description: "Full-service digital solutions: web development, SEO, AI integration, and business automation for Swiss businesses.", url: canonical },
  };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
