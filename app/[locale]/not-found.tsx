"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function NotFound() {
    const t = useTranslations("NotFoundPage");

    return (
        <main className="min-h-screen bg-[#0f172a] relative overflow-hidden">
            <Navbar />

            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
                <div className="text-center max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 font-mono text-8xl font-extrabold mb-4 leading-none">
                            404
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h1 className="text-3xl font-bold text-white mb-4">{t("title")}</h1>
                        <p className="text-slate-400 mb-10 text-lg leading-relaxed">{t("description")}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Home className="w-4 h-4" />
                            {t("backHome")}
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t("contactUs")}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
