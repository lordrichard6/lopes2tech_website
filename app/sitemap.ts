import type { MetadataRoute } from 'next';
import blogPosts from '@/data/blog-posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.lopes2tech.ch';
    const locales = ['en', 'pt', 'de'];

    const pages = [
        { path: '', changeFrequency: 'daily' as const, priority: 1.0 },
        { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/portfolio', changeFrequency: 'monthly' as const, priority: 0.8 },
        { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/insights', changeFrequency: 'weekly' as const, priority: 0.8 },
        { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7 },
        { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3 },
        { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.3 },
        { path: '/impressum', changeFrequency: 'yearly' as const, priority: 0.3 },
        // Service pages
        { path: '/services/web-design', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/services/seo-development', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/services/ai-integration', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/services/business-automation', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/services/web-apps', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/services/ecommerce', changeFrequency: 'monthly' as const, priority: 0.9 },
        { path: '/services/social-media-marketing', changeFrequency: 'monthly' as const, priority: 0.9 },
        // Portal migration page
        { path: '/client-portal', changeFrequency: 'monthly' as const, priority: 0.6 },
    ];

    const routes: MetadataRoute.Sitemap = [];

    // Generate all locale/page combinations
    locales.forEach((locale) => {
        pages.forEach((page) => {
            routes.push({
                url: `${baseUrl}/${locale}${page.path}`,
                lastModified: new Date(),
                changeFrequency: page.changeFrequency,
                priority: page.priority,
            });
        });
    });

    // Add individual blog post URLs
    const posts = blogPosts as { slug: string; date: string }[];
    locales.forEach((locale) => {
        posts.forEach((post) => {
            routes.push({
                url: `${baseUrl}/${locale}/insights/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return routes;
}
