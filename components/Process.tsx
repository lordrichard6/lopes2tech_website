"use client";

import { motion } from "framer-motion";
import { Phone, FileText, Settings, HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";

const steps = [
    { id: 1, title: "Discovery Call",       description: "We dive deep into your goals to ensure we're the perfect partner.", icon: Phone,          },
    { id: 2, title: "Strategic Proposal",   description: "You receive a comprehensive roadmap and fixed-price quote.",        icon: FileText,        },
    { id: 3, title: "Build & Automate",     description: "We build your custom solution with real-time progress tracking.",   icon: Settings,        },
    { id: 4, title: "Launch & Support",     description: "We deploy your system and provide ongoing maintenance.",            icon: HeartHandshake,  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Process() {
    const t = useTranslations('Process');

    return (
        <section className="relative py-32 bg-[#080d1a] overflow-hidden w-full">

            {/* Dot grid pattern — dark version */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                }}
            />

            {/* Ambient glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[5%]  w-[400px] h-[400px] rounded-full bg-cyan-500/5   blur-[100px]" />
                <div className="absolute bottom-[20%] left-[5%] w-[350px] h-[350px] rounded-full bg-violet-500/5 blur-[100px]" />
            </div>

            {/* Header */}
            <div className="text-center max-w-4xl mx-auto mb-20 px-6 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="inline-block px-3 py-1 mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full"
                >
                    {t('badge')}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
                    className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight font-[family-name:var(--font-display)]"
                >
                    {t('titlePart1')}
                    <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {t('titlePart2')}
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
                    className="text-lg text-slate-400"
                >
                    {t('description')}
                </motion.p>
            </div>

            {/* Desktop horizontal timeline */}
            <div className="hidden md:grid grid-cols-4 gap-6 max-w-[1200px] mx-auto px-6 relative z-10">
                {/* Connector line */}
                <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-[1px] pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-violet-500"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    />
                </div>

                {steps.map((step, i) => (
                    <StepItem key={step.id} step={step} t={t} index={i} />
                ))}
            </div>

            {/* Mobile timeline */}
            <div className="md:hidden relative border-l border-white/10 ml-6 space-y-8 pb-8 px-6">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                        className="relative pl-8"
                    >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#080d1a] border-2 border-cyan-500" />
                        {/* Double-Bezel card */}
                        <div className="p-[1px] rounded-2xl bg-white/5 ring-1 ring-white/10">
                            <div className="rounded-[calc(1rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <step.icon className="w-5 h-5 text-cyan-400" />
                                    <h3 className="text-white font-bold">{t(`steps.${step.id}.title`)}</h3>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">{t(`steps.${step.id}.description`)}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

type Step = typeof steps[0];

function StepItem({ step, t, index }: { step: Step; t: ReturnType<typeof useTranslations<"Process">>; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center"
        >
            {/* Icon circle on the line */}
            <div className="relative z-20 mb-6">
                <div className="w-[52px] h-[52px] rounded-full bg-[#080d1a] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-center group hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <step.icon className="w-5 h-5 text-cyan-400" />
                </div>
            </div>

            {/* Double-Bezel card with large ghost number */}
            <div className="p-[1px] rounded-2xl bg-white/5 ring-1 ring-white/10 w-full hover:ring-cyan-500/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                <div className="rounded-[calc(1rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] p-5 relative overflow-hidden">
                    {/* Ghost number */}
                    <span className="absolute -bottom-3 -right-1 text-[5rem] font-extrabold text-white/[0.04] leading-none select-none font-[family-name:var(--font-display)] pointer-events-none">
                        {String(step.id).padStart(2, '0')}
                    </span>
                    <h3 className="text-white font-bold text-sm mb-1.5 relative z-10">{t(`steps.${step.id}.title`)}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed relative z-10">{t(`steps.${step.id}.description`)}</p>
                </div>
            </div>
        </motion.div>
    );
}
