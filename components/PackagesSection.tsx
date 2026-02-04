"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ArrowRight, Package, CreditCard, Calendar, Server, Headphones, Rocket, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { packagesData } from "@/lib/packages-data";
import ServiceRequestDialog from "./ServiceRequestDialog";

type PaymentPlan = "onetime" | "3months" | "6months";

const paymentPlans = [
    { id: "onetime" as PaymentPlan, label: "One-Time", description: "Full payment", multiplier: 1, icon: CreditCard },
    { id: "3months" as PaymentPlan, label: "3 Months", description: "+5%", multiplier: 1.05, icon: Calendar },
    { id: "6months" as PaymentPlan, label: "6 Months", description: "+10%", multiplier: 1.10, icon: Calendar }
];

// Monthly Hosting & Support packages
const hostingPackages = [
    {
        key: "basic",
        name: "Packages.hosting.basic.name",
        price: 39,
        description: "Packages.hosting.basic.description",
        features: [
            "Packages.hosting.basic.features.0",
            "Packages.hosting.basic.features.1",
            "Packages.hosting.basic.features.2",
            "Packages.hosting.basic.features.3",
            "Packages.hosting.basic.features.4"
        ],
        isPopular: false
    },
    {
        key: "professional",
        name: "Packages.hosting.professional.name",
        price: 89,
        description: "Packages.hosting.professional.description",
        features: [
            "Packages.hosting.professional.features.0",
            "Packages.hosting.professional.features.1",
            "Packages.hosting.professional.features.2",
            "Packages.hosting.professional.features.3",
            "Packages.hosting.professional.features.4"
        ],
        isPopular: true
    },
    {
        key: "enterprise",
        name: "Packages.hosting.enterprise.name",
        price: 169,
        description: "Packages.hosting.enterprise.description",
        features: [
            "Packages.hosting.enterprise.features.0",
            "Packages.hosting.enterprise.features.1",
            "Packages.hosting.enterprise.features.2",
            "Packages.hosting.enterprise.features.3",
            "Packages.hosting.enterprise.features.4"
        ],
        isPopular: false
    }
];

