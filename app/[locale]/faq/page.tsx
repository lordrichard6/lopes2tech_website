"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, ArrowRight } from "lucide-react";

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

    const faqs = faqKeys.map((key) => ({
        question: t(`faqs.${key}.question`),
        answer:   t(`faqs.${key}.answer`),
        category: t(`faqs.${key}.category`),
    }));

    const [openIndex, setOpenIndex]         = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const filteredFAQs = activeCategory === "all"
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
    };

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
                    <motion.header {...fadeIn(0)} className="text-center mb-16">
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
                    </motion.header>

                    {/* ── Category Filter ───────────────────────────────── */}
                    <motion.div
                        {...fadeIn(0.1)}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                activeCategory === "all"
                                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                            }`}
                        >
                            {t("all")}
                        </button>
                        {categoryKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                    activeCategory === key
                                        ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                                }`}
                            >
                                {categoryLabels[key]}
                            </button>
                        ))}
                    </motion.div>

                    {/* ── FAQ Accordion ─────────────────────────────────── */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredFAQs.map((faq, index) => (
                                <motion.div
                                    key={`${activeCategory}-${index}`}
                                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 20, filter: "blur(8px)" } : {}) }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={VP}
                                    transition={{ duration: 0.5, delay: index * 0.04, ease: EASE }}
                                    className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
                                >
                                    <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                            aria-expanded={openIndex === index}
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
                            ))}
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
