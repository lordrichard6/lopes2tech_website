"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import MediumBanner from "@/components/MediumBanner";
import { blogPostsByLocale } from "@/lib/blog";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -80px 0px" } as const;

export default function InsightsPage() {
    const locale        = useLocale();
    const t             = useTranslations("InsightsPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const posts = [...(blogPostsByLocale[locale] || blogPostsByLocale.en)]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [tagsExpanded, setTagsExpanded] = useState(false);

    const allTags      = [...new Set(posts.flatMap(p => p.tags))].sort();
    const filteredPosts = selectedTag ? posts.filter(p => p.tags.includes(selectedTag)) : posts;

    // Blur-up helpers
    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    const dateLocale =
        locale === "de" ? "de-CH" :
        locale === "pt" ? "pt-PT" :
        locale === "fr" ? "fr-CH" :
        locale === "it" ? "it-CH" : "en-GB";

    return (
        <main className="min-h-screen bg-[#080d1a]">
            <Navbar />

            <section className="relative pt-32 pb-20 overflow-hidden">

                {/* Background: subtle grid + vignette */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{ background: "radial-gradient(circle at center, transparent 0%, #080d1a 88%)" }}
                    />
                </div>

                {/* Ambient orbs */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
                    <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[80px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    {/* ── Hero ──────────────────────────────────────────────── */}
                    <div className="text-center mb-20">
                        {/* #5 — site-standard badge, no icon, no backdrop-blur */}
                        <motion.div {...fadeIn(0)}>
                            <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                                {t("badge")}
                            </div>
                        </motion.div>

                        {/* #6 — display font, #2 — violet fixed */}
                        <motion.h1
                            {...fadeIn(0.1)}
                            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold mb-6 text-white"
                        >
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                                {t("titleHighlight")}
                            </span>
                        </motion.h1>

                        <motion.p
                            {...fadeIn(0.2)}
                            className="text-xl text-slate-400 max-w-3xl mx-auto"
                        >
                            {t("description")}
                        </motion.p>
                    </div>

                    {/* #12 — hairline visual pause before tag filter */}
                    <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-10" />

                    {/* ── Tag filter ────────────────────────────────────────── */}
                    <div
                        className="flex flex-wrap gap-2 mb-12 justify-center"
                        role="group"
                        aria-label={t("filterLabel")}
                    >
                        {/* All topics */}
                        <motion.button
                            layout
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                !selectedTag
                                    ? "bg-cyan-400 text-[#080d1a]"
                                    : "bg-white/5 text-slate-400 border border-white/10 hover:border-cyan-400/30 hover:text-white"
                            }`}
                        >
                            {t("filterAll")}
                        </motion.button>

                        {/* First 4 tags */}
                        {allTags.slice(0, 4).map(tag => (
                            <motion.button
                                layout
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                                    selectedTag === tag
                                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                                        : "bg-white/5 text-slate-400 border border-white/10 hover:border-cyan-400/30 hover:text-white"
                                }`}
                            >
                                {tag}
                            </motion.button>
                        ))}

                        {/* Expanded tags */}
                        <AnimatePresence>
                            {tagsExpanded && allTags.slice(4).map((tag, i) => (
                                <motion.button
                                    key={tag}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    transition={{ duration: 0.18, delay: i * 0.04, ease: EASE }}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                                        selectedTag === tag
                                            ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/50"
                                            : "bg-white/5 text-slate-400 border border-white/10 hover:border-cyan-400/30 hover:text-white"
                                    }`}
                                >
                                    {tag}
                                </motion.button>
                            ))}
                        </AnimatePresence>

                        {/* Expand / collapse */}
                        {allTags.length > 4 && (
                            <motion.button
                                layout
                                onClick={() => setTagsExpanded(v => !v)}
                                className="px-4 py-1.5 rounded-full text-sm font-bold text-slate-400 bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:text-white transition-colors duration-300"
                                aria-label={tagsExpanded ? "Show fewer topics" : "Show all topics"}
                            >
                                {tagsExpanded ? "↑" : "···"}
                            </motion.button>
                        )}
                    </div>

                    {/* ── Blog grid ─────────────────────────────────────────── */}
                    {filteredPosts.length === 0 && (
                        <p className="text-center text-slate-500 py-16">{t("noResults")}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post, idx) => (
                            // #7 — whileInView instead of animate; stagger per column not total index
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={VP}
                                transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: EASE }}
                                className="h-full"
                            >
                                <Link href={`/insights/${post.slug}`} className="group block h-full">
                                    {/* #9 — Double-Bezel outer shell */}
                                    <div className="h-full p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-cyan-400/20">
                                        {/* Inner card — #3 backdrop-blur removed, #11 transition-all removed */}
                                        <div className="h-full flex flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.09]">

                                            {/* Image */}
                                            <div className="relative aspect-[16/9] overflow-hidden rounded-t-[calc(2rem-1px)]">
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    priority={idx < 3}
                                                    // #10 — scale-110 → scale-105
                                                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                                                />
                                                {/* #1 — overlay uses #080d1a */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col p-6">
                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.tags.slice(0, 2).map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-1 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Title */}
                                                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-cyan-400">
                                                    {post.title}
                                                </h2>

                                                {/* Excerpt */}
                                                <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-1">
                                                    {post.excerpt}
                                                </p>

                                                {/* Meta */}
                                                <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-white/5">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(post.date).toLocaleDateString(dateLocale, {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3 h-3" />
                                                        {post.readTime}
                                                    </span>
                                                </div>
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

            {/* CollectionPage structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: "Lopes2Tech Insights",
                        description: "Expert articles on AI workflows, technical SEO, web development, and business automation for Swiss businesses.",
                        url: `https://www.lopes2tech.ch/${locale}/insights`,
                        publisher: { "@type": "Organization", name: "Lopes2Tech", url: "https://www.lopes2tech.ch" },
                        hasPart: posts.map(post => ({
                            "@type": "BlogPosting",
                            headline: post.title,
                            description: post.excerpt,
                            url: `https://www.lopes2tech.ch/${locale}/insights/${post.slug}`,
                            image: `https://www.lopes2tech.ch${post.image}`,
                            datePublished: post.date,
                            author: { "@type": "Person", name: post.author },
                        })),
                    }),
                }}
            />
        </main>
    );
}
