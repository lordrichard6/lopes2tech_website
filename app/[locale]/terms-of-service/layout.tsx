import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: { title: "Terms of Service | Lopes2Tech", description: "Terms of service for Lopes2Tech. Read our terms and conditions for web development, SEO, and business automation services." },
  de: { title: "Nutzungsbedingungen | Lopes2Tech", description: "Nutzungsbedingungen von Lopes2Tech. Lesen Sie unsere Allgemeinen Geschäftsbedingungen für Webentwicklung, SEO und Geschäftsautomatisierung." },
  pt: { title: "Termos de Serviço | Lopes2Tech", description: "Termos de serviço da Lopes2Tech. Consulte os termos e condições para desenvolvimento web, SEO e automação de negócios." },
  fr: { title: "Conditions d'Utilisation | Lopes2Tech", description: "Conditions d'utilisation de Lopes2Tech. Consultez nos conditions générales pour le développement web, le SEO et l'automatisation." },
  it: { title: "Termini di Servizio | Lopes2Tech", description: "Termini di servizio di Lopes2Tech. Leggi i nostri termini e condizioni per sviluppo web, SEO e automazione aziendale." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/terms-of-service";
  const canonical = `${BASE_URL}/${locale}${path}`;
  const meta = metaByLocale[locale] ?? metaByLocale.en;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    robots: { index: false, follow: true },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
