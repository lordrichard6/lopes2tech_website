export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://www.lopes2tech.ch/#organization',
        name: 'Lopes2Tech',
        alternateName: 'lopes2tech',
        description: 'Professional web design, AI-powered social media marketing, and business automation services for Swiss SMEs and startups in Zurich, Switzerland',
        url: 'https://www.lopes2tech.ch',
        telephone: '+41787989533',
        email: 'paulo@lopes2tech.ch',
        image: 'https://www.lopes2tech.ch/logo_w.svg',
        logo: 'https://www.lopes2tech.ch/logo_w.svg',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Zurich',
            addressRegion: 'Zurich',
            addressCountry: 'CH',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 47.3067,
            longitude: 8.5550,
        },
        openingHours: 'Mo-Fr 09:00-18:00',
        sameAs: [
            'https://www.linkedin.com/company/lopes2tech/',
            'https://www.instagram.com/lopes2tech/',
            'https://medium.com/@paulolopesreizinho',
        ],
        priceRange: 'CHF 299-2450',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            reviewCount: '3',
            bestRating: '5',
            worstRating: '1',
        },
        review: [
            {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Marco Reizinho' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'Very Professional! and the end product was amazing! Recommend! My small business is growing! Thank you.',
                datePublished: '2024-11-01',
            },
            {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Silvio Valente' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'I needed a portfolio that truly reflected the quality of my work, and Lopes2Tech delivered exactly that. The website is clean, fast, and elegant. Clients constantly compliment how easy it is to navigate and book sessions.',
                datePublished: '2024-12-01',
            },
            {
                '@type': 'Review',
                author: { '@type': 'Person', name: 'Ana Ribeiro' },
                reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                reviewBody: 'Working with Lopes2Tech was a seamless experience from start to finish. They understood our brand, built a professional site that generates leads, and were always responsive throughout the process.',
                datePublished: '2025-01-01',
            },
        ],
        areaServed: [
            {
                '@type': 'City',
                name: 'Zurich',
            },
            {
                '@type': 'Country',
                name: 'Switzerland',
            },
        ],
        serviceArea: {
            '@type': 'GeoCircle',
            geoMidpoint: {
                '@type': 'GeoCoordinates',
                latitude: 47.3067,
                longitude: 8.5550,
            },
            geoRadius: '50000',
        },
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Digital Services for Swiss Businesses',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Web Design & Development',
                        description: 'Professional website design and development for Zurich businesses, starting from CHF 600',
                        serviceType: 'Website Design',
                        areaServed: 'Zurich, Switzerland',
                    },
                    price: '600',
                    priceCurrency: 'CHF',
                    availability: 'https://schema.org/InStock',
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Social Media Marketing Starter',
                        description: 'AI-powered social media management for Swiss businesses - 8 posts per month, 1 platform',
                        serviceType: 'Social Media Marketing',
                        areaServed: 'Zurich, Switzerland',
                    },
                    price: '490',
                    priceCurrency: 'CHF',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '490',
                        priceCurrency: 'CHF',
                        unitText: 'MONTH',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Social Media Marketing Growth',
                        description: 'Comprehensive social media management - 12 posts per month, 2 platforms, Stories included',
                        serviceType: 'Social Media Marketing',
                        areaServed: 'Zurich, Switzerland',
                    },
                    price: '690',
                    priceCurrency: 'CHF',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '690',
                        priceCurrency: 'CHF',
                        unitText: 'MONTH',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Social Media Marketing Pro',
                        description: 'Complete social media management - 16 posts per month, 3 platforms, full engagement management',
                        serviceType: 'Social Media Marketing',
                        areaServed: 'Zurich, Switzerland',
                    },
                    price: '990',
                    priceCurrency: 'CHF',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '990',
                        priceCurrency: 'CHF',
                        unitText: 'MONTH',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Business Process Automation',
                        description: 'Automate business processes to improve efficiency and reduce errors',
                        serviceType: 'Business Automation',
                        areaServed: 'Switzerland',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Landing Page Design',
                        description: 'High-conversion landing pages for marketing campaigns',
                        serviceType: 'Landing Page Design',
                        areaServed: 'Zurich, Switzerland',
                    },
                    price: '475',
                    priceCurrency: 'CHF',
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'AI Integration & Chatbots',
                        description: 'AI-powered chatbots and automation solutions',
                        serviceType: 'AI Services',
                        areaServed: 'Switzerland',
                    },
                },
            ],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
