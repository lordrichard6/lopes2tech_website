"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceRequestDialog from "@/components/ServiceRequestDialog";
import { Check, Star, ArrowRight, Zap, Palette, Code, CreditCard, Calendar, Server, Rocket, AlertCircle } from "lucide-react";

type PaymentPlan = "onetime" | "3months" | "6months" | "12months";

const packageConfig = [
    { key: "starter",      price: 690,  popular: false, featureCount: 5 },
    { key: "professional", price: 1390, popular: true,  featureCount: 5 },
    { key: "businessPro",  price: 2450, popular: false, featureCount: 5 },
];

const paymentPlanConfig: { id: PaymentPlan; multiplier: number; description?: string; icon: typeof CreditCard }[] = [
    { id: "onetime",  multiplier: 1,    icon: CreditCard },
    { id: "3months",  multiplier: 1.05, description: "+5%",  icon: Calendar },
    { id: "6months",  multiplier: 1.10, description: "+10%", icon: Calendar },
    { id: "12months", multiplier: 1.15, description: "+15%", icon: Calendar },
];

export default function WebDesignPage() {
    const t = useTranslations("WebDesignPage");
    const tCommon = useTranslations("Common");

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

    return (
        <main className="min-h-screen bg-[#0f172a] relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

            <Navbar />

            <div className="fixed inset-0 z-0">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0f172a]/85" />
            </div>

            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <Code className="inline w-4 h-4 mr-2" />
                            {t("badge")}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            {t("title")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                {t("titleHighlight")}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">{t("description")}</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Zap className="w-5 h-5 text-cyan-400" />
                                <span className="text-white">{t("pill1")}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Palette className="w-5 h-5 text-purple-400" />
                                <span className="text-white">{t("pill2")}</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                <Check className="w-5 h-5 text-green-400" />
                                <span className="text-white">{t("pill3")}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Payment Plan Selector */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="flex justify-center mb-12 px-4"
                    >
                        <div className="flex overflow-x-auto items-center gap-2 p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-sm max-w-full scrollbar-none">
                            {paymentPlans.map((plan) => {
                                const isActive = selectedPlan === plan.id;
                                const IconComponent = plan.icon;
                                return (
                                    <motion.button
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan.id)}
                                        className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                                            isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="paymentPlanBg"
                                                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/20 rounded-xl"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <IconComponent className="w-4 h-4" />
                                            <span className="font-semibold whitespace-nowrap">{plan.label}</span>
                                            {plan.id !== "onetime" && (
                                                <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                                                    isActive ? 'bg-purple-500/30 text-purple-300' : 'bg-white/10 text-slate-500'
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

                    {/* Packages */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {packages.map((pkg, index) => {
                            const priceInfo = getAdjustedPrice(pkg.price);
                            return (
                                <motion.div
                                    key={pkg.key}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className={`relative rounded-3xl p-8 border transition-all duration-500 flex flex-col ${
                                        pkg.popular
                                            ? "bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                                            : "bg-slate-900/50 border-white/10 hover:border-white/20"
                                    }`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white text-sm font-bold shadow-lg">
                                                <Star className="w-4 h-4 fill-current" />
                                                {tCommon("mostPopular")}
                                            </div>
                                        </div>
                                    )}

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
                                                                CHF {priceInfo.total.toLocaleString()}
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
                                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? 'bg-purple-500' : 'bg-cyan-500/20'}`}>
                                                    <Check className={`w-3 h-3 ${pkg.popular ? 'text-white' : 'text-cyan-400'}`} />
                                                </div>
                                                <span className="text-slate-300 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleRequest(pkg.name)}
                                        className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                            pkg.popular
                                                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5'
                                                : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                    >
                                        {tCommon("getStarted")}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ==================== HOSTING & SUPPORT PLANS ==================== */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                        className="mt-20 text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <Server className="w-4 h-4" />
                            {t("hosting.badge")}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                            {t("hosting.title")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">{t("hosting.titleHighlight")}</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            {t("hosting.intro")}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {([
                            { key: "basic", price: 39, popular: false, isDefault: true, featureCount: 5 },
                            { key: "professional", price: 89, popular: true, isDefault: false, featureCount: 5 },
                            { key: "enterprise", price: 169, popular: false, isDefault: false, featureCount: 5 },
                        ]).map((pkg, index) => (
                            <motion.div
                                key={pkg.key}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className={`relative rounded-3xl p-8 border transition-all duration-500 flex flex-col ${
                                    pkg.popular
                                        ? 'bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)]'
                                        : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                                }`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full text-white text-sm font-bold shadow-lg">
                                            <Rocket className="w-4 h-4" />
                                            {t("hosting.recommended")}
                                        </div>
                                    </div>
                                )}
                                {pkg.isDefault && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                                            <Check className="w-4 h-4" />
                                            {t("hosting.defaultPlan")}
                                        </div>
                                    </div>
                                )}

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
                                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.popular ? 'bg-cyan-500' : 'bg-green-500/20'}`}>
                                                <Check className={`w-3 h-3 ${pkg.popular ? 'text-white' : 'text-green-400'}`} />
                                            </div>
                                            <span className="text-slate-300 text-sm">{t(`hosting.plans.${pkg.key}.f${i + 1}`)}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleRequest(t(`hosting.plans.${pkg.key}.name`))}
                                    className={`mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        pkg.popular
                                            ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                                >
                                    {tCommon("getStarted")}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Installment Note */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-3xl mx-auto mb-6"
                    >
                        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-200/80">{t("hosting.installmentNote")}</p>
                    </motion.div>

                    {/* Mandatory Hosting Note */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                        className="flex items-start gap-4 p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl backdrop-blur-sm max-w-3xl mx-auto mb-20"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-cyan-400 text-sm mb-1">{t("retainerLabel")}</p>
                            <p className="text-slate-400 text-sm leading-relaxed">{t("retainerDesc")}</p>
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
                        className="text-center p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-3xl backdrop-blur-sm"
                    >
                        <h2 className="text-3xl font-bold text-white mb-3">{t("cta.title")}</h2>
                        <p className="text-slate-400 mb-6">{t("cta.description")}</p>
                        <button
                            onClick={() => handleRequest("Web Design")}
                            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                        >
                            {t("cta.button")}
                        </button>
                    </motion.div>
                </div>
            </section>

            <Footer />

            <ServiceRequestDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} packageContext={selectedPackage} />
        </main>
    );
}
