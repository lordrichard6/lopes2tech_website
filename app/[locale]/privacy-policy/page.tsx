"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PrivacyPolicy() {
    const t = useTranslations('PrivacyPolicyPage');

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
                        {t('lastUpdated')} {new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12 text-slate-300 leading-relaxed"
                >
                    {/* 1. General Information */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.general.title')}</h2>
                        <p className="mb-4">
                            {t('sections.general.text1')}
                        </p>
                        <p>
                            {t('sections.general.text2')}
                        </p>
                    </section>

                    {/* 2. Responsible Person */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.controller.title')}</h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                            <p className="mb-2">{t('sections.controller.text')}</p>
                            <p className="font-semibold text-white">Lopes2Tech / Paulo Lopes</p>
                            <p>Email: <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline">paulo@lopes2tech.ch</a></p>
                            <p>Website: <a href="https://lopes2tech.ch" className="text-cyan-400 hover:underline">www.lopes2tech.ch</a></p>
                        </div>
                    </section>

                    {/* 3. Data Collection */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.collection.title')}</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t('sections.collection.serverLogs.title')}</h3>
                                <p className="mb-3">{t('sections.collection.serverLogs.text')}</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li>{t('sections.collection.serverLogs.list.browser')}</li>
                                    <li>{t('sections.collection.serverLogs.list.os')}</li>
                                    <li>{t('sections.collection.serverLogs.list.referrer')}</li>
                                    <li>{t('sections.collection.serverLogs.list.host')}</li>
                                    <li>{t('sections.collection.serverLogs.list.time')}</li>
                                    <li>{t('sections.collection.serverLogs.list.ip')}</li>
                                </ul>
                                <p className="text-sm italic text-slate-500">
                                    {t('sections.collection.serverLogs.note')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t('sections.collection.contact.title')}</h3>
                                <p>
                                    {t('sections.collection.contact.text')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t('sections.collection.booking.title')}</h3>
                                <p className="mb-3">
                                    {t('sections.collection.booking.text')}
                                </p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li><strong>{t('sections.collection.booking.list.provider')}</strong></li>
                                    <li><strong>{t('sections.collection.booking.list.purpose')}</strong></li>
                                </ul>
                                <p className="text-sm italic text-slate-500">
                                    {t('sections.collection.booking.note')}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t('sections.collection.chatbot.title')}</h3>
                                <p className="mb-3">{t('sections.collection.chatbot.text')}</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li>{t('sections.collection.chatbot.list.process')}</li>
                                    <li className="text-orange-300/90">{t('sections.collection.chatbot.list.warning')}</li>
                                    <li>{t('sections.collection.chatbot.list.providers')}</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 4. Cookies */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.cookies.title')}</h2>
                        <p className="mb-4">
                            {t('sections.cookies.text')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <h4 className="font-semibold text-white mb-1">{t('sections.cookies.essential.title')}</h4>
                                <p className="text-sm text-slate-400">{t('sections.cookies.essential.text')}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <h4 className="font-semibold text-white mb-1">{t('sections.cookies.analytical.title')}</h4>
                                <p className="text-sm text-slate-400">{t('sections.cookies.analytical.text')}</p>
                            </div>
                        </div>
                        <p className="text-sm italic text-slate-500">
                            {t('sections.cookies.note')}
                        </p>
                    </section>

                    {/* 5. Analytics */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.analytics.title')}</h2>
                        <p>
                            {t('sections.analytics.text')}
                        </p>
                    </section>

                    {/* 6. Security */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.security.title')}</h2>
                        <p>
                            {t('sections.security.text')}
                        </p>
                    </section>

                    {/* 7. Data Transfer */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.transfer.title')}</h2>
                        <p>
                            {t('sections.transfer.text')}
                        </p>
                    </section>

                    {/* 8. Your Rights */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.rights.title')}</h2>
                        <p className="mb-3">{t('sections.rights.text')}</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-300">
                            <li>{t('sections.rights.list.info')}</li>
                            <li>{t('sections.rights.list.correction')}</li>
                            <li>{t('sections.rights.list.deletion')}</li>
                            <li>{t('sections.rights.list.revocation')}</li>
                        </ul>
                        <p>
                            {t('sections.rights.contact')} <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline">paulo@lopes2tech.ch</a>.
                        </p>
                    </section>

                    {/* 9. Changes */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.changes.title')}</h2>
                        <p>
                            {t('sections.changes.text')}
                        </p>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
