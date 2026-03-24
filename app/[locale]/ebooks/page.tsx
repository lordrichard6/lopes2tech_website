"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Download, Star, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

// ─── Ebook catalog ────────────────────────────────────────────────────────────
// To add Amazon / Etsy links, replace null with the live URL string.
const EBOOKS = [
    {
        key: "freud",
        series: "They Never Taught You",
        title: "The Freud They Never Taught You",
        subtitle: "Cocaine, Cults & the Bizarre Origins of Psychoanalysis",
        description:
            "Before the famous couch, there was cocaine, a secret society with magic gemstone rings, and a man who was terrified of a number. The Freud you were never taught in school.",
        price: 9.9,
        badge: "Second Edition · 17 Illustrations",
        tags: ["Biography", "History", "Psychology"],
        languages: ["EN"],
        stripeLink: "https://buy.stripe.com/dRmbJ2cae0lz5rr8yC1Nu08",
        amazonLink: null as string | null,
        etsyLink:   null as string | null,
        cover: "/ebooks/freud.png",
        featured: true,
    },
    {
        key: "tesla",
        series: "They Never Taught You",
        title: "The Tesla They Never Taught You",
        subtitle: "Gambling, Obsession & the Genius Who Powered the Modern World",
        description:
            "Electrocuted elephants, man-made lightning bolts 135 feet long, and a torn-up $300 million contract. Meet the real Nikola Tesla — as told by no textbook ever.",
        price: 9.9,
        badge: "First Edition · 17 Illustrations",
        tags: ["Biography", "History", "Science"],
        languages: ["EN"],
        stripeLink: "https://buy.stripe.com/7sY4gAa262tHcTT5mq1Nu09",
        amazonLink: null as string | null,
        etsyLink:   null as string | null,
        cover: "/ebooks/tesla.png",
        featured: true,
    },
    {
        key: "switzerland",
        series: "100 Things",
        title: "100 Things Switzerland",
        subtitle: "The Unofficial Survival Guide to Swiss Life",
        description:
            "From separating your recycling by material type to never vacuuming on Sunday — 100 illustrated facts, rules, and cultural quirks every expat needs to survive in Switzerland.",
        price: 9.9,
        badge: "First Edition · 100 Illustrations",
        tags: ["Travel", "Culture", "Expat Life"],
        languages: ["EN", "PT"],
        stripeLink: "https://buy.stripe.com/eVq7sM3DIfgt4nn9CG1Nu0a",
        amazonLink: null as string | null,
        etsyLink:   null as string | null,
        cover: "/ebooks/switzerland.png",
        featured: false,
    },
    {
        key: "portugal",
        series: "100 Things",
        title: "100 Things Portugal",
        subtitle: "An Illustrated Deep Dive Into Portuguese Culture",
        description:
            "Bacalhau à Brás, Pastéis de Nata, and the inexplicable passion for melancholy music — 100 things that make Portugal unmistakably, gloriously Portuguese.",
        price: 9.9,
        badge: "First Edition · 100 Illustrations",
        tags: ["Travel", "Culture", "Portugal"],
        languages: ["EN"],
        stripeLink: "https://buy.stripe.com/8x228s2zEecp9HHeX01Nu0b",
        amazonLink: null as string | null,
        etsyLink:   null as string | null,
        cover: "/ebooks/portugal.png",
        featured: false,
    },
    {
        key: "productivity",
        series: "Tools",
        title: "30-Day Productivity Tracker",
        subtitle: "A Structured Daily Planner & Habit Tracker",
        description:
            "A clean, printable PDF tracker designed to build momentum over 30 days. Daily planning blocks, habit streaks, weekly reviews — available in 6 languages.",
        price: 9.0,
        badge: "6 Languages · Printable PDF",
        tags: ["Productivity", "Habits", "Planner"],
        languages: ["EN", "DE", "FR", "IT", "PT", "ES"],
        stripeLink: "https://buy.stripe.com/eVqbJ2caeecpaLL16a1Nu0c",
        amazonLink: null as string | null,
        etsyLink:   null as string | null,
        cover: "/ebooks/productivity.png",
        featured: false,
    },
] as const;

const SERIES_ORDER = ["They Never Taught You", "100 Things", "Tools"];

// ─── Marketplace icons ────────────────────────────────────────────────────────
function AmazonIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.927 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.097v-.41c0-.753.06-1.642-.384-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66C5.754 1.429 8.602.5 11.15.5c1.307 0 3.017.347 4.049 1.333C16.547 2.991 16.5 4.596 16.5 6.333v5.164c0 1.553.644 2.236 1.25 3.077.212.298.259.655-.007.877l-2.599 2.344zM20.556 21.99C18.35 23.702 15.15 24.6 12.4 24.6c-3.942 0-7.492-1.459-10.183-3.882-.211-.192-.023-.454.232-.305 2.899 1.686 6.485 2.702 10.192 2.702 2.499 0 5.246-.519 7.771-1.595.381-.161.701.25.144.47zM21.487 21.1c-.291-.372-1.924-.176-2.656-.089-.223.027-.257-.167-.056-.307 1.302-.916 3.437-.651 3.686-.344.25.308-.065 2.441-1.287 3.462-.188.158-.367.073-.284-.134.275-.687.891-2.23.597-2.588z" />
        </svg>
    );
}

function EtsyIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M9.194 0C7.075 0 3.969 2.116 3.969 6.862v.816H2.775a.619.619 0 0 0-.619.619v2.1c0 .342.277.619.619.619h1.194v11.25c0 .342.277.619.619.619h2.475a.619.619 0 0 0 .619-.619V11.016h2.25c.342 0 .619-.277.619-.619V8.297a.619.619 0 0 0-.619-.619h-2.25v-.816c0-2.7 1.35-3.825 2.7-3.825.9 0 1.8.45 2.025.675.225.225.619.225.844 0l1.35-1.575C14.026.787 11.526 0 9.194 0zm5.4 7.678a.619.619 0 0 0-.619.619v12.469c0 .342.277.619.619.619h2.475a.619.619 0 0 0 .619-.619V8.297a.619.619 0 0 0-.619-.619h-2.475zm1.237-5.147a1.969 1.969 0 1 0 0 3.938 1.969 1.969 0 0 0 0-3.938z" />
        </svg>
    );
}

// ─── Book Card ────────────────────────────────────────────────────────────────
function EbookCard({ book, index }: { book: typeof EBOOKS[number]; index: number }) {
    const t = useTranslations("EbooksPage");

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
            className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-cyan-400/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.07)]"
        >
            {book.featured && (
                <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    {t("featured")}
                </div>
            )}

            {/* Cover */}
            <div className="relative w-full aspect-[3/4] bg-slate-800/50 overflow-hidden">
                <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    {book.series}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                    <h3 className="text-lg font-bold text-white leading-snug mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                        {book.title}
                    </h3>
                    <p className="text-xs text-slate-400 italic">{book.subtitle}</p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {book.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {book.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {book.badge}
                    </span>
                    <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {book.languages.join(" · ")}
                    </span>
                </div>

                {/* Price + CTAs */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                    {/* Direct purchase — primary */}
                    <a
                        href={book.stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.02]"
                    >
                        <span className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            {t("buyDirect")}
                        </span>
                        <span className="font-bold">CHF {book.price.toFixed(2)}</span>
                    </a>

                    {/* Amazon + Etsy — secondary, only shown when URLs are set */}
                    {(book.amazonLink || book.etsyLink) && (
                        <div className="flex gap-2">
                            {book.amazonLink && (
                                <a
                                    href={book.amazonLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-xs font-semibold hover:border-amber-400/40 hover:text-amber-400 transition-all duration-300"
                                >
                                    <AmazonIcon className="w-3.5 h-3.5" />
                                    Amazon
                                </a>
                            )}
                            {book.etsyLink && (
                                <a
                                    href={book.etsyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-xs font-semibold hover:border-orange-400/40 hover:text-orange-400 transition-all duration-300"
                                >
                                    <EtsyIcon className="w-3.5 h-3.5" />
                                    Etsy
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EbooksPage() {
    const t = useTranslations("EbooksPage");

    const grouped = SERIES_ORDER.map((series) => ({
        series,
        books: EBOOKS.filter((b) => b.series === series),
    })).filter((g) => g.books.length > 0);

    return (
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />

            <section className="relative pt-32 pb-24 overflow-hidden">
                {/* Background grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                >
                    <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, transparent 0%, #0f172a 90%)" }} />
                </div>

                {/* Glows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[5%] left-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[100px]" />
                    <div className="absolute bottom-[10%] right-[0%] w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <BookOpen className="w-4 h-4" />
                            {t("badge")}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                {t("titleHighlight")}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                            {t("description")}
                        </p>

                        {/* Trust signals */}
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                            {[
                                { icon: Download, text: t("trust.instant") },
                                { icon: Star,     text: t("trust.drm") },
                                { icon: Globe,    text: t("trust.multilingual") },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-cyan-400" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Book sections */}
                    {grouped.map(({ series, books }) => (
                        <div key={series} className="mb-20">
                            <motion.div
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <h2 className="text-2xl font-bold text-white">{series}</h2>
                                <div className="flex-1 h-px bg-white/10" />
                                <span className="text-sm text-slate-500">
                                    {books.length} {books.length === 1 ? t("book") : t("books")}
                                </span>
                            </motion.div>

                            <div className={`grid gap-8 ${
                                books.length === 1
                                    ? "grid-cols-1 max-w-sm"
                                    : books.length === 2
                                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            }`}>
                                {books.map((book, i) => (
                                    <EbookCard key={book.key} book={book} index={i} />
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Guarantee strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-center sm:text-left"
                    >
                        {[
                            { icon: Download, title: t("guarantee.instant.title"), desc: t("guarantee.instant.desc") },
                            { icon: Globe,    title: t("guarantee.device.title"),  desc: t("guarantee.device.desc") },
                            { icon: Star,     title: t("guarantee.quality.title"), desc: t("guarantee.quality.desc") },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="flex flex-col items-center sm:items-start gap-1">
                                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                                    <Icon className="w-4 h-4 text-cyan-400" />
                                    {title}
                                </div>
                                <p className="text-slate-400 text-xs">{desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
