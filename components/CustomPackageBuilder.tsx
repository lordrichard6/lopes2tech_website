"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Minus, Sparkles, Calculator, ArrowRight, Settings2, CreditCard, Server } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { builderServicesData, builderColorMap, type BuilderService, type AddOn } from "@/lib/packages-data";
import ServiceRequestDialog from "./ServiceRequestDialog";

interface SelectedAddOns {
    [serviceId: string]: string[];
}

type PaymentPlan = "onetime" | "3months" | "6months";

export default function CustomPackageBuilder() {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOns>({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState<PaymentPlan>("onetime");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const t = useTranslations();

    const activeService = builderServicesData.find(s => s.id === selectedService);

    const toggleAddOn = (serviceId: string, addOnId: string) => {
        setSelectedAddOns(prev => {
            const current = prev[serviceId] || [];
            if (current.includes(addOnId)) {
                return { ...prev, [serviceId]: current.filter(id => id !== addOnId) };
            }
            return { ...prev, [serviceId]: [...current, addOnId] };
        });
    };

    const isAddOnSelected = (serviceId: string, addOnId: string) => {
        return selectedAddOns[serviceId]?.includes(addOnId) || false;
    };

    // Calculate total price
    const totalPrice = useMemo(() => {
        if (!selectedService || !activeService) return 0;

        let total = activeService.basePrice;
        const addOns = selectedAddOns[selectedService] || [];

        for (const addOnId of addOns) {
            const addOn = activeService.addOns.find(a => a.id === addOnId);
            if (addOn) total += addOn.price;
        }

        return total;
    }, [selectedService, selectedAddOns, activeService]);

    // Get selected items summary
    const selectedItemsSummary = useMemo(() => {
        if (!selectedService || !activeService) return [];

        const items = [{ name: activeService.name, price: activeService.basePrice, isBase: true }];
        const addOns = selectedAddOns[selectedService] || [];

        for (const addOnId of addOns) {
            const addOn = activeService.addOns.find(a => a.id === addOnId);
            if (addOn) items.push({ name: addOn.name, price: addOn.price, isBase: false });
        }

        return items;
        return items;
    }, [selectedService, selectedAddOns, activeService]);

    // Construct detailed quote message
    const quoteMessage = useMemo(() => {
        if (!selectedService || !activeService) return "";

        const addonsList = selectedItemsSummary
            .filter(item => !item.isBase)
            .map(item => `- ${t(item.name)}`)
            .join('\n');

        const monthlyPrice = paymentPlan === "3months"
            ? Math.ceil((totalPrice * 1.03) / 3)
            : Math.ceil((totalPrice * 1.05) / 6);

        const finalPrice = paymentPlan === "onetime"
            ? `CHF ${totalPrice.toLocaleString()}`
            : `CHF ${monthlyPrice.toLocaleString()}/mo (${paymentPlan === "3months" ? "3" : "6"} months)`;

        return `I would like to request a quote for a custom package:\n\n` +
            `Base Service: ${t(activeService.name)}\n` +
            (addonsList ? `Selected Add-ons:\n${addonsList}\n` : '') +
            `\nPayment Plan: ${t('Packages.payment.' + paymentPlan)}\n` +
            `Estimated Total: ${finalPrice}\n\n` +
            `Please contact me to discuss the details.`;
    }, [selectedService, activeService, selectedItemsSummary, paymentPlan, totalPrice, t]);

    return (
        <section className="relative py-20 overflow-hidden z-10">
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-green-400 bg-green-400/10 border border-green-400/20 rounded-full backdrop-blur-sm">
                        <Settings2 className="w-4 h-4" />
                        {t('CustomBuilder.badge')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        {t.rich('CustomBuilder.title', {
                            highlight: (chunks) => <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">{chunks}</span>
                        })}
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        {t('CustomBuilder.description')}
                    </p>
                </motion.div>

                {/* Builder Container */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Service Selection */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Step 1: Choose Base Service */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-bold">1</span>
                                {t('CustomBuilder.step1')}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                                {builderServicesData.map((service) => {
                                    const colors = builderColorMap[service.color];
                                    const isSelected = selectedService === service.id;
                                    const IconComponent = service.icon;

                                    return (
                                        <motion.button
                                            key={service.id}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSelectedService(service.id);
                                                setIsExpanded(true);
                                            }}
                                            className={`relative p-4 rounded-2xl border transition-all duration-300 text-left ${isSelected
                                                ? `border-white/30 shadow-[0_0_30px_${colors.glow}]`
                                                : 'border-white/10 hover:border-white/20'
                                                }`}
                                            style={{
                                                background: isSelected
                                                    ? `linear-gradient(135deg, ${colors.bg}, transparent)`
                                                    : 'rgba(15, 23, 42, 0.5)'
                                            }}
                                        >
                                            {/* Selection indicator */}
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                                                >
                                                    <Check className="w-4 h-4 text-white" />
                                                </motion.div>
                                            )}

                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                                                style={{ background: colors.bg }}
                                            >
                                                <IconComponent
                                                    className="w-5 h-5"
                                                    style={{ color: colors.to }}
                                                />
                                            </div>
                                            <h4 className="text-sm font-semibold text-white mb-1 leading-tight">{t(service.name)}</h4>
                                            <p className="text-xs text-slate-500">from CHF {service.basePrice.toLocaleString()}</p>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Step 2: Add-Ons */}
                        <AnimatePresence mode="wait">
                            {selectedService && activeService && (
                                <motion.div
                                    key={selectedService}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-bold">2</span>
                                        {t('CustomBuilder.step2')}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {activeService.addOns.map((addOn, index) => {
                                            const isActive = isAddOnSelected(selectedService, addOn.id);
                                            const colors = builderColorMap[activeService.color];
                                            const IconComponent = addOn.icon;

                                            return (
                                                <motion.button
                                                    key={addOn.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    whileHover={{ scale: 1.01 }}
                                                    whileTap={{ scale: 0.99 }}
                                                    onClick={() => toggleAddOn(selectedService, addOn.id)}
                                                    className={`relative p-4 rounded-xl border transition-all duration-300 text-left flex items-center gap-4 ${isActive
                                                        ? 'border-white/30 bg-white/5'
                                                        : 'border-white/10 hover:border-white/20 bg-slate-900/30'
                                                        }`}
                                                >
                                                    {/* Toggle Button */}
                                                    <div
                                                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive ? '' : 'border border-white/20'
                                                            }`}
                                                        style={{
                                                            background: isActive
                                                                ? `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                                                                : 'transparent'
                                                        }}
                                                    >
                                                        {isActive ? (
                                                            <Check className="w-5 h-5 text-white" />
                                                        ) : (
                                                            <Plus className="w-5 h-5 text-slate-500" />
                                                        )}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <h4 className="text-sm font-semibold text-white">{t(addOn.name)}</h4>
                                                            <span className="text-sm font-bold text-slate-400">+CHF {addOn.price}</span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-0.5">{t(addOn.description)}</p>
                                                    </div>
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    {/* Monthly Cost Note for AI Automation */}
                                    {activeService.hasMonthlyNote && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-amber-400 text-xs font-bold">!</span>
                                            </div>
                                            <p className="text-sm text-amber-200/80">
                                                <span className="font-semibold text-amber-300">Note:</span> {t('BuilderServices.notes.hasMonthlyNote')}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Price Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-24 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                    <Calculator className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{t('CustomBuilder.summary.title')}</h3>
                                    <p className="text-xs text-slate-500">{t('CustomBuilder.summary.subtitle')}</p>
                                </div>
                            </div>

                            {/* Empty State */}
                            {!selectedService && (
                                <div className="py-8 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                        <Sparkles className="w-8 h-8 text-slate-600" />
                                    </div>
                                    <p className="text-slate-500 text-sm">
                                        {t('CustomBuilder.summary.empty')}
                                    </p>
                                </div>
                            )}

                            {/* Selected Items */}
                            {selectedService && (
                                <>
                                    <div className="space-y-3 mb-6">
                                        {selectedItemsSummary.map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        {item.isBase ? (
                                                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                                                                <Check className="w-3 h-3 text-white" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                                                <Plus className="w-3 h-3 text-slate-400" />
                                                            </div>
                                                        )}
                                                        <span className={`text-sm ${item.isBase ? 'text-white font-medium' : 'text-slate-400'}`}>
                                                            {t(item.name)}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-slate-400">
                                                        CHF {item.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                {/* Show description for base service */}
                                                {item.isBase && activeService && (
                                                    <p className="text-xs text-slate-500 mt-1 ml-7">
                                                        {t(activeService.description)}
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-white/10 mb-4" />

                                    {/* Payment Plan Selector */}
                                    <div className="mb-4">
                                        <p className="text-xs text-slate-400 mb-2 flex items-center gap-2">
                                            <CreditCard className="w-3 h-3" />
                                            {t('CustomBuilder.summary.paymentPlan')}
                                        </p>
                                        <div className="flex gap-2">
                                            {[
                                                { key: "onetime", label: "Packages.payment.onetime" },
                                                { key: "3months", label: "Packages.payment.3months" },
                                                { key: "6months", label: "Packages.payment.6months" }
                                            ].map((plan) => (
                                                <motion.button
                                                    key={plan.key}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setPaymentPlan(plan.key as PaymentPlan)}
                                                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 ${paymentPlan === plan.key
                                                        ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-white'
                                                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                                                        }`}
                                                >
                                                    {t(plan.label)}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-lg font-bold text-white">
                                            {paymentPlan === "onetime" ? t('CustomBuilder.summary.total') : t("Packages.payment.monthly")}
                                        </span>
                                        <motion.span
                                            key={`${totalPrice}-${paymentPlan}`}
                                            initial={{ scale: 1.2, color: "#22d3ee" }}
                                            animate={{ scale: 1, color: "#ffffff" }}
                                            className="text-2xl font-extrabold text-white"
                                        >
                                            CHF {paymentPlan === "onetime"
                                                ? totalPrice.toLocaleString()
                                                : paymentPlan === "3months"
                                                    ? Math.ceil((totalPrice * 1.03) / 3).toLocaleString()
                                                    : Math.ceil((totalPrice * 1.05) / 6).toLocaleString()
                                            }
                                            {paymentPlan !== "onetime" && <span className="text-sm text-slate-400">/mo</span>}
                                        </motion.span>
                                    </div>

                                    {/* Monthly breakdown */}
                                    {paymentPlan !== "onetime" && (
                                        <p className="text-xs text-slate-500 mb-4">
                                            Total: CHF {paymentPlan === "3months"
                                                ? Math.ceil(totalPrice * 1.03).toLocaleString()
                                                : Math.ceil(totalPrice * 1.05).toLocaleString()
                                            } over {paymentPlan === "3months" ? "3" : "6"} months
                                            <span className="text-amber-400/80"> (+{paymentPlan === "3months" ? "3" : "5"}%)</span>
                                        </p>
                                    )}

                                    {/* Disclaimer */}
                                    <p className="text-xs text-slate-500 mb-4">
                                        {t('Packages.payment.disclaimer')}
                                    </p>

                                    {/* Support Note for Web Applications */}
                                    {activeService?.requiresSupport && (
                                        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                                            <Server className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                            <p className="text-xs text-blue-200/80">
                                                {t('BuilderServices.notes.monthlyCost')}
                                            </p>
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <button
                                        onClick={() => setIsDialogOpen(true)}
                                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        {t('CustomBuilder.requestQuote')}
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            <ServiceRequestDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                packageContext={activeService ? `Custom Builder: ${t(activeService.name)}` : 'Custom Builder'}
                customMessage={quoteMessage}
            />

        </section >
    );
}
