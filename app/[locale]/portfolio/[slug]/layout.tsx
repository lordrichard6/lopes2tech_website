import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: 'PortfolioPage' });
    const canonical = `${BASE_URL}/${locale}/portfolio/${slug}`;

    return {
        title: `${t(`projects.${slug}.title`)} | Lopes2Tech Portfolio`,
        description: t(`projects.${slug}.description`),
        alternates: {
            canonical,
            languages: {
                "x-default": `${BASE_URL}/en/portfolio/${slug}`,
                en: `${BASE_URL}/en/portfolio/${slug}`,
                de: `${BASE_URL}/de/portfolio/${slug}`,
                pt: `${BASE_URL}/pt/portfolio/${slug}`,
                fr: `${BASE_URL}/fr/portfolio/${slug}`,
            },
        },
        openGraph: {
            title: `${t(`projects.${slug}.title`)} | Lopes2Tech`,
            description: t(`projects.${slug}.description`),
            url: canonical,
        },
    };
}

export default function PortfolioSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
