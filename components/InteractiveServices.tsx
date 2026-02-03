"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData, colorMap, ServiceOffering } from "@/lib/services-data";
import { Sparkles, X } from "lucide-react";

export default function InteractiveServices() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
    const [selectedOffering, setSelectedOffering] = useState<ServiceOffering | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleCategoryClick = (categoryId: string) => {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
            setSelectedSubcategory(null);
        } else {
            setSelectedCategory(categoryId);
            setSelectedSubcategory(null);
        }
    };

    const handleSubcategoryClick = (subcategoryId: string) => {
        if (selectedSubcategory === subcategoryId) {
            setSelectedSubcategory(null);
        } else {
            setSelectedSubcategory(subcategoryId);
        }
    };

    const handleOfferingClick = (offering: ServiceOffering) => {
        setSelectedOffering(offering);
        setDetailsOpen(true);
    };

    const selectedCategoryData = servicesData.find(c => c.id === selectedCategory);
    const selectedSubcategoryData = selectedCategoryData?.subcategories.find(
        s => s.id === selectedSubcategory
    );

    // ViewBox dimensions - everything is calculated in this coordinate space
    const viewBoxWidth = 1000;
    const viewBoxHeight = 700;
    const centerX = viewBoxWidth / 2;
    const centerY = viewBoxHeight / 2;

    // Circle sizes (in viewBox units)
    const mainCircleRadius = 56; // ~112px / 2
    const subCircleRadius = 40;  // ~80px / 2
    const offeringCircleRadius = 32; // ~64px / 2

    // Orbit radii
    const mainOrbitRadius = 200;
    const subOrbitRadius = 130;
    const offeringOrbitRadius = 75;

    const getCategoryPosition = (index: number, total: number) => {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        return {
            x: centerX + mainOrbitRadius * Math.cos(angle),
            y: centerY + mainOrbitRadius * Math.sin(angle)
        };
    };

    const getSubcategoryPosition = (index: number, total: number, parentPos: { x: number; y: number }) => {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        return {
            x: parentPos.x + subOrbitRadius * Math.cos(angle),
            y: parentPos.y + subOrbitRadius * Math.sin(angle)
        };
    };

    const getOfferingPosition = (index: number, total: number, parentPos: { x: number; y: number }) => {
        const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
        return {
            x: parentPos.x + offeringOrbitRadius * Math.cos(angle),
            y: parentPos.y + offeringOrbitRadius * Math.sin(angle)
        };
    };

    return (
        <div className="relative w-full aspect-[1000/700] bg-transparent rounded-3xl overflow-hidden">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {/* Gradient definitions */}
                    {Object.entries(colorMap).map(([key, colors]) => (
                        <linearGradient key={key} id={`grad-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={colors.from} />
                            <stop offset="100%" stopColor={colors.to} />
                        </linearGradient>
                    ))}

                    {/* Glow filters */}
                    {Object.entries(colorMap).map(([key, colors]) => (
                        <filter key={`filter-${key}`} id={`glow-${key}`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feFlood floodColor={colors.glow} result="color" />
                            <feComposite in="color" in2="blur" operator="in" result="colorBlur" />
                            <feMerge>
                                <feMergeNode in="colorBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    ))}
                </defs>

                {/* Connection Lines: Category -> Subcategory */}
                <AnimatePresence>
                    {selectedCategory && selectedCategoryData && (
                        <>
                            {selectedCategoryData.subcategories.map((sub, idx) => {
                                const categoryIndex = servicesData.findIndex(c => c.id === selectedCategory);
                                const categoryPos = getCategoryPosition(categoryIndex, servicesData.length);
                                const subPos = getSubcategoryPosition(idx, selectedCategoryData.subcategories.length, categoryPos);

                                return (
                                    <motion.line
                                        key={`line-cat-${selectedCategory}-${sub.id}`}
                                        x1={categoryPos.x}
                                        y1={categoryPos.y}
                                        x2={subPos.x}
                                        y2={subPos.y}
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeOpacity="0.4"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.4 }}
                                        exit={{ pathLength: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.05 }}
                                    />
                                );
                            })}
                        </>
                    )}
                </AnimatePresence>

                {/* Connection Lines: Subcategory -> Offering */}
                <AnimatePresence>
                    {selectedSubcategory && selectedSubcategoryData && selectedCategoryData && (
                        <>
                            {selectedSubcategoryData.offerings.map((offering, idx) => {
                                const categoryIndex = servicesData.findIndex(c => c.id === selectedCategory);
                                const categoryPos = getCategoryPosition(categoryIndex, servicesData.length);
                                const subIndex = selectedCategoryData.subcategories.findIndex(s => s.id === selectedSubcategory);
                                const subPos = getSubcategoryPosition(subIndex, selectedCategoryData.subcategories.length, categoryPos);
                                const offeringPos = getOfferingPosition(idx, selectedSubcategoryData.offerings.length, subPos);

                                return (
                                    <motion.line
                                        key={`line-sub-${selectedSubcategory}-${offering.id}`}
                                        x1={subPos.x}
                                        y1={subPos.y}
                                        x2={offeringPos.x}
                                        y2={offeringPos.y}
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeOpacity="0.3"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.3 }}
                                        exit={{ pathLength: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut", delay: idx * 0.04 }}
                                    />
                                );
                            })}
                        </>
                    )}
                </AnimatePresence>

                {/* Main Category Circles */}
                {servicesData.map((category, index) => {
                    const pos = getCategoryPosition(index, servicesData.length);
                    const isSelected = selectedCategory === category.id;
                    const colors = colorMap[category.color];
                    const IconComponent = category.icon;

                    return (
                        <motion.g
                            key={category.id}
                            style={{ cursor: 'pointer' }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: isSelected ? 1.1 : 1,
                                opacity: selectedCategory ? (isSelected ? 1 : 0.3) : 1
                            }}
                            whileHover={{ scale: 1.15, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            {/* Circle */}
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r={mainCircleRadius}
                                fill={`url(#grad-${category.color})`}
                                stroke={isSelected ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)"}
                                strokeWidth="2"
                                filter={`url(#glow-${category.color})`}
                            />
                            {/* Icon (using foreignObject for Lucide icons) */}
                            <foreignObject
                                x={pos.x - 16}
                                y={pos.y - 28}
                                width="32"
                                height="32"
                            >
                                <div className="w-full h-full flex items-center justify-center text-white">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                            </foreignObject>
                            {/* Title */}
                            <text
                                x={pos.x}
                                y={pos.y + 16}
                                textAnchor="middle"
                                fill="white"
                                fontSize="11"
                                fontWeight="bold"
                                className="pointer-events-none"
                            >
                                {category.title.split(' ').map((word, i) => (
                                    <tspan key={i} x={pos.x} dy={i === 0 ? 0 : 12}>{word}</tspan>
                                ))}
                            </text>
                        </motion.g>
                    );
                })}

                {/* Subcategory Circles */}
                <AnimatePresence>
                    {selectedCategory && selectedCategoryData && (
                        <>
                            {selectedCategoryData.subcategories.map((sub, idx) => {
                                const categoryIndex = servicesData.findIndex(c => c.id === selectedCategory);
                                const categoryPos = getCategoryPosition(categoryIndex, servicesData.length);
                                const subPos = getSubcategoryPosition(idx, selectedCategoryData.subcategories.length, categoryPos);
                                const isSelected = selectedSubcategory === sub.id;
                                const colors = colorMap[selectedCategoryData.color];
                                const IconComponent = sub.icon;

                                return (
                                    <motion.g
                                        key={`sub-${selectedCategory}-${sub.id}`}
                                        style={{ cursor: 'pointer' }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: isSelected ? 1.05 : 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25, delay: idx * 0.08 }}
                                        onClick={() => handleSubcategoryClick(sub.id)}
                                    >
                                        <circle
                                            cx={subPos.x}
                                            cy={subPos.y}
                                            r={subCircleRadius}
                                            fill={`url(#grad-${selectedCategoryData.color})`}
                                            fillOpacity="0.9"
                                            stroke={isSelected ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}
                                            strokeWidth="1.5"
                                            filter={`url(#glow-${selectedCategoryData.color})`}
                                        />
                                        <foreignObject
                                            x={subPos.x - 10}
                                            y={subPos.y - 20}
                                            width="20"
                                            height="20"
                                        >
                                            <div className="w-full h-full flex items-center justify-center text-white">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                        </foreignObject>
                                        <text
                                            x={subPos.x}
                                            y={subPos.y + 10}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="8"
                                            fontWeight="600"
                                            className="pointer-events-none"
                                        >
                                            {sub.title.split(' ').map((word, i) => (
                                                <tspan key={i} x={subPos.x} dy={i === 0 ? 0 : 9}>{word}</tspan>
                                            ))}
                                        </text>
                                    </motion.g>
                                );
                            })}
                        </>
                    )}
                </AnimatePresence>

                {/* Offering Circles */}
                <AnimatePresence>
                    {selectedSubcategory && selectedSubcategoryData && selectedCategoryData && (
                        <>
                            {selectedSubcategoryData.offerings.map((offering, idx) => {
                                const categoryIndex = servicesData.findIndex(c => c.id === selectedCategory);
                                const categoryPos = getCategoryPosition(categoryIndex, servicesData.length);
                                const subIndex = selectedCategoryData.subcategories.findIndex(s => s.id === selectedSubcategory);
                                const subPos = getSubcategoryPosition(subIndex, selectedCategoryData.subcategories.length, categoryPos);
                                const offeringPos = getOfferingPosition(idx, selectedSubcategoryData.offerings.length, subPos);
                                const colors = colorMap[selectedCategoryData.color];

                                return (
                                    <motion.g
                                        key={`off-${selectedSubcategory}-${offering.id}`}
                                        style={{ cursor: 'pointer' }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ type: "spring", stiffness: 350, damping: 30, delay: idx * 0.05 }}
                                        onClick={() => handleOfferingClick(offering)}
                                    >
                                        <circle
                                            cx={offeringPos.x}
                                            cy={offeringPos.y}
                                            r={offeringCircleRadius}
                                            fill={`url(#grad-${selectedCategoryData.color})`}
                                            fillOpacity="0.7"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="1"
                                            filter={`url(#glow-${selectedCategoryData.color})`}
                                        />
                                        <text
                                            x={offeringPos.x}
                                            y={offeringPos.y}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="white"
                                            fontSize="7"
                                            fontWeight="500"
                                            className="pointer-events-none"
                                        >
                                            {offering.title.length > 12
                                                ? offering.title.split(' ').slice(0, 2).map((word, i) => (
                                                    <tspan key={i} x={offeringPos.x} dy={i === 0 ? -4 : 9}>{word}</tspan>
                                                ))
                                                : offering.title
                                            }
                                        </text>
                                    </motion.g>
                                );
                            })}
                        </>
                    )}
                </AnimatePresence>
            </svg>

            {/* Service Details Modal */}
            <AnimatePresence>
                {detailsOpen && selectedOffering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setDetailsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl"
                        >
                            <button
                                onClick={() => setDetailsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-2xl font-bold text-white mb-2">{selectedOffering.title}</h3>
                            <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-4" />

                            <p className="text-slate-300 leading-relaxed">
                                {selectedOffering.description || `Comprehensive implementation of ${selectedOffering.title} tailored to your specific business needs. We ensure high performance, scalability, and seamless user experience.`}
                            </p>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setDetailsOpen(false)}
                                    className="px-6 py-2 rounded-full bg-white text-slate-900 font-semibold hover:bg-slate-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
