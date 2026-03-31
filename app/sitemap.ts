import type { MetadataRoute } from 'next';
import { blogPostsByLocale } from '@/lib/blog';
import { projects } from './[locale]/portfolio/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lopes2tech.ch';
    const locales = ['en', 'pt', 'de', 'fr', 'it'];

    // Dynamic date for frequently updated pages; static for legal/policy pages
    const now = new Date().toISOString();

    // NOTE: Update these dates manually when page content meaningfully changes.
    // Using `now` for every deploy wastes Google's crawl budget — static dates signal stability.
    const pages = [
        { path: '', changeFrequency: 'daily' as const, priority: 1.0, lastMod: now },
        { path: '/about', changeFrequency: 'monthly' as const, priority: 0.8, lastMod: '2026-03-23' },
        { path: '/services', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/portfolio', changeFrequency: 'monthly' as const, priority: 0.8, lastMod: '2026-03-23' },
        { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/insights', changeFrequency: 'weekly' as const, priority: 0.8, lastMod: now },
        { path: '/faq', changeFrequency: 'monthly' as const, priority: 0.7, lastMod: '2026-03-23' },
        { path: '/pricing', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-28' },
        { path: '/referral', changeFrequency: 'monthly' as const, priority: 0.7, lastMod: '2026-03-28' },
        // NOTE: Legal pages rarely change — keep static dates; update manually when content changes
        { path: '/privacy-policy', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: '2025-08-01' },
        { path: '/terms-of-service', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: '2025-08-01' },
        { path: '/impressum', changeFrequency: 'yearly' as const, priority: 0.3, lastMod: '2025-08-01' },
        // Service pages — update date when FAQ/content/pricing meaningfully changes
        { path: '/services/web-design', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/seo-development', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/ai-integration', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/business-automation', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/web-apps', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/ecommerce', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/social-media-marketing', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/cold-email',             changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-31' },
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

    // Add individual blog post URLs — each locale reads its own JSON so slugs & dates are accurate
    locales.forEach((locale) => {
        const posts = blogPostsByLocale[locale] ?? blogPostsByLocale.en;
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
                lastModified: new Date('2026-03-23'),
                changeFrequency: 'monthly',
                priority: 0.7,
            });
        });
    });

    return routes;
}
