"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import { Phone, FileText, Settings, HeartHandshake, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const steps = [
    { id: 1, icon: Phone          },
    { id: 2, icon: FileText       },
    { id: 3, icon: Settings       },
    { id: 4, icon: HeartHandshake },
];

const EASE = [0.16, 1, 0.3, 1] as const;

// Scroll thresholds at which each card activates (0–1 progress through section).
// Card 4 at 0.85 = "near the end" as user requested.
// Tuned to match the comet head position at each column icon.
const ACTIVATION_THRESHOLDS = [0.06, 0.32, 0.59, 0.85];

export default function Process() {
    const t = useTranslations("Process");

    const sectionRef = useRef<HTMLElement>(null);

    // Track scroll progress from when the section enters the viewport
    // to when it exits — gives the widest activation range
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // activeCount: how many cards are currently lit (only ever increases)
    const [activeCount, setActiveCount] = useState(0);

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        let next = 0;
        for (let i = 0; i < ACTIVATION_THRESHOLDS.length; i++) {
            if (v >= ACTIVATION_THRESHOLDS[i]) next = i + 1;
        }
        // Bidirectional — no Math.max, so cards deactivate on scroll-up
        setActiveCount(next);
    });

    // Comet slowed down so it reaches col 4 icon (~864px into the line) at scroll ≈ 0.85,
    // then eases past the right edge as the section exits.
    const cometX = useTransform(
        scrollYProgress,
        [0.03, 0.87, 0.96],
        [-300, 570, 950],
    );

    return (
        <section ref={sectionRef} className="relative py-32 bg-[#080d1a] overflow-hidden w-full">

            {/* Dot grid pattern */}
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

            {/* ── Header ── */}
            <div className="text-center max-w-4xl mx-auto mb-16 px-6 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="inline-block px-3 py-1 mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 bg-white/5 border border-white/10 rounded-full"
                >
                    {t("badge")}
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
                    className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight font-[family-name:var(--font-display)]"
                >
                    {t("titlePart1")}
                    <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                        {t("titlePart2")}
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
                    className="text-lg text-slate-400"
                >
                    {t("description")}
                </motion.p>
            </div>

            {/* ── Desktop grid ── */}
            <div className="hidden md:block max-w-[1200px] mx-auto px-6 relative z-10">
                <div className="relative">

                    {/* Layer 1: static base rail */}
                    <div
                        className="absolute pointer-events-none z-0"
                        style={{ top: "51px", left: "12.5%", right: "12.5%", height: "1px" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />
                    </div>

                    {/* Layer 2: scroll-driven comet — 44px tall for vertical bloom room */}
                    <div
                        className="absolute pointer-events-none z-0 overflow-hidden"
                        style={{ top: "29px", left: "12.5%", right: "12.5%", height: "44px" }}
                    >
                        <motion.div
                            className="absolute"
                            style={{ top: 0, height: "100%", width: "300px", x: cometX }}
                        >
                            {/* Soft radial aura — blooms above and below the rail */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "radial-gradient(ellipse 50% 100% at 90% 50%, rgba(6,182,212,0.65), rgba(139,92,246,0.25) 50%, transparent 72%)",
                                    filter: "blur(7px)",
                                }}
                            />
                            {/* Core trail — 2px bright line at container vertical center */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: "21px",
                                    height: "2px",
                                    left: 0,
                                    right: 0,
                                    background:
                                        "linear-gradient(to right, transparent 0%, rgba(6,182,212,0.3) 12%, rgba(6,182,212,0.85) 52%, rgba(255,255,255,1) 82%, rgba(255,255,255,0.3) 100%)",
                                }}
                            />
                            {/* Head — glowing dot at the tip */}
                            <div
                                style={{
                                    position: "absolute",
                                    right: "4px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,1)",
                                    boxShadow:
                                        "0 0 8px 4px rgba(6,182,212,1), 0 0 22px 10px rgba(6,182,212,0.7), 0 0 45px 18px rgba(139,92,246,0.35)",
                                }}
                            />
                        </motion.div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-4 gap-6 relative z-10">
                        {steps.map((step, i) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                t={t}
                                index={i}
                                isActive={i < activeCount}
                                anyActive={activeCount > 0}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Mobile timeline ── */}
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
                        <div className="p-[1px] rounded-2xl bg-white/5 ring-1 ring-white/10">
                            <div className="rounded-[calc(1rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="relative w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                        <div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md" />
                                        <step.icon className="w-5 h-5 text-cyan-400 relative z-10" />
                                    </div>
                                    <h3 className="text-white font-bold text-sm">{t(`steps.${step.id}.title`)}</h3>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">{t(`steps.${step.id}.description`)}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── CTA ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
                className="text-center mt-16 relative z-10 px-6"
            >
                <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium underline-offset-4 hover:underline transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                    {t("cta")}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
                </Link>
            </motion.div>

        </section>
    );
}

