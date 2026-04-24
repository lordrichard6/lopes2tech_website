import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string; ogTitle: string; ogDesc: string }> = {
  en: {
    title: "Referral Program | Earn by Referring Clients to Lopes2Tech",
    description: "Refer a client to Lopes2Tech and earn up to 10% per project or 15% of monthly retainers. No limits, no expiry. Simple, transparent, rewarding.",
    ogTitle: "Referral Program | Earn by Referring Clients to Lopes2Tech",
    ogDesc: "Refer a client and earn cash. Up to 10% per project or 15% of monthly retainers. No limits, no expiry.",
  },
  de: {
    title: "Empfehlungsprogramm | Verdienen durch Kundenempfehlungen an Lopes2Tech",
    description: "Empfehlen Sie einen Kunden an Lopes2Tech und verdienen Sie bis zu 10 % pro Projekt oder 15 % der monatlichen Retainer. Keine Limits, kein Ablauf. Einfach, transparent, lohnend.",
    ogTitle: "Empfehlungsprogramm | Lopes2Tech",
    ogDesc: "Empfehlen Sie einen Kunden und verdienen Sie bar. Bis zu 10 % pro Projekt oder 15 % der monatlichen Retainer.",
  },
  pt: {
    title: "Programa de Indicação | Ganhe por Indicar Clientes à Lopes2Tech",
    description: "Indique um cliente à Lopes2Tech e ganhe até 10% por projeto ou 15% dos valores mensais. Sem limites, sem prazo. Simples, transparente, recompensador.",
    ogTitle: "Programa de Indicação | Lopes2Tech",
    ogDesc: "Indique um cliente e ganhe dinheiro. Até 10% por projeto ou 15% dos contratos mensais.",
  },
  fr: {
    title: "Programme de Parrainage | Gagnez en Recommandant Lopes2Tech",
    description: "Parrainez un client chez Lopes2Tech et gagnez jusqu'à 10 % par projet ou 15 % des honoraires mensuels. Sans limite, sans expiration. Simple, transparent, gratifiant.",
    ogTitle: "Programme de Parrainage | Lopes2Tech",
    ogDesc: "Parrainez un client et gagnez en espèces. Jusqu'à 10 % par projet ou 15 % des honoraires mensuels.",
  },
  it: {
    title: "Programma di Referral | Guadagna Segnalando Clienti a Lopes2Tech",
    description: "Segnala un cliente a Lopes2Tech e guadagna fino al 10% per progetto o al 15% dei contratti mensili. Senza limiti, senza scadenza. Semplice, trasparente, remunerativo.",
    ogTitle: "Programma di Referral | Lopes2Tech",
    ogDesc: "Segnala un cliente e guadagna. Fino al 10% per progetto o al 15% dei contratti mensili.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/referral";
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
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: "Lopes2Tech Referral Program" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDesc,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
