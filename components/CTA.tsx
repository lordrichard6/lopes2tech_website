"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="relative py-32 bg-[#0f172a] overflow-hidden flex items-center justify-center text-center">

            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0">

                {/* Grid Overlay with Mask */}
                <div
                    className="absolute inset-0 z-10 opacity-30 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
                    }}
                />

                {/* Glowing Orbs */}
                <motion.div
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[100px] left-[10%] w-[400px] h-[400px] rounded-full bg-cyan-400 blur-[80px] opacity-40 mix-blend-screen"
                />
                <motion.div
                    animate={{ y: [0, 30, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute -bottom-[150px] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500 blur-[80px] opacity-40 mix-blend-screen"
                />
            </div>

            <div className="relative z-20 max-w-[800px] px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tight leading-[1.1]"
                >
                    Ready to Scale Your Business?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg md:text-xl text-slate-400 mb-12 max-w-[600px] mx-auto leading-relaxed"
                >
                    Let's build something extraordinary together. Book your free consultation today.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-4 px-12 py-5 text-lg font-bold text-[#0f172a] bg-cyan-400 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:-translate-y-1 hover:bg-cyan-300 group overflow-hidden relative"
                    >
                        <span className="relative z-10">Start Project</span>
                        <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out z-0" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
