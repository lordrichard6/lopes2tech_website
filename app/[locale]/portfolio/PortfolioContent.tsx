"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { ChevronLeft, ChevronRight, Layers, Monitor, ArrowRight, Code, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { projects } from "./projects";

export default function PortfolioContent() {
    const t = useTranslations('PortfolioPage');
    const [activeFilter, setActiveFilter] = useState<"web-app" | "website">("website");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredProjects = projects.filter(p => p.type === activeFilter);
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
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

    return (
        <section id="portfolio" className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Pattern - Grid Lines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at center, transparent 0%, #0f172a 90%)' }}
                />
            </div>

            {/* Floating Circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
                <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                        <Code className="inline w-4 h-4 mr-2" />
                        {t('badge')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                        {t('title')}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                            {t('titleHighlight')}
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
                        {t('subtitle')}
                    </p>
                    <p className="text-lg text-slate-500 max-w-3xl mx-auto">
                        {t('subtitleSecondary')}
                    </p>
                </motion.div>

                {/* Filter Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="relative inline-flex p-1 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                        <button
                            onClick={() => handleFilterChange("web-app")}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 ${activeFilter === "web-app"
                                ? "text-white"
                                : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <Layers className="w-4 h-4" />
                            {t('filters.webApps')}
                        </button>
                        <button
                            onClick={() => handleFilterChange("website")}
                            className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 ${activeFilter === "website"
                                ? "text-white"
                                : "text-slate-400 hover:text-white"
                                }`}
                        >
                            <Monitor className="w-4 h-4" />
                            {t('filters.websites')}
                        </button>
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-transform duration-300 ${activeFilter === "website" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                                }`}
                        />
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeFilter}-${currentPage}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    >
                        {paginatedProjects.map((project, idx) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                <Link
                                    href={`/portfolio/${project.slug}`}
                                    className="block"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={t(`projects.${project.slug}.title`)}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                        {/* In Development Badge */}
                                        {project.isInDevelopment && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/90 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1">
                                                <Code className="w-3 h-3" />
                                                {t('badges.inDevelopment')}
                                            </div>
                                        )}

                                        {/* Coming Soon Badge (no external link) */}
                                        {!project.link && !project.isInDevelopment && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/90 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {t('badges.comingSoon')}
                                            </div>
                                        )}

                                        {/* View Project Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold flex items-center gap-2">
                                                {t('badges.viewProject')}
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider">
                                            {t(`projects.${project.slug}.category`)}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                                            {t(`projects.${project.slug}.title`)}
                                        </h3>
                                        <p className="text-sm text-slate-400 line-clamp-2">
                                            {t(`projects.${project.slug}.description`)}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-2"
                    >
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-10 h-10 rounded-xl font-semibold transition-all ${page === currentPage
                                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
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
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
