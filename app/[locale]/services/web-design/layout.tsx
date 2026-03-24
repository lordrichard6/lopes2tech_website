import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const path = "/services/web-design";
  const canonical = `${BASE_URL}/${locale}${path}`;
  const t = await getTranslations({ locale, namespace: "ServiceMeta.webDesign" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}`, fr: `${BASE_URL}/fr${path}`, it: `${BASE_URL}/it${path}` },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonical,
    },
  };
}

export default function WebDesignLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
