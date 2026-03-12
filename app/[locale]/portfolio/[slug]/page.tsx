"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code, Clock, Pause, Circle } from "lucide-react";
import { projects } from "../projects";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const t = useTranslations('PortfolioPage');
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />

            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
                    <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6">
                    {/* Back Link */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {t('detail.backToPortfolio')}
                        </Link>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-10"
                    >
                        <Image
                            src={project.image}
                            alt={t(`projects.${project.slug}.title`)}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Project Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider border border-cyan-400/20">
                                {t(`projects.${project.slug}.category`)}
                            </span>
                            <span className="px-4 py-1.5 text-xs font-bold text-slate-300 bg-white/5 rounded-full uppercase tracking-wider border border-white/10">
                                {project.type === "web-app" ? t('detail.webApp') : t('detail.website')}
                            </span>
                            {project.link && !project.isInDevelopment && !project.isOnHold && (
                                <span className="px-4 py-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/10 rounded-full flex items-center gap-1.5 border border-emerald-500/20">
                                    <Circle className="w-2.5 h-2.5 fill-current" />
                                    {t('badges.live')}
                                </span>
                            )}
                            {project.isInDevelopment && (
                                <span className="px-4 py-1.5 text-xs font-bold text-purple-300 bg-purple-500/10 rounded-full flex items-center gap-1.5 border border-purple-500/20">
                                    <Code className="w-3 h-3" />
                                    {t('badges.inDevelopment')}
                                </span>
                            )}
                            {project.isOnHold && (
                                <span className="px-4 py-1.5 text-xs font-bold text-orange-300 bg-orange-500/10 rounded-full flex items-center gap-1.5 border border-orange-500/20">
                                    <Pause className="w-3 h-3" />
                                    {t('badges.onHold')}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                            {t(`projects.${project.slug}.title`)}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-3xl">
                            {t(`projects.${project.slug}.description`)}
                        </p>

                        {/* CTA */}
                        {project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg hover:shadow-[0_8px_25px_rgba(14,116,144,0.4)] hover:-translate-y-1 transition-all duration-300"
                            >
                                {t('detail.visitLiveSite')}
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        ) : (
                            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                                <Clock className="w-4 h-4" />
                                {t('badges.comingSoon')}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
