import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

const BASE_URL = "https://lopes2tech.ch";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "EbooksPage" });

    return {
        title: t("meta.title"),
        description: t("meta.description"),
        alternates: {
            canonical: `${BASE_URL}/${locale}/ebooks`,
            languages: {
                en: `${BASE_URL}/en/ebooks`,
                de: `${BASE_URL}/de/ebooks`,
                pt: `${BASE_URL}/pt/ebooks`,
                fr: `${BASE_URL}/fr/ebooks`,
                it: `${BASE_URL}/it/ebooks`,
                "x-default": `${BASE_URL}/en/ebooks`,
            },
        },
        openGraph: {
            title: t("meta.ogTitle"),
            description: t("meta.ogDescription"),
            url: `${BASE_URL}/${locale}/ebooks`,
            type: "website",
        },
    };
}

export default function EbooksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
