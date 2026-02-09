"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { servicesData, colorMap } from "@/lib/services-data";

interface ServiceDialogProps {
    isOpen: boolean;
    onClose: () => void;
    serviceDataId: string;
    redirectHref: string;
}

export default function ServiceDialog({ isOpen, onClose, serviceDataId, redirectHref }: ServiceDialogProps) {
    const t = useTranslations();
    const [mounted, setMounted] = useState(false);
    // Track selected subcategory ID for content display
    const [selectedId, setSelectedId] = useState<string | null>(null);
    // Track hovered ID for expansion effect
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    // Track screen size for mobile optimization
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);



    const detailedService = servicesData.find(s => s.id === serviceDataId);
    const theme = detailedService ? colorMap[detailedService.color] : colorMap['cyan'];

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Do not select any subcategory by default
            // if (detailedService && detailedService.subcategories.length > 0) {
            //     setSelectedId(detailedService.subcategories[0].id);
            // }
        } else {
            document.body.style.overflow = 'unset';
            setSelectedId(null);
            setHoveredId(null);
        }
        return () => {
            document.body.style.overflow = 'unset';
            setMounted(false);
        };
    }, [isOpen, detailedService]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!mounted || !detailedService) return null;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                duration: 0.5,
                bounce: 0.2
            }
        },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: "easeOut" as const }
        },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-[100]"
                    />

                    {/* Dialog Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-[#0f172a] w-full max-w-4xl max-h-[85vh] flex flex-col rounded-[24px] shadow-2xl pointer-events-auto relative border border-white/10 overflow-hidden"
                        >
                            {/* Decorative Background Elements - Reduced spread */}
                            <div className="absolute top-0 left-0 w-full h-[180px] overflow-hidden pointer-events-none">
                                <div
                                    className="absolute -top-[120px] -right-[50px] w-[350px] h-[350px] rounded-full blur-[90px] opacity-25 mix-blend-screen"
                                    style={{ backgroundColor: theme.from }}
                                />
                                <div
                                    className="absolute -top-[100px] -left-[80px] w-[300px] h-[300px] rounded-full blur-[80px] opacity-15 mix-blend-screen"
                                    style={{ backgroundColor: theme.to }}
                                />
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-all z-50 backdrop-blur-md border border-white/5"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Content Wrapper */}
                            <div className="flex flex-col h-full overflow-hidden">

                                {/* Header Section */}
                                <div className="p-6 md:p-8 pb-2 relative shrink-0">
                                    <div className="flex flex-col md:flex-row gap-5 items-start">
                                        <div className="relative shrink-0">
                                            <div
                                                className="absolute inset-0 rounded-xl blur-lg opacity-40"
                                                style={{ backgroundColor: theme.from }}
                                            />
                                            <div
                                                className="relative w-14 h-14 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-xl shadow-lg bg-gradient-to-br from-white/10 to-white/5"
                                            >
                                                <detailedService.icon
                                                    className="w-7 h-7 drop-shadow-lg"
                                                    style={{ color: theme.to }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-white/80">
                                                    {t('ServicesSection.title')}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                                {t(detailedService.title)}
                                            </h2>
                                            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
                                                {t(`ServicesSection.items.${serviceDataId === 'websites' ? 'web' : serviceDataId === 'landing' ? 'marketing' : serviceDataId === 'webapps' ? 'apps' : serviceDataId}.description`)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation (Icon Tabs) */}
                                <div className="px-6 md:px-8 pt-6 pb-2 shrink-0">
                                    <div className="flex flex-wrap gap-6">
                                        {detailedService.subcategories.map((sub) => {
                                            const isSelected = selectedId === sub.id;
                                            const isHovered = hoveredId === sub.id;
                                            // Expand if selected OR hovered OR mobile
                                            const isExpanded = isSelected || isHovered || isMobile;

                                            return (
                                                <motion.button
                                                    key={sub.id}
                                                    layout
                                                    onClick={() => setSelectedId(sub.id)}
                                                    onMouseEnter={() => !isMobile && setHoveredId(sub.id)}
                                                    onMouseLeave={() => !isMobile && setHoveredId(null)}
                                                    className={clsx(
                                                        "relative h-14 rounded-xl border flex items-center overflow-hidden transition-colors duration-300",
                                                        isSelected
                                                            ? "bg-white/[0.08] border-white/20 shadow-lg shadow-black/20"
                                                            : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] hover:border-white/10"
                                                    )}
                                                    initial={false}
                                                    animate={{
                                                        width: isExpanded ? "auto" : 56, // 56px = h-14
                                                        paddingRight: isExpanded ? 20 : 0
                                                    }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                                >
                                                    {/* Icon Container - Fixed functionality */}
                                                    <div className="w-14 h-14 flex items-center justify-center shrink-0">
                                                        <sub.icon className={clsx(
                                                            "w-6 h-6 transition-colors duration-300",
                                                            isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                                                        )} />
                                                    </div>

                                                    {/* Title - Only visible when expanded */}
                                                    <motion.div
                                                        className="whitespace-nowrap overflow-hidden"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: isExpanded ? 1 : 0 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <span className={clsx(
                                                            "text-sm font-semibold pr-2",
                                                            isSelected ? "text-white" : "text-slate-300"
                                                        )}>
                                                            {t(sub.title)}
                                                        </span>
                                                    </motion.div>

                                                    {/* Active Indicator Pulse (only if NOT selected but hovered? No, keep simple) */}
                                                    {/* Selected Indicator Bottom Border */}
                                                    {isSelected && (
                                                        <motion.div
                                                            layoutId="activeTabIndicator"
                                                            className="absolute bottom-0 left-0 h-0.5 w-full"
                                                            style={{
                                                                background: `linear-gradient(90deg, ${theme.from}, ${theme.to})`
                                                            }}
                                                        />
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <AnimatePresence>
                                    {selectedId && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 md:p-8 pt-4">
                                                <div className="bg-black/20 rounded-2xl border border-white/5 p-6 md:p-8">
                                                    <motion.div
                                                        key={selectedId}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {(() => {
                                                            const activeSub = detailedService.subcategories.find(s => s.id === selectedId);
                                                            if (!activeSub) return null;

                                                            return (
                                                                <div className="space-y-6">
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                                                            <activeSub.icon className="w-5 h-5 text-zinc-300" />
                                                                        </div>
                                                                        <h3 className="text-xl font-bold text-white">
                                                                            {t(activeSub.title)}
                                                                        </h3>
                                                                    </div>

                                                                    <div className="h-[1px] w-full bg-white/5" />

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {activeSub.offerings.map((offering) => (
                                                                            <div
                                                                                key={offering.id}
                                                                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                                                                            >
                                                                                <CheckCircle2
                                                                                    className="w-5 h-5 shrink-0 mt-0.5"
                                                                                    style={{ color: theme.to }}
                                                                                />
                                                                                <span className="text-slate-300 text-sm leading-relaxed">
                                                                                    {t(offering.title)}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })()}
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Footer / CTA */}
                                <div className="p-4 md:p-6 border-t border-white/5 bg-[#0f172a]/95 shrink-0 flex justify-end gap-3 z-20">
                                    <button
                                        onClick={onClose}
                                        className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                                    >
                                        Close
                                    </button>
                                    <Link
                                        href={redirectHref}
                                        onClick={onClose}
                                        className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-white/10 border border-white/10 hover:bg-white/20 transition-all flex items-center gap-2 group"
                                    >
                                        <span>{t("ServicesSection.learnMore")}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
