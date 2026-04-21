import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const META: Record<string, { title: string; description: string }> = {
  en: {
    title: "Insights | Lopes2Tech — AI, Web & SEO for Swiss Businesses",
    description:
      "Expert articles on AI workflows, technical SEO, web development, and business automation. Practical insights for Swiss companies ready to grow.",
  },
  de: {
    title: "Insights | Lopes2Tech — KI, Web & SEO Schweiz",
    description:
      "Fachartikel zu KI-Workflows, technischem SEO, Webentwicklung und Geschäftsautomatisierung. Praxisnahe Einblicke für Schweizer Unternehmen.",
  },
  fr: {
    title: "Insights | Lopes2Tech — IA, Web & SEO Suisse",
    description:
      "Articles d'experts sur les workflows IA, le SEO technique, le développement web et l'automatisation. Des insights pratiques pour les entreprises suisses.",
  },
  pt: {
    title: "Insights | Lopes2Tech — IA, Web & SEO para empresas suíças",
    description:
      "Artigos especializados sobre fluxos de trabalho de IA, SEO técnico, desenvolvimento web e automação de negócios para empresas suíças.",
  },
  it: {
    title: "Insights | Lopes2Tech — IA, Web & SEO Svizzera",
    description:
      "Articoli esperti su workflow IA, SEO tecnico, sviluppo web e automazione aziendale. Approfondimenti pratici per le aziende svizzere.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.en;
  const canonical = `${BASE_URL}/${locale}/insights`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: {
        "x-default": `${BASE_URL}/en/insights`,
        en: `${BASE_URL}/en/insights`,
        de: `${BASE_URL}/de/insights`,
        fr: `${BASE_URL}/fr/insights`,
        pt: `${BASE_URL}/pt/insights`,
        it: `${BASE_URL}/it/insights`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      type: "website",
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech Insights" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
