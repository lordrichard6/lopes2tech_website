"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { ChevronLeft, ChevronRight, Layers, Monitor, ArrowRight, Code, Clock, Pause, Circle } from "lucide-react";
import { useTranslations } from "next-intl";
import { projects } from "./projects";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -80px 0px" } as const;

export default function PortfolioContent() {
    const t             = useTranslations("PortfolioPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const [activeFilter, setActiveFilter] = useState<"web-app" | "website">("website");
    const [currentPage, setCurrentPage]   = useState(1);
    const itemsPerPage = 6;

    const filteredProjects  = projects.filter(p => p.type === activeFilter);
    const totalPages        = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex        = (currentPage - 1) * itemsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

    const handleFilterChange = (filter: "web-app" | "website") => {
        setActiveFilter(filter);
        setCurrentPage(1);
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Blur-up helpers
    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    return (
        <section id="portfolio" className="relative pt-32 pb-20 overflow-hidden">

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
                    {/* Site-standard badge — no icon, no blur */}
                    <motion.div {...fadeIn(0)}>
                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                            {t("badge")}
                        </div>
                    </motion.div>

                    <motion.h1
                        {...fadeIn(0.1)}
                        className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold mb-6 text-white"
                    >
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                            {t("titleHighlight")}
                        </span>
                    </motion.h1>

                    <motion.p {...fadeIn(0.2)} className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
                        {t("subtitle")}
                    </motion.p>
                    <motion.p {...fadeIn(0.25)} className="text-lg text-slate-500 max-w-3xl mx-auto">
                        {t("subtitleSecondary")}
                    </motion.p>
                </div>

                {/* Hairline visual pause */}
                <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-10" />

                {/* ── Filter Toggle ─────────────────────────────────────── */}
                <motion.div
                    {...fadeIn(0.3)}
                    className="flex justify-center mb-12"
                >
                    <div className="relative inline-flex p-1 bg-white/5 rounded-full border border-white/10">
                        <button
                            onClick={() => handleFilterChange("web-app")}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 text-sm ${
                                activeFilter === "web-app" ? "text-white" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <Layers className="w-4 h-4" />
                            {t("filters.webApps")}
                        </button>
                        <button
                            onClick={() => handleFilterChange("website")}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 text-sm ${
                                activeFilter === "website" ? "text-white" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <Monitor className="w-4 h-4" />
                            {t("filters.websites")}
                        </button>
                        {/* Sliding pill — no backdrop-blur */}
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                activeFilter === "website" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                            }`}
                        />
                    </div>
                </motion.div>

                {/* ── Projects Grid ─────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeFilter}-${currentPage}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                    >
                        {paginatedProjects.map((project, idx) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={VP}
                                transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: EASE }}
                                className="h-full"
                            >
                                <Link href={`/portfolio/${project.slug}`} className="group block h-full">
                                    {/* Double-Bezel outer shell */}
                                    <div className="h-full p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04] transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:ring-cyan-400/20">
                                        {/* Inner card */}
                                        <div className="h-full flex flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.09]">

                                            {/* Image */}
                                            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[calc(2rem-1px)]">
                                                <Image
                                                    src={project.image}
                                                    alt={t(`projects.${project.slug}.title`)}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    priority={idx < 3}
                                                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                                                />
                                                {/* Overlay — #080d1a unified */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />

                                                {/* Status badges — no backdrop-blur */}
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

                                                {/* View Project overlay — no backdrop-blur */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                                    <span className="px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white font-semibold flex items-center gap-2">
                                                        {t("badges.viewProject")}
                                                        <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
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
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* ── Pagination ────────────────────────────────────────── */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, ease: EASE }}
                        className="flex items-center justify-center gap-2"
                    >
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-10 h-10 rounded-full font-semibold transition-colors duration-300 ${
                                        page === currentPage
                                            ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                                            : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                    aria-label={`Page ${page}`}
                                    aria-current={page === currentPage ? "page" : undefined}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
