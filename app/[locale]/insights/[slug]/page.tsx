"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { useLocale } from "next-intl";
import blogPostsEn from "@/data/blog-posts.json";
import blogPostsDe from "@/data/blog-posts-de.json";
import blogPostsPt from "@/data/blog-posts-pt.json";

interface BlogPost {
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

const blogPostsByLocale: Record<string, BlogPost[]> = {
    en: blogPostsEn as BlogPost[],
    de: blogPostsDe as BlogPost[],
    pt: blogPostsPt as BlogPost[],
};

export default function BlogPostPage() {
    const params = useParams();
    const locale = useLocale();
    const slug = params.slug as string;
    const allPosts = blogPostsByLocale[locale] || blogPostsByLocale.en;

    const post = allPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <main className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
                    <Link href="/insights" className="text-cyan-400 hover:underline">
                        ← Back to Insights
                    </Link>
                </div>
            </main>
        );
    }

    // BlogPosting + BreadcrumbList Schema
    const blogPostSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://lopes2tech.ch${post.image}`,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": { "@type": "Person", "name": post.author, "jobTitle": post.authorRole, "url": "https://lopes2tech.ch/about" },
        "publisher": { "@type": "Organization", "name": "Lopes2Tech", "logo": { "@type": "ImageObject", "url": "https://lopes2tech.ch/logo_w.svg" } },
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://lopes2tech.ch/insights/${post.slug}` }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lopes2tech.ch" },
            { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://lopes2tech.ch/insights" },
            { "@type": "ListItem", "position": 3, "name": post.title }
        ]
    };

    // Related posts
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3);

    return (
        <main className="min-h-screen bg-[#0f172a]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Navbar />

            <article className="relative pt-32 pb-20">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 0%, #0f172a 90%)'
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    {/* Back Button */}
                    <Link
                        href="/insights"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Insights
                    </Link>

                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider border border-cyan-400/20"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-slate-400 mb-8">
                            {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 pb-8 border-b border-white/10">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="text-white font-semibold">{post.author}</span>
                                <span className="text-slate-500">• {post.authorRole}</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </motion.header>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 border border-white/10"
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-invert prose-lg max-w-none
                            prose-headings:text-white prose-headings:font-bold
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                            prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-white prose-strong:font-bold
                            prose-em:text-slate-300
                            prose-ul:text-slate-300 prose-ul:my-6
                            prose-ol:text-slate-300 prose-ol:my-6
                            prose-li:my-2
                            prose-code:text-cyan-400 prose-code:bg-cyan-400/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
                            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                            prose-blockquote:border-l-cyan-400 prose-blockquote:text-slate-400
                            prose-table:border-collapse prose-table:w-full
                            prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:text-left
                            prose-td:border prose-td:border-white/10 prose-td:p-3"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Author Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">{post.author}</h3>
                                <p className="text-slate-400">{post.authorRole}</p>
                            </div>
                        </div>
                        <p className="text-slate-300">
                            Founder of Lopes2Tech, specializing in AI-powered development workflows and high-performance web applications for Swiss businesses.
                        </p>
                    </motion.div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-16"
                        >
                            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/insights/${related.slug}`}
                                        className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/30 transition-all duration-300"
                                    >
                                        <div className="relative aspect-[16/9] overflow-hidden">
                                            <Image
                                                src={related.image}
                                                alt={related.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <div className="flex gap-2 mb-2">
                                                {related.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="px-2 py-0.5 text-xs text-cyan-400 bg-cyan-400/10 rounded-full">{tag}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">{related.title}</h3>
                                            <p className="text-xs text-slate-500 mt-2">{related.readTime}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Back to Insights */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/insights"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Insights
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
