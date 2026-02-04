import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lopes2tech.ch';
    const locales = ['en', 'pt', 'de'];
    const pages = [
        '',
        '/about',
        '/services',
        '/portfolio',
        '/contact',
        '/insights',
        '/privacy-policy',
        '/terms-of-service',
        '/impressum',
    ];

    const routes: MetadataRoute.Sitemap = [];

    // Generate all locale/page combinations
    locales.forEach((locale) => {
        pages.forEach((page) => {
            routes.push({
                url: `${baseUrl}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'daily' : page === '/insights' ? 'weekly' : 'monthly',
                priority: page === '' ? 1.0 : page === '/contact' ? 0.9 : 0.8,
            });
        });
    });

    return routes;
}
