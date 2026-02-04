export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'lopes2tech',
        description: 'Professional IT solutions, process automation, web development, and app development services in Switzerland',
        url: 'https://lopes2tech.ch',
        telephone: '+41787989533',
        email: 'paulo@lopes2tech.ch',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Zurich',
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
        priceRange: '$$',
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
            name: 'IT Services',
            itemListElement: [
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Process Automation',
                        description: 'Automate business processes to improve efficiency and reduce errors',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Web Development',
                        description: 'Modern, responsive websites and web applications',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'App Development',
                        description: 'Native and cross-platform apps for macOS, iPad, and iOS',
                    },
                },
                {
                    '@type': 'Offer',
                    itemOffered: {
                        '@type': 'Service',
                        name: 'Custom Tools Development',
                        description: 'Custom automation tools and software solutions',
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
