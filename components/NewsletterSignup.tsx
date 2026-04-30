"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { sendNewsletterSubscriptionEmail } from "@/app/actions/contact";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [website, setWebsite] = useState(""); // honeypot
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const t = useTranslations('Newsletter');

    // Track form mount time so server can reject sub-second submits.
    const formLoadedAtRef = useRef<number>(0);
    useEffect(() => { formLoadedAtRef.current = Date.now(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

        setStatus("loading");

        try {
            const result = await sendNewsletterSubscriptionEmail(email, {
                website,
                formLoadedAt: formLoadedAtRef.current,
            });
            if (result.success) {
                setStatus("success");
                setEmail("");
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    if (status === "success") {
        return (
            <div className="flex items-center gap-2 text-sm text-green-400 mt-4">
                <Check className="w-4 h-4" />
                <span>{t('success')}</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <p className="text-white/50 text-sm mb-3">
                {t('description')}
            </p>
            {/* Honeypot — hidden from humans, bots fill it. */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden", opacity: 0 }}>
                <label htmlFor="newsletter-website">Website</label>
                <input
                    type="text"
                    id="newsletter-website"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('placeholder')}
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50 flex items-center gap-1"
                >
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
            {status === "error" && (
                <p className="text-red-400 text-xs mt-1">{t('error')}</p>
            )}
        </form>
    );
}
