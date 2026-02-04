"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

declare global {
    interface Window {
        gtag: (...args: any[]) => void;
        dataLayer: any[];
    }
}

export default function CookieConsent() {
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
        if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
                analytics_storage: granted ? "granted" : "denied",
                ad_storage: granted ? "granted" : "denied",
            });
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
                        <strong className="text-white">We value your privacy</strong>
                    </p>
                    <p>
                        We use cookies to enhance your experience, analyze site traffic, and personalize content.
                        By clicking "Accept", you consent to our use of cookies.{" "}
                        <a href="/en/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                            Learn more
                        </a>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-2.5 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