type Step = typeof steps[0];

function StepCard({
    step,
    t,
    index,
    isActive,
    anyActive,
}: {
    step: Step;
    t: ReturnType<typeof useTranslations<"Process">>;
    index: number;
    isActive: boolean;
    anyActive: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-40px" });

    // 3-state variant system — single source of truth
    // hidden → card not yet in view
    // visible → in view, not yet scroll-activated (or no card activated yet)
    // dimmed  → in view, other cards are active but not this one
    // active  → scroll-activated: elevated + glowing
    const variant =
        !isInView         ? "hidden"
        : isActive        ? "active"
        : anyActive       ? "dimmed"
        :                   "visible";

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden:  {
                    opacity: 0,
                    y: 24,
                    filter: "blur(6px)",
                    boxShadow: "0 4px 20px -4px rgba(0,0,0,0.4)",
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    boxShadow: "0 4px 20px -4px rgba(0,0,0,0.4)",
                },
                dimmed:  {
                    opacity: 0.45,
                    y: 0,
                    filter: "blur(0px)",
                    boxShadow: "0 4px 20px -4px rgba(0,0,0,0.4)",
                },
                active:  {
                    opacity: 1,
                    y: -8,
                    filter: "blur(0px)",
                    boxShadow:
                        "0 24px 56px -10px rgba(6,182,212,0.22), 0 0 0 1px rgba(6,182,212,0.35)",
                },
            }}
            animate={variant}
            transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                // stagger on initial entry only; instant on activation
                delay: variant === "visible" ? index * 0.12 : 0,
            }}
            className="relative flex flex-col rounded-2xl"
        >
            {/* Double-Bezel outer shell */}
            <div className="p-[1px] rounded-2xl bg-white/5 ring-1 ring-white/10 h-full">
                {/* Inner core */}
                <div className="rounded-[calc(1rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] p-6 relative overflow-hidden h-full flex flex-col">

                    {/* Step badge */}
                    <span className="absolute top-4 right-4 text-[10px] font-bold tabular-nums text-slate-600 bg-white/5 px-2 py-0.5 rounded-full select-none">
                        {String(step.id).padStart(2, "0")}
                    </span>

                    {/* Icon with glow — brightens when active */}
                    <div
                        className="relative w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-5 shrink-0 transition-colors duration-700"
                        style={{
                            background: isActive
                                ? "rgba(6,182,212,0.2)"
                                : "rgba(6,182,212,0.08)",
                        }}
                    >
                        <div
                            className="absolute inset-0 rounded-xl blur-md transition-opacity duration-700"
                            style={{
                                background: "rgba(6,182,212,0.3)",
                                opacity: isActive ? 1 : 0.3,
                            }}
                        />
                        <step.icon
                            className="w-6 h-6 relative z-10 transition-colors duration-700"
                            style={{ color: isActive ? "rgba(6,182,212,1)" : "rgba(6,182,212,0.6)" }}
                        />
                    </div>

                    <h3 className="text-white font-bold text-sm mb-2 relative z-10 pr-8">
                        {t(`steps.${step.id}.title`)}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                        {t(`steps.${step.id}.description`)}
                    </p>

                    {/* Ghost step number */}
                    <span className="absolute -bottom-3 -right-1 text-[6rem] font-extrabold text-white/[0.06] leading-none select-none font-[family-name:var(--font-display)] pointer-events-none">
                        {String(step.id).padStart(2, "0")}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
