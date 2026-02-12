export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://lopes2tech.ch/#organization',
        name: 'Lopes2Tech',
        alternateName: 'lopes2tech',
        description: 'Professional web design, AI-powered social media marketing, and business automation services for Swiss SMEs and startups in Zurich, Switzerland',
        url: 'https://lopes2tech.ch',
        telephone: '+41787989533',
        email: 'paulo@lopes2tech.ch',
        image: 'https://lopes2tech.ch/logo.png',
        logo: 'https://lopes2tech.ch/logo.png',
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
        priceRange: 'CHF 249-2450',
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
                    price: '249',
                    priceCurrency: 'CHF',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '249',
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
                    price: '399',
                    priceCurrency: 'CHF',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '399',
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
                    price: '579',
                    priceCurrency: 'CHF',
                    availability: 'https://schema.org/InStock',
                    priceSpecification: {
                        '@type': 'UnitPriceSpecification',
                        price: '579',
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
