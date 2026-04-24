import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "FAQ | Lopes2Tech - Web Design, SEO & Social Media Pricing",
    description: "Frequently asked questions about web design, SEO, social media marketing, and business automation services. Pricing, timelines, and packages explained.",
    ogTitle: "FAQ | Lopes2Tech",
    ogDesc: "Answers to common questions about our web design, SEO, and automation services in Zurich.",
  },
  de: {
    title: "FAQ | Lopes2Tech - Preise für Webdesign, SEO & Social Media",
    description: "Häufig gestellte Fragen zu Webdesign, SEO, Social Media Marketing und Geschäftsautomatisierung. Preise, Zeitrahmen und Pakete erklärt.",
    ogTitle: "FAQ | Lopes2Tech",
    ogDesc: "Antworten auf häufige Fragen zu unseren Webdesign-, SEO- und Automatisierungsdiensten in Zürich.",
  },
  pt: {
    title: "FAQ | Lopes2Tech - Preços de Web Design, SEO e Redes Sociais",
    description: "Perguntas frequentes sobre web design, SEO, marketing em redes sociais e automação de negócios. Preços, prazos e pacotes explicados.",
    ogTitle: "FAQ | Lopes2Tech",
    ogDesc: "Respostas a perguntas comuns sobre os nossos serviços de web design, SEO e automação em Zurique.",
  },
  fr: {
    title: "FAQ | Lopes2Tech - Tarifs Web Design, SEO & Réseaux Sociaux",
    description: "Questions fréquentes sur le web design, le SEO, le marketing sur les réseaux sociaux et l'automatisation. Tarifs, délais et forfaits expliqués.",
    ogTitle: "FAQ | Lopes2Tech",
    ogDesc: "Réponses aux questions courantes sur nos services de web design, SEO et automatisation à Zurich.",
  },
  it: {
    title: "FAQ | Lopes2Tech - Prezzi Web Design, SEO e Social Media",
    description: "Domande frequenti su web design, SEO, marketing sui social media e automazione aziendale. Prezzi, tempistiche e pacchetti spiegati.",
    ogTitle: "FAQ | Lopes2Tech",
    ogDesc: "Risposte alle domande comuni sui nostri servizi di web design, SEO e automazione a Zurigo.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/faq";
  const canonical = `${BASE_URL}/${locale}${path}`;
  const meta = metaByLocale[locale] ?? metaByLocale.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDesc,
      url: canonical,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech FAQ" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
