import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://lopes2tech.ch";
const PATH     = "/services/cold-email";
const TITLE    = "Cold Email Outreach — Done-for-You | Lopes2Tech";

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "ColdEmailPage" });
  const description = t("metadata.description");

  return {
    title: TITLE,
    description,
    alternates: {
      canonical: `${BASE_URL}/en${PATH}`,
      languages: {
        "x-default": `${BASE_URL}/en${PATH}`,
        en: `${BASE_URL}/en${PATH}`,
        de: `${BASE_URL}/de${PATH}`,
        pt: `${BASE_URL}/pt${PATH}`,
        fr: `${BASE_URL}/fr${PATH}`,
        it: `${BASE_URL}/it${PATH}`,
      },
    },
    openGraph: {
      title: TITLE,
      description,
      url: `${BASE_URL}/${locale}${PATH}`,
      images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
  };
}

export default function ColdEmailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
