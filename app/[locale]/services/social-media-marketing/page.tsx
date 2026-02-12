"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import { Check, Star, TrendingUp, Instagram, Facebook, Linkedin, Sparkles, ArrowRight, Zap } from "lucide-react";

const packages = [
    {
        name: "Social Starter",
        price: 249,
        description: "Perfect for small businesses getting started with social media",
        popular: false,
        features: [
            "8 high-quality posts per month",
            "1 platform (Instagram, Facebook, or LinkedIn)",
            "AI-assisted content creation",
            "Scheduling & publishing",
            "Monthly performance report",
            "You provide photos — we enhance with AI"
        ]
    },
    {
        name: "Social Growth",
        price: 399,
        description: "For businesses ready to scale their social presence",
        popular: true,
        features: [
            "12 posts per month",
            "2 platforms (e.g., Instagram + Facebook)",
            "Instagram Stories (4-8 per month)",
            "Basic engagement management",
            "Hashtag research & optimization",
            "Content calendar preview"
        ]
    },
    {
        name: "Social Pro",
        price: 579,
        description: "Complete social media management for ambitious brands",
        popular: false,
        features: [
            "16 posts per month",
            "3 platforms (Instagram + Facebook + LinkedIn)",
            "Full engagement management",
            "Monthly strategy call",
            "A/B testing & optimization",
            "Priority support"
        ]
    }
];

const addOns = [
    { name: "Extra Platform", price: 99, description: "Add another social channel", unit: "/mo" },
    { name: "Extra Reels/Videos", price: 79, description: "Additional video content", unit: "each" },
    { name: "Paid Ad Management", price: 199, description: "Manage Meta/LinkedIn ads", unit: "/mo" }
];

export default function SocialMediaMarketingPage() {
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
        "name": "Social Media Marketing Services",
        "description": "AI-powered social media management for Zurich businesses. Professional content creation, scheduling, and engagement management for Instagram, Facebook, and LinkedIn.",
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
            "availability": "https://schema.org/InStock",
            "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": pkg.price,
                "priceCurrency": "CHF",
                "unitText": "MONTH"
            }
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
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full backdrop-blur-sm">
                            <Sparkles className="inline w-4 h-4 mr-2" />
                            AI-Powered Social Media
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            Social Media Marketing{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400">
                                for Zurich Businesses
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                            Consistent, professional content powered by AI and refined by humans.
                            Grow your brand on Instagram, Facebook, and LinkedIn without the hassle.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Instagram className="w-5 h-5 text-pink-400" />
                                <span className="text-white">Instagram</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Facebook className="w-5 h-5 text-blue-400" />
                                <span className="text-white">Facebook</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Linkedin className="w-5 h-5 text-blue-400" />
                                <span className="text-white">LinkedIn</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Why Choose Us */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-20"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">AI-Powered Speed</h3>
                                <p className="text-slate-400">
                                    We create content 10x faster than traditional agencies using AI,
                                    passing cost savings to you (60-70% cheaper).
                                </p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Consistent Growth</h3>
                                <p className="text-slate-400">
                                    Never miss a post. Your brand stays active even when you're busy.
                                    8-16 posts per month, every month.
                                </p>
                            </div>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No Photoshoots</h3>
                                <p className="text-slate-400">
                                    You provide photos from your phone. We enhance them with professional
                                    AI tools. Simple, affordable, stunning results.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Packages */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-extrabold text-white mb-4">
                                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Plan</span>
                            </h2>
                            <p className="text-slate-400">All packages include AI-assisted content creation and monthly reporting</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {packages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className={`relative rounded-3xl p-8 border transition-all duration-500 ${
                                        pkg.popular
                                            ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                                            : "bg-slate-900/50 border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold shadow-lg">
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
                                            <span className="text-4xl font-extrabold text-white">CHF {pkg.price}</span>
                                            <span className="text-slate-400">/mo</span>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">Billed monthly</p>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                    pkg.popular ? 'bg-purple-500' : 'bg-purple-500/20'
                                                }`}>
                                                    <Check className={`w-3 h-3 ${pkg.popular ? 'text-white' : 'text-purple-400'}`} />
                                                </div>
                                                <span className="text-slate-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleRequest(pkg.name)}
                                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                            pkg.popular
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                    >
                                        Get Started
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* Add-Ons */}
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-xl font-bold text-white mb-4 text-center">Add-Ons</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {addOns.map((addon, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-white/10">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-semibold text-sm">{addon.name}</span>
                                            <span className="text-purple-400 font-bold">CHF {addon.price}{addon.unit}</span>
                                        </div>
                                        <p className="text-slate-400 text-xs">{addon.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 text-center p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl backdrop-blur-sm"
                    >
                        <h2 className="text-3xl font-bold text-white mb-3">
                            Ready to Grow Your Social Media?
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Book a free consultation to discuss your social media strategy
                        </p>
                        <button
                            onClick={() => handleRequest("Social Media Marketing")}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                        >
                            Start Your Social Strategy
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
