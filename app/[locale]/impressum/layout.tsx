import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/impressum";
  const canonical = `${BASE_URL}/${locale}${path}`;
  return {
    title: "Impressum | Lopes2Tech",
    description: "Legal information and company details for Lopes2Tech, based in Zurich, Switzerland.",
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    robots: { index: false, follow: true },
  };
}

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
