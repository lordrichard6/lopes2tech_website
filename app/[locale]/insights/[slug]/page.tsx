import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";
import blogPostsEn from "@/data/blog-posts.json";
import blogPostsDe from "@/data/blog-posts-de.json";
import blogPostsPt from "@/data/blog-posts-pt.json";
import blogPostsFr from "@/data/blog-posts-fr.json";
import blogPostsIt from "@/data/blog-posts-it.json";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    tags: string[];
}

const blogPostsByLocale: Record<string, BlogPost[]> = {
    en: blogPostsEn as BlogPost[],
    de: blogPostsDe as BlogPost[],
    pt: blogPostsPt as BlogPost[],
    fr: blogPostsFr as BlogPost[],
    it: blogPostsIt as BlogPost[],
};

const BASE_URL = "https://lopes2tech.ch";

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
            },
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonical,
            images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default function BlogPostPage() {
    return <BlogPostContent />;
}
