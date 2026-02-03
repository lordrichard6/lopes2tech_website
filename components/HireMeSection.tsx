"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight, Briefcase, Zap, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type HireMode = "hourly" | "daily" | "custom";

export default function HireMeSection() {
    const [mode, setMode] = useState<HireMode>("hourly");

    const pricing = {
        hourly: { price: 120, unit: "hour", description: "Perfect for small tasks, consultations, or quick fixes" },
        daily: { price: 800, unit: "day", description: "Best value for focused, full-day collaboration on your project" },
        custom: { price: null, unit: null, description: "Not sure how long you need? Don't worry—let's figure it out together." }
    };

    const current = pricing[mode];

    return (
        <section className="relative py-20 overflow-hidden z-10">
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-3xl overflow-hidden"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-purple-500/20" />
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />

                    {/* Content */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
                        {/* Left: Photo & Info */}
                        <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-6">
                            {/* Photo */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10"
                            >
                                <Image
                                    src="/founder.jpg"
                                    alt="Paulo Lopes"
                                    fill
                                    className="object-cover"
                                />
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
                            </motion.div>

                            {/* Text */}
                            <div className="text-center md:text-left lg:text-center xl:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 rounded-full">
                                    <Briefcase className="w-3 h-3" />
                                    Available for Hire
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
                                    Need a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Dedicated Expert?</span>
                                </h2>
                                <p className="text-slate-400 leading-relaxed">
                                    Whether you need hands-on development, technical consultation, or project leadership—I'm available to work directly with your team.
                                </p>
                            </div>
                        </div>

                        {/* Right: Pricing Card */}
                        <div className="flex flex-col justify-center">
                            {/* Mode Selector */}
                            <div className="flex justify-center lg:justify-start mb-6">
                                <div className="inline-flex items-center gap-1 p-1 bg-slate-800/50 border border-white/10 rounded-xl">
                                    <motion.button
                                        onClick={() => setMode("hourly")}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${mode === "hourly" ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        {mode === "hourly" && (
                                            <motion.div
                                                layoutId="hireModeSelector"
                                                className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 border border-orange-500/30 rounded-lg"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Hourly
                                        </span>
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setMode("daily")}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${mode === "daily" ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        {mode === "daily" && (
                                            <motion.div
                                                layoutId="hireModeSelector"
                                                className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 border border-orange-500/30 rounded-lg"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Full Day
                                        </span>
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setMode("custom")}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${mode === "custom" ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                            }`}
                                    >
                                        {mode === "custom" && (
                                            <motion.div
                                                layoutId="hireModeSelector"
                                                className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-pink-500/30 border border-orange-500/30 rounded-lg"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4" />
                                            Custom
                                        </span>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Pricing Display */}
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-center lg:text-left mb-6"
                            >
                                {current.price !== null ? (
                                    <>
                                        <div className="flex items-baseline justify-center lg:justify-start gap-2 mb-2">
                                            <span className="text-5xl md:text-6xl font-extrabold text-white">
                                                CHF {current.price}
                                            </span>
                                            <span className="text-xl text-slate-400">
                                                /{current.unit}
                                            </span>
                                        </div>
                                        <p className="text-slate-400">
                                            {current.description}
                                        </p>

                                        {mode === "daily" && (
                                            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 text-xs font-medium text-green-400 bg-green-400/10 rounded-full border border-green-400/20">
                                                <Zap className="w-3 h-3" />
                                                Save CHF 160 compared to 8 hourly
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                                            <span className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
                                                Let's Talk
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-lg">
                                            {current.description}
                                        </p>
                                    </>
                                )}
                            </motion.div>

                            {/* CTA */}
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Book a Consultation
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
