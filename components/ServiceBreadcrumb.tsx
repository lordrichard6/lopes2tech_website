"use client";

import { useLocale } from "next-intl";

interface ServiceBreadcrumbProps {
    serviceName: string;
    serviceSlug: string;
}

export default function ServiceBreadcrumb({ serviceName, serviceSlug }: ServiceBreadcrumbProps) {
    const locale = useLocale();
    const base = "https://lopes2tech.ch";

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${base}/${locale}`,
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": `${base}/${locale}/services`,
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": serviceName,
                "item": `${base}/${locale}/services/${serviceSlug}`,
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
