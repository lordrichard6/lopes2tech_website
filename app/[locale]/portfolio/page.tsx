"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, Layers, Monitor, ArrowRight, Code } from "lucide-react";

interface Project {
    title: string;
    description: string;
    image: string;
    category: string;
    type: "web-app" | "website";
    link?: string;
    isInDevelopment?: boolean;
}

const projects: Project[] = [
    // Web Apps
    {
        title: "miMesa - Restaurant OS",
        description: "The operating system for modern restaurants. Handle reservations, tables, and guests with elegance. Designed to save time and increase revenue.",
        image: "/proj/mimesa_mockup.png",
        category: "Gastronomy & Reservations",
        type: "web-app",
        link: "https://website-mimesa.vercel.app/",
        isInDevelopment: true
    },
    {
        title: "DraftMode CRM",
        description: "Modern CRM platform designed for consultants and small to medium companies. Real answers, streamlined workflows.",
        image: "/proj/draftmode_mockup.png",
        category: "CRM for Consultants",
        type: "web-app",
        isInDevelopment: true
    },
    {
        title: "Pali AI",
        description: "Next-Gen Personal Assistant with Contextual Awareness.",
        image: "/proj/pali_mockup.png",
        category: "AI Application",
        type: "web-app",
        isInDevelopment: true
    },
    {
        title: "OrbitCRM - AI-Powered Customer Management",
        description: "Modern CRM platform with AI-powered search, context awareness, and seamless automation for small to medium businesses.",
        image: "/proj/orbitcrm_mockup.png",
        category: "CRM Platform",
        type: "web-app",
        link: "https://orbitcrm-gilt.vercel.app/",
        isInDevelopment: true
    },
    {
        title: "TheraFlow CRM - Practice Management for Therapists",
        description: "The all-in-one secure platform for scheduling, client records, and billing. Designed for therapists, coaches, and clinics to simplify administration and ensure GDPR compliance.",
        image: "/proj/theraflow_mockup.png",
        category: "HealthTech SaaS",
        type: "web-app",
        link: "https://www.theraflow-crm.ch/"
    },
    {
        title: "Finito Pro - Swiss Craft Management",
        description: "The all-in-one digital solution for Swiss craft businesses. Features project management, QR-invoicing, time tracking, and resource planning. 100% Swiss Made & Secure.",
        image: "/proj/finito_mockup.png",
        category: "SaaS for Craftsmen",
        type: "web-app",
        link: "https://www.finitopro.ch/"
    },
    {
        title: "Noff - Smart Communication & Hiring",
        description: "A digital business card and team optimization platform. Features scientific personality analysis (FHNW) to improve collaboration and smart recruitment tools for finding the perfect cultural fit.",
        image: "/proj/noff_mockup.png",
        category: "Digital Business Card",
        type: "web-app",
        link: "https://noff.ch/"
    },
    // Websites
    {
        title: "Ribeiro Consulting - Strategic Business Integration",
        description: "Integrated management, accounting, and financial consulting for Swiss SMEs and individuals. Provides certified insurance mediation (VBV), tax optimization, and strategic administrative support.",
        image: "/proj/ribeiro_mockup.png",
        category: "Business Consulting",
        type: "website",
        link: "https://ribeiroconsulting.ch/pt"
    },
    {
        title: "Costeleta Dourada - Authentic Alentejo Dining",
        description: "A traditional Alentejo restaurant website showcasing their menu and providing an easy table booking system.",
        image: "/proj/costeleta_mockup.png",
        category: "Gastronomy & Reservations",
        type: "website",
        link: "https://costeleta-dourada.vercel.app/"
    },
    {
        title: "FORMA - Architecture Studio",
        description: "Modern architecture firm website showcasing innovative designs, sustainable building solutions, and award-winning projects that shape the future of urban spaces.",
        image: "/proj/forma_mockup.png",
        category: "Architecture & Design",
        type: "website",
        link: "https://forma-architects-fawn.vercel.app/"
    },
    {
        title: "Alentseguros - Certified Insurance Portal",
        description: "A modern digital platform for insurance management. Features a secure client portal, instant quote requests, and multi-channel support for comprehensive personal and business coverage.",
        image: "/proj/alentseguros_mockup.png",
        category: "Insurance & FinTech",
        type: "website",
        link: "https://alenteseguros.vercel.app/"
    },
    {
        title: "Silvio Photography - Art & Emotion",
        description: "Professional photography portfolio specializing in portraits, events, and commercial branding. Capturing authentic stories and visual narratives across Lisbon and Portugal.",
        image: "/proj/silvio_mockup.png",
        category: "Photography Portfolio",
        type: "website",
        link: "https://silviophotography.com/"
    },
    {
        title: "Apex Consulting - Strategy & Growth",
        description: "Professional consulting agency website focusing on clarity, trust, and corporate excellence. Featuring a clean, modern design that communicates authority and expertise.",
        image: "/proj/apex_consulting_mockup.png",
        category: "Business Consulting",
        type: "website",
        link: "https://apex-consulting-iota.vercel.app/"
    },
    {
        title: "Nexus Accounting",
        description: "Professional accounting and financial services website built with Next.js.",
        image: "/proj/nexus_accounting_mockup.png",
        category: "Accounting & Finance",
        type: "website",
        link: "https://nexus-accounting-ten.vercel.app/"
    },
    {
        title: "Elite Estates - Luxury Real Estate",
        description: "Exclusive real estate website showcasing ultra-premium properties worldwide. Features elegant black and gold design, sophisticated property search, and white-glove concierge services for discerning clientele.",
        image: "/proj/elite_estates_mockup.png",
        category: "Luxury Real Estate",
        type: "website",
        link: "https://elite-estates-psi.vercel.app/"
    },
    {
        title: "Serene Spa - Holistic Wellness",
        description: "A tranquil wellness website featuring a calming sage green aesthetic, detailed treatment menus, and an elegant booking experience. Designed to embody peace and rejuvenation.",
        image: "/proj/serene_spa_mockup.png",
        category: "Wellness & Luxury",
        type: "website",
        link: "https://serene-spa-tawny.vercel.app/"
    }
];

export default function PortfolioPage() {
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
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />

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
                    {/* Vignette to soften edges */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 0%, #0f172a 90%)'
                        }}
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
                            Our Work
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            Success Stories &{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                Digital Excellence
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-4">
                            Our portfolio represents a fusion of robust solutions built for ambitious clients and proprietary ventures developed in-house.
                        </p>
                        <p className="text-lg text-slate-500 max-w-3xl mx-auto">
                            From enterprise-grade CRM dashboards to immersive brand experiences, our portfolio reflects our commitment to Swiss precision and innovation.
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
                                Web Apps
                            </button>
                            <button
                                onClick={() => handleFilterChange("website")}
                                className={`relative z-10 px-6 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center gap-2 ${activeFilter === "website"
                                    ? "text-white"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                <Monitor className="w-4 h-4" />
                                Websites
                            </button>
                            <div
                                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-transform duration-300 ${activeFilter === "website" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                                    }`}
                            />
                        </div>
                    </motion.div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {paginatedProjects.map((project, idx) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500"
                            >
                                <Link
                                    href={project.link || "#"}
                                    target={project.link ? "_blank" : undefined}
                                    className="block"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                                        {/* In Development Badge */}
                                        {project.isInDevelopment && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-purple-500/90 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1">
                                                <Code className="w-3 h-3" />
                                                In Development
                                            </div>
                                        )}

                                        {/* View Project Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold flex items-center gap-2">
                                                View Project
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold text-cyan-400 bg-cyan-400/10 rounded-full uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

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

            <Footer />
        </main>
    );
}
