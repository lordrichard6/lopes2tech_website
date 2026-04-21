import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "Pricing — Lopes2Tech | Transparent Swiss Agency Rates",
    description: "Full pricing for websites, branding, marketing, AI & automation. 40–60% below Zurich agency averages. No hidden fees.",
    ogTitle: "Transparent Pricing — Lopes2Tech",
    ogDesc: "Every service, every price. 40–60% below Zurich agency averages.",
  },
  pt: {
    title: "Preços — Lopes2Tech | Tarifas Transparentes",
    description: "Preços completos para websites, branding, marketing, IA e automação. 40–60% abaixo das agências em Zurique. Sem taxas ocultas.",
    ogTitle: "Preços Transparentes — Lopes2Tech",
    ogDesc: "Todos os serviços, todos os preços. 40–60% abaixo das agências de Zurique.",
  },
  de: {
    title: "Preise — Lopes2Tech | Transparente Schweizer Agenturpreise",
    description: "Vollständige Preise für Websites, Branding, Marketing, KI & Automatisierung. 40–60% unter Züricher Agenturpreisen. Keine versteckten Gebühren.",
    ogTitle: "Transparente Preise — Lopes2Tech",
    ogDesc: "Jede Dienstleistung, jeder Preis. 40–60% unter Züricher Agenturdurchschnitt.",
  },
  fr: {
    title: "Tarifs — Lopes2Tech | Prix Transparents d'Agence Suisse",
    description: "Tarifs complets pour sites web, branding, marketing, IA & automatisation. 40–60% en dessous des agences zurichoises. Aucuns frais cachés.",
    ogTitle: "Tarifs Transparents — Lopes2Tech",
    ogDesc: "Chaque service, chaque prix. 40–60% en dessous des agences de Zurich.",
  },
  it: {
    title: "Prezzi — Lopes2Tech | Tariffe Trasparenti dell'Agenzia Svizzera",
    description: "Prezzi completi per siti web, branding, marketing, IA e automazione. 40–60% al di sotto delle agenzie di Zurigo. Nessuna tariffa nascosta.",
    ogTitle: "Prezzi Trasparenti — Lopes2Tech",
    ogDesc: "Ogni servizio, ogni prezzo. 40–60% al di sotto della media delle agenzie di Zurigo.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = "/pricing";
  const canonical = `${BASE_URL}/${locale}${path}`;
  const meta = metaByLocale[locale] ?? metaByLocale.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        "x-default": `${BASE_URL}/en${path}`,
        en: `${BASE_URL}/en${path}`,
        de: `${BASE_URL}/de${path}`,
        pt: `${BASE_URL}/pt${path}`,
        fr: `${BASE_URL}/fr${path}`,
        it: `${BASE_URL}/it${path}`,
      },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDesc,
      url: canonical,
      siteName: "Lopes2Tech",
      type: "website",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech Pricing" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDesc,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
