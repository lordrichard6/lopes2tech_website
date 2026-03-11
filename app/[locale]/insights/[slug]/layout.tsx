import type { Metadata } from "next";
import blogPosts from "@/data/blog-posts.json";

const BASE_URL = "https://lopes2tech.ch";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  authorRole: string;
  tags: string[];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = (blogPosts as BlogPost[]).find(p => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found | Lopes2Tech" };
  }

  const path = `/insights/${slug}`;
  const canonical = `${BASE_URL}/${locale}${path}`;

  return {
    title: `${post.title} | Lopes2Tech`,
    description: post.excerpt,
    alternates: {
      canonical,
      languages: { "x-default": `${BASE_URL}/en${path}`, en: `${BASE_URL}/en${path}`, de: `${BASE_URL}/de${path}`, pt: `${BASE_URL}/pt${path}` },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: `${BASE_URL}${post.image}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${BASE_URL}${post.image}`],
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