export default function PackagesSection() {
    const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>("onetime");
    const t = useTranslations();
    const tNav = useTranslations('Navigation'); // If I need other namespaces
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPackageContext, setSelectedPackageContext] = useState("");

    const handleRequest = (pkgName: string) => {
        setSelectedPackageContext(pkgName);
        setIsDialogOpen(true);
    };

    // Show main 3 packages by default
    const mainPackages = packagesData.slice(0, 3);

    const paymentPlansLocal = [
        { id: "onetime" as PaymentPlan, label: "Packages.payment.onetime", description: "Packages.payment.disclaimer", multiplier: 1, icon: CreditCard },
        { id: "3months" as PaymentPlan, label: "Packages.payment.3months", description: "+5%", multiplier: 1.05, icon: Calendar },
        { id: "6months" as PaymentPlan, label: "Packages.payment.6months", description: "+10%", multiplier: 1.10, icon: Calendar }
    ];

    // Get current plan details
    const currentPlan = paymentPlansLocal.find(p => p.id === selectedPlan)!;

    // Calculate price based on selected plan
    const getAdjustedPrice = (basePrice: number) => {
        const total = Math.round(basePrice * currentPlan.multiplier);
        if (selectedPlan === "onetime") {
            return { total, perMonth: null, months: null };
        }
        const months = selectedPlan === "3months" ? 3 : 6;
        const perMonth = Math.round(total / months);
        return { total, perMonth, months };
    };

    return (
        <section className="relative py-20 overflow-hidden z-10">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full backdrop-blur-sm">
                        <Package className="w-4 h-4" />
                        {t('Packages.section.readyToGo')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        {t('Packages.section.easyTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{t('Packages.section.packagesTitle')}</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        {t('Packages.section.intro')}
                    </p>
                </motion.div>

                {/* Payment Plan Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-12 px-4"
                >
                    <div className="flex overflow-x-auto items-center gap-1 md:gap-2 p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl backdrop-blur-sm max-w-full scrollbar-none">
                        {paymentPlansLocal.map((plan) => {
                            const isActive = selectedPlan === plan.id;
                            const IconComponent = plan.icon;

                            return (
                                <motion.button
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={`relative px-3 md:px-5 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-2 flex-shrink-0 ${isActive
                                        ? 'text-white'
                                        : 'text-slate-400 hover:text-slate-200'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="paymentPlanBg"
                                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/20 rounded-xl"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                                        <IconComponent className="w-3 h-3 md:w-4 md:h-4" />
                                        <span className="text-sm md:text-base font-semibold whitespace-nowrap">{t(plan.label)}</span>
                                        {plan.id !== "onetime" && (
                                            <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full whitespace-nowrap ${isActive ? 'bg-purple-500/30 text-purple-300' : 'bg-white/10 text-slate-500'
                                                }`}>
                                                {plan.description.startsWith('Packages.') ? t(plan.description) : plan.description}
                                            </span>
                                        )}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {mainPackages.map((pkg, index) => {
                        const priceInfo = getAdjustedPrice(pkg.price);

                        return (
                            <motion.div
                                key={pkg.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredPackage(pkg.key)}
                                onMouseLeave={() => setHoveredPackage(null)}
                                className={`relative rounded-3xl p-8 border transition-all duration-500 ${pkg.isPopular
                                    ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]'
                                    : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                {/* Popular Badge */}
                                {pkg.isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white text-sm font-bold shadow-lg">
                                            <Star className="w-4 h-4 fill-current" />
                                            {t('Packages.section.mostPopular')}
                                        </div>
                                    </div>
                                )}

                                {/* Package Header */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">{t(pkg.name)}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{t(pkg.description)}</p>
                                </div>

                                {/* Price - Animated */}
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
                                                        CHF {priceInfo.total.toLocaleString()} {t('Packages.payment.total')} · {priceInfo.months} {t('Packages.payment.monthly')}
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-4xl font-extrabold text-white">
                                                            CHF {priceInfo.total.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 mt-1">{t('Packages.payment.onetime')}</p>
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((featureKey, idx) => (
                                        <motion.li
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.isPopular ? 'bg-purple-500' : 'bg-cyan-500/20'
                                                }`}>
                                                <Check className={`w-3 h-3 ${pkg.isPopular ? 'text-white' : 'text-cyan-400'}`} />
                                            </div>
                                            <span className="text-slate-300 text-sm">{t(featureKey)}</span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Target Badge */}
                                <div className="mb-6">
                                    <span className="inline-block px-3 py-1 text-xs font-medium text-slate-400 bg-white/5 rounded-full border border-white/10">
                                        Best for: {t(pkg.target)}
                                    </span>
                                </div>

                                {/* CTA Button */}
                                <button
                                    onClick={() => handleRequest(t(pkg.name))}
                                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${pkg.isPopular
                                        ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* View All Packages Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="text-slate-500 text-sm">
                        Also available: {t('Packages.landingPage.name')} (CHF 600) • {t('Packages.logoOnly.name')} (CHF 350) • {t('Packages.fullBrandKit.name')} (CHF 650)
                    </p>
                </motion.div>

                {/* ==================== HOSTING & SUPPORT PACKAGES ==================== */}

                {/* Hosting Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                        <Server className="w-4 h-4" />
                        {t('Packages.section.hostingBadge')}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        {t('Packages.section.hostingTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">{t('Packages.section.supportTitle')}</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        {t('Packages.section.hostingIntro')}
                    </p>
                </motion.div>

                {/* Hosting Packages Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {hostingPackages.map((pkg, index) => (
                        <motion.div
                            key={pkg.key}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-3xl p-8 border transition-all duration-500 ${pkg.isPopular
                                ? 'bg-gradient-to-br from-cyan-500/20 to-green-500/20 border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)]'
                                : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                                }`}
                        >
                            {/* Popular Badge */}
                            {pkg.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full text-white text-sm font-bold shadow-lg">
                                        <Rocket className="w-4 h-4" />
                                        {t('Packages.section.recommended')}
                                    </div>
                                </div>
                            )}

                            {/* Package Header */}
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{t(pkg.name)}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{t(pkg.description)}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white">
                                        CHF {pkg.price}
                                    </span>
                                    <span className="text-slate-400">{t('Packages.section.perMonth')}</span>
                                </div>
                                <p className="text-sm text-slate-500 mt-1">{t('Packages.section.billedMonthly')}</p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-3 mb-8">
                                {pkg.features.map((featureKey, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pkg.isPopular ? 'bg-cyan-500' : 'bg-green-500/20'
                                            }`}>
                                            <Check className={`w-3 h-3 ${pkg.isPopular ? 'text-white' : 'text-green-400'}`} />
                                        </div>
                                        <span className="text-slate-300 text-sm">{t(featureKey)}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            {pkg.key === "basic" ? (
                                <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                                    <Check className="w-4 h-4" />
                                    {t('Packages.section.defaultPlan')}
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleRequest(`Hosting: ${t(pkg.name)}`)}
                                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${pkg.isPopular
                                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    <Headphones className="w-4 h-4" />
                                    {t('Packages.section.upgradePlan')}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Installment Note */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-3xl mx-auto"
                >
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-200/80">
                        {t('Packages.section.installmentNote')}
                    </p>
                </motion.div>
            </div>

            <ServiceRequestDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                packageContext={selectedPackageContext}
            />

        </section>
    );
}

