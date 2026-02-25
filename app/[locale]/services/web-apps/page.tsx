"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import { Check, Star, ArrowRight, AppWindow, Code, Cloud } from "lucide-react";

const packages = [
    {
        name: "MVP Launch",
        price: 3500,
        period: null,
        prefix: null,
        description: "Get your idea to market fast with a lean, functional MVP",
        popular: false,
        features: [
            "Core feature set",
            "User authentication",
            "Basic dashboard",
            "Responsive design",
            "1 month post-launch support"
        ]
    },
    {
        name: "Standard Platform",
        price: 7500,
        period: null,
        prefix: null,
        description: "Full-featured platform with payments, i18n, and CI/CD pipeline",
        popular: true,
        features: [
            "Everything in MVP",
            "Payment integration (Stripe)",
            "Multi-language (i18n)",
            "Role-based access",
            "CI/CD pipeline",
            "3 months support"
        ]
    },
    {
        name: "Enterprise",
        price: 15000,
        period: null,
        prefix: "From",
        description: "Enterprise-grade platform with multi-tenant architecture and SLA",
        popular: false,
        features: [
            "Everything in Standard",
            "Custom integrations",
            "Advanced analytics",
            "Multi-tenant architecture",
            "SLA guarantee",
            "Ongoing maintenance"
        ]
    }
];

export default function WebAppsPage() {
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
        "name": "Custom Web Application Development",
        "description": "Full-stack custom web application development for Swiss businesses. SaaS platforms, dashboards, client portals, and APIs built with React, Next.js, and TypeScript.",
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
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <AppWindow className="inline w-4 h-4 mr-2" />
                            Full-Stack Development
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            Custom Web Apps{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                Built for Scale
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            From MVPs to enterprise platforms. Full-stack SaaS applications, dashboards,
                            client portals, and APIs built with modern technology.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Code className="w-5 h-5 text-cyan-400" />
                                <span className="text-white">React/Next.js</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <AppWindow className="w-5 h-5 text-blue-400" />
                                <span className="text-white">TypeScript</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Cloud className="w-5 h-5 text-purple-400" />
                                <span className="text-white">Cloud-Native</span>
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
                                            {pkg.period ? "Billed monthly" : pkg.prefix ? "Custom pricing" : "One-time payment"}
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
                            Ready to Build?
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Book a free consultation to scope your project and get a detailed roadmap.
                        </p>
                        <button
                            onClick={() => handleRequest("Custom Web App")}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                        >
                            Start Your Project
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
