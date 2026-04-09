"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";

const EASE = [0.16, 1, 0.3, 1] as const;
const ALL_IDS = ["marco", "silvio", "rode", "ana_isabel"] as const;
const CYCLE_INTERVAL = 5500;

type TestimonialId = (typeof ALL_IDS)[number];

// ── Google G logo ─────────────────────────────────────────────────────────────
function GoogleG() {
    return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name }: { name: string }) {
    return (
        <div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400/80 to-violet-500/80 flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-white/10 shadow-[0_0_12px_2px_rgba(6,182,212,0.2)]"
            aria-hidden="true"
        >
            {name.charAt(0)}
        </div>
    );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function StarRow() {
    return (
        <div className="flex gap-1" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="relative">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                    <div className="absolute inset-0 blur-[6px] bg-amber-400/40 rounded-full pointer-events-none" />
                </div>
            ))}
        </div>
    );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({
    id,
    index,
    t,
}: {
    id: TestimonialId;
    index: number;
    t: ReturnType<typeof useTranslations<"Testimonials">>;
}) {
    // Fix #1 — respect prefers-reduced-motion inside the card too
    const reducedMotion = useReducedMotion();
    const company = t(`items.${id}.company`);

    return (
        // Fix #2 — card lift + glow on hover (spring physics per directive 2D)
        // Separate motion.div from the slide wrapper so y values don't conflict
        <motion.div
            whileHover={
                reducedMotion
                    ? undefined
                    : {
                          y: -6,
                          boxShadow:
                              "0 28px 60px -12px rgba(6,182,212,0.22), 0 0 0 1px rgba(6,182,212,0.35)",
                      }
            }
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-[2rem]"
            style={{ boxShadow: "0 8px 40px -8px rgba(0,0,0,0.6)" }}
        >
            {/* Outer bezel */}
            <div className="p-[1px] rounded-[2rem] bg-white/5 ring-1 ring-white/10">
                {/* Inner core */}
                <div className="relative rounded-[calc(2rem-1px)] bg-white/[0.03] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] overflow-hidden flex flex-col p-10 md:p-14">

                    {/* Ghost number */}
                    <span
                        className="absolute bottom-4 right-6 font-extrabold leading-none select-none pointer-events-none font-[family-name:var(--font-display)]"
                        style={{ fontSize: "10rem", color: "rgba(255,255,255,0.035)" }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Ambient glow */}
                    <div
                        className="absolute -top-10 -left-10 w-48 h-48 rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
                    />

                    {/* Giant quote mark */}
                    <span
                        className="block font-extrabold leading-none select-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 text-[7rem] md:text-[9rem]"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>

                    {/* Quote text — Fix #3: max-w-[62ch] caps line length at ~70 chars for readability */}
                    <p className="text-white leading-[1.7] flex-1 mb-8 relative z-10 text-lg md:text-xl lg:text-2xl font-medium min-h-[9rem] max-w-[62ch]">
                        {t(`items.${id}.text`)}
                    </p>

                    {/* Author — Fix #7: text-slate-400 for better contrast at small sizes */}
                    <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-white/[0.08]">
                        <Avatar name={t(`items.${id}.name`)} />
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm leading-tight">
                                {t(`items.${id}.name`)}
                            </p>
                            <p className="text-slate-400 text-[11px] mt-0.5 truncate">
                                {t(`items.${id}.role`)}
                                {company && <> · {company}</>}
                            </p>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-1.5">
                            <StarRow />
                            <div className="flex items-center gap-1">
                                <GoogleG />
                                {/* Fix #7: text-slate-400 instead of text-slate-500 */}
                                <span className="text-[10px] text-slate-400 font-medium">Google</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Testimonials() {
    const t = useTranslations("Testimonials");

    // Fix #1 — global reduced-motion check for slide & entrance animations
    const reducedMotion = useReducedMotion();

    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection]     = useState(1);
    const [progressKey, setProgressKey] = useState(0);

    const activeIndexRef  = useRef(0);
    const isPausedRef     = useRef(false);
    const timerRef        = useRef<ReturnType<typeof setInterval> | null>(null);
    const touchStartXRef  = useRef<number | null>(null);
    const goToRef         = useRef<(i: number, dir?: number) => void>(() => {});

    // ── Timer ──
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            if (isPausedRef.current) return;
            const next = (activeIndexRef.current + 1) % ALL_IDS.length;
            activeIndexRef.current = next;
            setDirection(1);
            setActiveIndex(next);
            setProgressKey((k) => k + 1);
        }, CYCLE_INTERVAL);
    }, []);

    useEffect(() => {
        startTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [startTimer]);

    // ── Navigate ──
    const goTo = useCallback(
        (i: number, dir?: number) => {
            const d = dir !== undefined ? dir : i > activeIndexRef.current ? 1 : -1;
            activeIndexRef.current = i;
            setDirection(d);
            setActiveIndex(i);
            setProgressKey((k) => k + 1);
            startTimer();
        },
        [startTimer]
    );

    goToRef.current = goTo;

    // ── Keyboard ──
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight")
                goToRef.current((activeIndexRef.current + 1) % ALL_IDS.length, 1);
            if (e.key === "ArrowLeft")
                goToRef.current(
                    (activeIndexRef.current - 1 + ALL_IDS.length) % ALL_IDS.length,
                    -1
                );
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // ── Hover pause ──
    const onMouseEnter = () => { isPausedRef.current = true; };
    const onMouseLeave = () => {
        isPausedRef.current = false;
        setProgressKey((k) => k + 1);
        startTimer();
    };

    // ── Touch swipe ──
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartXRef.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartXRef.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartXRef.current;
        if (Math.abs(delta) > 50) {
            goTo(
                delta < 0
                    ? (activeIndexRef.current + 1) % ALL_IDS.length
                    : (activeIndexRef.current - 1 + ALL_IDS.length) % ALL_IDS.length,
                delta < 0 ? 1 : -1
            );
        }
        touchStartXRef.current = null;
    };

    // Fix #1 — slide variants degrade to a simple fade when reducedMotion is on
    const variants = {
        enter: (dir: number) => ({
            x:      reducedMotion ? 0 : (dir > 0 ? "100%" : "-100%"),
            opacity: 0,
            filter: reducedMotion ? "blur(0px)" : "blur(6px)",
        }),
        center: () => ({ x: "0%", opacity: 1, filter: "blur(0px)" }),
        exit:  (dir: number) => ({
            x:      reducedMotion ? 0 : (dir > 0 ? "-100%" : "100%"),
            opacity: 0,
            filter: reducedMotion ? "blur(0px)" : "blur(6px)",
        }),
    };

    // Fix #5 — shared viewport config with early-trigger margin
    const vp = { once: true, margin: "0px 0px -80px 0px" } as const;

    // Fix #1 — entrance animation props degrade to simple fade when reducedMotion
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
                  transition:  { duration: 0.75, delay, ease: EASE },
              };

    return (
        <section className="relative py-32 overflow-hidden bg-[#080d1a]">

            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] right-[-5%]  w-[500px] h-[500px] rounded-full bg-violet-500/[0.07] blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/[0.07]   blur-[120px]" />
                <div className="absolute top-[50%] left-[40%]  w-[400px] h-[400px] rounded-full bg-violet-500/[0.04] blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">

                {/* ── Header ── */}
                <div className="text-center mb-16">
                    <motion.span
                        {...fadeUp(0)}
                        className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10"
                    >
                        {t("badge")}
                    </motion.span>

                    <motion.h2
                        {...fadeUp(0.1)}
                        className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-[family-name:var(--font-display)] tracking-tight"
                    >
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                            {t("titleHighlight")}
                        </span>
                    </motion.h2>

                    <motion.p
                        {...fadeUp(0.2)}
                        className="text-lg text-slate-400 max-w-2xl mx-auto"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* ── Carousel ── */}
                <motion.div
                    {...fadeUp(0.25)}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Clip container — py-12 -my-12 lets card shadow breathe */}
                    <div
                        className="overflow-hidden py-12 -my-12"
                        role="region"
                        aria-label="Customer reviews"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <div className="py-12">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        duration: reducedMotion ? 0.25 : 0.6,
                                        ease: EASE,
                                    }}
                                >
                                    <TestimonialCard
                                        id={ALL_IDS[activeIndex]}
                                        index={activeIndex}
                                        t={t}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ── Progress dots ── */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        {ALL_IDS.map((id, i) => (
                            // Fix #6 — whileHover scale feedback (spring)
                            // Fix #4 — focus-visible ring for keyboard users
                            <motion.button
                                key={id}
                                onClick={() => goTo(i)}
                                aria-label={`Review ${i + 1} of ${ALL_IDS.length}`}
                                aria-pressed={i === activeIndex}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.85 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className={clsx(
                                    // Large invisible hit area for mobile
                                    "relative py-4 -my-4 px-2 -mx-2 flex items-center justify-center",
                                    // Fix #4 — visible focus ring (cyan glow, offset from bg colour)
                                    "rounded-full",
                                    "focus-visible:outline-none focus-visible:ring-2",
                                    "focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2",
                                    "focus-visible:ring-offset-[#080d1a]"
                                )}
                            >
                                <span
                                    className={clsx(
                                        "block h-[3px] rounded-full overflow-hidden relative transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                                        i === activeIndex ? "w-10" : "w-3"
                                    )}
                                >
                                    {/* Track */}
                                    <span className="absolute inset-0 bg-white/15 rounded-full" />
                                    {/* Progress fill */}
                                    {i === activeIndex && (
                                        <motion.span
                                            key={progressKey}
                                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{
                                                duration: CYCLE_INTERVAL / 1000,
                                                ease: "linear",
                                            }}
                                        />
                                    )}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    {...fadeUp(0.3)}
                    className="text-center mt-12"
                >
                    <Link
                        href="https://share.google/nhuwQOk0E4RnTzlv3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium underline-offset-4 hover:underline transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    >
                        {t("cta")}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
