"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import MediumBanner from "@/components/MediumBanner";
import { blogPostsByLocale } from "@/lib/blog";

export default function InsightsPage() {
    const locale = useLocale();
    const t = useTranslations('InsightsPage');
    const posts = [...(blogPostsByLocale[locale] || blogPostsByLocale.en)]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [tagsExpanded, setTagsExpanded] = useState(false);
    const allTags = [...new Set(posts.flatMap(p => p.tags))].sort();
    const visibleTags = tagsExpanded ? allTags : allTags.slice(0, 4);
    const filteredPosts = selectedTag ? posts.filter(p => p.tags.includes(selectedTag)) : posts;

    return (
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />

            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Pattern - Grid Lines */}
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
                    {/* Vignette */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 0%, #0f172a 90%)'
                        }}
                    />
                </div>

                {/* Floating Circles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
                    <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <BookOpen className="inline w-4 h-4 mr-2" />
                            {t('badge')}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            {t('title')}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                {t('titleHighlight')}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            {t('description')}
                        </p>
                    </motion.div>

                    {/* Tag Filter */}
                    <div className="flex flex-wrap gap-2 mb-10 justify-center" role="group" aria-label={t('filterLabel')}>
                        {/* "All topics" pill — always visible */}
                        <motion.button
                            layout
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                !selectedTag
                                    ? 'bg-cyan-400 text-slate-900'
                                    : 'bg-white/5 text-slate-400 border border-white/10 hover:border-cyan-400/30 hover:text-white'
                            }`}
                        >
                            {t('filterAll')}
                        </motion.button>

                        {/* First 4 tags — always visible */}
                        {allTags.slice(0, 4).map(tag => (
                            <motion.button
                                layout
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                                    selectedTag === tag
                                        ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                                        : 'bg-white/5 text-slate-400 border border-white/10 hover:border-cyan-400/30 hover:text-white'
                                }`}
                            >
                                {tag}
                            </motion.button>
                        ))}

                        {/* Extra tags — animated in/out */}
                        <AnimatePresence>
                            {tagsExpanded && allTags.slice(4).map((tag, i) => (
                                <motion.button
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.15, delay: i * 0.04 }}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                                        selectedTag === tag
                                            ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50'
                                            : 'bg-white/5 text-slate-400 border border-white/10 hover:border-cyan-400/30 hover:text-white'
                                    }`}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </AnimatePresence>

                        {/* Expand / collapse toggle */}
                        {allTags.length > 4 && (
                            <motion.button
                                layout
                                onClick={() => setTagsExpanded(v => !v)}
                                className="px-4 py-1.5 rounded-full text-sm font-bold text-slate-400 bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:text-white transition-colors duration-200"
                                aria-label={tagsExpanded ? "Show fewer topics" : "Show all topics"}
                            >
                                {tagsExpanded ? "↑" : "···"}
                            </motion.button>
                        )}
                    </div>

                    {/* Blog Grid */}
                    {filteredPosts.length === 0 && (
                        <p className="text-center text-slate-500 py-16">{t('noResults')}</p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={`/insights/${post.slug}`}
                                    className="group block h-full"
                                >
                                    <div className="h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-cyan-400/30 transition-all duration-500">
                                        {/* Image */}
                                        <div className="relative aspect-[16/9] overflow-hidden isolate" style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}>
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                priority={idx < 6}
                                                className="object-cover transition-transform duration-700 group-hover:scale-110 [backface-visibility:hidden] [transform:translateZ(0)]"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col p-6">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                                                {post.title}
                                            </h2>

                                            {/* Excerpt */}
                                            <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-1">
                                                {post.excerpt}
                                            </p>

                                            {/* Meta */}
                                            <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-white/5">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.date).toLocaleDateString(
                                                        locale === 'de' ? 'de-CH' : locale === 'pt' ? 'pt-PT' : locale === 'fr' ? 'fr-CH' : locale === 'it' ? 'it-CH' : 'en-GB',
                                                        { month: 'short', day: 'numeric', year: 'numeric' }
                                                    )}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Medium Banner */}
                    <div className="mt-16">
                        <MediumBanner />
                    </div>
                </div>
            </section>

            <Footer />

            {/* CollectionPage structured data for Google */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Lopes2Tech Insights",
                        description: "Expert articles on AI workflows, technical SEO, web development, and business automation for Swiss businesses.",
                        url: `https://lopes2tech.ch/${locale}/insights`,
                        publisher: {
                            "@type": "Organization",
                            name: "Lopes2Tech",
                            url: "https://lopes2tech.ch",
                        },
                        hasPart: posts.map((post) => ({
                            "@type": "BlogPosting",
                            headline: post.title,
                            description: post.excerpt,
                            url: `https://lopes2tech.ch/${locale}/insights/${post.slug}`,
                            image: `https://lopes2tech.ch${post.image}`,
                            datePublished: post.date,
                            author: { "@type": "Person", name: post.author },
                        })),
                    }),
                }}
            />
        </main>
    );
}
