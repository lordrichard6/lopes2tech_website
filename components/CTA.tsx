"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/navigation";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackCTAClick } from "@/lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CTA() {
    const t = useTranslations("CTASection");
    const reducedMotion = useReducedMotion();

    const vp = { once: true, margin: "0px 0px -80px 0px" } as const;

    const fadeUp = (delay = 0) =>
        reducedMotion
            ? {
                  initial:     { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport:    vp,
                  transition:  { duration: 0.4, delay },
              }
            : {
                  initial:     { opacity: 0, y: 20, filter: "blur(6px)" },
                  whileInView: { opacity: 1, y: 0,  filter: "blur(0px)" },
                  viewport:    vp,
                  transition:  { duration: 0.8, delay, ease: EASE },
              };

    return (
        <section className="relative py-32 bg-[#080d1a] overflow-hidden flex items-center justify-center text-center">

            {/* Hairline separator */}
            <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
                }}
            />

            {/* Background */}
            <div className="absolute inset-0 z-0">
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 z-10 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                        maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
                    }}
                />

                {/* Orb left — cyan, 10s */}
                <motion.div
                    animate={reducedMotion ? {} : { y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[100px] left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-400 blur-[80px] opacity-[0.12] will-change-transform"
                />
                {/* Fix #1 — violet-500 (brand colour) + Fix #4 — 13s for organic asymmetry */}
                <motion.div
                    animate={reducedMotion ? {} : { y: [0, 30, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute -bottom-[150px] right-[10%] w-[500px] h-[500px] rounded-full bg-violet-500 blur-[80px] opacity-[0.12] will-change-transform"
                />
            </div>

            <div className="relative z-20 max-w-[800px] px-6">

                {/* Fix #2 — eyebrow badge, consistent with every other section */}
                <motion.span
                    {...fadeUp(0)}
                    className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10"
                >
                    {t("badge")}
                </motion.span>

                <motion.h2
                    {...fadeUp(0.1)}
                    className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-tight leading-[1.1] font-[family-name:var(--font-display)]"
                >
                    {t("title")}
                </motion.h2>

                <motion.p
                    {...fadeUp(0.18)}
                    className="text-lg md:text-xl text-slate-400 mb-10 max-w-[600px] mx-auto leading-relaxed"
                >
                    {t("subtitle")}
                </motion.p>

                {/* Button — outer handles entrance, inner handles spring hover/tap */}
                <motion.div {...fadeUp(0.26)}>
                    <motion.div
                        whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }}
                        whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                        className="inline-block"
                    >
                        <Link
                            href="/contact"
                            onClick={() => trackCTAClick("homepage_cta")}
                            className={[
                                "inline-flex items-center gap-3 px-8 py-4",
                                "text-base font-bold text-[#0f172a] bg-cyan-400 rounded-full",
                                "transition-colors duration-300",
                                "shadow-[0_0_20px_rgba(34,211,238,0.35)]",
                                "hover:shadow-[0_0_40px_rgba(34,211,238,0.55)]",
                                "hover:bg-cyan-300",
                                "group overflow-hidden relative",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-cyan-400 focus-visible:ring-offset-2",
                                "focus-visible:ring-offset-[#080d1a]",
                            ].join(" ")}
                        >
                            <span className="relative z-10">{t("button")}</span>

                            {/* Button-in-Button trailing icon */}
                            <span className="w-9 h-9 rounded-full bg-[#080d1a]/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-110 relative z-10">
                                <ArrowRight className="w-4 h-4" />
                            </span>

                            {/* Shine sweep */}
                            {!reducedMotion && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] z-0" />
                            )}
                        </Link>
                    </motion.div>

                    {/* Friction-reduction micro-copy directly under the button */}
                    <motion.p
                        {...fadeUp(0.34)}
                        className="mt-4 text-[11px] text-slate-600 tracking-wide"
                    >
                        {t("noCommitment")}
                    </motion.p>
                </motion.div>

            </div>
        </section>
    );
}
