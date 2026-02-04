"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveServices from "@/components/InteractiveServices";
import MobileServices from "@/components/MobileServices";
import PackagesSection from "@/components/PackagesSection";
import CustomPackageBuilder from "@/components/CustomPackageBuilder";
import HireMeSection from "@/components/HireMeSection";
import {
    Sparkles,
    ArrowRight
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
    const t = useTranslations('ServicesPage');
    return (
        <main className="min-h-screen bg-[#0f172a] relative">
            <Navbar />

            {/* Continuous Background Pattern */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            >
                {/* Global Vignette */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 0%, #0f172a 90%)'
                    }}
                />
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden z-10">
                {/* Floating Circles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
                    <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10 md:mb-20"
                    >
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <Sparkles className="inline w-4 h-4 mr-2" />
                            {t('hero.badge')}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                            {t('hero.titlePart1')}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                {t('hero.titlePart2')}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            {t('hero.description')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Display */}
            <section className="relative py-10 md:py-20 overflow-hidden z-10">
                <div className="relative z-10 max-w-7xl mx-auto px-0 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 text-center px-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                            {t('explore.title')}
                        </h2>
                        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                            {t('explore.intro')}
                        </p>
                    </motion.div>

                    {/* Desktop View: Interactive Canvas */}
                    <div className="hidden md:block">
                        <InteractiveServices />
                    </div>

                    {/* Mobile View: Card List */}
                    <div className="block md:hidden">
                        <MobileServices />
                    </div>
                </div>
            </section>

            {/* Packages Section */}
            <PackagesSection />

            {/* Custom Package Builder */}
            <CustomPackageBuilder />

            {/* Hire Me Section */}
            <HireMeSection />

            {/* CTA Section */}
            <section className="relative py-20 overflow-hidden z-10">
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                            {t('cta.title')}
                        </h2>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            {t('cta.subtitle')}
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-1 transition-all duration-300"
                        >
                            {t('cta.button')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

