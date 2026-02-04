"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function TermsOfService() {
    const t = useTranslations('TermsOfServicePage');

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
                    <div className="flex gap-6 text-slate-400">
                        <p>{t('effectiveDate')}</p>
                        <p>{t('lastUpdated')} {new Date().toLocaleDateString()}</p>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12 text-slate-300 leading-relaxed"
                >
                    {/* 1. Scope */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.scope.title')}</h2>
                        <p dangerouslySetInnerHTML={{ __html: t.raw('sections.scope.text') }} />
                    </section>

                    {/* 2. Subject */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.subject.title')}</h2>
                        <p className="mb-6">
                            {t('sections.subject.text')}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="font-semibold text-cyan-400 mb-2">{t('sections.subject.services.web.title')}</h3>
                                <p className="text-sm text-slate-400">{t('sections.subject.services.web.description')}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="font-semibold text-purple-400 mb-2">{t('sections.subject.services.ai.title')}</h3>
                                <p className="text-sm text-slate-400">{t('sections.subject.services.ai.description')}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-5 rounded-xl">
                                <h3 className="font-semibold text-green-400 mb-2">{t('sections.subject.services.maintenance.title')}</h3>
                                <p className="text-sm text-slate-400">{t('sections.subject.services.maintenance.description')}</p>
                            </div>
                        </div>
                    </section>

                    {/* 3. Conclusion */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.conclusion.title')}</h2>
                        <p className="mb-4">
                            {t('sections.conclusion.text')}
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li>{t('sections.conclusion.list.acceptance')}</li>
                            <li>{t('sections.conclusion.list.deposit')}</li>
                            <li>{t('sections.conclusion.list.commencement')}</li>
                        </ul>
                    </section>

                    {/* 4. Client Obligations */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.obligations.title')}</h2>
                        <p className="mb-4">{t('sections.obligations.text')}</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li>{t('sections.obligations.list.content')}</li>
                            <li>{t('sections.obligations.list.access')}</li>
                            <li dangerouslySetInnerHTML={{ __html: t.raw('sections.obligations.list.review') }} />
                        </ul>
                    </section>

                    {/* 5. Pricing */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.pricing.title')}</h2>

                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t('sections.pricing.projectServices.title')}</h3>
                                <p className="mb-4 text-slate-400">{t('sections.pricing.projectServices.text')}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="font-bold text-white mb-2">{t('sections.pricing.projectServices.small.title')}</h4>
                                        <span className="text-xs uppercase tracking-wider text-slate-500 block mb-3">{t('sections.pricing.projectServices.small.subtitle')}</span>
                                        <p className="text-sm">{t('sections.pricing.projectServices.small.text')}</p>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                        <h4 className="font-bold text-white mb-2">{t('sections.pricing.projectServices.standard.title')}</h4>
                                        <span className="text-xs uppercase tracking-wider text-slate-500 block mb-3">{t('sections.pricing.projectServices.standard.subtitle')}</span>
                                        <ul className="text-sm space-y-2">
                                            <li><strong>{t.raw('sections.pricing.projectServices.standard.deposit').split(':')[0]}:</strong> {t.raw('sections.pricing.projectServices.standard.deposit').split(':')[1]}</li>
                                            <li><strong>{t.raw('sections.pricing.projectServices.standard.final').split(':')[0]}:</strong> {t.raw('sections.pricing.projectServices.standard.final').split(':')[1]}</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-slate-400">{t('sections.pricing.projectServices.terms')}</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t('sections.pricing.recurring.title')}</h3>
                                <p>
                                    {t('sections.pricing.recurring.text')}
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 6. Intellectual Property */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.ip.title')}</h2>
                        <ul className="list-disc pl-6 space-y-3 text-slate-300">
                            <li>{t('sections.ip.list.rights')}</li>
                            <li>{t('sections.ip.list.reuse')}</li>
                            <li>{t('sections.ip.list.guarantee')}</li>
                        </ul>
                    </section>

                    {/* 7. AI Provisions */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.ai.title')}</h2>
                        <p className="mb-4">
                            {t('sections.ai.text')}
                        </p>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">{t('sections.ai.accuracy.label')}</span>
                                <p className="text-slate-400">{t('sections.ai.accuracy.text')}</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">{t('sections.ai.availability.label')}</span>
                                <p className="text-slate-400">{t('sections.ai.availability.text')}</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">{t('sections.ai.costs.label')}</span>
                                <p className="text-slate-400">{t('sections.ai.costs.text')}</p>
                            </div>
                        </div>
                    </section>

                    {/* 8. Warranty */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.warranty.title')}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">{t('sections.warranty.warranty.title')}</h3>
                                <p className="mb-2">{t('sections.warranty.warranty.text')}</p>
                                <p className="text-slate-400 text-sm">{t('sections.warranty.warranty.note')}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">{t('sections.warranty.liability.title')}</h3>
                                <p className="mb-2">{t('sections.warranty.liability.text')}</p>
                                <p className="text-slate-400 text-sm">{t('sections.warranty.liability.note')}</p>
                            </div>
                        </div>
                    </section>

                    {/* 9. Data Protection */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.dataProtection.title')}</h2>
                        <p>
                            {t('sections.dataProtection.text')}
                        </p>
                    </section>

                    {/* 10. Final Provisions */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t('sections.final.title')}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="font-medium text-white mb-1">{t('sections.final.severability.title')}</h4>
                                <p className="text-sm text-slate-400">{t('sections.final.severability.text')}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-1">{t('sections.final.jurisdiction.title')}</h4>
                                <p className="text-sm text-slate-400">{t('sections.final.jurisdiction.text')}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-1">{t('sections.final.law.title')}</h4>
                                <p className="text-sm text-slate-400">{t('sections.final.law.text')}</p>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
