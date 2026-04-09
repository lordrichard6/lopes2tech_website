"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHubSections from "@/components/ServicesHubSections";
import HireMeSection from "@/components/HireMeSection";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;

export default function ServicesPage() {
    const t             = useTranslations("ServicesPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    return (
        <main className="min-h-screen bg-[#080d1a] relative">
            <Navbar />

            {/* Continuous background grid */}
            <div
                aria-hidden="true"
                className="fixed inset-0 pointer-events-none z-0"
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

            {/* ── Hero ──────────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 overflow-hidden z-10">
                {/* Ambient orbs */}
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[80px]" />
                    <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[80px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-10 md:mb-20">
                        {/* Site-standard badge — no icon, no blur */}
                        <motion.div {...fadeIn(0)}>
                            <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                                {t("hero.badge")}
                            </div>
                        </motion.div>

                        <motion.h1
                            {...fadeIn(0.1)}
                            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold mb-6 text-white"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            {t("hero.titlePart1")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                                {t("hero.titlePart2")}
                            </span>
                        </motion.h1>

                        <motion.p {...fadeIn(0.2)} className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {t("hero.description")}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Services Hub Sections */}
            <ServicesHubSections />

            {/* Hire Me Section */}
            <HireMeSection />

            {/* ── Bottom CTA ────────────────────────────────────────────── */}
            <section className="relative py-20 overflow-hidden z-10">
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="p-12 rounded-[2rem] ring-1 ring-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10"
                    >
                        <h2
                            className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-extrabold text-white mb-6"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            {t("cta.title")}
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            {t("cta.subtitle")}
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={SPRING}
                            className="inline-block"
                        >
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-lg"
                            >
                                {t("cta.button")}
                                <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
