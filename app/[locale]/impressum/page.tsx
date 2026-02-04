"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Impressum() {
    const t = useTranslations('ImpressumPage');

    return (
        <main className="min-h-screen bg-[#0f172a] text-white pt-24 pb-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10 container max-w-[800px] mx-auto px-6">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    {t('backToHome')}
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-400">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12 text-slate-300 leading-relaxed"
                >
                    {/* Company Information */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-cyan-400 rounded-full" />
                            {t('companyInfo.title')}
                        </h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <p className="font-semibold text-white text-lg mb-2">{t('companyInfo.name')}</p>
                            <p className="mb-4 text-slate-400">{t('companyInfo.type')}</p>

                            <p className="font-semibold text-white mb-2 mt-6">{t('companyInfo.representedBy')}:</p>
                            <p>{t('companyInfo.representativeName')}</p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-purple-500 rounded-full" />
                            {t('contact.title')}
                        </h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-3">
                            <div className="flex gap-4">
                                <span className="text-slate-400 min-w-[80px]">{t('contact.emailLabel')}:</span>
                                <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline">
                                    paulo@lopes2tech.ch
                                </a>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-slate-400 min-w-[80px]">{t('contact.websiteLabel')}:</span>
                                <a href="https://lopes2tech.ch" className="text-cyan-400 hover:underline">
                                    www.lopes2tech.ch
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-cyan-400 rounded-full" />
                            {t('disclaimer.title')}
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t('disclaimer.liabilityContent.title')}</h3>
                                <p>
                                    {t('disclaimer.liabilityContent.text')}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t('disclaimer.liabilityLinks.title')}</h3>
                                <p>
                                    {t('disclaimer.liabilityLinks.text')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Copyright */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-purple-500 rounded-full" />
                            {t('copyright.title')}
                        </h2>
                        <p dangerouslySetInnerHTML={{ __html: t.raw('copyright.text') }} />
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
