"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { sendServiceRequestEmail } from "@/app/actions/contact";
import { trackFormSubmission } from "@/lib/analytics";

interface ServiceRequestDialogProps {
    isOpen: boolean;
    onClose: () => void;
    packageContext: string;
    customMessage?: string;
}

const FOCUSABLE_SELECTORS =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ServiceRequestDialog({ isOpen, onClose, packageContext, customMessage }: ServiceRequestDialogProps) {
    const t = useTranslations('ServicesPage.ServiceRequest');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [mounted, setMounted] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Reset form and set default message when dialog opens or package changes
    useEffect(() => {
        if (isOpen) {
            setMessage(customMessage || t('defaultMessage', { package: packageContext }));
            setStatus("idle");
            // Focus the dialog after mount
            requestAnimationFrame(() => {
                const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
                firstFocusable?.focus();
            });
        }
    }, [isOpen, packageContext, customMessage, t]);

    // Focus trap + Escape to close
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key !== "Tab") return;

            const dialog = dialogRef.current;
            if (!dialog) return;

            const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
                (el) => !el.hasAttribute("disabled")
            );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const result = await sendServiceRequestEmail({
                name,
                email,
                company,
                message,
                context: packageContext
            });

            if (result.success) {
                setStatus("success");
                trackFormSubmission('service_request');
            } else {
                setStatus("error");
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") console.error("Failed to submit request:", error);
            setStatus("error");
        }
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop — keyboard-dismissible via Escape (handled above) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        aria-hidden="true"
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                    />

                    {/* Dialog */}
                    <motion.div
                        ref={dialogRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="dialog-title"
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 z-[9999]"
                    >
                        <button
                            onClick={onClose}
                            aria-label={t('close')}
                            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {status === "success" ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 id="dialog-title" className="text-2xl font-bold text-white mb-2">{t('successTitle')}</h3>
                                <p className="text-slate-400 mb-6">{t('successMessage')}</p>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                                >
                                    {t('close')}
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <h2 id="dialog-title" className="text-2xl font-bold text-white mb-1">{t('title')}</h2>
                                    <p className="text-slate-400">{t('subtitle', { package: packageContext })}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                    <div>
                                        <label htmlFor="sr-name" className="block text-sm font-medium text-slate-300 mb-1">
                                            {t('name')}
                                        </label>
                                        <input
                                            id="sr-name"
                                            type="text"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="sr-email" className="block text-sm font-medium text-slate-300 mb-1">
                                            {t('email')}
                                        </label>
                                        <input
                                            id="sr-email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="sr-company" className="block text-sm font-medium text-slate-300 mb-1">
                                            {t('company')}
                                        </label>
                                        <input
                                            id="sr-company"
                                            type="text"
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="sr-message" className="block text-sm font-medium text-slate-300 mb-1">
                                            {t('message')}
                                        </label>
                                        <textarea
                                            id="sr-message"
                                            required
                                            rows={4}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors resize-none"
                                        />
                                    </div>

                                    {status === "error" && (
                                        <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                                            {t('error')}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                                    >
                                        {status === "submitting" ? t('sending') : t('submit')}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
