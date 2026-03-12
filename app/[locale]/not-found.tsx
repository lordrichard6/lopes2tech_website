"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    const t = useTranslations("NotFoundPage");

    return (
        <main className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <p className="text-cyan-400 font-mono text-6xl font-bold mb-4">404</p>
                <h1 className="text-3xl font-bold text-white mb-4">{t("title")}</h1>
                <p className="text-slate-400 mb-8">{t("description")}</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t("backHome")}
                </Link>
            </div>
        </main>
    );
}
