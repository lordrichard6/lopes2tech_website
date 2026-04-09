"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import { Check, Star, ArrowRight, Zap, Palette, Code, CreditCard, Calendar, Server, Rocket, AlertCircle } from "lucide-react";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import RelatedServices from "@/components/RelatedServices";

import { webDesignPackages, paymentPlanConfig as paymentPlanData, type PaymentPlan } from "@/data/packages-data";

const EASE   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;

const packageConfig = webDesignPackages;

const paymentPlanConfig: { id: PaymentPlan; multiplier: number; description?: string; icon: typeof CreditCard }[] = paymentPlanData.map((p, i) => ({
    ...p,
    icon: i === 0 ? CreditCard : Calendar,
}));

export default function WebDesignPage() {
    const t = useTranslations("WebDesignPage");
    const tCommon = useTranslations("Common");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState("");
    const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>("onetime");

    const packages = packageConfig.map((cfg) => ({
        ...cfg,
        name:        t(`packages.${cfg.key}.name`),
        description: t(`packages.${cfg.key}.description`),
        features: Array.from({ length: cfg.featureCount }, (_, i) => t(`packages.${cfg.key}.f${i + 1}`)),
    }));

    const paymentPlans = paymentPlanConfig.map((cfg) => ({
        ...cfg,
        label: t(`paymentPlans.${cfg.id}`),
    }));

    const handleRequest = (pkgName: string) => {
        setSelectedPackage(pkgName);
        setIsDialogOpen(true);
    };

    const currentPlan = paymentPlans.find(p => p.id === selectedPlan)!;

    const getAdjustedPrice = (basePrice: number) => {
        const total = Math.round(basePrice * currentPlan.multiplier);
        if (selectedPlan === "onetime") return { total, perMonth: null, months: null };
        const months = selectedPlan === "3months" ? 3 : selectedPlan === "6months" ? 6 : 12;
        return { total, perMonth: Math.round(total / months), months };
    };

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Web Design Services",
        "description": "Professional website design and development for Zurich businesses. From simple one-page sites to complex multi-page business websites with CMS, SEO, and automation.",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Lopes2Tech",
            "address": { "@type": "PostalAddress", "addressLocality": "Zurich", "addressCountry": "CH" }
        },
        "areaServed": { "@type": "City", "name": "Zurich" },
        "offers": packages.map(pkg => ({
            "@type": "Offer",
            "name": pkg.name,
            "price": pkg.price,
            "priceCurrency": "CHF",
            "description": pkg.description,
            "availability": "https://schema.org/InStock"
        }))
    };

    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    return (
        <main className="min-h-screen bg-[#080d1a] relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <ServiceBreadcrumb serviceName={t("badge")} serviceSlug="web-design" />
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
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                                {t("titleHighlight")}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">{t("description")}</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Zap className="w-5 h-5 text-cyan-400" />
                                <span className="text-white text-sm">{t("pill1")}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Palette className="w-5 h-5 text-violet-400" />
                                <span className="text-white text-sm">{t("pill2")}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                <Code className="w-5 h-5 text-green-400" />
                                <span className="text-white text-sm">{t("pill3")}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Payment Plan Selector ─────────────────────────────── */}
                    <motion.div {...fadeIn(0.2)} className="flex justify-center mb-12 px-4">
                        <div className="flex overflow-x-auto items-center gap-2 p-1.5 bg-white/[0.04] border border-white/10 rounded-2xl max-w-full scrollbar-none">
                            {paymentPlans.map((plan) => {
                                const isActive = selectedPlan === plan.id;
                                const IconComponent = plan.icon;
                                return (
                                    <motion.button
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan.id)}
                                        whileTap={{ scale: 0.97 }}
                                        transition={SPRING}
                                        className={`relative px-4 py-3 rounded-xl font-medium flex items-center gap-2 flex-shrink-0 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                            isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="paymentPlanBg"
                                                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-white/20 rounded-xl"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <IconComponent className="w-4 h-4" />
                                            <span className="font-semibold whitespace-nowrap">{plan.label}</span>
                                            {plan.id !== "onetime" && (
                                                <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                                                    isActive ? "bg-violet-500/30 text-violet-300" : "bg-white/10 text-slate-500"
                                                }`}>
                                                    {plan.description}
                                                </span>
                                            )}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ── Packages ─────────────────────────────────────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {packages.map((pkg, index) => {
                            const priceInfo = getAdjustedPrice(pkg.price);
                            return (
                                <motion.div
                                    key={pkg.key}
                                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    viewport={VP}
                                    transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                                    className={`relative p-[1px] rounded-[2rem] ${
                                        pkg.popular
                                            ? "ring-1 ring-violet-500/30 bg-gradient-to-br from-violet-500/20 to-cyan-500/20"
                                            : "ring-1 ring-white/10 bg-white/[0.04]"
                                    }`}
                                    style={pkg.popular ? { boxShadow: "0 0 40px rgba(139,92,246,0.2)" } : undefined}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full text-white text-sm font-bold shadow-lg">
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
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={`${pkg.key}-${selectedPlan}`}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {priceInfo.perMonth ? (
                                                        <>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-4xl font-extrabold text-white">
                                                                    CHF {priceInfo.perMonth.toLocaleString()}
                                                                </span>
                                                                <span className="text-slate-400">/mo</span>
                                                            </div>
                                                            <p className="text-sm text-slate-500 mt-1">
                                                                CHF {priceInfo.total.toLocaleString()} {t("total")} · {priceInfo.months} {t("months")}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-baseline gap-1">
                                                                <span className="text-4xl font-extrabold text-white">
                                                                    {pkg.pricePrefix}CHF {priceInfo.total.toLocaleString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-slate-500 mt-1">{tCommon("oneTimePayment")}</p>
                                                        </>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? "bg-violet-500" : "bg-cyan-500/20"}`}>
                                                        <Check className={`w-3 h-3 ${pkg.popular ? "text-white" : "text-cyan-400"}`} />
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
                                                    ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
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
                            );
                        })}
                    </div>

                    {/* ── Hosting & Support Plans ───────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="mt-20 text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] border border-white/10">
                            <Server className="w-3 h-3" />
                            {t("hosting.badge")}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            {t("hosting.title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                                {t("hosting.titleHighlight")}
                            </span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t("hosting.intro")}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {([
                            { key: "basic",        price: 39,  popular: false, isDefault: true,  featureCount: 5 },
                            { key: "professional", price: 89,  popular: true,  isDefault: false, featureCount: 5 },
                            { key: "enterprise",   price: 169, popular: false, isDefault: false, featureCount: 5 },
                        ]).map((pkg, index) => (
                            <motion.div
                                key={pkg.key}
                                initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                viewport={VP}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                                className={`relative p-[1px] rounded-[2rem] ${
                                    pkg.popular
                                        ? "ring-1 ring-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-green-500/20"
                                        : "ring-1 ring-white/10 bg-white/[0.04]"
                                }`}
                                style={pkg.popular ? { boxShadow: "0 0 40px rgba(6,182,212,0.2)" } : undefined}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full text-white text-sm font-bold shadow-lg">
                                            <Rocket className="w-4 h-4" />
                                            {t("hosting.recommended")}
                                        </div>
                                    </div>
                                )}
                                {pkg.isDefault && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-bold shadow-lg">
                                            <Check className="w-4 h-4" />
                                            {t("hosting.defaultPlan")}
                                        </div>
                                    </div>
                                )}

                                <div className={`rounded-[calc(2rem-1px)] p-8 flex flex-col h-full ${
                                    pkg.popular
                                        ? "bg-[#080d1a]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                        : "bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                                }`}>
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{t(`hosting.plans.${pkg.key}.name`)}</h3>
                                        <p className="text-slate-400 text-sm leading-relaxed">{t(`hosting.plans.${pkg.key}.description`)}</p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-extrabold text-white">CHF {pkg.price}</span>
                                            <span className="text-slate-400">/mo</span>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">{t("hosting.billedMonthly")}</p>
                                    </div>

                                    <ul className="space-y-3 mb-8 flex-1">
                                        {Array.from({ length: pkg.featureCount }, (_, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? "bg-cyan-500" : "bg-green-500/20"}`}>
                                                    <Check className={`w-3 h-3 ${pkg.popular ? "text-white" : "text-green-400"}`} />
                                                </div>
                                                <span className="text-slate-300 text-sm">{t(`hosting.plans.${pkg.key}.f${i + 1}`)}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <motion.button
                                        onClick={() => handleRequest(t(`hosting.plans.${pkg.key}.name`))}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        transition={SPRING}
                                        className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold ${
                                            pkg.popular
                                                ? "bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
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

                    {/* Installment Note */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 10 } : {}) }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="flex items-start gap-3 p-4 rounded-[1.25rem] ring-1 ring-amber-500/20 bg-amber-500/10 max-w-3xl mx-auto mb-6"
                    >
                        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-amber-200/80">{t("hosting.installmentNote")}</p>
                    </motion.div>

                    {/* Mandatory Hosting Note */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 10 } : {}) }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
                        className="flex items-start gap-4 p-5 ring-1 ring-cyan-500/20 bg-cyan-500/5 rounded-[1.5rem] max-w-3xl mx-auto mb-20"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-cyan-400 text-sm mb-1">{t("retainerLabel")}</p>
                            <p className="text-slate-400 text-sm leading-relaxed">{t("retainerDesc")}</p>
                        </div>
                    </motion.div>

                    {/* ── CTA ──────────────────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={VP}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="text-center p-10 rounded-[2rem] ring-1 ring-white/10 bg-gradient-to-br from-cyan-500/10 to-violet-500/10"
                    >
                        <h2 className="text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
                        <p className="text-slate-400 mb-6">{t("cta.description")}</p>
                        <motion.button
                            onClick={() => handleRequest("Web Design")}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={SPRING}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
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
                items={[
                    { question: t("faq.q1"), answer: t("faq.a1") },
                    { question: t("faq.q2"), answer: t("faq.a2") },
                    { question: t("faq.q3"), answer: t("faq.a3") },
                    { question: t("faq.q4"), answer: t("faq.a4") },
                    { question: t("faq.q5"), answer: t("faq.a5") },
                    { question: t("faq.q6"), answer: t("faq.a6") },
                ]}
            />

            <RelatedServices currentSlug="web-design" />
            <Footer />
            <ServiceRequestDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} packageContext={selectedPackage} />
        </main>
    );
}
