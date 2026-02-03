"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, X } from "lucide-react";
import { servicesData, colorMap, ServiceOffering } from "@/lib/services-data";

export default function MobileServices() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
    const [selectedOffering, setSelectedOffering] = useState<ServiceOffering | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const toggleCategory = (id: string) => {
        if (expandedCategory === id) {
            setExpandedCategory(null);
            setExpandedSubcategory(null);
        } else {
            setExpandedCategory(id);
            setExpandedSubcategory(null);
        }
    };

    const toggleSubcategory = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setExpandedSubcategory(expandedSubcategory === id ? null : id);
    };

    const handleOfferingClick = (e: React.MouseEvent, offering: ServiceOffering) => {
        e.stopPropagation();
        setSelectedOffering(offering);
        setDetailsOpen(true);
    };

    return (
        <div className="w-full space-y-4 px-4 pb-20">
            {servicesData.map((category) => {
                const isExpanded = expandedCategory === category.id;
                const colors = colorMap[category.color];

                return (
                    <motion.div
                        key={category.id}
                        initial={false}
                        animate={{ backgroundColor: isExpanded ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.4)' }}
                        className={`rounded-2xl border transition-colors overflow-hidden ${isExpanded ? 'border-white/20' : 'border-white/10 hover:border-white/20'
                            }`}
                        style={{
                            boxShadow: isExpanded ? `0 0 20px ${colors.glow}` : 'none'
                        }}
                    >
                        {/* Main Category Header */}
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between p-5 text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
                                >
                                    <category.icon className="w-6 h-6" />
                                </div>
                                <span className={`text-xl font-bold ${isExpanded ? 'text-white' : 'text-slate-300'}`}>
                                    {category.title}
                                </span>
                            </div>
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className={`w-6 h-6 ${isExpanded ? 'text-white' : 'text-slate-500'}`} />
                            </motion.div>
                        </button>

                        {/* Subcategories Dropdown */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden bg-white/5"
                                >
                                    <div className="p-4 pt-0 space-y-2">
                                        {category.subcategories.map((sub) => {
                                            const isSubExpanded = expandedSubcategory === sub.id;

                                            return (
                                                <div
                                                    key={sub.id}
                                                    className="rounded-xl overflow-hidden bg-[#0f172a] border border-white/5"
                                                >
                                                    {/* Subcategory Header */}
                                                    <button
                                                        onClick={(e) => toggleSubcategory(e, sub.id)}
                                                        className="w-full flex items-center justify-between p-4 pl-4 text-left"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <sub.icon className="w-5 h-5 text-slate-400" />
                                                            <span className={`font-semibold ${isSubExpanded ? 'text-white' : 'text-slate-400'}`}>
                                                                {sub.title}
                                                            </span>
                                                        </div>
                                                        <motion.div
                                                            animate={{ rotate: isSubExpanded ? 180 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <ChevronDown className="w-4 h-4 text-slate-500" />
                                                        </motion.div>
                                                    </button>

                                                    {/* Offerings Dropdown */}
                                                    <AnimatePresence>
                                                        {isSubExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0 }}
                                                                animate={{ height: "auto" }}
                                                                exit={{ height: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="overflow-hidden border-t border-white/5 bg-black/20"
                                                            >
                                                                <div className="p-2 grid grid-cols-1 gap-1">
                                                                    {sub.offerings.map((offering) => (
                                                                        <button
                                                                            key={offering.id}
                                                                            onClick={(e) => handleOfferingClick(e, offering)}
                                                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left group"
                                                                        >
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                                                                            <span className="text-sm text-slate-300 group-hover:text-white">
                                                                                {offering.title}
                                                                            </span>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}

            {/* Mobile Details Modal */}
            <AnimatePresence>
                {detailsOpen && selectedOffering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm"
                        onClick={() => setDetailsOpen(false)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full sm:max-w-md bg-slate-900 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-12 h-1.5 bg-slate-700/50 rounded-full" />
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-white pr-8">{selectedOffering.title}</h3>
                                <button
                                    onClick={() => setDetailsOpen(false)}
                                    className="p-2 rounded-full bg-white/5 text-slate-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-6" />

                            <p className="text-slate-300 leading-relaxed mb-8">
                                {selectedOffering.description || `Comprehensive implementation of ${selectedOffering.title} tailored to your specific business needs. We ensure high performance, scalability, and seamless user experience.`}
                            </p>

                            <button
                                onClick={() => setDetailsOpen(false)}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-lg shadow-lg"
                            >
                                Got it
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
