import type { MetadataRoute } from 'next';
import blogPosts from '@/data/blog-posts.json';
import { projects } from './[locale]/portfolio/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lopes2tech.ch';
    const locales = ['en', 'pt', 'de'];

    const pages = [
        { path: '', changeFrequency: 'daily' as const, priority: 1.0, lastMod: '2026-03-11' },
        { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8, lastMod: '2026-01-15' },
        { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/portfolio', changeFrequency: 'monthly' as const, priority: 0.8, lastMod: '2026-02-01' },
        { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/insights', changeFrequency: 'weekly' as const, priority: 0.8, lastMod: '2026-03-11' },
        { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7, lastMod: '2026-01-15' },
        { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: '2025-08-01' },
        { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: '2025-08-01' },
        { path: '/impressum', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: '2025-08-01' },
        // Service pages
        { path: '/services/web-design', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/services/seo-development', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/services/ai-integration', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/services/business-automation', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/services/web-apps', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/services/ecommerce', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
        { path: '/services/social-media-marketing', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-01-15' },
    ];

    const routes: MetadataRoute.Sitemap = [];

    // Generate all locale/page combinations
    locales.forEach((locale) => {
        pages.forEach((page) => {
            routes.push({
                url: `${baseUrl}/${locale}${page.path}`,
                lastModified: new Date(page.lastMod),
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

    // Add individual portfolio project URLs
    locales.forEach((locale) => {
        projects.forEach((project) => {
            routes.push({
                url: `${baseUrl}/${locale}/portfolio/${project.slug}`,
                lastModified: new Date('2026-03-11'),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return routes;
}
