import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/web-apps";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Web App Development | Lopes2Tech - Custom SaaS and Business Applications",
    description: "Custom web application and SaaS development for Swiss businesses. Client portals, CRM dashboards, booking systems, and internal tools built fast with Next.js and Supabase. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: "Web App Development | Lopes2Tech",
      description: "Custom SaaS and business applications for Swiss companies — portals, dashboards, and internal tools built to scale.",
      url: canonical,
    },
  };
}

export default function WebAppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
