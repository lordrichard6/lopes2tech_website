import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PortfolioPage' });
    const path = "/portfolio";
    const canonical = `${BASE_URL}/${locale}${path}`;

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        alternates: {
            canonical,
            languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
        },
        openGraph: { title: t('meta.ogTitle'), description: t('meta.ogDescription'), url: canonical },
    };
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
