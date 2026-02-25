"use client";

import { useState } from "react";
import { Mail, ArrowRight, Check } from "lucide-react";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

        setStatus("loading");

        // For now, store in localStorage as a simple solution
        // Replace with actual newsletter API (Mailchimp, ConvertKit, etc.) when ready
        try {
            const subscribers = JSON.parse(localStorage.getItem("newsletter-subscribers") || "[]");
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem("newsletter-subscribers", JSON.stringify(subscribers));
            }
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 4000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    if (status === "success") {
        return (
            <div className="flex items-center gap-2 text-sm text-green-400">
                <Check className="w-4 h-4" />
                <span>Thanks for subscribing!</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <p className="text-white/50 text-sm mb-3">
                Get insights on AI, SEO & web dev delivered to your inbox.
            </p>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
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
                <p className="text-red-400 text-xs mt-1">Something went wrong. Try again.</p>
            )}
        </form>
    );
}
