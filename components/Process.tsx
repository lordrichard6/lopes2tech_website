"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, FileText, Settings, HeartHandshake } from "lucide-react";
import clsx from "clsx";

const steps = [
    {
        id: 1,
        title: "Discovery Call",
        description: "We dive deep into your goals to ensure we're the perfect partner.",
        icon: Phone,
    },
    {
        id: 2,
        title: "Strategic Proposal",
        description: "You receive a comprehensive roadmap and fixed-price quote.",
        icon: FileText,
    },
    {
        id: 3,
        title: "Build & Automate",
        description: "We build your custom solution with real-time progress tracking.",
        icon: Settings,
    },
    {
        id: 4,
        title: "Launch & Support",
        description: "We deploy your system and provide ongoing maintenance.",
        icon: HeartHandshake,
    },
];

export default function Process() {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    return (
        <section className="relative py-24 bg-white overflow-hidden w-full">

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Header - Full Width but Centered Content */}
            <div className="text-center max-w-4xl mx-auto mb-20 px-6 relative z-10">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-4 block"
                >
                    The Workflow
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight"
                >
                    From Concept to
                    <span className="relative inline-block ml-3">
                        {/* Soft Light Glow Effect */}
                        <span className="absolute inset-0 bg-cyan-400/30 blur-2xl rounded-full scale-150 z-0"></span>
                        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Reality</span>
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-slate-600"
                >
                    A transparent, streamlined process designed for speed and precision.
                </motion.p>
            </div>

            {/* Full Width Desktop Curve Layout */}
            <div className="hidden md:block relative w-full h-[400px]">

                {/* The Curve SVG - Spanning Full Width */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1440 400">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#22d3ee" />
                                <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                        </defs>

                        {/* 
                 Path Logic for perfect alignment:
                 We need 4 distinct points for the 4 steps.
                 Let's create a wave that goes:
                 - Start (0, 200)
                 - Point 1 (18% width, 300) - Low
                 - Point 2 (42% width, 100) - High
                 - Point 3 (66% width, 100) - High
                 - Point 4 (90% width, 300) - Low
                 - End (100% width, 200)
               */}
                        <path
                            d="M-100,200 C100,200 150,300 252,300 C400,300 450,100 600,100 C800,100 850,100 1000,100 C1150,100 1200,300 1350,300 C1450,300 1500,200 1600,200"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3"
                            strokeDasharray="8 8"
                        />


                        {/* Animated Gradient Line */}
                        <motion.path
                            d="M-100,200 C100,200 150,300 252,300 C400,300 450,100 600,100 C800,100 850,100 1000,100 C1150,100 1200,300 1350,300 C1450,300 1500,200 1600,200"
                            fill="none"
                            stroke="url(#lineGradient)"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                        />

                        {/* Moving Particle Effect */}
                        <circle r="6" fill="#fff" className="filter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                            <animateMotion
                                dur="6s"
                                repeatCount="indefinite"
                                path="M-100,200 C100,200 150,300 252,300 C400,300 450,100 600,100 C800,100 850,100 1000,100 C1150,100 1200,300 1350,300 C1450,300 1500,200 1600,200"
                            />
                        </circle>

                    </svg>
                </div>

                {/* Steps Container - Grid overlay matching the SVG curve points */}
                <div className="w-full h-full relative z-10 max-w-[1600px] mx-auto grid grid-cols-4">
                    {/* 
                  We manually adjust paddingTop/paddingBottom to match the SVG Y-coordinates 
                  SVG Y coords: P1=300 (Low), P2=100 (High), P3=100 (High), P4=300 (Low)
                  Container Height = 400px.
                  P1 (300px down) -> needs top padding ~260px to place icon center at 300?
                  P2 (100px down) -> needs top padding ~60px
               */}

                    {/* Step 1: Low (300) */}
                    <div className="flex flex-col items-center pt-[260px] relative group">
                        <StepItem step={steps[0]} />
                    </div>

                    {/* Step 2: High (100) */}
                    <div className="flex flex-col items-center pt-[60px] relative group">
                        <StepItem step={steps[1]} />
                    </div>

                    {/* Step 3: High (100) */}
                    <div className="flex flex-col items-center pt-[60px] relative group">
                        <StepItem step={steps[2]} />
                    </div>

                    {/* Step 4: Low (300) */}
                    <div className="flex flex-col items-center pt-[260px] relative group">
                        <StepItem step={steps[3]} />
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden relative border-l-2 border-slate-100 ml-6 space-y-12 pb-12 px-6">
                {steps.map((step) => (
                    <div key={step.id} className="relative pl-8">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-cyan-500" />
                        <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                            <div className="flex items-center gap-4 mb-3">
                                <step.icon className="w-6 h-6 text-cyan-600" />
                                <h3 className="text-slate-900 font-bold text-lg">{step.title}</h3>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}

function StepItem({ step }: { step: any }) {
    return (
        <>
            {/* The Icon sitting ON the line */}
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-full bg-white border-4 border-cyan-50 shadow-xl flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-200 mb-6"
            >
                <div className="absolute inset-0 bg-cyan-100 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                <step.icon className="w-7 h-7 text-cyan-600 relative z-10" />

                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-lg border-2 border-white z-30">
                    {step.id}
                </div>
            </motion.div>

            {/* Content hanging below or standing above? Let's just put it below for all for consistency */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-[280px] bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-transparent group-hover:border-slate-100 transition-colors"
            >
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {step.description}
                </p>
            </motion.div>
        </>
    )
}
