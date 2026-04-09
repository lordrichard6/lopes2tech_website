"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonialIds = ["marco", "silvio", "ana"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

function StarRow() {
    return (
        <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            ))}
        </div>
    );
}

function Avatar({ name }: { name: string }) {
    return (
        <div
            className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400/80 to-violet-500/80 flex items-center justify-center text-white text-xs font-bold shrink-0 ring-1 ring-white/10"
            aria-hidden="true"
        >
            {name.charAt(0)}
        </div>
    );
}

export default function Testimonials() {
    const t = useTranslations('Testimonials');

    return (
        <section className="relative py-32 overflow-hidden bg-[#080d1a]">
            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-5%]  w-[400px] h-[400px] rounded-full bg-violet-500/[0.06] blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.06]   blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                        <Star className="inline w-3 h-3 mr-1.5" aria-hidden="true" />
                        {t('badge')}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-[family-name:var(--font-display)]">
                        {t('title')}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                            {t('titleHighlight')}
                        </span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Asymmetric bento: [featured col-span-2] + [two stacked col-span-1] */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Featured card — col-span-2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="md:col-span-2"
                    >
                        {/* Outer shell */}
                        <div className="h-full p-[1px] rounded-[2rem] bg-white/5 ring-1 ring-white/10 hover:ring-cyan-400/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            {/* Inner core */}
                            <div className="h-full rounded-[calc(2rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] p-8 md:p-10 flex flex-col justify-between gap-8">
                                <div>
                                    <StarRow />
                                    <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-medium">
                                        &ldquo;{t(`items.${testimonialIds[0]}.text`)}&rdquo;
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                                    <Avatar name={t(`items.${testimonialIds[0]}.name`)} />
                                    <div>
                                        <p className="text-white font-semibold text-sm">{t(`items.${testimonialIds[0]}.name`)}</p>
                                        <p className="text-slate-500 text-xs">{t(`items.${testimonialIds[0]}.role`)} · {t(`items.${testimonialIds[0]}.company`)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Two stacked cards — col-span-1 */}
                    <div className="flex flex-col gap-5">
                        {([testimonialIds[1], testimonialIds[2]] as const).map((id, i) => (
                            <motion.div
                                key={id}
                                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: EASE }}
                                className="flex-1"
                            >
                                {/* Outer shell */}
                                <div className="h-full p-[1px] rounded-[1.5rem] bg-white/5 ring-1 ring-white/10 hover:ring-cyan-400/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                    {/* Inner core */}
                                    <div className="h-full rounded-[calc(1.5rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] p-6 flex flex-col justify-between gap-5">
                                        <div>
                                            <StarRow />
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                &ldquo;{t(`items.${id}.text`)}&rdquo;
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                                            <Avatar name={t(`items.${id}.name`)} />
                                            <div>
                                                <p className="text-white font-semibold text-xs">{t(`items.${id}.name`)}</p>
                                                <p className="text-slate-500 text-[11px]">{t(`items.${id}.role`)} · {t(`items.${id}.company`)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
