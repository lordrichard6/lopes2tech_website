import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";
import { blogPostsByLocale } from "@/lib/blog";

const BASE_URL = "https://www.lopes2tech.ch";

export async function generateStaticParams() {
    return Object.entries(blogPostsByLocale).flatMap(([locale, posts]) =>
        posts.map((p) => ({ locale, slug: p.slug }))
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const posts = blogPostsByLocale[locale] || blogPostsByLocale.en;
    const post = posts.find((p) => p.slug === slug);
    if (!post) return {};
    const canonical = `${BASE_URL}/${locale}/insights/${slug}`;
    return {
        title: `${post.title} | Lopes2Tech Insights`,
        description: post.excerpt,
        alternates: {
            canonical,
            languages: {
                "x-default": `${BASE_URL}/en/insights/${slug}`,
                en: `${BASE_URL}/en/insights/${slug}`,
                de: `${BASE_URL}/de/insights/${slug}`,
                pt: `${BASE_URL}/pt/insights/${slug}`,
                fr: `${BASE_URL}/fr/insights/${slug}`,
                it: `${BASE_URL}/it/insights/${slug}`,
            },
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonical,
            images: [{ url: `${BASE_URL}${post.image}`, width: 1200, height: 630, alt: post.title }],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [`${BASE_URL}${post.image}`],
        },
    };
}

export default function BlogPostPage() {
    return <BlogPostContent />;
}
