"use client";

import { Link } from "@/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -60px 0px" } as const;

export default function Impressum() {
    const t             = useTranslations("ImpressumPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const sectionAnim = {
        initial: { opacity: 0, ...(shouldAnimate ? { y: 20, filter: "blur(6px)" } : {}) },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        viewport: VP,
        transition: { duration: 0.6, ease: EASE },
    };

    return (
        <main className="min-h-screen bg-[#080d1a] text-white pt-24 pb-16 relative overflow-hidden">
            {/* Background orbs */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[80px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[80px]" />
            </div>

            <div className="relative z-10 container max-w-[800px] mx-auto px-6">

                {/* Back button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-1" />
                    {t("backToHome")}
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mb-12"
                >
                    <h1
                        className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-white mb-4"
                        style={{ letterSpacing: "-0.02em" }}
                    >
                        {t("title")}
                    </h1>
                    <p className="text-xl text-slate-400">{t("subtitle")}</p>
                </motion.div>

                {/* Content */}
                <div className="space-y-12 text-slate-300 leading-relaxed">

                    {/* Company Information */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-cyan-400 rounded-full flex-shrink-0" />
                            {t("companyInfo.title")}
                        </h2>
                        <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                            <div className="rounded-[calc(2rem-1px)] p-8 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                <p className="font-semibold text-white text-lg mb-2">{t("companyInfo.name")}</p>
                                <p className="mb-4 text-slate-400">{t("companyInfo.type")}</p>
                                <p className="font-semibold text-white mb-2 mt-6">{t("companyInfo.representedBy")}:</p>
                                <p>{t("companyInfo.representativeName")}</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Contact */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-violet-500 rounded-full flex-shrink-0" />
                            {t("contact.title")}
                        </h2>
                        <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                            <div className="rounded-[calc(2rem-1px)] p-8 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] space-y-3">
                                <div className="flex gap-4">
                                    <span className="text-slate-400 min-w-[80px]">{t("contact.emailLabel")}:</span>
                                    <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                        paulo@lopes2tech.ch
                                    </a>
                                </div>
                                <div className="flex gap-4">
                                    <span className="text-slate-400 min-w-[80px]">{t("contact.websiteLabel")}:</span>
                                    <a href="https://lopes2tech.ch" className="text-cyan-400 hover:underline transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                        www.lopes2tech.ch
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Disclaimer */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-cyan-400 rounded-full flex-shrink-0" />
                            {t("disclaimer.title")}
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t("disclaimer.liabilityContent.title")}</h3>
                                <p>{t("disclaimer.liabilityContent.text")}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t("disclaimer.liabilityLinks.title")}</h3>
                                <p>{t("disclaimer.liabilityLinks.text")}</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* Copyright */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-violet-500 rounded-full flex-shrink-0" />
                            {t("copyright.title")}
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: t.raw("copyright.text") }} />
                    </motion.section>

                </div>
            </div>
        </main>
    );
}
