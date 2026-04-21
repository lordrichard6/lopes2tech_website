"use client";

import { Link } from "@/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -60px 0px" } as const;

export default function PrivacyPolicy() {
    const t             = useTranslations("PrivacyPolicyPage");
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
                    <p className="text-xl text-slate-400">
                        {t("lastUpdated")} {new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                {/* Content */}
                <div className="space-y-12 text-slate-300 leading-relaxed">

                    {/* 1. General */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.general.title")}</h2>
                        <p className="mb-4">{t("sections.general.text1")}</p>
                        <p>{t("sections.general.text2")}</p>
                    </motion.section>

                    {/* 2. Responsible Person */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.controller.title")}</h2>
                        <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                            <div className="rounded-[calc(2rem-1px)] p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                <p className="mb-2">{t("sections.controller.text")}</p>
                                <p className="font-semibold text-white">Lopes2Tech / Paulo Lopes</p>
                                <p>Email: <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">paulo@lopes2tech.ch</a></p>
                                <p>Website: <a href="https://www.lopes2tech.ch" className="text-cyan-400 hover:underline transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">www.lopes2tech.ch</a></p>
                            </div>
                        </div>
                    </motion.section>

                    {/* 3. Data Collection */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.collection.title")}</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t("sections.collection.serverLogs.title")}</h3>
                                <p className="mb-3">{t("sections.collection.serverLogs.text")}</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li>{t("sections.collection.serverLogs.list.browser")}</li>
                                    <li>{t("sections.collection.serverLogs.list.os")}</li>
                                    <li>{t("sections.collection.serverLogs.list.referrer")}</li>
                                    <li>{t("sections.collection.serverLogs.list.host")}</li>
                                    <li>{t("sections.collection.serverLogs.list.time")}</li>
                                    <li>{t("sections.collection.serverLogs.list.ip")}</li>
                                </ul>
                                <p className="text-sm italic text-slate-500">{t("sections.collection.serverLogs.note")}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t("sections.collection.contact.title")}</h3>
                                <p>{t("sections.collection.contact.text")}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t("sections.collection.booking.title")}</h3>
                                <p className="mb-3">{t("sections.collection.booking.text")}</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li><strong>{t("sections.collection.booking.list.provider")}</strong></li>
                                    <li><strong>{t("sections.collection.booking.list.purpose")}</strong></li>
                                </ul>
                                <p className="text-sm italic text-slate-500">{t("sections.collection.booking.note")}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-3">{t("sections.collection.chatbot.title")}</h3>
                                <p className="mb-3">{t("sections.collection.chatbot.text")}</p>
                                <ul className="list-disc pl-6 space-y-1 mb-3 text-slate-400">
                                    <li>{t("sections.collection.chatbot.list.process")}</li>
                                    <li className="text-orange-300/90">{t("sections.collection.chatbot.list.warning")}</li>
                                    <li>{t("sections.collection.chatbot.list.providers")}</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* 4. Cookies */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.cookies.title")}</h2>
                        <p className="mb-4">{t("sections.cookies.text")}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                <div className="rounded-[calc(2rem-1px)] p-4 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                    <h4 className="font-semibold text-white mb-1">{t("sections.cookies.essential.title")}</h4>
                                    <p className="text-sm text-slate-400">{t("sections.cookies.essential.text")}</p>
                                </div>
                            </div>
                            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                <div className="rounded-[calc(2rem-1px)] p-4 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                    <h4 className="font-semibold text-white mb-1">{t("sections.cookies.analytical.title")}</h4>
                                    <p className="text-sm text-slate-400">{t("sections.cookies.analytical.text")}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm italic text-slate-500">{t("sections.cookies.note")}</p>
                    </motion.section>

                    {/* 5. Analytics */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.analytics.title")}</h2>
                        <p>{t("sections.analytics.text")}</p>
                    </motion.section>

                    {/* 6. Security */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.security.title")}</h2>
                        <p>{t("sections.security.text")}</p>
                    </motion.section>

                    {/* 7. Data Transfer */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.transfer.title")}</h2>
                        <p>{t("sections.transfer.text")}</p>
                    </motion.section>

                    {/* 8. Your Rights */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.rights.title")}</h2>
                        <p className="mb-3">{t("sections.rights.text")}</p>
                        <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-300">
                            <li>{t("sections.rights.list.info")}</li>
                            <li>{t("sections.rights.list.correction")}</li>
                            <li>{t("sections.rights.list.deletion")}</li>
                            <li>{t("sections.rights.list.revocation")}</li>
                        </ul>
                        <p>
                            {t("sections.rights.contact")}{" "}
                            <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                paulo@lopes2tech.ch
                            </a>.
                        </p>
                    </motion.section>

                    {/* 9. Changes */}
                    <motion.section {...sectionAnim}>
                        <h2 className="text-2xl font-semibold text-white mb-6">{t("sections.changes.title")}</h2>
                        <p>{t("sections.changes.text")}</p>
                    </motion.section>

                </div>
            </div>
        </main>
    );
}
