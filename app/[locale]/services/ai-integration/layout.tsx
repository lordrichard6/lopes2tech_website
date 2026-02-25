import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/ai-integration";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "AI Integration & Chatbots for Swiss Businesses | Lopes2Tech",
    description: "Custom AI agents, chatbots, RAG knowledge bases, and GPT/Claude API integration. AI solutions from CHF 1,200 to CHF 3,500+.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: { title: "AI Integration & Chatbots | Lopes2Tech", description: "Custom AI agents, chatbots, and RAG knowledge bases from CHF 1,200.", url: canonical },
  };
}

export default function AIIntegrationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
