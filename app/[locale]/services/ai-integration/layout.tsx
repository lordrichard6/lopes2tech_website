import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/ai-integration";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "AI Integration | Lopes2Tech - AI-Powered Solutions for Swiss Businesses",
    description: "Custom AI integration and chatbot development for Swiss companies. Automate customer service, lead generation, and internal workflows with LLM-powered tools. Based in Zurich.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: "AI Integration | Lopes2Tech",
      description: "Custom AI solutions and chatbots for Swiss businesses — automate workflows and deliver smarter customer experiences.",
      url: canonical,
    },
  };
}

export default function AiIntegrationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
