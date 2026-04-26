"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { WHATSAPP_URL } from "@/lib/constants";

const EASE   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;

export default function HireMeSection() {
    const t             = useTranslations("HireMe");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    return (
        <section className="relative py-20 overflow-hidden z-10">
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={VP}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="relative rounded-[2rem] overflow-hidden ring-1 ring-white/10"
                >
                    {/* Background gradient layer */}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-violet-500/20" />
                    {/* Solid overlay — no backdrop-blur */}
                    <div aria-hidden="true" className="absolute inset-0 bg-[#080d1a]/90" />

                    {/* Content */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">

                        {/* Left: Photo & Info */}
                        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-6">
                            {/* Photo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={VP}
                                transition={{ duration: 0.6, ease: EASE }}
                                className="relative w-40 h-40 md:w-48 md:h-48 rounded-[1.5rem] overflow-hidden flex-shrink-0 ring-1 ring-white/10"
                            >
                                <Image
                                    src="/founder.jpg"
                                    alt="Paulo Lopes"
                                    fill
                                    className="object-cover"
                                />
                                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                            </motion.div>

                            {/* Text */}
                            <div className="text-center md:text-left lg:text-center xl:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full">
                                    <Briefcase className="w-3 h-3" />
                                    {t("badge")}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    {t.rich("title", {
                                        highlight: (chunks) => (
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                                                {chunks}
                                            </span>
                                        ),
                                    })}
                                </h2>
                                <p className="text-slate-400 leading-relaxed">{t("description")}</p>
                            </div>
                        </div>

                        {/* Right: Pricing & CTA */}
                        <div className="flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, ...(shouldAnimate ? { y: 10 } : {}) }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={VP}
                                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                                className="text-center lg:text-left mb-6"
                            >
                                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                                    <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                                        {t("pricing.custom.title")}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-lg mb-3">{t("pricing.custom.description")}</p>
                                <p className="text-slate-500 text-sm">{t("agreement")}</p>
                            </motion.div>

                            {/* CTA — rounded-full pill + spring physics */}
                            <motion.a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                transition={SPRING}
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                            >
                                {t("cta")}
                                <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
