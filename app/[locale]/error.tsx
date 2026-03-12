"use client";

import { useEffect } from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    const t = useTranslations("ErrorPage");

    useEffect(() => {
        console.error("Page error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <h2 className="text-3xl font-bold text-white mb-4">{t("title")}</h2>
                <p className="text-slate-400 mb-8">
                    {t("description")}
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                        {t("tryAgain")}
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                        {t("goHome")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
