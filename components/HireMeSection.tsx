"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HireMeSection() {
    const t = useTranslations('HireMe');

    return (
        <section className="relative py-20 overflow-hidden z-10">
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-purple-500/20" />
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />

                    {/* Content */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
                        {/* Left: Photo & Info */}
                        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-6">
                            {/* Photo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10"
                            >
                                <Image
                                    src="/founder.jpg"
                                    alt="Paulo Lopes"
                                    fill
                                    className="object-cover"
                                />
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                            </motion.div>

                            {/* Text */}
                            <div className="text-center md:text-left lg:text-center xl:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full">
                                    <Briefcase className="w-3 h-3" />
                                    {t('badge')}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    {t.rich('title', {
                                        highlight: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">{chunks}</span>
                                    })}
                                </h2>
                                <p className="text-slate-400 leading-relaxed">
                                    {t('description')}
                                </p>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="flex flex-col justify-center">
                            {/* Message Display */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center lg:text-left mb-6"
                            >
                                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                                    <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                                        {t('pricing.custom.title')}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-lg mb-3">
                                    {t('pricing.custom.description')}
                                </p>
                                <p className="text-slate-500 text-sm">
                                    {t('agreement')}
                                </p>
                            </motion.div>

                            {/* CTA */}
                            <a
                                href="https://cal.com/lopes2tech/initial-consult"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {t('cta')}
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
