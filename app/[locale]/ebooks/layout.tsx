import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

const BASE_URL = "https://www.lopes2tech.ch";

// ─── Shared catalog (mirrors page.tsx — update both together) ──────────────
const EBOOKS = [
    {
        key: "freud",
        title: "The Freud They Never Taught You",
        description: "Before the famous couch, there was cocaine, a secret society with magic gemstone rings, and a man who was terrified of a number. The Freud you were never taught in school.",
        price: 9.9,
        isFree: false,
        stripeLink: "https://buy.stripe.com/dRmbJ2cae0lz5rr8yC1Nu08",
        cover: "/ebooks/freud.png",
    },
    {
        key: "tesla",
        title: "The Tesla They Never Taught You",
        description: "Electrocuted elephants, man-made lightning bolts 135 feet long, and a torn-up $300 million contract. Meet the real Nikola Tesla — as told by no textbook ever.",
        price: 9.9,
        isFree: false,
        stripeLink: "https://buy.stripe.com/7sY4gAa262tHcTT5mq1Nu09",
        cover: "/ebooks/tesla.png",
    },
    {
        key: "switzerland",
        title: "100 Things Switzerland",
        description: "From separating your recycling by material type to never vacuuming on Sunday — 100 illustrated facts, rules, and cultural quirks every expat needs to survive in Switzerland.",
        price: 9.9,
        isFree: false,
        stripeLink: "https://buy.stripe.com/eVq7sM3DIfgt4nn9CG1Nu0a",
        cover: "/ebooks/switzerland.png",
    },
    {
        key: "portugal",
        title: "100 Things Portugal",
        description: "Bacalhau à Brás, Pastéis de Nata, and the inexplicable passion for melancholy music — 100 things that make Portugal unmistakably, gloriously Portuguese.",
        price: 9.9,
        isFree: false,
        stripeLink: "https://buy.stripe.com/8x228s2zEecp9HHeX01Nu0b",
        cover: "/ebooks/portugal.png",
    },
];

function buildJsonLd(locale: string) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Ebooks by Lopes2Tech",
        url: `${BASE_URL}/${locale}/ebooks`,
        itemListElement: EBOOKS.map((book, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "Book",
                name: book.title,
                description: book.description,
                bookFormat: "https://schema.org/EBook",
                inLanguage: "en",
                author: {
                    "@type": "Person",
                    name: "Paulo Lopes",
                    url: "https://www.lopes2tech.ch",
                },
                publisher: {
                    "@type": "Organization",
                    name: "Lopes2Tech",
                    url: "https://www.lopes2tech.ch",
                },
                image: `${BASE_URL}${book.cover}`,
                url: `${BASE_URL}/${locale}/ebooks`,
                offers: {
                    "@type": "Offer",
                    price: book.isFree ? "0" : book.price.toFixed(2),
                    priceCurrency: "CHF",
                    availability: "https://schema.org/InStock",
                    url: book.isFree ? `${BASE_URL}/${locale}/ebooks` : book.stripeLink,
                },
            },
        })),
    };
}

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
        keywords: [
            "ebooks", "digital books", "PDF download", "Freud ebook", "Tesla ebook",
            "Switzerland expat guide", "Portugal culture book", "illustrated ebooks",
            "history ebooks", "buy ebooks online", "Lopes2Tech books",
        ],
        robots: { index: true, follow: true },
        alternates: {
            canonical: `${BASE_URL}/en/ebooks`,
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
            images: [
                {
                    url: `${BASE_URL}/ebooks/freud.png`,
                    width: 1200,
                    height: 630,
                    alt: "Ebooks by Lopes2Tech",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: t("meta.ogTitle"),
            description: t("meta.ogDescription"),
            images: [`${BASE_URL}/ebooks/freud.png`],
        },
    };
}

export default function EbooksLayout({ children }: { children: React.ReactNode }) {
    // JSON-LD is injected per request via a server component trick below.
    // We use a wrapper to access locale from params.
    return <>{children}</>;
}

// ─── JSON-LD server component (imported by page.tsx) ──────────────────────
export async function EbooksJsonLd({ locale }: { locale: string }) {
    const jsonLd = buildJsonLd(locale);
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
