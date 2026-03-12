"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqKeys = ["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15"] as const;

const categoryKeys = ["socialMedia","webDesign","general","seoMarketing","pricing","automation"] as const;

export default function FAQPage() {
    const t = useTranslations("FAQPage");

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

    const [openIndex, setOpenIndex]       = useState<number | null>(null);
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

    return (
        <main className="min-h-screen bg-[#0f172a] relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <Navbar />

            <div className="fixed inset-0 z-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0f172a]/90" />
            </div>

            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <MessageCircle className="inline w-4 h-4 mr-2" />
                            {t("badge")}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                {t("titleHighlight")}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {t("description")}
                        </p>
                    </motion.header>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                activeCategory === "all"
                                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                                    : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                            }`}
                        >
                            {t("all")}
                        </button>
                        {categoryKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                    activeCategory === key
                                        ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10 border border-white/10"
                                }`}
                            >
                                {categoryLabels[key]}
                            </button>
                        ))}
                    </motion.div>

                    {/* FAQ Items */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {filteredFAQs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * index }}
                                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                    aria-expanded={openIndex === index}
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="px-2 py-1 text-xs font-medium text-cyan-400 bg-cyan-400/10 rounded-full">
                                                {categoryLabels[faq.category] ?? faq.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                                    </div>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ml-4 ${
                                            openIndex === index ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-5 text-slate-300 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 text-center p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl backdrop-blur-sm"
                    >
                        <h2 className="text-2xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
                        <p className="text-slate-400 mb-6">{t("ctaDescription")}</p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                        >
                            {t("ctaButton")}
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
