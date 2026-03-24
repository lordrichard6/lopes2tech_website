"use client";

import { motion } from "framer-motion";
import { CheckCircle, Mail, BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "@/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const BOOK_NAMES: Record<string, string> = {
    freud: "The Freud They Never Taught You",
    tesla: "The Tesla They Never Taught You",
    switzerland: "100 Things Switzerland",
    portugal: "100 Things Portugal",
    productivity: "30-Day Productivity Tracker",
};

function ThankYouContent() {
    const t = useTranslations("EbooksPage.thankYou");
    const params = useSearchParams();
    const bookKey = params.get("book") ?? "";
    const bookName = BOOK_NAMES[bookKey] ?? t("yourBook");

    return (
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />

            <section className="relative pt-40 pb-24 overflow-hidden flex items-center justify-center">
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/8 blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)]">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                            {t("title")}
                        </h1>
                        <p className="text-lg text-slate-400 mb-2">
                            {t("subtitle", { book: bookName })}
                        </p>

                        {/* Email instruction */}
                        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-left space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm mb-1">{t("steps.email.title")}</p>
                                    <p className="text-slate-400 text-sm">{t("steps.email.desc")}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center">
                                    <BookOpen className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm mb-1">{t("steps.read.title")}</p>
                                    <p className="text-slate-400 text-sm">{t("steps.read.desc")}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-500 text-xs mt-6">
                            {t("support")}{" "}
                            <a href="mailto:paulo@lopes2tech.ch" className="text-cyan-400 hover:underline">
                                paulo@lopes2tech.ch
                            </a>
                        </p>

                        <Link
                            href="/ebooks"
                            className="inline-flex items-center gap-2 mt-8 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t("backToShop")}
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={null}>
            <ThankYouContent />
        </Suspense>
    );
}
