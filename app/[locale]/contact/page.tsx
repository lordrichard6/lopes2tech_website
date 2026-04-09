"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { sendContactEmail } from "@/app/actions/contact";
import { trackFormSubmission } from "@/lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactPage() {
    const t = useTranslations("ContactPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [submitError, setSubmitError] = useState<string>("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Page-level entrance helper (blur-up)
    const fadeUp = (delay = 0) =>
        shouldAnimate
            ? {
                  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
                  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                  transition: { duration: 0.8, delay, ease: EASE },
              }
            : {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.4, delay },
              };

    // Framer Motion variants — field stagger inside the form
    const formStaggerParent = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.09, delayChildren: 0.2 },
        },
    };

    const fieldItem = {
        hidden: { opacity: 0, ...(shouldAnimate ? { y: 14 } : {}) },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: EASE },
        },
    };

    // Success state stagger
    const successStagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
    };

    const successItem = {
        hidden: { opacity: 0, ...(shouldAnimate ? { y: 14 } : {}) },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: EASE },
        },
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = t("form.errors.nameRequired");
        if (!formData.email.trim()) {
            newErrors.email = t("form.errors.emailRequired");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t("form.errors.emailInvalid");
        }
        if (!formData.message.trim()) newErrors.message = t("form.errors.messageRequired");
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            const result = await sendContactEmail({
                name: formData.name,
                email: formData.email,
                company: formData.company,
                phone: formData.phone,
                message: formData.message,
            });
            if (!result.success) {
                console.error("Server Action Error:", result.error);
                setSubmitError(result.error || t("form.errors.general"));
                setSubmitStatus("error");
                return;
            }
            setSubmitStatus("success");
            trackFormSubmission("contact_form");
            setFormData({ name: "", email: "", company: "", phone: "", message: "" });
        } catch (error) {
            console.error("Contact form submission error:", error);
            setSubmitError(t("form.errors.general"));
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const resetForm = () => {
        setSubmitStatus("idle");
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://lopes2tech.ch" },
            { "@type": "ListItem", position: 2, name: "Contact", item: "https://lopes2tech.ch/en/contact" },
        ],
    };

    // Shared input classes — rounded-2xl + focus glow
    const inputBase =
        "peer w-full px-4 py-3 bg-white/5 border rounded-2xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400/80 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)] transition-all duration-300";

    // Floating label classes
    const labelBase =
        "absolute left-4 -top-2.5 px-1 bg-[#080d1a] text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400";

    return (
        <main className="min-h-screen bg-[#080d1a] relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Navbar />

            {/* Fixed video background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/vids/dark-poster.jpg"
                    className="w-full h-full object-cover"
                >
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#080d1a]/80" />
            </div>

            {/* Content */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Page header */}
                    <motion.header {...fadeUp(0)} className="text-center mb-16">
                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                            {t("hero.badge")}
                        </div>
                        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            {t("hero.titlePart1")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                                {t("hero.titlePart2")}
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {t("hero.description")}
                        </p>
                    </motion.header>

                    {/* Ambient orb depth anchors — behind the card */}
                    <div className="relative">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-32 -left-24 w-[520px] h-[520px] rounded-full blur-[130px] opacity-60"
                            style={{ background: "radial-gradient(circle, rgba(34,211,238,0.14) 0%, transparent 70%)" }}
                        />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-50"
                            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%)" }}
                        />

                        {/* Premium Card — Double-Bezel */}
                        <motion.div
                            {...fadeUp(0.18)}
                            className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[calc(2rem-1px)] bg-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">

                                {/* ── Left: Visual panel ── */}
                                <div className="relative min-h-[400px] lg:min-h-[600px]">
                                    <Image
                                        src="/contact/paulo-hiking.webp"
                                        alt="Paulo Lopes — Founder & Lead Developer"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {/* Brand-tinted overlay — not pure black */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/92 via-[#080d1a]/40 to-transparent" />

                                    {/* Name + title + location — bottom left */}
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <p className="text-white font-bold text-xl mb-0.5 leading-tight drop-shadow-md">
                                            {t("leftPanel.name")}
                                        </p>
                                        <p className="text-slate-400 text-sm mb-5">
                                            {t("leftPanel.title")}
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                                            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                                            <span className="text-white font-medium text-sm">{t("location")}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Right: Form panel ── */}
                                <div className="p-8 lg:p-12 relative">
                                    <AnimatePresence mode="wait">
                                        {submitStatus !== "success" ? (

                                            /* ─── FORM STATE ─── */
                                            <motion.div
                                                key="form"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{
                                                    opacity: 0,
                                                    ...(shouldAnimate ? { y: -10 } : {}),
                                                    transition: { duration: 0.28, ease: "easeIn" },
                                                }}
                                                transition={{ duration: 0.35 }}
                                            >
                                                {/* Form eyebrow + display-font title */}
                                                <div className="mb-8">
                                                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-4 border border-white/10">
                                                        {t("form.eyebrow")}
                                                    </div>
                                                    <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white mb-2">
                                                        {t("form.title")}
                                                    </h2>
                                                    <p className="text-slate-400">{t("form.subtitle")}</p>
                                                </div>

                                                <form onSubmit={handleSubmit} noValidate>
                                                    {/* Stagger parent for all field rows */}
                                                    <motion.div
                                                        variants={formStaggerParent}
                                                        initial="hidden"
                                                        animate="visible"
                                                        className="space-y-5"
                                                    >
                                                        {/* Row 1: Name & Email */}
                                                        <motion.div variants={fieldItem} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <div className="relative">
                                                                <input
                                                                    id="contact-name"
                                                                    type="text"
                                                                    name="name"
                                                                    value={formData.name}
                                                                    onChange={handleChange}
                                                                    placeholder=" "
                                                                    aria-required="true"
                                                                    aria-invalid={errors.name ? "true" : "false"}
                                                                    aria-describedby={errors.name ? "name-error" : undefined}
                                                                    className={`${inputBase} ${errors.name ? "border-red-500/70" : "border-white/10"}`}
                                                                />
                                                                <label htmlFor="contact-name" className={labelBase}>
                                                                    {t("form.labels.name")}
                                                                </label>
                                                                {errors.name && (
                                                                    <p id="name-error" className="mt-1 text-xs text-red-400" role="alert">
                                                                        {errors.name}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <div className="relative">
                                                                <input
                                                                    id="contact-email"
                                                                    type="email"
                                                                    name="email"
                                                                    value={formData.email}
                                                                    onChange={handleChange}
                                                                    placeholder=" "
                                                                    aria-required="true"
                                                                    aria-invalid={errors.email ? "true" : "false"}
                                                                    aria-describedby={errors.email ? "email-error" : undefined}
                                                                    className={`${inputBase} ${errors.email ? "border-red-500/70" : "border-white/10"}`}
                                                                />
                                                                <label htmlFor="contact-email" className={labelBase}>
                                                                    {t("form.labels.email")}
                                                                </label>
                                                                {errors.email && (
                                                                    <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">
                                                                        {errors.email}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </motion.div>

                                                        {/* Row 2: Company & Phone */}
                                                        <motion.div variants={fieldItem} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                            <div className="relative">
                                                                <input
                                                                    id="contact-company"
                                                                    type="text"
                                                                    name="company"
                                                                    value={formData.company}
                                                                    onChange={handleChange}
                                                                    placeholder=" "
                                                                    className={`${inputBase} border-white/10`}
                                                                />
                                                                <label htmlFor="contact-company" className={labelBase}>
                                                                    {t("form.labels.company")}
                                                                </label>
                                                            </div>
                                                            <div className="relative">
                                                                <input
                                                                    id="contact-phone"
                                                                    type="tel"
                                                                    name="phone"
                                                                    value={formData.phone}
                                                                    onChange={handleChange}
                                                                    placeholder=" "
                                                                    className={`${inputBase} border-white/10`}
                                                                />
                                                                <label htmlFor="contact-phone" className={labelBase}>
                                                                    {t("form.labels.phone")}
                                                                </label>
                                                            </div>
                                                        </motion.div>

                                                        {/* Row 3: Message + character count */}
                                                        <motion.div variants={fieldItem} className="relative">
                                                            <textarea
                                                                id="contact-message"
                                                                name="message"
                                                                value={formData.message}
                                                                onChange={handleChange}
                                                                placeholder=" "
                                                                rows={4}
                                                                maxLength={500}
                                                                aria-required="true"
                                                                aria-invalid={errors.message ? "true" : "false"}
                                                                aria-describedby={errors.message ? "message-error" : undefined}
                                                                className={`${inputBase} ${errors.message ? "border-red-500/70" : "border-white/10"} resize-none`}
                                                            />
                                                            <label htmlFor="contact-message" className={labelBase}>
                                                                {t("form.labels.message")}
                                                            </label>
                                                            <div className="flex justify-between items-center mt-1.5 px-0.5">
                                                                {errors.message ? (
                                                                    <p id="message-error" className="text-xs text-red-400" role="alert">
                                                                        {errors.message}
                                                                    </p>
                                                                ) : (
                                                                    <span />
                                                                )}
                                                                <span
                                                                    className={`text-[11px] tabular-nums transition-colors duration-300 ${
                                                                        formData.message.length > 450
                                                                            ? "text-amber-400"
                                                                            : "text-slate-600"
                                                                    }`}
                                                                >
                                                                    {formData.message.length}/500
                                                                </span>
                                                            </div>
                                                        </motion.div>

                                                        {/* Row 4: Submit button */}
                                                        <motion.div variants={fieldItem}>
                                                            <motion.button
                                                                type="submit"
                                                                disabled={isSubmitting}
                                                                whileHover={!isSubmitting ? { y: -3, scale: 1.02 } : undefined}
                                                                whileTap={!isSubmitting ? { scale: 0.97 } : undefined}
                                                                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                                                                className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-cyan-400 text-[#080d1a] font-semibold rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d1a] disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {isSubmitting ? (
                                                                    <>
                                                                        <svg
                                                                            className="animate-spin w-5 h-5 text-[#080d1a]"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                                        </svg>
                                                                        <span>{t("form.sending")}</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>{t("form.button")}</span>
                                                                        {/* Button-in-Button trailing arrow */}
                                                                        <span className="w-7 h-7 rounded-full bg-[#080d1a]/10 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="w-3.5 h-3.5"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2.5"
                                                                                aria-hidden="true"
                                                                            >
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                                                                            </svg>
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </motion.button>
                                                        </motion.div>
                                                    </motion.div>

                                                    {/* Error banner — outside stagger */}
                                                    {submitStatus === "error" && (
                                                        <div className="mt-5 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl" role="alert">
                                                            <p className="text-red-400 text-sm">
                                                                {submitError || t("form.errors.general")}
                                                            </p>
                                                        </div>
                                                    )}
                                                </form>
                                            </motion.div>

                                        ) : (

                                            /* ─── SUCCESS STATE ─── */
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                                transition={{ duration: 0.4 }}
                                                className="flex flex-col items-center justify-center min-h-[500px] text-center relative"
                                            >
                                                {/* Large ambient bloom — behind everything */}
                                                <div
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                                                >
                                                    <div
                                                        className="w-72 h-72 rounded-full blur-3xl opacity-50"
                                                        style={{
                                                            background:
                                                                "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(139,92,246,0.14) 45%, transparent 70%)",
                                                        }}
                                                    />
                                                </div>

                                                {/* Checkmark icon — spring pop + outer glow ring */}
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={
                                                        reducedMotion
                                                            ? { duration: 0.3 }
                                                            : { type: "spring", stiffness: 240, damping: 18, delay: 0.05 }
                                                    }
                                                    className="relative mb-8"
                                                >
                                                    {/* Outer halo ring */}
                                                    <div
                                                        aria-hidden="true"
                                                        className="absolute rounded-full blur-xl"
                                                        style={{
                                                            inset: "-14px",
                                                            background:
                                                                "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(139,92,246,0.2) 100%)",
                                                        }}
                                                    />
                                                    {/* Icon circle */}
                                                    <div
                                                        className="relative w-20 h-20 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-full flex items-center justify-center"
                                                        style={{ boxShadow: "0 0 48px rgba(34,211,238,0.28)" }}
                                                    >
                                                        <svg
                                                            className="w-10 h-10 text-white"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2.5}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    </div>
                                                </motion.div>

                                                {/* Stagger parent for text + button */}
                                                <motion.div
                                                    variants={successStagger}
                                                    initial="hidden"
                                                    animate="visible"
                                                    className="flex flex-col items-center"
                                                >
                                                    <motion.h3
                                                        variants={successItem}
                                                        className="text-3xl font-bold text-white mb-3"
                                                    >
                                                        {t("form.success.title")}
                                                    </motion.h3>

                                                    <motion.p
                                                        variants={successItem}
                                                        className="text-slate-400 mb-1.5 max-w-xs"
                                                    >
                                                        {t("form.success.message")}
                                                    </motion.p>

                                                    <motion.p
                                                        variants={successItem}
                                                        className="text-slate-500 text-sm mb-10"
                                                    >
                                                        {t("form.success.responseTime")}
                                                    </motion.p>

                                                    <motion.div variants={successItem}>
                                                        <motion.button
                                                            onClick={resetForm}
                                                            whileHover={{ y: -2, scale: 1.04 }}
                                                            whileTap={{ scale: 0.96 }}
                                                            transition={{ type: "spring", stiffness: 320, damping: 22 }}
                                                            className="px-7 py-3 bg-white/5 border border-white/15 text-white text-sm rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                                                        >
                                                            {t("form.success.button")}
                                                        </motion.button>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
