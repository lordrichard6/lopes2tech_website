"use client";

import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackCTAClick } from "@/lib/analytics";

export default function CTA() {
    const t = useTranslations('CTASection');

    return (
        <section className="relative py-32 bg-[#0f172a] overflow-hidden flex items-center justify-center text-center">

            {/* ... (background elements) */}
            <div className="absolute inset-0 z-0">
                {/* Grid Overlay with Mask */}
                <div
                    className="absolute inset-0 z-10 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                    }}
                />

                {/* Glowing Orbs */}
                <motion.div
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute -top-[100px] left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-400 blur-[80px] opacity-20 md:mix-blend-screen will-change-transform motion-reduce:animate-none"
                />
                <motion.div
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: [0.32, 0.72, 0, 1], delay: 5 }}
                    className="absolute -bottom-[150px] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500 blur-[80px] opacity-20 md:mix-blend-screen will-change-transform motion-reduce:animate-none"
                />
            </div>

            <div className="relative z-20 max-w-[800px] px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tight leading-[1.1] font-[family-name:var(--font-display)]"
                >
                    {t('title')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-slate-400 mb-12 max-w-[600px] mx-auto leading-relaxed"
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link
                        href="/contact"
                        onClick={() => trackCTAClick('homepage_cta')}
                        className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-[#0f172a] bg-cyan-400 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_40px_rgba(34,211,238,0.55)] hover:-translate-y-1 hover:bg-cyan-300 active:scale-[0.98] group overflow-hidden relative"
                    >
                        <span className="relative z-10">{t('button')}</span>
                        {/* Button-in-Button trailing icon */}
                        <span className="w-9 h-9 rounded-full bg-[#0f172a]/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-110 relative z-10">
                            <ArrowRight className="w-4 h-4" />
                        </span>
                        {/* Shine */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] z-0 motion-reduce:hidden" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
