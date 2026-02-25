import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/web-apps";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Custom Web Applications | Full-Stack Development | Lopes2Tech",
    description: "Full-stack SaaS platforms, dashboards, portals, and APIs built with React, Next.js, and TypeScript. Web app development from CHF 3,500.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "Custom Web Applications | Lopes2Tech", description: "Full-stack SaaS, dashboards, and APIs from CHF 3,500.", url: canonical },
  };
}

export default function WebAppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
