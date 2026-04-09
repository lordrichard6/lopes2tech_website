"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ArrowRight, SearchX } from "lucide-react";

const EASE   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;

const faqKeys = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15"] as const;
const categoryKeys = ["socialMedia","webDesign","general","seoMarketing","pricing","automation"] as const;

export default function FAQPage() {
    const t             = useTranslations("FAQPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const categoryLabels: Record<string, string> = {
        socialMedia:  t("categories.socialMedia"),
        webDesign:    t("categories.webDesign"),
        general:      t("categories.general"),
        seoMarketing: t("categories.seoMarketing"),
        pricing:      t("categories.pricing"),
        automation:   t("categories.automation"),
    };

    // Stable FAQ array — built once
    const faqs = useMemo(() => faqKeys.map((key) => ({
        question: t(`faqs.${key}.question`),
        answer:   t(`faqs.${key}.answer`),
        category: t(`faqs.${key}.category`),
    })), [t]);

    // Memoized schema — not rebuilt on every render
    const faqSchema = useMemo(() => ({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
    }), [faqs]);

    // Count per category for pill badges
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { all: faqs.length };
        for (const key of categoryKeys) {
            counts[key] = faqs.filter(f => f.category === key).length;
        }
        return counts;
    }, [faqs]);

    const [openIndex, setOpenIndex]           = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setOpenIndex(null); // #1 — reset open accordion on filter change
    };

    const filteredFAQs = activeCategory === "all"
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    return (
        <main className="min-h-screen bg-[#080d1a] relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <Navbar />

            {/* Background video */}
            <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#080d1a]/90" />
            </div>

            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6">

                    {/* ── Hero ──────────────────────────────────────────── */}
                    <motion.div {...fadeIn(0)} className="text-center mb-16">
                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                            {t("badge")}
                        </div>
                        <h1
                            className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-extrabold mb-6 text-white"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                                {t("titleHighlight")}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {t("description")}
                        </p>
                    </motion.div>

                    {/* ── Category Filter ───────────────────────────────── */}
                    <motion.div
                        {...fadeIn(0.1)}
                        role="group"
                        aria-label="Filter questions by category"
                        className="flex flex-wrap justify-center gap-3 mb-6"
                    >
                        {/* "All" pill */}
                        <button
                            onClick={() => handleCategoryChange("all")}
                            aria-pressed={activeCategory === "all"}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                activeCategory === "all"
                                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 border-white/10"
                            }`}
                        >
                            {t("all")}
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === "all" ? "bg-black/20" : "bg-white/10"}`}>
                                {categoryCounts.all}
                            </span>
                        </button>

                        {categoryKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                aria-pressed={activeCategory === key}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm border transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                    activeCategory === key
                                        ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 border-white/10"
                                }`}
                            >
                                {categoryLabels[key]}
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory === key ? "bg-black/20" : "bg-white/10"}`}>
                                    {categoryCounts[key]}
                                </span>
                            </button>
                        ))}
                    </motion.div>

                    {/* ── Results count ─────────────────────────────────── */}
                    <div className="flex justify-center mb-10">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={activeCategory}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.22, ease: EASE }}
                                className="text-[11px] text-slate-600 uppercase tracking-[0.18em]"
                            >
                                {filteredFAQs.length} {filteredFAQs.length === 1 ? "question" : "questions"}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* ── FAQ Accordion ─────────────────────────────────── */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredFAQs.length > 0 ? (
                                filteredFAQs.map((faq, index) => {
                                    const panelId = `faq-panel-${activeCategory}-${index}`;
                                    const btnId   = `faq-btn-${activeCategory}-${index}`;
                                    // #6 — cap total stagger at 250ms
                                    const stagger = Math.min(index * 0.04, 0.25);
                                    return (
                                        <motion.div
                                            key={`${activeCategory}-${index}`}
                                            initial={{ opacity: 0, ...(shouldAnimate ? { y: 20, filter: "blur(8px)" } : {}) }}
                                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            viewport={VP}
                                            transition={{ duration: 0.5, delay: stagger, ease: EASE }}
                                            className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
                                        >
                                            <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                                <button
                                                    id={btnId}
                                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                    aria-expanded={openIndex === index}
                                                    aria-controls={panelId}
                                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                                >
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="px-2 py-1 text-xs font-semibold text-cyan-400 bg-cyan-400/10 rounded-full">
                                                                {categoryLabels[faq.category] ?? faq.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                                                    </div>
                                                    <ChevronDown
                                                        className={`w-5 h-5 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                                            openIndex === index ? "rotate-180" : ""
                                                        }`}
                                                    />
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {openIndex === index && (
                                                        <motion.div
                                                            id={panelId}
                                                            role="region"
                                                            aria-labelledby={btnId}
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.25, ease: EASE }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-6 pb-5 pt-1 text-slate-300 leading-relaxed border-t border-white/5">
                                                                {faq.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                /* ── Empty state ── */
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 20, filter: "blur(8px)" } : {}) }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, ease: EASE }}
                                    className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
                                >
                                    <div className="rounded-[calc(2rem-1px)] flex flex-col items-center justify-center py-16 px-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] text-center">
                                        <SearchX className="w-10 h-10 text-slate-600 mb-4" />
                                        <p className="text-slate-400 font-semibold mb-1">No questions in this category yet</p>
                                        <p className="text-slate-600 text-sm">Try selecting a different filter above.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── CTA ───────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-16 p-[1px] rounded-[2rem] ring-1 ring-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10"
                    >
                        <div className="rounded-[calc(2rem-1px)] text-center p-10 bg-[#080d1a]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                            <h2
                                className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-white mb-3"
                                style={{ letterSpacing: "-0.02em" }}
                            >
                                {t("ctaTitle")}
                            </h2>
                            <p className="text-slate-400 mb-8">{t("ctaDescription")}</p>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={SPRING}
                                className="inline-block"
                            >
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                >
                                    {t("ctaButton")}
                                    <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
