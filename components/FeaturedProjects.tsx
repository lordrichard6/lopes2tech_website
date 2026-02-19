"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

/* ─── Static project config (branding, assets, URLs) ───────── */
const projectsConfig = [
    {
        id: "mimesa",
        name: "miMesa",
        industryEmoji: "🍽️",
        industryColor: "#F5A623",
        logo: "/logos/mimesa_icon.png",
        logoSize: { w: 32, h: 32 },
        websiteUrl: "https://website-mimesa.vercel.app/",
        btn: {
            bg: "#2C1A0E",
            border: "#F5A623",
            text: "#F5A623",
            glow: "rgba(245,166,35,0.45)",
            ring: "rgba(245,166,35,0.25)",
        },
        accent: "#F5A623",
        checkColor: "#E05B1A",
        dialogBadgeBg: "bg-amber-50",
        dialogBadgeText: "text-amber-800",
        dialogBtn: "bg-[#2C1A0E] text-[#F5A623] hover:bg-[#3d2510] border border-[#F5A623]/50",
    },
    {
        id: "clinika",
        name: "ClíniKa OS",
        industryEmoji: "🏥",
        industryColor: "#71DCC6",
        logo: "/logos/clinika_logo.svg",
        logoSize: { w: 34, h: 36 },
        websiteUrl: "https://clinika-os.vercel.app/",
        btn: {
            bg: "#192C50",
            border: "#71DCC6",
            text: "#71DCC6",
            glow: "rgba(113,220,198,0.4)",
            ring: "rgba(113,220,198,0.2)",
        },
        accent: "#71DCC6",
        checkColor: "#71DCC6",
        dialogBadgeBg: "bg-cyan-50",
        dialogBadgeText: "text-cyan-900",
        dialogBtn: "bg-[#192C50] text-[#71DCC6] hover:bg-[#1e3660] border border-[#71DCC6]/50",
    },
    {
        id: "darkmonkey",
        name: "Dark Monkey",
        industryEmoji: "🛒",
        industryColor: "#C9A84C",
        logo: "/logos/darkmonkey_logo.webp",
        logoSize: { w: 40, h: 40 },
        websiteUrl: "https://dark-monkey.vercel.app/",
        btn: {
            bg: "#0D0D0D",
            border: "#C9A84C",
            text: "#C9A84C",
            glow: "rgba(201,168,76,0.45)",
            ring: "rgba(201,168,76,0.22)",
        },
        accent: "#C9A84C",
        checkColor: "#C9A84C",
        dialogBadgeBg: "bg-yellow-50",
        dialogBadgeText: "text-yellow-900",
        dialogBtn: "bg-[#0D0D0D] text-[#C9A84C] hover:bg-[#1a1a1a] border border-[#C9A84C]/50",
    },
    {
        id: "menteiq",
        name: "menteIQ",
        industryEmoji: "🤖",
        industryColor: "#7C3AED",
        logo: "/logos/menteiq_logo_white.svg",
        logoSize: { w: 48, h: 30 },
        websiteUrl: "https://menteiq.vercel.app/",
        btn: {
            bg: "#0A0B1E",
            border: "#7C3AED",
            text: "#A78BFA",
            glow: "rgba(124,58,237,0.45)",
            ring: "rgba(124,58,237,0.22)",
        },
        accent: "#7C3AED",
        checkColor: "#7C3AED",
        dialogBadgeBg: "bg-violet-50",
        dialogBadgeText: "text-violet-900",
        dialogBtn: "bg-[#0A0B1E] text-[#A78BFA] hover:bg-[#12143a] border border-[#7C3AED]/50",
    },
];

/* ─── Types ────────────────────────────────────────────────── */
type ProjectConfig = (typeof projectsConfig)[0];
type Project = ProjectConfig & {
    industryLabel: string;
    tagline: string;
    description: string;
    features: string[];
};

