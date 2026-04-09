"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import { Check, Star, TrendingUp, Instagram, Facebook, Linkedin, Sparkles, ArrowRight, Zap, Search, Mail, Music2, MessageSquare, BarChart2, CalendarCheck } from "lucide-react";
import { Link } from "@/navigation";
import { socialMediaContentPackages, socialMediaAdPackages, socialMediaAddOns } from "@/data/packages-data";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import RelatedServices from "@/components/RelatedServices";

const EASE   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;

const contentPkgConfig = socialMediaContentPackages;

const adPkgConfig = socialMediaAdPackages.map((pkg) => ({
    ...pkg,
    icon: pkg.key === "metaAds" ? "meta" : pkg.key === "googleAds" ? "google" : "bundle",
}));

const addOnConfig = socialMediaAddOns;

export default function DigitalMarketingPage() {
    const t = useTranslations("DigitalMarketingPage");
    const tCommon = useTranslations("Common");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState("");
    const [currency, setCurrency] = useState<"CHF" | "EUR">("CHF");

    useEffect(() => {
        const match = document.cookie.match(/(?:^|;\s*)currency=([^;]+)/);
        if (match?.[1] === "EUR") setCurrency("EUR");
    }, []);

    const contentPackages = contentPkgConfig.map((cfg) => ({
        ...cfg,
        name:        t(`packages.${cfg.key}.name`),
        description: t(`packages.${cfg.key}.description`),
        features: [
            t(`packages.${cfg.key}.f1`),
            t(`packages.${cfg.key}.f2`),
            t(`packages.${cfg.key}.f3`),
            t(`packages.${cfg.key}.f4`),
            t(`packages.${cfg.key}.f5`),
            t(`packages.${cfg.key}.f6`),
        ],
    }));

    const adPackages = adPkgConfig.map((cfg) => ({
        ...cfg,
        name:        t(`packages.${cfg.key}.name`),
        description: t(`packages.${cfg.key}.description`),
        features: [
            t(`packages.${cfg.key}.f1`),
            t(`packages.${cfg.key}.f2`),
            t(`packages.${cfg.key}.f3`),
            t(`packages.${cfg.key}.f4`),
            t(`packages.${cfg.key}.f5`),
            t(`packages.${cfg.key}.f6`),
        ],
    }));

    const addOns = addOnConfig.map((cfg) => ({
        ...cfg,
        name:        t(`addOns.${cfg.key}.name`),
        description: t(`addOns.${cfg.key}.description`),
    }));

    const displayPrice = (pkg: { price: number; priceEUR?: number }) =>
        currency === "EUR" && pkg.priceEUR ? `EUR ${pkg.priceEUR}` : `CHF ${pkg.price}`;

    const handleRequest = (pkgName: string) => {
        setSelectedPackage(pkgName);
        setIsDialogOpen(true);
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Digital Marketing Services",
        "description": "AI-powered digital marketing for Zurich businesses. Professional content creation, ad campaigns, and social media management for Instagram, Facebook, and LinkedIn.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Lopes2Tech",
            "address": { "@type": "PostalAddress", "addressLocality": "Zurich", "addressCountry": "CH" }
        },
        "areaServed": [
            { "@type": "City", "name": "Zurich" },
            { "@type": "Country", "name": "Switzerland" }
        ],
        "offers": [...contentPackages, ...adPackages].map(pkg => ({
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

    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    return (
        <main className="min-h-screen bg-[#080d1a] relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <ServiceBreadcrumb serviceName={t("badge")} serviceSlug="social-media-marketing" />
            <Navbar />

            {/* Background video */}
            <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#080d1a]/90" />
            </div>

            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* ── Hero ─────────────────────────────────────────────── */}
                    <motion.div {...fadeIn(0)} className="text-center mb-16">
                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                            {t("badge")}
                        </div>
                        <h1
                            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold mb-6 text-white"
                            style={{ letterSpacing: "-0.02em" }}
                        >
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-pink-400">
                                {t("titleHighlight")}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">{t("description")}</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Instagram className="w-5 h-5 text-pink-400" />
                                <span className="text-white text-sm">Instagram</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Facebook className="w-5 h-5 text-blue-400" />
                                <span className="text-white text-sm">Facebook</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Linkedin className="w-5 h-5 text-blue-400" />
                                <span className="text-white text-sm">LinkedIn</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Search className="w-5 h-5 text-yellow-400" />
                                <span className="text-white text-sm">Google Ads</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Music2 className="w-5 h-5 text-pink-300" />
                                <span className="text-white text-sm">TikTok</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Why Choose Us ────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-16"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Zap,        gradient: "from-violet-500 to-pink-500",  title: t("whyUs.title1"), desc: t("whyUs.desc1") },
                                { icon: TrendingUp, gradient: "from-cyan-500 to-blue-500",    title: t("whyUs.title2"), desc: t("whyUs.desc2") },
                                { icon: Sparkles,   gradient: "from-green-500 to-emerald-500", title: t("whyUs.title3"), desc: t("whyUs.desc3") },
                            ].map(({ icon: Icon, gradient, title, desc }, i) => (
                                <div key={i} className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                    <div className="rounded-[calc(2rem-1px)] p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Stats Row ────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 20, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="grid grid-cols-3 gap-4 mb-16"
                    >
                        {[
                            { value: "5",   label: "Marketing channels in one place", color: "text-violet-400" },
                            { value: "48h", label: "Creative & content turnaround",   color: "text-pink-400"   },
                            { value: "0",   label: "Annual contracts required",        color: "text-emerald-400" },
                        ].map((stat, i) => (
                            <div key={i} className="p-[1px] rounded-[1.5rem] ring-1 ring-white/10 bg-white/[0.04]">
                                <div className="rounded-[calc(1.5rem-1px)] text-center p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                    <div className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
                                    <div className="text-slate-400 text-sm">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* ── How It Works ─────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 20, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-20"
                    >
                        <h2 className="text-2xl font-extrabold text-white text-center mb-8">Getting started is simple</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: MessageSquare, num: "1", title: "Free Strategy Call",    desc: "We learn about your business, goals, and ideal audience." },
                                { icon: Sparkles,      num: "2", title: "We Build the Plan",     desc: "Content calendar, ad strategy, or email sequence — tailored to you." },
                                { icon: CalendarCheck, num: "3", title: "You Approve",           desc: "Review everything before we go live. No surprises." },
                                { icon: BarChart2,     num: "4", title: "We Execute + Report",   desc: "Monthly performance report with clear metrics and next steps." },
                            ].map((step, i) => (
                                <div key={i} className="p-[1px] rounded-[1.5rem] ring-1 ring-white/10 bg-white/[0.04]">
                                    <div className="rounded-[calc(1.5rem-1px)] p-5 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] text-center">
                                        <div className="w-9 h-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-3">
                                            <span className="text-violet-400 font-black text-sm">{step.num}</span>
                                        </div>
                                        <h3 className="text-white font-bold text-sm mb-1">{step.title}</h3>
                                        <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Section 1: Content Management ────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="mb-24"
                    >
                        <div className="text-center mb-12">
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] border border-white/10">
                                {t("contentSection.badge")}
                            </div>
                            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
                                {t("contentSection.title")}{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                                    {t("contentSection.titleHighlight")}
                                </span>
                            </h2>
                            <p className="text-slate-400">{t("contentSection.description")}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {contentPackages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.key}
                                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={VP}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                                    className={`relative p-[1px] rounded-[2rem] ${
                                        pkg.popular
                                            ? "ring-1 ring-violet-500/30 bg-gradient-to-br from-violet-500/20 to-pink-500/20"
                                            : "ring-1 ring-white/10 bg-white/[0.04]"
                                    }`}
                                    style={pkg.popular ? { boxShadow: "0 0 40px rgba(139,92,246,0.2)" } : undefined}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full text-white text-sm font-bold shadow-lg">
                                                <Star className="w-4 h-4 fill-current" />
                                                {tCommon("mostPopular")}
                                            </div>
                                        </div>
                                    )}
                                    <div className={`rounded-[calc(2rem-1px)] p-8 flex flex-col h-full ${
                                        pkg.popular
                                            ? "bg-[#080d1a]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                            : "bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                    }`}>
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-extrabold text-white">{displayPrice(pkg)}</span>
                                                <span className="text-slate-400">/mo</span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1">{t("billedMonthly")}</p>
                                            <p className="text-xs text-slate-600 mt-0.5">3-month minimum · Month-to-month after</p>
                                        </div>
                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? "bg-violet-500" : "bg-violet-500/20"}`}>
                                                        <Check className={`w-3 h-3 ${pkg.popular ? "text-white" : "text-violet-400"}`} />
                                                    </div>
                                                    <span className="text-slate-300 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <motion.button
                                            onClick={() => handleRequest(pkg.name)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={SPRING}
                                            className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold ${
                                                pkg.popular
                                                    ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                                    : "bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                            }`}
                                        >
                                            {tCommon("getStarted")}
                                            <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Add-Ons */}
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-xl font-bold text-white mb-4 text-center">{t("addOnsTitle")}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {addOns.map((addon, idx) => (
                                    <div key={idx} className="p-[1px] rounded-[1.25rem] ring-1 ring-white/10 bg-white/[0.04]">
                                        <div className="rounded-[calc(1.25rem-1px)] p-4 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-white font-semibold text-sm">{addon.name}</span>
                                                <span className="text-violet-400 font-bold">CHF {addon.price}{addon.unit}</span>
                                            </div>
                                            <p className="text-slate-400 text-xs">{addon.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <div className="relative mb-24">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-6 py-2 bg-[#080d1a] text-slate-500 text-sm uppercase tracking-widest">or</span>
                        </div>
                    </div>

                    {/* ── Section 2: Paid Advertising ──────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.7, ease: EASE }}
                    >
                        <div className="text-center mb-12">
                            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] border border-white/10">
                                {t("adSection.badge")}
                            </div>
                            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
                                {t("adSection.title")}{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                                    {t("adSection.titleHighlight")}
                                </span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                {t("adSection.description")}{" "}
                                <span className="text-white font-medium">{t("adSection.adBudgetNote")}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {adPackages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.key}
                                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={VP}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                                    className={`relative p-[1px] rounded-[2rem] ${
                                        pkg.popular
                                            ? "ring-1 ring-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10"
                                            : "ring-1 ring-white/10 bg-white/[0.04]"
                                    }`}
                                    style={pkg.popular ? { boxShadow: "0 0 40px rgba(234,179,8,0.15)" } : undefined}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-sm font-bold shadow-lg">
                                                <Star className="w-4 h-4 fill-current" />
                                                {tCommon("mostPopular")}
                                            </div>
                                        </div>
                                    )}
                                    <div className={`rounded-[calc(2rem-1px)] p-8 flex flex-col h-full ${
                                        pkg.popular
                                            ? "bg-[#080d1a]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                            : "bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                    }`}>
                                        <div className="mb-6">
                                            <div className="flex items-center gap-3 mb-3">
                                                {pkg.icon === "meta" && (
                                                    <div className="flex gap-1">
                                                        <Instagram className="w-5 h-5 text-pink-400" />
                                                        <Facebook className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                )}
                                                {pkg.icon === "google" && <Search className="w-5 h-5 text-yellow-400" />}
                                                {pkg.icon === "bundle" && (
                                                    <div className="flex gap-1">
                                                        <Instagram className="w-5 h-5 text-pink-400" />
                                                        <Facebook className="w-5 h-5 text-blue-400" />
                                                        <Search className="w-5 h-5 text-yellow-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-extrabold text-white">{displayPrice(pkg)}</span>
                                                <span className="text-slate-400">/mo</span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1">{t("mgmtFee")}</p>
                                        </div>
                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? "bg-yellow-500" : "bg-yellow-500/20"}`}>
                                                        <Check className={`w-3 h-3 ${pkg.popular ? "text-white" : "text-yellow-400"}`} />
                                                    </div>
                                                    <span className="text-slate-300 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <motion.button
                                            onClick={() => handleRequest(pkg.name)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={SPRING}
                                            className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold ${
                                                pkg.popular
                                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                                    : "bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                            }`}
                                        >
                                            {tCommon("getStarted")}
                                            <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-center text-slate-500 text-sm mt-8">
                            {t("adSection.adBudgetDisclaimer")}
                        </p>
                    </motion.div>

                    {/* Divider */}
                    <div className="relative my-24">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-6 py-2 bg-[#080d1a] text-slate-500 text-sm uppercase tracking-widest">{t("coldEmail.divider")}</span>
                        </div>
                    </div>

                    {/* ── Section 3: Cold Email Outreach ───────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                        className="mb-24"
                    >
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] border border-white/10">
                                <Mail className="w-3 h-3" aria-hidden="true" />
                                {t("coldEmail.badge")}
                            </div>
                            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
                                {t("coldEmail.title")}{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                    {t("coldEmail.titleHighlight")}
                                </span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                {t("coldEmail.description")}{" "}
                                <span className="text-white font-medium">{t("coldEmail.descriptionHighlight")}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {([
                                { key: "starter", price: "CHF 390", isPro: false, popular: false },
                                { key: "growth",  price: "CHF 590", isPro: false, popular: true  },
                                { key: "pro",     price: "CHF 990", isPro: true,  popular: false },
                            ] as const).map((pkg, index) => (
                                <motion.div
                                    key={pkg.key}
                                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={VP}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                                    className={`relative p-[1px] rounded-[2rem] ${
                                        pkg.popular
                                            ? "ring-1 ring-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                                            : "ring-1 ring-white/10 bg-white/[0.04]"
                                    }`}
                                    style={pkg.popular ? { boxShadow: "0 0 40px rgba(34,211,238,0.15)" } : undefined}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white text-sm font-bold shadow-lg">
                                                <Star className="w-4 h-4 fill-current" />
                                                {t("coldEmail.mostPopular")}
                                            </div>
                                        </div>
                                    )}
                                    <div className={`rounded-[calc(2rem-1px)] p-8 flex flex-col h-full ${
                                        pkg.popular
                                            ? "bg-[#080d1a]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                            : "bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                    }`}>
                                        <div className="mb-3">
                                            <h3 className="text-2xl font-bold text-white mb-1">{t(`coldEmail.packages.${pkg.key}.name`)}</h3>
                                            <p className="text-slate-500 text-xs">{t(`coldEmail.packages.${pkg.key}.contacts`)} · {t(`coldEmail.packages.${pkg.key}.replies`)}</p>
                                        </div>
                                        <div className="mb-6">
                                            <div className="flex items-baseline gap-1">
                                                {pkg.isPro && (
                                                    <span className="text-slate-400 text-sm">{t("coldEmail.from")}</span>
                                                )}
                                                <span className="text-4xl font-extrabold text-white">{pkg.price}</span>
                                                <span className="text-slate-400">{t("coldEmail.perMonth")}</span>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-1">
                                                {pkg.isPro ? t("coldEmail.customPricing") : t("coldEmail.setupFee")}
                                            </p>
                                        </div>
                                        <ul className="space-y-3 mb-8 flex-1">
                                            {(t.raw(`coldEmail.packages.${pkg.key}.features`) as string[]).map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? "bg-cyan-500" : "bg-cyan-500/20"}`}>
                                                        <Check className={`w-3 h-3 ${pkg.popular ? "text-white" : "text-cyan-400"}`} />
                                                    </div>
                                                    <span className="text-slate-300 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <motion.button
                                            onClick={() => handleRequest(t(`coldEmail.packages.${pkg.key}.name`))}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            transition={SPRING}
                                            className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold ${
                                                pkg.popular
                                                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                                    : "bg-white/10 text-white hover:bg-white/20 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                            }`}
                                        >
                                            {t("coldEmail.getStarted")}
                                            <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-center text-slate-500 text-sm">
                            {t("coldEmail.footerNote")}{" "}
                            <Link href="/services/cold-email" className="text-cyan-400 hover:underline">
                                {t("coldEmail.footerLink")}
                            </Link>
                        </p>
                    </motion.div>

                    {/* ── CTA ──────────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-20 text-center p-10 rounded-[2rem] ring-1 ring-white/10 bg-gradient-to-br from-violet-500/10 to-pink-500/10"
                    >
                        <h2 className="text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
                        <p className="text-slate-400 mb-6">{t("cta.description")}</p>
                        <motion.button
                            onClick={() => handleRequest("Digital Marketing")}
                            aria-label="Get started with digital marketing"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={SPRING}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        >
                            {t("cta.button")}
                            <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        </motion.button>
                    </motion.div>

                </div>
            </section>

            <ServiceFAQ
                title={t("faq.title")}
                subtitle={t("faq.subtitle")}
                pageUrl="/services/social-media-marketing"
                items={[
                    { question: t("faq.q1"), answer: t("faq.a1") },
                    { question: t("faq.q2"), answer: t("faq.a2") },
                    { question: t("faq.q3"), answer: t("faq.a3") },
                    { question: t("faq.q4"), answer: t("faq.a4") },
                    { question: t("faq.q5"), answer: t("faq.a5") },
                    { question: t("faq.q6"), answer: t("faq.a6") },
                    { question: t("faq.q7"), answer: t("faq.a7") },
                    { question: t("faq.q8"), answer: t("faq.a8") },
                ]}
            />

            <RelatedServices currentSlug="social-media-marketing" />
            <Footer />
            <ServiceRequestDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} packageContext={selectedPackage} />
        </main>
    );
}
