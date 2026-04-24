import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: { title: "Impressum | Lopes2Tech", description: "Legal information and company details for Lopes2Tech, based in Zurich, Switzerland." },
  de: { title: "Impressum | Lopes2Tech", description: "Rechtliche Hinweise und Firmenangaben von Lopes2Tech, mit Sitz in Zürich, Schweiz." },
  pt: { title: "Impressum | Lopes2Tech", description: "Informações legais e dados da empresa Lopes2Tech, com sede em Zurique, Suíça." },
  fr: { title: "Impressum | Lopes2Tech", description: "Informations légales et coordonnées de la société Lopes2Tech, basée à Zurich, Suisse." },
  it: { title: "Impressum | Lopes2Tech", description: "Informazioni legali e dati aziendali di Lopes2Tech, con sede a Zurigo, Svizzera." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/impressum";
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

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
