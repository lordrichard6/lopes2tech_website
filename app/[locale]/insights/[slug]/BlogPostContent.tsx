"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, ChevronRight, User, Share2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import MediumBanner from "@/components/MediumBanner";
import { blogPostsByLocale } from "@/lib/blog";

export default function BlogPostContent() {
    const params = useParams();
    const locale = useLocale();
    const t = useTranslations('BlogPost');
    const slug = params.slug as string;
    const allPosts = blogPostsByLocale[locale] || blogPostsByLocale.en;

    const post = allPosts.find(p => p.slug === slug);

    const [readProgress, setReadProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [tagsExpanded, setTagsExpanded] = useState(false);

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
        "@id": `https://lopes2tech.ch/${locale}/insights/${post.slug}#breadcrumb`,
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `https://lopes2tech.ch/${locale}` },
            { "@type": "ListItem", "position": 2, "name": "Insights", "item": `https://lopes2tech.ch/${locale}/insights` },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://lopes2tech.ch/${locale}/insights/${post.slug}` }
        ]
    };

    // Related posts
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
        .slice(0, 3);

    // Process content to add IDs to h2 headings for table of contents
    const processedContent = post.content
        .replace(
            /<h2([^>]*)>(.*?)<\/h2>/gi,
            (match, attrs, text) => {
                const plainText = text.replace(/<[^>]*>/g, '');
                const id = plainText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                return `<h2${attrs} id="${id}">${text}</h2>`;
            }
        )
        .replace(
            /<!--\s*IMAGE:\s*([^|]+)\|\s*([^|]+)\|\s*PROMPT:\s*([\s\S]*?)\s*-->/gi,
            (match, filename, description, prompt) => {
                const safePrompt = prompt.trim().replace(/&/g, '&amp;').replace(/"/g, '&quot;');
                return `
                <figure class="not-prose my-10">
                    <div class="rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.03] px-6 py-7 space-y-4">
                        <div class="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                            <div>
                                <p class="text-xs font-mono text-white/20 uppercase tracking-widest">${filename.trim()}</p>
                                <p class="text-sm text-white/50 mt-0.5">${description.trim()}</p>
                            </div>
                        </div>
                        <div class="rounded-xl border border-white/10 bg-black/40 p-4">
                            <div class="flex items-center justify-between gap-4 mb-3">
                                <p class="text-xs font-mono text-cyan-400/60 uppercase tracking-widest">DALL·E 3 prompt</p>
                                <button
                                    onclick="navigator.clipboard.writeText(this.dataset.p).then(()=>{this.textContent='Copied!';this.classList.add('text-cyan-400','border-cyan-400/40');setTimeout(()=>{this.textContent='Copy prompt';this.classList.remove('text-cyan-400','border-cyan-400/40')},2000)})"
                                    data-p="${safePrompt}"
                                    class="flex-shrink-0 text-xs font-medium text-white/40 border border-white/15 rounded-lg px-3 py-1.5 hover:text-white hover:border-white/30 transition-all cursor-pointer"
                                >Copy prompt</button>
                            </div>
                            <p class="text-xs text-slate-400 leading-relaxed">${prompt.trim()}</p>
                        </div>
                    </div>
                </figure>`;
            }
        );

    return (
        <main className="min-h-screen bg-[#0f172a]">
            {/* Print styles */}
            <style>{`
                @media print {
                    .print-hide { display: none !important; }
                    body { background: white !important; }
                    .prose-invert { --tw-prose-body: #1a1a1a; --tw-prose-headings: #000; }
                    article { padding-top: 1rem !important; }
                    a[href]::after { content: " (" attr(href) ")"; font-size: 0.75em; color: #666; }
                }
            `}</style>

            {/* Reading Progress Bar */}
            <div
                role="progressbar"
                aria-valuenow={Math.round(readProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
                className="print-hide fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent"
            >
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
                        className="print-hide inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('backToInsights')}
                    </Link>

                    {/* Breadcrumb */}
                    <nav aria-label={t('breadcrumbNav')} className="mb-8">
                        <ol className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
                            <li>
                                <Link href="/" className="hover:text-cyan-400 transition-colors">
                                    {t('breadcrumbHome')}
                                </Link>
                            </li>
                            <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                            <li>
                                <Link href="/insights" className="hover:text-cyan-400 transition-colors">
                                    Insights
                                </Link>
                            </li>
                            <li aria-hidden="true"><ChevronRight className="w-3 h-3" /></li>
                            <li className="text-slate-300 truncate max-w-[200px] sm:max-w-sm" aria-current="page">
                                {post.title}
                            </li>
                        </ol>
                    </nav>

                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {(tagsExpanded ? post.tags : post.tags.slice(0, 3)).map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider border border-cyan-400/20"
                                >
                                    {tag}
                                </span>
                            ))}
                            {post.tags.length > 3 && (
                                <button
                                    onClick={() => setTagsExpanded(v => !v)}
                                    className="px-3 py-1 text-xs font-bold text-slate-400 bg-white/5 rounded-full border border-white/10 hover:border-cyan-400/30 hover:text-white transition-all"
                                    aria-label={tagsExpanded ? "Show fewer tags" : `Show ${post.tags.length - 3} more tags`}
                                >
                                    {tagsExpanded ? "↑" : "···"}
                                </button>
                            )}
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
                                    locale === 'de' ? 'de-CH' : locale === 'pt' ? 'pt-PT' : locale === 'fr' ? 'fr-CH' : locale === 'it' ? 'it-CH' : 'en-GB',
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
                    <div className="print-hide flex items-center gap-3 mb-8">
                        <span className="text-sm text-slate-500">{t('share')}</span>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://lopes2tech.ch/${locale}/insights/${post.slug}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            aria-label={t('shareLinkedIn')}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://lopes2tech.ch/${locale}/insights/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            aria-label={t('shareX')}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - https://lopes2tech.ch/' + locale + '/insights/' + post.slug)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                            aria-label={t('shareWhatsApp')}
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </a>
                        <button
                            onClick={async () => {
                                const url = `https://lopes2tech.ch/${locale}/insights/${post.slug}`;
                                try {
                                    await navigator.clipboard.writeText(url);
                                } catch {
                                    // Fallback for browsers that block clipboard API
                                    const el = document.createElement('input');
                                    el.value = url;
                                    el.style.position = 'fixed';
                                    el.style.opacity = '0';
                                    document.body.appendChild(el);
                                    el.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(el);
                                }
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            className={`flex items-center justify-center gap-1.5 px-3 h-9 rounded-lg border transition-all text-xs font-medium ${
                                copied
                                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10'
                            }`}
                            aria-label={copied ? t('linkCopied') : t('copyLink')}
                        >
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">{copied ? t('linkCopied') : t('copyLink')}</span>
                        </button>
                    </div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 border border-white/10 isolate"
                        style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
                    >
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 75vw"
                            className="object-cover [backface-visibility:hidden] [transform:translateZ(0)]"
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
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        const el = document.getElementById(id);
                                                        if (el) {
                                                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                            window.history.pushState(null, '', `#${id}`);
                                                        }
                                                    }}
                                                    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer"
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
                        className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:leading-snug prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-cyan-300 prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-strong:font-bold prose-em:text-slate-300 prose-ul:text-slate-300 prose-ul:my-6 prose-ul:space-y-2 prose-ol:text-slate-300 prose-ol:my-6 prose-ol:space-y-2 prose-li:my-1 prose-li:pl-1 prose-code:text-cyan-400 prose-code:bg-cyan-400/10 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-l-cyan-400 prose-blockquote:text-slate-300 prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-medium prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:p-3 prose-th:text-left prose-td:border prose-td:border-white/10 prose-td:p-3 prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-10 prose-figure:my-10 prose-figcaption:text-slate-500 prose-figcaption:text-sm prose-figcaption:text-center prose-figcaption:mt-3 prose-figcaption:italic prose-hr:border-white/10 prose-hr:my-12"
                        dangerouslySetInnerHTML={{ __html: processedContent }}
                    />

                    {/* Author Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-16 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8"
                    >
                        {/* Subtle ambient glow */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10 flex items-center gap-5 mb-5">
                            <div className="relative flex-shrink-0">
                                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/20">
                                    <Image
                                        src="/founder_fancy.webp"
                                        alt={post.author}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-cyan-400 rounded-full border-2 border-[#0f172a]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white leading-tight">{post.author}</h3>
                                <p className="text-sm text-cyan-400 font-medium">{post.authorRole}</p>
                            </div>
                        </div>
                        <p className="relative z-10 text-slate-300 leading-relaxed border-t border-white/8 pt-5">
                            {t('authorBio')}
                        </p>
                    </motion.div>

                    {/* CTA Block */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="print-hide mt-8 relative overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-[#0f172a] to-purple-500/10 p-10"
                    >
                        {/* Strong ambient glows */}
                        <div className="absolute -top-16 -left-16 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
                        <div className="relative z-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">Ready to start?</p>
                            <h3 className="text-3xl font-extrabold text-white mb-4 leading-tight">{t('ctaTitle')}</h3>
                            <p className="text-slate-400 mb-8 max-w-xl text-lg leading-relaxed">{t('ctaDescription')}</p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-base hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
                            >
                                {t('ctaButton')}
                            </Link>
                        </div>
                    </motion.div>

                    {/* Medium Banner */}
                    <div className="print-hide mt-8">
                        <MediumBanner />
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-16"
                            aria-labelledby="related-articles-heading"
                        >
                            <h2 id="related-articles-heading" className="text-2xl font-bold text-white mb-8">{t('relatedArticles')}</h2>
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
                        </motion.section>
                    )}

                    {/* Back to Insights */}
                    <div className="print-hide mt-12 text-center">
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
