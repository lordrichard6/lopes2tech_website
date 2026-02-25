"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import { Check, Star, ArrowRight, Search, FileCode, BarChart3 } from "lucide-react";

const packages = [
    {
        name: "SEO Audit",
        price: 450,
        period: null,
        prefix: null,
        description: "Full technical audit to uncover what's holding your rankings back",
        popular: false,
        features: [
            "Full technical audit",
            "Core Web Vitals report",
            "Schema markup analysis",
            "Competitor benchmarking",
            "Actionable recommendations"
        ]
    },
    {
        name: "SEO Starter",
        price: 750,
        period: "/mo",
        prefix: null,
        description: "Ongoing technical optimization to steadily improve your rankings",
        popular: false,
        features: [
            "Monthly technical optimization",
            "On-page SEO for up to 20 pages",
            "Google Search Console monitoring",
            "Monthly performance report",
            "Keyword tracking"
        ]
    },
    {
        name: "SEO Growth",
        price: 1200,
        period: "/mo",
        prefix: null,
        description: "Comprehensive SEO strategy with programmatic and advanced Schema",
        popular: true,
        features: [
            "Everything in Starter",
            "Programmatic SEO setup",
            "Advanced Schema implementation",
            "Content strategy & briefs",
            "Backlink analysis",
            "Priority support"
        ]
    }
];

export default function SEODevelopmentPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState("");

    const handleRequest = (pkgName: string) => {
        setSelectedPackage(pkgName);
        setIsDialogOpen(true);
    };

    // Service Schema for SEO
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "SEO Development Services",
        "description": "Technical SEO engineering for Swiss businesses. Core Web Vitals optimization, Schema markup, programmatic SEO, and ongoing search performance management.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Lopes2Tech",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Zurich",
                "addressCountry": "CH"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": "Zurich"
        },
        "offers": packages.map(pkg => ({
            "@type": "Offer",
            "name": pkg.name,
            "price": pkg.price,
            "priceCurrency": "CHF",
            "description": pkg.description,
            "availability": "https://schema.org/InStock"
        }))
    };

    return (
        <main className="min-h-screen bg-[#0f172a] relative">
            {/* Service Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <Navbar />

            {/* Video Background */}
            <div className="fixed inset-0 z-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0f172a]/85" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded-full backdrop-blur-sm">
                            <Search className="inline w-4 h-4 mr-2" />
                            Technical SEO Engineering
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            SEO Development{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                for Swiss Businesses
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Stop guessing. Start engineering your Google ranking. Technical SEO audits,
                            Schema markup, Core Web Vitals optimization, and programmatic SEO.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <BarChart3 className="w-5 h-5 text-green-400" />
                                <span className="text-white">Core Web Vitals</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <FileCode className="w-5 h-5 text-cyan-400" />
                                <span className="text-white">Schema Markup</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Check className="w-5 h-5 text-purple-400" />
                                <span className="text-white">SSR/SSG</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Packages */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className={`relative rounded-3xl p-8 border transition-all duration-500 ${
                                        pkg.popular
                                            ? "bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                                            : "bg-slate-900/50 border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white text-sm font-bold shadow-lg">
                                                <Star className="w-4 h-4 fill-current" />
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-extrabold text-white">
                                                {pkg.prefix && <span className="text-lg font-semibold text-slate-400">{pkg.prefix} </span>}
                                                CHF {pkg.price.toLocaleString()}
                                            </span>
                                            {pkg.period && <span className="text-slate-400">{pkg.period}</span>}
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">
                                            {pkg.period ? "Billed monthly" : "One-time payment"}
                                        </p>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                    pkg.popular ? 'bg-purple-500' : 'bg-cyan-500/20'
                                                }`}>
                                                    <Check className={`w-3 h-3 ${pkg.popular ? 'text-white' : 'text-cyan-400'}`} />
                                                </div>
                                                <span className="text-slate-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleRequest(pkg.name)}
                                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                            pkg.popular
                                                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                    >
                                        Get Started
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 text-center p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl backdrop-blur-sm"
                    >
                        <h2 className="text-3xl font-bold text-white mb-3">
                            Ready to Rank Higher?
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Book a free consultation to discuss your SEO strategy and start climbing the rankings.
                        </p>
                        <button
                            onClick={() => handleRequest("SEO Development")}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                        >
                            Start Your SEO Strategy
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />

            <ServiceRequestDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                packageContext={selectedPackage}
            />
        </main>
    );
}
