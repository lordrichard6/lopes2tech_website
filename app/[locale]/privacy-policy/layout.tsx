import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: { title: "Privacy Policy | Lopes2Tech", description: "Privacy policy for Lopes2Tech. Learn how we collect, use, and protect your personal data in compliance with Swiss data protection laws and GDPR." },
  de: { title: "Datenschutzerklärung | Lopes2Tech", description: "Datenschutzerklärung von Lopes2Tech. Erfahren Sie, wie wir personenbezogene Daten erheben, verwenden und schützen — konform mit Schweizer Datenschutzrecht und DSGVO." },
  pt: { title: "Política de Privacidade | Lopes2Tech", description: "Política de privacidade da Lopes2Tech. Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais em conformidade com a lei suíça e o RGPD." },
  fr: { title: "Politique de Confidentialité | Lopes2Tech", description: "Politique de confidentialité de Lopes2Tech. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles conformément au droit suisse et au RGPD." },
  it: { title: "Informativa sulla Privacy | Lopes2Tech", description: "Informativa sulla privacy di Lopes2Tech. Scopri come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali in conformità con le leggi svizzere e il GDPR." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/privacy-policy";
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

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
