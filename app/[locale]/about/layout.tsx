import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "About Lopes2Tech | AI-Powered Web Development in Zurich",
    description: "Meet Paulo Lopes, founder of Lopes2Tech. Specializing in AI-powered web development, SEO, and business automation for Swiss SMEs. Based in Zurich.",
    ogTitle: "About Lopes2Tech | AI-Powered Web Development in Zurich",
    ogDesc: "Meet Paulo Lopes, founder of Lopes2Tech. AI-powered web development and business automation for Swiss businesses.",
  },
  de: {
    title: "Über Lopes2Tech | KI-gestützte Webentwicklung in Zürich",
    description: "Lernen Sie Paulo Lopes kennen, Gründer von Lopes2Tech. Spezialisiert auf KI-gestützte Webentwicklung, SEO und Geschäftsautomatisierung für Schweizer KMU. Standort Zürich.",
    ogTitle: "Über Lopes2Tech | KI-gestützte Webentwicklung in Zürich",
    ogDesc: "Lernen Sie Paulo Lopes kennen, Gründer von Lopes2Tech. KI-gestützte Webentwicklung und Automatisierung für Schweizer Unternehmen.",
  },
  pt: {
    title: "Sobre a Lopes2Tech | Desenvolvimento Web com IA em Zurique",
    description: "Conheça Paulo Lopes, fundador da Lopes2Tech. Especializado em desenvolvimento web com IA, SEO e automação de negócios para PMEs suíças. Sede em Zurique.",
    ogTitle: "Sobre a Lopes2Tech | Desenvolvimento Web com IA em Zurique",
    ogDesc: "Conheça Paulo Lopes, fundador da Lopes2Tech. Desenvolvimento web com IA e automação para empresas suíças.",
  },
  fr: {
    title: "À propos de Lopes2Tech | Développement Web assisté par IA à Zurich",
    description: "Rencontrez Paulo Lopes, fondateur de Lopes2Tech. Spécialisé dans le développement web par IA, le SEO et l'automatisation pour les PME suisses. Basé à Zurich.",
    ogTitle: "À propos de Lopes2Tech | Développement Web assisté par IA à Zurich",
    ogDesc: "Rencontrez Paulo Lopes, fondateur de Lopes2Tech. Développement web IA et automatisation pour les entreprises suisses.",
  },
  it: {
    title: "Chi siamo | Lopes2Tech - Sviluppo Web con IA a Zurigo",
    description: "Scopri Paulo Lopes, fondatore di Lopes2Tech. Specializzato in sviluppo web con IA, SEO e automazione aziendale per le PMI svizzere. Sede a Zurigo.",
    ogTitle: "Chi siamo | Lopes2Tech - Sviluppo Web con IA a Zurigo",
    ogDesc: "Scopri Paulo Lopes, fondatore di Lopes2Tech. Sviluppo web con IA e automazione per le aziende svizzere.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/about";
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
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "About Lopes2Tech" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDesc,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
