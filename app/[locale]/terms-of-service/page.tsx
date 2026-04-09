"use client";

import { Link } from "@/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -60px 0px" } as const;

export default function TermsOfService() {
    const t             = useTranslations("TermsOfServicePage");
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
                    <div className="flex flex-wrap gap-6 text-slate-400">
                        <p>{t("effectiveDate")}</p>
                        <p>{t("lastUpdated")} {new Date().toLocaleDateString()}</p>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-12 text-slate-300 leading-relaxed">

                    {/* 1. Scope */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.scope.title")}</h2>
                        <p dangerouslySetInnerHTML={{ __html: t.raw("sections.scope.text") }} />
                    </motion.section>

                    {/* 2. Subject */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.subject.title")}</h2>
                        <p className="mb-6">{t("sections.subject.text")}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                <div className="rounded-[calc(2rem-1px)] p-5 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                    <h3 className="font-semibold text-cyan-400 mb-2">{t("sections.subject.services.web.title")}</h3>
                                    <p className="text-sm text-slate-400">{t("sections.subject.services.web.description")}</p>
                                </div>
                            </div>
                            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                <div className="rounded-[calc(2rem-1px)] p-5 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                    <h3 className="font-semibold text-violet-400 mb-2">{t("sections.subject.services.ai.title")}</h3>
                                    <p className="text-sm text-slate-400">{t("sections.subject.services.ai.description")}</p>
                                </div>
                            </div>
                            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                <div className="rounded-[calc(2rem-1px)] p-5 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                    <h3 className="font-semibold text-emerald-400 mb-2">{t("sections.subject.services.maintenance.title")}</h3>
                                    <p className="text-sm text-slate-400">{t("sections.subject.services.maintenance.description")}</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 3. Conclusion */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.conclusion.title")}</h2>
                        <p className="mb-4">{t("sections.conclusion.text")}</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li>{t("sections.conclusion.list.acceptance")}</li>
                            <li>{t("sections.conclusion.list.deposit")}</li>
                            <li>{t("sections.conclusion.list.commencement")}</li>
                        </ul>
                    </motion.section>

                    {/* 4. Client Obligations */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.obligations.title")}</h2>
                        <p className="mb-4">{t("sections.obligations.text")}</p>
                        <ul className="list-disc pl-6 space-y-2 text-slate-300">
                            <li>{t("sections.obligations.list.content")}</li>
                            <li>{t("sections.obligations.list.access")}</li>
                            <li dangerouslySetInnerHTML={{ __html: t.raw("sections.obligations.list.review") }} />
                        </ul>
                    </motion.section>

                    {/* 5. Pricing */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.pricing.title")}</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t("sections.pricing.projectServices.title")}</h3>
                                <p className="mb-4 text-slate-400">{t("sections.pricing.projectServices.text")}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                        <div className="rounded-[calc(2rem-1px)] p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                            <h4 className="font-bold text-white mb-2">{t("sections.pricing.projectServices.small.title")}</h4>
                                            <span className="text-xs uppercase tracking-wider text-slate-500 block mb-3">{t("sections.pricing.projectServices.small.subtitle")}</span>
                                            <p className="text-sm">{t("sections.pricing.projectServices.small.text")}</p>
                                        </div>
                                    </div>
                                    <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                        <div className="rounded-[calc(2rem-1px)] p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                            <h4 className="font-bold text-white mb-2">{t("sections.pricing.projectServices.standard.title")}</h4>
                                            <span className="text-xs uppercase tracking-wider text-slate-500 block mb-3">{t("sections.pricing.projectServices.standard.subtitle")}</span>
                                            <ul className="text-sm space-y-2">
                                                <li><strong>{t.raw("sections.pricing.projectServices.standard.deposit").split(":")[0]}:</strong> {t.raw("sections.pricing.projectServices.standard.deposit").split(":")[1]}</li>
                                                <li><strong>{t.raw("sections.pricing.projectServices.standard.final").split(":")[0]}:</strong> {t.raw("sections.pricing.projectServices.standard.final").split(":")[1]}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-slate-400">{t("sections.pricing.projectServices.terms")}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t("sections.pricing.recurring.title")}</h3>
                                <p>{t("sections.pricing.recurring.text")}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">{t("sections.pricing.cancellation.title")}</h3>
                                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                                    <li>{t("sections.pricing.cancellation.list.beforeWork")}</li>
                                    <li>{t("sections.pricing.cancellation.list.afterWork")}</li>
                                    <li>{t("sections.pricing.cancellation.list.contractorTermination")}</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* 6. Intellectual Property */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.ip.title")}</h2>
                        <ul className="list-disc pl-6 space-y-3 text-slate-300">
                            <li>{t("sections.ip.list.rights")}</li>
                            <li>{t("sections.ip.list.reuse")}</li>
                            <li>{t("sections.ip.list.guarantee")}</li>
                        </ul>
                    </motion.section>

                    {/* 7. AI Provisions */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.ai.title")}</h2>
                        <p className="mb-4">{t("sections.ai.text")}</p>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">{t("sections.ai.accuracy.label")}</span>
                                <p className="text-slate-400">{t("sections.ai.accuracy.text")}</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">{t("sections.ai.availability.label")}</span>
                                <p className="text-slate-400">{t("sections.ai.availability.text")}</p>
                            </div>
                            <div className="flex gap-4 items-start">
                                <span className="font-bold text-white min-w-[100px]">{t("sections.ai.costs.label")}</span>
                                <p className="text-slate-400">{t("sections.ai.costs.text")}</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* 8. Warranty */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.warranty.title")}</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">{t("sections.warranty.warranty.title")}</h3>
                                <p className="mb-2">{t("sections.warranty.warranty.text")}</p>
                                <p className="text-slate-400 text-sm mb-2">{t("sections.warranty.warranty.note")}</p>
                                <p className="text-cyan-400 text-sm font-medium">{t("sections.warranty.warranty.postWarranty")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">{t("sections.warranty.liability.title")}</h3>
                                <p className="mb-2">{t("sections.warranty.liability.text")}</p>
                                <p className="text-slate-400 text-sm">{t("sections.warranty.liability.note")}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">{t("sections.warranty.forceMajeure.title")}</h3>
                                <p className="text-slate-300">{t("sections.warranty.forceMajeure.text")}</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* 9. Data Protection */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.dataProtection.title")}</h2>
                        <p className="mb-4">{t("sections.dataProtection.text")}</p>
                        <p className="text-cyan-400 text-sm font-medium">{t("sections.dataProtection.retention")}</p>
                    </motion.section>

                    {/* 10. Final Provisions */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.final.title")}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-white mb-1">{t("sections.final.severability.title")}</h4>
                                <p className="text-sm text-slate-400">{t("sections.final.severability.text")}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-1">{t("sections.final.jurisdiction.title")}</h4>
                                <p className="text-sm text-slate-400">{t("sections.final.jurisdiction.text")}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-1">{t("sections.final.law.title")}</h4>
                                <p className="text-sm text-slate-400">{t("sections.final.law.text")}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-1">{t("sections.final.contact.title")}</h4>
                                <p className="text-sm text-slate-400">{t("sections.final.contact.text")}</p>
                            </div>
                        </div>
                    </motion.section>

                </div>
            </div>
        </main>
    );
}
