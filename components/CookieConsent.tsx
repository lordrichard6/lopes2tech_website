"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any[];
    }
}

export default function CookieConsent() {
    const t = useTranslations('CookieConsent');
    const locale = useLocale();
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setShowBanner(true);
        } else if (consent === "accepted") {
            // Update consent if already accepted
            updateConsent(true);
        }
    }, []);

    const updateConsent = (granted: boolean) => {
        const v = granted ? "granted" : "denied";
        // Consent Mode v2 — push to dataLayer so this works even before gtag
        // loads (with `wait_for_update: 500` in defaults, gtag replays events
        // with the updated state).
        if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
            window.dataLayer.push([
                "consent",
                "update",
                {
                    ad_storage: v,
                    ad_user_data: v,
                    ad_personalization: v,
                    analytics_storage: v,
                    functionality_storage: v,
                    personalization_storage: v,
                },
            ]);
        }
    };

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        updateConsent(true);
        setShowBanner(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        updateConsent(false);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-sm text-slate-300">
                    <p className="mb-2">
                        <strong className="text-white">{t('title')}</strong>
                    </p>
                    <p>
                        {t('description')}{" "}
                        <a href={`/${locale}/privacy-policy`} className="text-cyan-400 hover:text-cyan-300 underline">
                            {t('learnMore')}
                        </a>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
                    >
                        {t('decline')}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
                    >
                        {t('accept')}
                    </button>
                </div>
            </div>
        </div>
    );
}
