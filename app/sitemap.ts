import type { MetadataRoute } from 'next';
import { blogPostsByLocale } from '@/lib/blog';
import { projects } from './[locale]/portfolio/projects';

const BASE_URL = 'https://lopes2tech.ch';
const LOCALES = ['en', 'pt', 'de', 'fr', 'it'] as const;

/** Build the hreflang alternates object for a given path (e.g. "/services") */
function alternates(path: string): { languages: Record<string, string> } {
    const languages: Record<string, string> = { 'x-default': `${BASE_URL}/en${path}` };
    LOCALES.forEach((l) => { languages[l] = `${BASE_URL}/${l}${path}`; });
    return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date().toISOString();

    // NOTE: Update lastMod manually when page content meaningfully changes.
    // Using `now` for every deploy wastes Google's crawl budget.
    const pages = [
        { path: '',                              changeFrequency: 'daily'   as const, priority: 1.0, lastMod: now },
        { path: '/services',                     changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/web-design',          changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/seo-development',     changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/ai-integration',      changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/business-automation', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/web-apps',            changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/ecommerce',           changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/social-media-marketing', changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/services/cold-email',          changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-31' },
        { path: '/contact',                      changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-23' },
        { path: '/pricing',                      changeFrequency: 'monthly' as const, priority: 0.9, lastMod: '2026-03-28' },
        { path: '/portfolio',                    changeFrequency: 'monthly' as const, priority: 0.8, lastMod: '2026-03-23' },
        { path: '/about',                        changeFrequency: 'monthly' as const, priority: 0.8, lastMod: '2026-03-23' },
        { path: '/insights',                     changeFrequency: 'weekly'  as const, priority: 0.8, lastMod: now },
        { path: '/faq',                          changeFrequency: 'monthly' as const, priority: 0.7, lastMod: '2026-03-23' },
        { path: '/referral',                     changeFrequency: 'monthly' as const, priority: 0.7, lastMod: '2026-03-28' },
        // Legal — very low priority, rarely change
        { path: '/privacy-policy',               changeFrequency: 'yearly'  as const, priority: 0.2, lastMod: '2025-08-01' },
        { path: '/terms-of-service',             changeFrequency: 'yearly'  as const, priority: 0.2, lastMod: '2025-08-01' },
        { path: '/impressum',                    changeFrequency: 'yearly'  as const, priority: 0.2, lastMod: '2025-08-01' },
    ];

    const routes: MetadataRoute.Sitemap = [];

    // ── Static pages ─────────────────────────────────────────────────────────
    // Each locale variant is included, with full hreflang alternates so Google
    // knows these are locale siblings — not duplicates.
    pages.forEach((page) => {
        LOCALES.forEach((locale) => {
            routes.push({
                url: `${BASE_URL}/${locale}${page.path}`,
                lastModified: new Date(page.lastMod),
                changeFrequency: page.changeFrequency,
                priority: page.priority,
                alternates: alternates(page.path),
            });
        });
    });

    // ── Blog posts ───────────────────────────────────────────────────────────
    // Use English slugs as the canonical; other locales link back via alternates.
    const enPosts = blogPostsByLocale.en ?? [];
    enPosts.forEach((post) => {
        const langs: Record<string, string> = { 'x-default': `${BASE_URL}/en/insights/${post.slug}` };
        LOCALES.forEach((l) => { langs[l] = `${BASE_URL}/${l}/insights/${post.slug}`; });
        LOCALES.forEach((locale) => {
            routes.push({
                url: `${BASE_URL}/${locale}/insights/${post.slug}`,
                lastModified: new Date(post.date),
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: { languages: langs },
            });
        });
    });

    // ── Portfolio projects ───────────────────────────────────────────────────
    projects.forEach((project) => {
        const langs: Record<string, string> = { 'x-default': `${BASE_URL}/en/portfolio/${project.slug}` };
        LOCALES.forEach((l) => { langs[l] = `${BASE_URL}/${l}/portfolio/${project.slug}`; });
        LOCALES.forEach((locale) => {
            routes.push({
                url: `${BASE_URL}/${locale}/portfolio/${project.slug}`,
                lastModified: new Date('2026-03-23'),
                changeFrequency: 'monthly',
                priority: 0.7,
                alternates: { languages: langs },
            });
        });
    });

    return routes;
}