/* ─── Dialog ───────────────────────────────────────────────── */
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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Card */}
            <motion.div
                className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Colored top bar */}
                <div className="h-1.5 w-full" style={{ background: project.accent }} />

                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <Image
                                    src={project.logo}
                                    alt={`${project.name} logo`}
                                    width={project.logoSize.w}
                                    height={project.logoSize.h}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
                                    {project.id === "mimesa" ? "miMesa" : project.name}
                                </h3>
                                <span
                                    className={`inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full ${project.dialogBadgeBg} ${project.dialogBadgeText}`}
                                >
                                    {project.tagline}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 ml-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                        {project.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-7">
                        {project.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                                <Check
                                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                                    style={{ color: project.checkColor }}
                                />
                                <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Visit Website CTA */}
                    <Link
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 ${project.dialogBtn}`}
                    >
                        <ExternalLink className="w-4 h-4" />
                        {t("dialog.visitWebsite")}
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

/* ─── Project Card (label + button) ───────────────────────── */
function ProjectCard({
    project,
    onClick,
}: {
    project: Project;
    onClick: () => void;
}) {
    return (
        <div className="flex flex-col items-center gap-3">
            {/* Industry label */}
            <div
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border"
                style={{
                    background: `${project.industryColor}18`,
                    borderColor: `${project.industryColor}50`,
                    color: project.industryColor,
                }}
            >
                <span>{project.industryEmoji}</span>
                <span>{project.industryLabel}</span>
            </div>

            {/* Button */}
            <motion.button
                onClick={onClick}
                animate={{
                    boxShadow: [
                        `0 0 20px 4px ${project.btn.ring}, 0 4px 24px 0 rgba(0,0,0,0.18)`,
                        `0 0 36px 10px ${project.btn.glow}, 0 4px 24px 0 rgba(0,0,0,0.22)`,
                        `0 0 20px 4px ${project.btn.ring}, 0 4px 24px 0 rgba(0,0,0,0.18)`,
                    ],
                }}
                transition={{
                    boxShadow: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{
                    scale: 1.06,
                    boxShadow: `0 0 48px 14px ${project.btn.glow}, 0 8px 32px 0 rgba(0,0,0,0.28)`,
                    transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-4 rounded-2xl border-2 cursor-pointer select-none"
                style={{
                    background: project.btn.bg,
                    borderColor: project.btn.border,
                    color: project.btn.text,
                    minWidth: "200px",
                }}
            >
                <Image
                    src={project.logo}
                    alt={`${project.id} logo`}
                    width={project.logoSize.w}
                    height={project.logoSize.h}
                    className="object-contain flex-shrink-0"
                />
                <span className="text-xl font-extrabold tracking-tight leading-none">
                    {project.id === "mimesa" ? "iMesa" : project.name}
                </span>
            </motion.button>
        </div>
    );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function FeaturedProjects() {
    const t = useTranslations("FeaturedProjects");
    const [active, setActive] = useState<string | null>(null);

    // Merge static config with translated strings
    const projects: Project[] = projectsConfig.map((cfg) => {
        const pid = cfg.id as "mimesa" | "clinika" | "darkmonkey" | "menteiq";
        return {
            ...cfg,
            industryLabel: t(`projects.${pid}.industryLabel`),
            tagline: t(`projects.${pid}.tagline`),
            description: t(`projects.${pid}.description`),
            features: [0, 1, 2, 3, 4, 5, 6].map((i) =>
                t(`projects.${pid}.features.${i}`)
            ),
        };
    });

    const activeProject = projects.find((p) => p.id === active) ?? null;

    return (
        <>
            {/* bg-[#f3f0e7] matches Hero bottom wave + Services background exactly */}
            <section className="relative py-24 bg-[#f3f0e7] overflow-hidden">
                {/* Ambient glow blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-60px] left-[8%] w-[420px] h-[420px] rounded-full bg-amber-300/10 blur-[100px]" />
                    <div className="absolute bottom-[-40px] right-[6%] w-[360px] h-[360px] rounded-full bg-cyan-300/10 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-[1200px] mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#0f172a]/8 text-[#0f172a]/60 font-semibold text-sm mb-4 border border-[#0f172a]/10">
                            {t("badge")}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] tracking-tight mb-4">
                            {t("title")}{" "}
                            <span className="relative inline-block">
                                {t("titleHighlight")}
                                <span
                                    className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full"
                                    style={{ background: "linear-gradient(90deg, #F5A623, #C9A84C, #71DCC6)" }}
                                />
                            </span>
                        </h2>
                        <p className="text-lg text-[#64748b] max-w-xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </motion.div>

                    {/* Project Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-10"
                    >
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => setActive(project.id)}
                            />
                        ))}
                    </motion.div>

                    {/* Hint */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-[#0f172a]/40 text-sm mt-8"
                    >
                        {t("hint")}
                    </motion.p>
                </div>
            </section>

            {/* Dialog */}
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
