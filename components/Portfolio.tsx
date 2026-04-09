"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";

// Static config — content comes from translations
const projectsConfig = [
    { id: "ribeiro", image: "/proj/ribeiro_mockup.webp",          link: "https://ribeiroconsulting.ch/pt",      className: "md:col-span-2 md:row-span-2" },
    { id: "silvio",  image: "/proj/silvio_mockup.webp",           link: "https://www.silviovalentt.pt/",        className: "md:col-span-1 md:row-span-1" },
    { id: "safira",  image: "/proj/safira_reinigung_mockup.webp", link: "https://www.safira-reinigung.ch/",     className: "md:col-span-1 md:row-span-1" },
];

export default function Portfolio() {
    const t = useTranslations("Portfolio");

    return (
        <section id="portfolio" className="relative py-32 bg-[#080d1a] overflow-hidden">

            {/* Ambient glows — cyan + violet */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />
                <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[80px]" />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">

                {/* ── Header — staggered animations ── */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10"
                    >
                        {t("badge")}
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight font-[family-name:var(--font-display)]"
                    >
                        <span className="text-white">{t("titlePre")} </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                            {t("titleHighlight")}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg text-slate-400"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                {/* ── Bento Grid ── */}
                {/* Fix 5: gap-6 → gap-8 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[260px] md:auto-rows-[320px]">
                    {projectsConfig.map((project, idx) => {
                        const title       = t(`projects.${project.id}.title`);
                        const description = t(`projects.${project.id}.description`);
                        const category    = t(`projects.${project.id}.category`);
                        const isFeatured  = idx === 0;

                        return (
                            // Fix 1: Double-Bezel outer shell
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                // Fix 3: border glow + shadow elevation on hover
                                whileHover={{
                                    boxShadow: "0 20px 60px -12px rgba(6,182,212,0.2), 0 0 0 1px rgba(6,182,212,0.3)",
                                }}
                                className={clsx(
                                    // Outer shell: subtle bg + hairline ring + p-[1px] + large radius
                                    "group relative rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-[1px]",
                                    project.className
                                )}
                                style={{
                                    boxShadow: "0 8px 40px -8px rgba(0,0,0,0.5)",
                                    transition: "box-shadow 0.5s cubic-bezier(0.32,0.72,0,1)",
                                }}
                            >
                                {/* Fix 1: Double-Bezel inner core — overflow-hidden here keeps 3D-safe clipping */}
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full h-full relative cursor-pointer rounded-[calc(1.75rem-1px)] overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                >

                                    {/* Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={project.image}
                                            alt={`${title} — ${description}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                                    </div>

                                    {/* Content — Fix 7: featured card gets md:p-8 */}
                                    <div className={clsx(
                                        "absolute inset-0 flex flex-col justify-end p-6",
                                        isFeatured && "md:p-8"
                                    )}>
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                            <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                                                {/* Fix 6: rounded → rounded-full */}
                                                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider bg-black/70 px-2 py-1 rounded-full">
                                                    {category}
                                                </span>
                                                {/* Fix 4: ArrowRight slides on hover */}
                                                <ArrowRight className="w-5 h-5 text-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                                {title}
                                            </h3>
                                            <p className="text-sm text-slate-300 line-clamp-2 opacity-90">
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                                </a>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── CTA — consistent ghost link pattern ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium underline-offset-4 hover:underline transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    >
                        {t("button")}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
