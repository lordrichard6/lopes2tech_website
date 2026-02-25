"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, Zap, FileText, ShieldCheck, ExternalLink } from "lucide-react";

const features = [
    { icon: Brain, label: "AI-Native CRM", desc: "Chat is the interface. Execute actions, not just get answers." },
    { icon: Zap, label: "Invoicing in 1 click", desc: "Swiss QR-Bill & EU SEPA. Compliance built in, not bolted on." },
    { icon: FileText, label: "Knowledge Base", desc: "Upload docs, get instant AI answers with source citations." },
    { icon: ShieldCheck, label: "GDPR & Swiss Ready", desc: "Built for Europe from Day 1. No compliance headaches." },
];

const funLoadingMessages = [
    "Migrating neurons…",
    "Teaching AI to read Swiss invoices…",
    "Polishing the command palette…",
    "Bribing GDPR regulators… (jk)",
    "Loading 73% more intelligence…",
];

export default function ClientPortalPage() {
    const randomMsg = funLoadingMessages[Math.floor(Math.random() * funLoadingMessages.length)];

    return (
        <main className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">

            {/* Background glow orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-cyan-500 blur-[120px] opacity-30 pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-purple-600 blur-[120px] opacity-25 pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl w-full text-center">

                {/* Funny badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium"
                >
                    <span className="animate-pulse">⚙️</span>
                    <span>{randomMsg}</span>
                </motion.div>

                {/* Main headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight"
                >
                    Your portal just got a{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        brain transplant.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
                >
                    We&apos;re upgrading the client portal to{" "}
                    <span className="text-white font-semibold">MenteIQ</span> — our own AI-powered
                    business OS built right here in Switzerland. Same Lopes2Tech quality. Way more intelligence.
                </motion.p>

                {/* MenteIQ logo card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative mb-10 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
                >
                    {/* Shimmer line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                    <div className="flex items-center justify-center mb-4">
                        <Image
                            src="/logos/menteiq_logo_white.svg"
                            alt="MenteIQ"
                            width={180}
                            height={48}
                            className="h-12 w-auto"
                        />
                    </div>
                    <p className="text-slate-300 text-sm font-medium tracking-wide uppercase mb-6">
                        The Operating System for European Service Professionals
                    </p>

                    {/* Feature grid */}
                    <div className="grid grid-cols-2 gap-3 text-left mb-6">
                        {features.map(({ icon: Icon, label, desc }) => (
                            <div
                                key={label}
                                className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-colors"
                            >
                                <div className="mt-0.5 p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                                    <Icon className="w-3.5 h-3.5" />
                                </div>
                                <div>
                                    <p className="text-white text-xs font-semibold mb-0.5">{label}</p>
                                    <p className="text-slate-500 text-xs leading-snug">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fake progress bar */}
                    <div className="mb-2">
                        <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                            <span>Migration progress</span>
                            <span className="text-cyan-400 font-medium">73%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "73%" }}
                                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                            />
                        </div>
                    </div>
                    <p className="text-slate-600 text-xs">ETA: Very soon™</p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <a
                        href="https://menteiq.ch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all"
                    >
                        Explore MenteIQ
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all"
                    >
                        Contact us in the meantime
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-10 text-slate-600 text-sm"
                >
                    Already a client?{" "}
                    <a
                        href="https://app.lopes2tech.ch"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-400 underline underline-offset-2 transition-colors"
                    >
                        Access the old portal here
                    </a>{" "}
                    while we finish the upgrade.
                </motion.p>
            </div>
        </main>
    );
}
