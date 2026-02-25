import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/business-automation";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Business Automation for Swiss Companies | Workflow & CRM | Lopes2Tech",
    description: "Automate your business processes with Zapier, Make, and custom scripts. CRM automation, lead capture, and workflow optimization from CHF 800.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "Business Automation for Swiss Companies | Lopes2Tech", description: "Workflow automation, Zapier/Make integrations, and CRM automation from CHF 800.", url: canonical },
  };
}

export default function BusinessAutomationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
