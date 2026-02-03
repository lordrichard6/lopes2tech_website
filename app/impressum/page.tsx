"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Impressum() {
    return (
        <main className="min-h-screen bg-[#0f172a] text-white pt-24 pb-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
            </div>

            <div className="relative z-10 container max-w-[800px] mx-auto px-6">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-4">
                        Impressum
                    </h1>
                    <p className="text-xl text-slate-400">
                        Legal Notice
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-12 text-slate-300 leading-relaxed"
                >
                    {/* Company Information */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-cyan-400 rounded-full" />
                            Company Information
                        </h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <p className="font-semibold text-white text-lg mb-2">Lopes2Tech</p>
                            <p className="mb-4 text-slate-400">Sole Proprietorship</p>

                            <p className="font-semibold text-white mb-2 mt-6">Represented by:</p>
                            <p>Paulo Lopes</p>
                        </div>
                    </section>

                    {/* Contact */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-purple-500 rounded-full" />
                            Contact
                        </h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-3">
                            <div className="flex gap-4">
                                <span className="text-slate-400 min-w-[80px]">Email:</span>
                                <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline">
                                    paulo@lopes2tech.ch
                                </a>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-slate-400 min-w-[80px]">Website:</span>
                                <a href="https://lopes2tech.ch" className="text-cyan-400 hover:underline">
                                    www.lopes2tech.ch
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Disclaimer */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-cyan-400 rounded-full" />
                            Disclaimer (Haftungsausschluss)
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">Liability for Content</h3>
                                <p>
                                    The author assumes no liability for the correctness, accuracy, timeliness, reliability, and completeness of the information. Liability claims against the author for material or immaterial damage resulting from access to, use or non-use of the published information, from misuse of the connection, or from technical malfunctions are excluded. All offers are non-binding. The author expressly reserves the right to change, supplement or delete parts of the pages or the entire offer without separate announcement or to cease publication temporarily or permanently.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white mb-4">Liability for Links</h3>
                                <p>
                                    References and links to third-party websites are outside our area of responsibility. We reject any responsibility for such websites. Access and use of such websites are at the user's own risk.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Copyright */}
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                            <span className="w-1 h-6 bg-purple-500 rounded-full" />
                            Copyright (Urheberrechte)
                        </h2>
                        <p>
                            The copyright and all other rights to content, images, photos, or other files on the website belong exclusively to <strong className="text-white">Paulo Lopes / Lopes2Tech</strong> or the specifically named rights holders. For the reproduction of any elements, the written consent of the copyright holders must be obtained in advance.
                        </p>
                    </section>
                </motion.div>
            </div>
        </main>
    );
}
