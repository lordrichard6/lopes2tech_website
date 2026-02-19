"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, AtSign, Code, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

// Gapless 3-Column Bento Grid Configuration
const projects = [
    {
        title: "MiMesa",
        description: "Gastronomy management platform.",
        image: "/proj/mimesa_mockup.png",
        category: "Web App",
        link: "https://website-mimesa.vercel.app/",
        className: "md:col-span-2 md:row-span-2", // Top Left (Large)
    },
    {
        title: "menteIQ",
        description: "Modern CRM platform.",
        image: "/proj/orbitcrm_mockup.png",
        category: "Web App",
        link: "https://orbitcrm-gilt.vercel.app/",
        className: "md:col-span-1 md:row-span-1", // Top Right (Top)
    },
    {
        title: "TheraFlow",
        description: "Practice management software.",
        image: "/proj/theraflow_mockup.png",
        category: "SaaS",
        link: "https://www.theraflow-crm.ch/",
        className: "md:col-span-1 md:row-span-1", // Top Right (Bottom)
    },
    {
        title: "Finito",
        description: "Financial management.",
        image: "/proj/finito_mockup.png",
        category: "Web App",
        link: "https://www.finitopro.ch/",
        className: "md:col-span-1 md:row-span-1", // Middle Row
    },
    {
        title: "Noff",
        description: "HR Tech solution.",
        image: "/proj/noff_mockup.png",
        category: "Web App",
        link: "https://noff.ch",
        className: "md:col-span-1 md:row-span-1", // Middle Row
    },
    {
        title: "Ribeiro Consulting",
        description: "Professional consulting.",
        image: "/proj/ribeiro_mockup.png",
        category: "Website",
        link: "https://ribeiroconsulting.ch/pt",
        className: "md:col-span-1 md:row-span-1", // Middle Row
    },
    {
        title: "Costeleta Dourada",
        description: "Restaurant booking.",
        image: "/proj/costeleta_mockup.png",
        category: "Website",
        link: "https://costeleta-dourada.vercel.app/",
        className: "md:col-span-1 md:row-span-2", // Bottom Left (Tall)
    },
    {
        title: "Forma Architects",
        description: "Minimalist portfolio.",
        image: "/proj/forma_mockup.png",
        category: "Website",
        link: "https://forma-architects-fawn.vercel.app/",
        className: "md:col-span-2 md:row-span-2", // Bottom Right (Large)
    },
    {
        title: "AlentSeguros",
        description: "Insurance portal.",
        image: "/proj/alentseguros_mockup.png",
        category: "Website",
        link: "https://alenteseguros.vercel.app/",
        className: "md:col-span-3 md:row-span-1", // Footer (Full Width)
    }
];

import { useTranslations } from "next-intl";

export default function Portfolio() {
    const t = useTranslations('Portfolio');

    return (
        <section id="portfolio" className="relative py-32 overflow-hidden bg-gradient-to-b from-[#0f172a] to-[#082f49]">

            {/* Top Wave Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="relative block w-full h-[120px]">
                    <path fill="#f3f0e7" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
                <div className="absolute bottom-[20%] right-[5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />

                {/* Subtle Floating Icons */}
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[10%] text-cyan-500/30 text-5xl"><Mail /></motion.div>
                <motion.div animate={{ y: [0, 25, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[25%] right-[10%] text-cyan-500/30 text-5xl"><Code /></motion.div>
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold text-sm mb-4 border border-cyan-500/20"
                    >
                        {t('badge')}
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-slate-400">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Bento Grid (3 Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            className={clsx(
                                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl",
                                project.className
                            )}
                        >
                            <Link href={project.link} target="_blank" className="block w-full h-full relative cursor-pointer">
                                {/* Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={project.image}
                                        alt={`${project.title} - ${project.description}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider bg-cyan-950/80 px-2 py-1 rounded backdrop-blur-md">
                                                {project.category}
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-slate-300 line-clamp-2 opacity-90">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-500/50 transition-all duration-300 group"
                    >
                        {t('button')}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>


            </div>
            {/* Bottom Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10 rotate-180">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#fff]" style={{ fill: '#ffffff' }}></path>
                </svg>
            </div>

        </section>
    );
}
