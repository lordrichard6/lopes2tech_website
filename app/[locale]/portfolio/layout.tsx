import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/portfolio";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Portfolio | Lopes2Tech - Web Apps & Websites Built in Switzerland",
    description: "Explore our portfolio of custom web applications, SaaS platforms, and websites built for Swiss businesses. From restaurant management to AI-powered CRMs.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "Portfolio | Lopes2Tech", description: "Custom web applications, SaaS platforms, and websites built for Swiss businesses.", url: canonical },
  };
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
