import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "Contact Lopes2Tech | Free Consultation for Your Digital Project",
    description: "Get in touch for a free consultation. Web development, SEO, AI integration, and business automation services in Zurich, Switzerland.",
    ogTitle: "Contact Lopes2Tech | Free Consultation",
    ogDesc: "Get in touch for a free consultation. Web development, SEO, AI, and automation in Zurich.",
  },
  de: {
    title: "Kontakt Lopes2Tech | Kostenlose Beratung für Ihr digitales Projekt",
    description: "Nehmen Sie Kontakt auf für eine kostenlose Beratung. Webentwicklung, SEO, KI-Integration und Geschäftsautomatisierung in Zürich, Schweiz.",
    ogTitle: "Kontakt Lopes2Tech | Kostenlose Beratung",
    ogDesc: "Nehmen Sie Kontakt auf für eine kostenlose Beratung. Webentwicklung, SEO, KI und Automatisierung in Zürich.",
  },
  pt: {
    title: "Contacto Lopes2Tech | Consulta Gratuita para o Seu Projeto Digital",
    description: "Entre em contacto para uma consulta gratuita. Desenvolvimento web, SEO, integração de IA e automação de negócios em Zurique, Suíça.",
    ogTitle: "Contacto Lopes2Tech | Consulta Gratuita",
    ogDesc: "Entre em contacto para uma consulta gratuita. Desenvolvimento web, SEO, IA e automação em Zurique.",
  },
  fr: {
    title: "Contact Lopes2Tech | Consultation Gratuite pour Votre Projet Digital",
    description: "Contactez-nous pour une consultation gratuite. Développement web, SEO, intégration IA et automatisation à Zurich, Suisse.",
    ogTitle: "Contact Lopes2Tech | Consultation Gratuite",
    ogDesc: "Contactez-nous pour une consultation gratuite. Développement web, SEO, IA et automatisation à Zurich.",
  },
  it: {
    title: "Contatto Lopes2Tech | Consulenza Gratuita per il Tuo Progetto Digitale",
    description: "Contattaci per una consulenza gratuita. Sviluppo web, SEO, integrazione IA e automazione aziendale a Zurigo, Svizzera.",
    ogTitle: "Contatto Lopes2Tech | Consulenza Gratuita",
    ogDesc: "Contattaci per una consulenza gratuita. Sviluppo web, SEO, IA e automazione a Zurigo.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/contact";
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
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Contact Lopes2Tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
