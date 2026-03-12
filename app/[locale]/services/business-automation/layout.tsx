import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/business-automation";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Business Automation | Lopes2Tech - Automate Admin and Scale Your Business",
    description: "Business process automation for Swiss SMEs. Eliminate repetitive admin tasks, automate lead follow-up, and connect your tools with custom n8n and AI workflows. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: "Business Automation | Lopes2Tech",
      description: "Custom automation workflows for Swiss businesses — stop wasting time on manual tasks and scale without hiring.",
      url: canonical,
    },
  };
}

export default function BusinessAutomationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
