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

            {/* Desktop curve layout */}
            <div className="hidden md:block relative w-full h-[420px]">
                <div className="absolute top-0 left-0 w-full h-full">
                    <svg className="w-full h-full overflow-visible" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1440 400">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%"   stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>
                        {/* Guide path */}
                        <path
                            d="M-100,200 C100,200 150,300 252,300 C400,300 450,100 600,100 C800,100 850,100 1000,100 C1150,100 1200,300 1350,300 C1450,300 1500,200 1600,200"
                            fill="none"
                            stroke="rgba(255,255,255,0.07)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                        />
                        {/* Animated gradient line */}
                        <motion.path
                            d="M-100,200 C100,200 150,300 252,300 C400,300 450,100 600,100 C800,100 850,100 1000,100 C1150,100 1200,300 1350,300 C1450,300 1500,200 1600,200"
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2.5, ease: [0.32, 0.72, 0, 1] }}
                        />
                        {/* Moving particle */}
                        <circle r="5" fill="#fff" className="filter drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">
                            <animateMotion
                                dur="6s"
                                repeatCount="indefinite"
                                path="M-100,200 C100,200 150,300 252,300 C400,300 450,100 600,100 C800,100 850,100 1000,100 C1150,100 1200,300 1350,300 C1450,300 1500,200 1600,200"
                            />
                        </circle>
                    </svg>
                </div>

                {/* Steps grid */}
                <div className="w-full h-full relative z-10 max-w-[1600px] mx-auto grid grid-cols-4">
                    <div className="flex flex-col items-center pt-[260px]"><StepItem step={steps[0]} t={t} /></div>
                    <div className="flex flex-col items-center pt-[60px]"> <StepItem step={steps[1]} t={t} /></div>
                    <div className="flex flex-col items-center pt-[60px]"> <StepItem step={steps[2]} t={t} /></div>
                    <div className="flex flex-col items-center pt-[260px]"><StepItem step={steps[3]} t={t} /></div>
                </div>
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

function StepItem({ step, t }: { step: Step; t: ReturnType<typeof useTranslations<"Process">> }) {
    return (
        <>
            {/* Icon on the line */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group/icon w-16 h-16 rounded-full bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-center relative z-20 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] mb-6"
            >
                <step.icon className="w-7 h-7 text-cyan-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#080d1a] border border-white/15 text-white text-[10px] font-bold flex items-center justify-center">
                    {step.id}
                </div>
            </motion.div>

            {/* Double-Bezel content card */}
            <motion.div
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-[240px]"
            >
                {/* Outer shell */}
                <div className="p-[1px] rounded-2xl bg-white/5 ring-1 ring-white/10">
                    {/* Inner core */}
                    <div className="rounded-[calc(1rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] p-4">
                        <h3 className="text-white font-bold text-base mb-1.5">{t(`steps.${step.id}.title`)}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">{t(`steps.${step.id}.description`)}</p>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
