"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { Layers, Monitor, ExternalLink, ArrowRight, Code, Clock, Pause, Circle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { projects } from "./projects";
import type { Project } from "./projects";

const EASE   = [0.16, 1, 0.3, 1] as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;

// ── ProjectCard ─────────────────────────────────────────────────────────────
function ProjectCard({
    project,
    idx,
    isFeatured,
    t,
}: {
    project: Project;
    idx: number;
    isFeatured: boolean;
    t: ReturnType<typeof import("next-intl").useTranslations>;
}) {
    return (
        /* Double-Bezel outer shell */
        <div className="h-full p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-cyan-400/20">
            {/* Inner card */}
            <div className="h-full flex flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.09]">

                {/* Image — 16:9 for featured, 4:3 for standard */}
                <div className={`relative overflow-hidden rounded-t-[calc(2rem-1px)] ${isFeatured ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image
                        src={project.image}
                        alt={t(`projects.${project.slug}.title`)}
                        fill
                        sizes={isFeatured
                                        ? "(max-width: 768px) 100vw, 66vw"
                                        : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    }
                        priority={idx < 3}
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />

                    {/* Showcase badge — top-left */}
                    {project.isShowcase && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-white text-xs font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-cyan-300" />
                            {t("badges.showcase")}
                        </div>
                    )}

                    {/* Status badges — top-right */}
                    {project.link && !project.isInDevelopment && !project.isOnHold && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1">
                            <Circle className="w-2.5 h-2.5 fill-current" />
                            {t("badges.live")}
                        </div>
                    )}
                    {project.isInDevelopment && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-violet-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            {t("badges.inDevelopment")}
                        </div>
                    )}
                    {project.isOnHold && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1">
                            <Pause className="w-3 h-3" />
                            {t("badges.onHold")}
                        </div>
                    )}
                    {!project.link && !project.isInDevelopment && !project.isOnHold && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/90 rounded-full text-white text-xs font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t("badges.comingSoon")}
                        </div>
                    )}

                    {/* Visit site overlay — only when a link exists */}
                    {project.link && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            <span className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white font-semibold flex items-center gap-2">
                                {t("badges.viewProject")}
                                <ExternalLink className="w-4 h-4" />
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider">
                        {t(`projects.${project.slug}.category`)}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 transition-colors duration-300 group-hover:text-cyan-400">
                        {t(`projects.${project.slug}.title`)}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 flex-1">
                        {t(`projects.${project.slug}.description`)}
                    </p>

                    {/* #9 — Card footer meta row */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center">
                        {project.link ? (
                            <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
                                {t("badges.viewProject")}
                                <ExternalLink className="w-3 h-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                        ) : project.isInDevelopment ? (
                            <span className="text-xs text-slate-600 uppercase tracking-wider">{t("badges.inDevelopment")}</span>
                        ) : project.isOnHold ? (
                            <span className="text-xs text-slate-600 uppercase tracking-wider">{t("badges.onHold")}</span>
                        ) : (
                            <span className="text-xs text-slate-600 uppercase tracking-wider">{t("badges.comingSoon")}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── PortfolioContent ─────────────────────────────────────────────────────────
export default function PortfolioContent() {
    const t             = useTranslations("PortfolioPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const [activeFilter, setActiveFilter] = useState<"web-app" | "website">("website");

    const filteredProjects = projects.filter(p => p.type === activeFilter);

    // #5 — Stats computed from source of truth
    const totalProjects  = projects.length;
    const liveCount      = projects.filter(p => p.link && !p.isInDevelopment && !p.isOnHold).length;
    const webAppsCount   = projects.filter(p => p.type === "web-app").length;
    const websitesCount  = projects.filter(p => p.type === "website").length;

    const handleFilterChange = (filter: "web-app" | "website") => {
        setActiveFilter(filter);
    };

    // Blur-up helpers
    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    return (
        <section id="portfolio" className="relative pt-32 pb-32 overflow-hidden">

            {/* Background: subtle grid + vignette */}
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(circle at center, transparent 0%, #080d1a 88%)" }}
                />
            </div>

            {/* Ambient orbs */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
                <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-violet-500/10 blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* ── Hero ──────────────────────────────────────────────── */}
                <div className="text-center mb-20">
                    <motion.div {...fadeIn(0)}>
                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                            {t("badge")}
                        </div>
                    </motion.div>

                    {/* #3 — tight tracking on large display */}
                    <motion.h1
                        {...fadeIn(0.1)}
                        className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold mb-6 text-white"
                        style={{ letterSpacing: "-0.02em" }}
                    >
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                            {t("titleHighlight")}
                        </span>
                    </motion.h1>

                    <motion.p {...fadeIn(0.2)} className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
                        {t("subtitle")}
                    </motion.p>
                    <motion.p {...fadeIn(0.25)} className="text-lg text-slate-500 max-w-2xl mx-auto">
                        {t("subtitleSecondary")}
                    </motion.p>

                    {/* #5 — Stats strip — flex-wrap for mobile safety */}
                    <motion.div {...fadeIn(0.32)} className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-10">
                        {[
                            { value: totalProjects,  label: t("stats.projects") },
                            { value: liveCount,      label: t("stats.live")     },
                            { value: webAppsCount,   label: t("stats.webApps")  },
                            { value: websitesCount,  label: t("stats.websites") },
                        ].map(({ value, label }, i) => (
                            <div key={label} className="flex items-center gap-6 sm:gap-8">
                                <div className="text-center">
                                    <span className="block font-[family-name:var(--font-display)] text-2xl font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>
                                        {value}
                                    </span>
                                    <span className="block text-[10px] text-slate-500 uppercase tracking-[0.18em] mt-0.5">
                                        {label}
                                    </span>
                                </div>
                                {/* Dividers hidden on mobile to avoid wrapping artefacts */}
                                {i < 3 && <div aria-hidden="true" className="hidden sm:block h-8 w-px bg-white/8" />}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Hairline visual pause */}
                <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-10" />

                {/* ── Filter Toggle ─────────────────────────────────────── */}
                <motion.div {...fadeIn(0.3)} className="flex justify-center mb-6">
                    <div
                        role="group"
                        aria-label="Filter projects by type"
                        className="relative inline-flex p-1 bg-white/5 rounded-full border border-white/10"
                    >
                        <button
                            onClick={() => handleFilterChange("web-app")}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d1a] ${
                                activeFilter === "web-app" ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                            }`}
                        >
                            <Layers className="w-4 h-4" />
                            {t("filters.webApps")}
                        </button>
                        <button
                            onClick={() => handleFilterChange("website")}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d1a] ${
                                activeFilter === "website" ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                            }`}
                        >
                            <Monitor className="w-4 h-4" />
                            {t("filters.websites")}
                        </button>
                        {/* Sliding pill */}
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                activeFilter === "website" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                            }`}
                        />
                    </div>
                </motion.div>

                {/* #8 + #10 — Animated result count */}
                <div className="flex justify-center mb-10">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`count-${activeFilter}`}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.22, ease: EASE }}
                            className="text-[11px] text-slate-600 uppercase tracking-[0.18em]"
                        >
                            {t("resultsCount", { count: filteredProjects.length })}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* ── Projects Grid ─────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project, idx) => {
                            // #4 — first card is the featured magazine card
                            const isFeatured = idx === 0;

                            return (
                                // Outer motion.div handles scroll-reveal (whileInView)
                                // Inner motion.a/div handles hover lift — no y conflict
                                <motion.div
                                    key={project.slug}
                                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={VP}
                                    transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: EASE }}
                                    className={`h-full ${isFeatured ? "md:col-span-2" : ""}`}
                                >
                                    {/* #1 + #2 — hover lift + press on linked cards */}
                                    {project.link ? (
                                        <motion.a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group block h-full"
                                            whileHover={{ y: -6 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={SPRING}
                                        >
                                            <ProjectCard project={project} idx={idx} isFeatured={isFeatured} t={t} />
                                        </motion.a>
                                    ) : (
                                        <div className="group block h-full cursor-default">
                                            <ProjectCard project={project} idx={idx} isFeatured={isFeatured} t={t} />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>


                {/* ── #6 — Bottom CTA ───────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 32, filter: "blur(8px)" } : {}) }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={VP}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="mt-24 text-center"
                >
                    <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                        {t("cta.eyebrow")}
                    </div>

                    <h2
                        className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-white mb-4"
                        style={{ letterSpacing: "-0.02em" }}
                    >
                        {t("cta.title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                            {t("cta.titleHighlight")}
                        </span>
                    </h2>

                    <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
                        {t("cta.subtitle")}
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className="inline-block"
                    >
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-base"
                        >
                            {t("cta.button")}
                            <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
