/**
 * Shared BlogPost type and locale helpers.
 * Single source of truth — import from here instead of re-defining per file.
 */

import blogPostsEn from "@/data/blog-posts.json";
import blogPostsDe from "@/data/blog-posts-de.json";
import blogPostsPt from "@/data/blog-posts-pt.json";
import blogPostsFr from "@/data/blog-posts-fr.json";
import blogPostsIt from "@/data/blog-posts-it.json";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorRole: string;
  tags: string[];
  content: string;
}

export const blogPostsByLocale: Record<string, BlogPost[]> = {
  en: blogPostsEn as BlogPost[],
  de: blogPostsDe as BlogPost[],
  pt: blogPostsPt as BlogPost[],
  fr: blogPostsFr as BlogPost[],
  it: blogPostsIt as BlogPost[],
};

export function getPostsByLocale(locale: string): BlogPost[] {
  return blogPostsByLocale[locale] ?? blogPostsByLocale.en;
}
