"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/navigation";
import { X, Check, ExternalLink, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

/* ─── Static project config ────────────────────────────────── */
const projectsConfig = [
    {
        id: "mimesa",
        name: "miMesa",
        industryEmoji: "🍽️",
        industryColor: "#F5A623",
        logo: "/logos/mimesa_icon.png",
        logoSize: { w: 32, h: 32 },
        mockup: "/proj/mimesa_screen.webp",
        version: "v0.6",
        stage: "Alpha",
        websiteUrl: "https://www.mimesa.ch/",
        accent: "#F5A623",
        cardGlow: "rgba(245,166,35,0.18)",
        cardBorder: "rgba(245,166,35,0.35)",
        checkColor: "#E05B1A",
        dialogBadgeBg: "bg-amber-50",
        dialogBadgeText: "text-amber-800",
        dialogBtn: "bg-[#2C1A0E] text-[#F5A623] hover:bg-[#3d2510] border border-[#F5A623]/50",
        btn: {
            bg: "#2C1A0E",
            border: "#F5A623",
            text: "#F5A623",
            glow: "rgba(245,166,35,0.45)",
            ring: "rgba(245,166,35,0.25)",
        },
    },
    {
        id: "clinika",
        name: "ClíniKa OS",
        industryEmoji: "🏥",
        industryColor: "#71DCC6",
        logo: "/logos/clinika_logo.svg",
        logoSize: { w: 34, h: 36 },
        mockup: "/proj/clinika_os_screen.webp",
        version: "v1.0",
        stage: null,
        websiteUrl: "https://www.clinika-os.ch/",
        accent: "#71DCC6",
        cardGlow: "rgba(113,220,198,0.15)",
        cardBorder: "rgba(113,220,198,0.35)",
        checkColor: "#71DCC6",
        dialogBadgeBg: "bg-cyan-50",
        dialogBadgeText: "text-cyan-900",
        dialogBtn: "bg-[#192C50] text-[#71DCC6] hover:bg-[#1e3660] border border-[#71DCC6]/50",
        btn: {
            bg: "#192C50",
            border: "#71DCC6",
            text: "#71DCC6",
            glow: "rgba(113,220,198,0.4)",
            ring: "rgba(113,220,198,0.2)",
        },
    },
    {
        id: "darkmonkey",
        name: "Dark Monkey",
        industryEmoji: "🛒",
        industryColor: "#C9A84C",
        logo: "/logos/darkmonkey_logo.webp",
        logoSize: { w: 40, h: 40 },
        mockup: "/proj/darkmonkey_screen.webp",
        version: "v1.0",
        stage: null,
        websiteUrl: "https://www.dark-monkey.ch/",
        accent: "#C9A84C",
        cardGlow: "rgba(201,168,76,0.15)",
        cardBorder: "rgba(201,168,76,0.35)",
        checkColor: "#C9A84C",
        dialogBadgeBg: "bg-yellow-50",
        dialogBadgeText: "text-yellow-900",
        dialogBtn: "bg-[#0D0D0D] text-[#C9A84C] hover:bg-[#1a1a1a] border border-[#C9A84C]/50",
        btn: {
            bg: "#0D0D0D",
            border: "#C9A84C",
            text: "#C9A84C",
            glow: "rgba(201,168,76,0.45)",
            ring: "rgba(201,168,76,0.22)",
        },
    },
    {
        id: "menteiq",
        name: "menteIQ",
        industryEmoji: "🤖",
        industryColor: "#7C3AED",
        logo: "/logos/menteiq_logo_white.svg",
        logoSize: { w: 48, h: 30 },
        mockup: "/proj/menteiq_screen.webp",
        version: "v0.8",
        stage: "Beta",
        websiteUrl: "https://menteiq.ch/",
        accent: "#7C3AED",
        cardGlow: "rgba(124,58,237,0.15)",
        cardBorder: "rgba(124,58,237,0.35)",
        checkColor: "#7C3AED",
        dialogBadgeBg: "bg-violet-50",
        dialogBadgeText: "text-violet-900",
        dialogBtn: "bg-[#0A0B1E] text-[#A78BFA] hover:bg-[#12143a] border border-[#7C3AED]/50",
        btn: {
            bg: "#0A0B1E",
            border: "#7C3AED",
            text: "#A78BFA",
            glow: "rgba(124,58,237,0.45)",
            ring: "rgba(124,58,237,0.22)",
        },
    },
];

type ProjectConfig = (typeof projectsConfig)[0];
type Project = ProjectConfig & {
    industryLabel: string;
    tagline: string;
    description: string;
    features: string[];
};

/* ─── Dialog (unchanged) ───────────────────────────────────── */
function ProjectDialog({
    project,
    onClose,
    t,
}: {
    project: Project;
    onClose: () => void;
    t: ReturnType<typeof useTranslations<"FeaturedProjects">>;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />
            <motion.div
                className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="h-1.5 w-full" style={{ background: project.accent }} />
                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Image src={project.logo} alt={`${project.name} logo`} width={project.logoSize.w} height={project.logoSize.h} className="object-contain" />
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{project.name}</h3>
                                <span className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${project.dialogBadgeBg} ${project.dialogBadgeText}`}>
                                    {project.tagline}
                                </span>
                            </div>
                        </div>
                        <button onClick={onClose} className="flex-shrink-0 ml-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Close">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{project.description}</p>
                    <ul className="space-y-2.5 mb-7">
                        {project.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                                <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: project.checkColor }} />
                                <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Link href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 ${project.dialogBtn}`}>
                        <ExternalLink className="w-4 h-4" />
                        {t("dialog.visitWebsite")}
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

/* ─── Product Card ─────────────────────────────────────────── */
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer group"
            style={{
                borderColor: hovered ? project.cardBorder : 'rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                boxShadow: hovered
                    ? `0 0 40px 0 ${project.cardGlow}, 0 24px 48px -12px rgba(0,0,0,0.5)`
                    : '0 4px 24px -8px rgba(0,0,0,0.4)',
            }}
        >
            {/* Mockup image */}
            <div className="relative w-full overflow-hidden" style={{ height: '200px' }}>
                <Image
                    src={project.mockup}
                    alt={`${project.name} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Bottom fade into card */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, transparent 20%, rgba(13,17,30,0.85) 75%, rgba(13,17,30,1) 100%)',
                    }}
                />
                {/* Top-right badges */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                    {/* Stage badge (Alpha/Beta) */}
                    {project.stage && (
                        <div className="flex items-center px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-amber-400/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                            {project.stage}
                        </div>
                    )}
                    {/* Version */}
                    <div className="flex items-center px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 text-slate-300 text-[10px] font-bold tracking-wider">
                        {project.version}
                    </div>
                    {/* LIVE */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Live</span>
                    </div>
                </div>
                {/* Logo + name — overlaid on the bottom of the image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 p-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/15">
                            <Image
                                src={project.logo}
                                alt={project.name}
                                width={project.logoSize.w}
                                height={project.logoSize.h}
                                className="object-contain"
                                style={{ maxHeight: '24px', width: 'auto' }}
                            />
                        </div>
                        <h3 className="text-lg font-extrabold text-white tracking-tight drop-shadow-lg">{project.name}</h3>
                    </div>
                    {/* Industry pill */}
                    <div
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border bg-black/50 backdrop-blur-sm"
                        style={{
                            borderColor: `${project.industryColor}50`,
                            color: project.industryColor,
                        }}
                    >
                        <span>{project.industryEmoji}</span>
                        <span>{project.industryLabel}</span>
                    </div>
                </div>
            </div>

            {/* Content below image */}
            <div className="flex flex-col flex-1 px-6 pb-6 pt-4">
                {/* Tagline */}
                <p className="text-sm font-semibold mb-4" style={{ color: project.accent }}>
                    {project.tagline}
                </p>

                {/* Top 3 features */}
                <ul className="space-y-2 mb-6 flex-1">
                    {project.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                            <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: project.checkColor }} />
                            <span className="text-xs text-slate-400 leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTAs */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClick}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                    >
                        Learn more
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                    <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex-shrink-0"
                        aria-label={`Visit ${project.name} website`}
                    >
                        <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function FeaturedProjects() {
    const t = useTranslations("FeaturedProjects");
    const [active, setActive] = useState<string | null>(null);

    const projects: Project[] = projectsConfig.map((cfg) => {
        const pid = cfg.id as "mimesa" | "clinika" | "darkmonkey" | "menteiq";
        return {
            ...cfg,
            industryLabel: t(`projects.${pid}.industryLabel`),
            tagline: t(`projects.${pid}.tagline`),
            description: t(`projects.${pid}.description`),
            features: [0, 1, 2, 3, 4, 5, 6].map((i) => t(`projects.${pid}.features.${i}`)),
        };
    });

    const activeProject = projects.find((p) => p.id === active) ?? null;

    return (
        <>
            <section className="relative py-28 bg-[#080d1a]">
                {/* Grid lines background — fades in from top */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
                    }}
                />
                {/* Ambient glows */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[160px] left-1/4 w-[500px] h-[300px] rounded-full bg-amber-500/6 blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-cyan-500/6 blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-purple-500/5 blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-slate-400 font-semibold text-sm mb-4 border border-white/10">
                            {t("badge")}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                            {t("title")}{" "}
                            <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-purple-400">
                                    {t("titleHighlight")}
                                </span>
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </motion.div>

                    {/* 2×2 Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onClick={() => setActive(project.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {activeProject && (
                    <ProjectDialog
                        project={activeProject}
                        onClose={() => setActive(null)}
                        t={t}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
