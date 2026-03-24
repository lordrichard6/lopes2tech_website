"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

const MEDIUM_URL = "https://medium.com/@paulolopesreizinho";

// Medium "M" logo — official three-ellipse mark
function MediumIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 1043 592"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M588.001 296.001C588.001 459.256 456.895 591.999 294.001 591.999C131.107 591.999 0.000976562 459.256 0.000976562 296.001C0.000976562 132.746 131.107 0.00292969 294.001 0.00292969C456.895 0.00292969 588.001 132.746 588.001 296.001Z" />
            <path d="M912.001 296.001C912.001 449.689 846.476 574.001 765.001 574.001C683.526 574.001 618.001 449.689 618.001 296.001C618.001 142.313 683.526 18.001 765.001 18.001C846.476 18.001 912.001 142.313 912.001 296.001Z" />
            <path d="M1042.001 296.001C1042.001 433.792 1019.37 545.001 991.501 545.001C963.632 545.001 941.001 433.792 941.001 296.001C941.001 158.21 963.632 47.001 991.501 47.001C1019.37 47.001 1042.001 158.21 1042.001 296.001Z" />
        </svg>
    );
}

export default function MediumBanner() {
    const t = useTranslations("MediumBanner");

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-7xl mx-auto px-6 mb-14"
        >
            <a
                href={MEDIUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-7 overflow-hidden hover:border-cyan-400/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.08)]"
            >
                {/* Ambient glow */}
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-colors duration-700" />
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/15 transition-colors duration-700" />

                {/* Left — icon + copy */}
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    {/* Medium logo bubble */}
                    <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 border border-white/20 group-hover:border-cyan-400/30 transition-colors duration-300">
                        <MediumIcon className="w-7 h-7 text-white" />
                    </div>

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-1">
                            {t("eyebrow")}
                        </p>
                        <p className="text-lg font-bold text-white leading-snug">
                            {t("headline")}
                        </p>
                        <p className="text-sm text-slate-400 mt-1 max-w-lg">
                            {t("description")}
                        </p>
                    </div>
                </div>

                {/* Right — CTA */}
                <div className="relative z-10 flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] transition-all duration-300 group-hover:scale-105">
                        {t("cta")}
                        <ExternalLink className="w-4 h-4" />
                    </span>
                </div>
            </a>
        </motion.div>
    );
}
