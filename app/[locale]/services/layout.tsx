import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "Services | Lopes2Tech - Web Development, SEO, AI & Automation",
    description: "Full-service digital solutions for Swiss businesses: custom web development, SEO engineering, AI integration, social media marketing, and business automation. Based in Zurich.",
    ogTitle: "Services | Lopes2Tech",
    ogDesc: "Full-service digital solutions: web development, SEO, AI integration, and business automation for Swiss businesses.",
  },
  de: {
    title: "Dienstleistungen | Lopes2Tech - Webentwicklung, SEO, KI & Automatisierung",
    description: "Umfassende digitale Lösungen für Schweizer Unternehmen: massgeschneiderte Webentwicklung, SEO-Engineering, KI-Integration, Social Media Marketing und Geschäftsautomatisierung. Standort Zürich.",
    ogTitle: "Dienstleistungen | Lopes2Tech",
    ogDesc: "Umfassende digitale Lösungen: Webentwicklung, SEO, KI-Integration und Geschäftsautomatisierung für Schweizer Unternehmen.",
  },
  pt: {
    title: "Serviços | Lopes2Tech - Desenvolvimento Web, SEO, IA e Automação",
    description: "Soluções digitais completas para empresas suíças: desenvolvimento web personalizado, engenharia SEO, integração de IA, marketing em redes sociais e automação de negócios. Sede em Zurique.",
    ogTitle: "Serviços | Lopes2Tech",
    ogDesc: "Soluções digitais completas: desenvolvimento web, SEO, integração de IA e automação para empresas suíças.",
  },
  fr: {
    title: "Services | Lopes2Tech - Développement Web, SEO, IA & Automatisation",
    description: "Solutions digitales complètes pour les entreprises suisses : développement web sur mesure, ingénierie SEO, intégration IA, marketing sur les réseaux sociaux et automatisation. Basé à Zurich.",
    ogTitle: "Services | Lopes2Tech",
    ogDesc: "Solutions digitales complètes : développement web, SEO, intégration IA et automatisation pour les entreprises suisses.",
  },
  it: {
    title: "Servizi | Lopes2Tech - Sviluppo Web, SEO, IA e Automazione",
    description: "Soluzioni digitali complete per le aziende svizzere: sviluppo web su misura, ingegneria SEO, integrazione IA, marketing sui social media e automazione aziendale. Sede a Zurigo.",
    ogTitle: "Servizi | Lopes2Tech",
    ogDesc: "Soluzioni digitali complete: sviluppo web, SEO, integrazione IA e automazione per le aziende svizzere.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services";
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
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech Services" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDesc,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
