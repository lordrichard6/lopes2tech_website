"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, User, Share2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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

export default function BlogPostContent() {
    const params = useParams();
    const locale = useLocale();
    const t = useTranslations('BlogPost');
    const slug = params.slug as string;
    const allPosts = blogPostsByLocale[locale] || blogPostsByLocale.en;

    const post = allPosts.find(p => p.slug === slug);

    const [readProgress, setReadProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setReadProgress(Math.min(progress, 100));
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!post) {
        return (
            <main className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">{t('postNotFound')}</h1>
                    <Link href="/insights" className="text-cyan-400 hover:underline">
                        {t('backToInsightsNotFound')}
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
        "mainEntityOfPage": { "@type": "WebPage", "@id": `https://lopes2tech.ch/${locale}/insights/${post.slug}` }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://lopes2tech.ch/${locale}` },
            { "@type": "ListItem", "position": 2, "name": "Insights", "item": `https://lopes2tech.ch/${locale}/insights` },
            { "@type": "ListItem", "position": 3, "name": post.title }
        ]
    };

    // Related posts
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3);

    // Process content to add IDs to h2 headings for table of contents
    const processedContent = post.content.replace(
        /<h2([^>]*)>(.*?)<\/h2>/gi,
        (match, attrs, text) => {
            const plainText = text.replace(/<[^>]*>/g, '');
            const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return `<h2${attrs} id="${id}">${text}</h2>`;
        }
    );

    return (
        <main className="min-h-screen bg-[#0f172a]">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-150"
                    style={{ width: `${readProgress}%` }}
                />
            </div>

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
                        {t('backToInsights')}
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
                                <span className="text-slate-500">&bull; {post.authorRole}</span>
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {new Date(post.date).toLocaleDateString(
                                    locale === 'de' ? 'de-CH' : locale === 'pt' ? 'pt-PT' : 'en-GB',
                                    { month: 'long', day: 'numeric', year: 'numeric' }
                                )}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>
                    </motion.header>

                    {/* Social Share */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="text-sm text-slate-500">{t('share')}</span>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://lopes2tech.ch/${locale}/insights/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            aria-label="Share on LinkedIn"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://lopes2tech.ch/${locale}/insights/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            aria-label="Share on X"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - https://lopes2tech.ch/' + locale + '/insights/' + post.slug)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            aria-label="Share on WhatsApp"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                        <button
                            onClick={() => navigator.clipboard.writeText(`https://lopes2tech.ch/${locale}/insights/${post.slug}`)}
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            aria-label="Copy link"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>

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
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 75vw"
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Table of Contents */}
                    {(() => {
                        const headings = post.content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
                        if (headings.length < 2) return null;
                        return (
                            <motion.nav
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="mb-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                                aria-label="Table of contents"
                            >
                                <h2 className="text-lg font-bold text-white mb-4">{t('tableOfContents')}</h2>
                                <ul className="space-y-2">
                                    {headings.map((heading, idx) => {
                                        const text = heading.replace(/<[^>]*>/g, '');
                                        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                                        return (
                                            <li key={idx}>
                                                <a
                                                    href={`#${id}`}
                                                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 flex-shrink-0" />
                                                    {text}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </motion.nav>
                        );
                    })()}

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
                        dangerouslySetInnerHTML={{ __html: processedContent }}
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
                            {t('authorBio')}
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
                            <h2 className="text-2xl font-bold text-white mb-8">{t('relatedArticles')}</h2>
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
                            {t('backToAllInsights')}
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
