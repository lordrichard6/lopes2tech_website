"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // TODO: Replace with actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitStatus("success");
            setFormData({ name: "", email: "", company: "", phone: "", message: "" });
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const resetForm = () => {
        setSubmitStatus("idle");
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
    };

    return (
        <main className="min-h-screen bg-[#0f172a] relative">
            <Navbar />

            {/* Video Background */}
            <div className="fixed inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/vids/dark.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0f172a]/80" />
            </div>

            {/* Content */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
                            <Mail className="inline w-4 h-4 mr-2" />
                            Get in Touch
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                            Let&apos;s Build Something{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                                Extraordinary
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Based in Zurich, delivering digital excellence to the world.
                        </p>
                    </motion.header>

                    {/* Premium Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                    >
                        {/* Left: Visual Side */}
                        <div className="relative min-h-[400px] lg:min-h-[600px]">
                            <Image
                                src="/contact/paulo-hiking.webp"
                                alt="Paulo Lopes - Founder"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <div className="absolute bottom-8 left-8">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <MapPin className="w-4 h-4 text-cyan-400" />
                                    <span className="text-white font-medium">Zurich, Switzerland</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form Side */}
                        <div className="p-8 lg:p-12">
                            {submitStatus !== "success" ? (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-3xl font-bold text-white mb-2">
                                            Start a Conversation
                                        </h2>
                                        <p className="text-slate-400">
                                            Tell me about your project. I usually respond within 24 hours.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name & Email Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder=" "
                                                    className={`peer w-full px-4 py-3 bg-white/5 border ${errors.name ? "border-red-500" : "border-white/10"
                                                        } rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors`}
                                                />
                                                <label className="absolute left-4 -top-2.5 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400">
                                                    Name
                                                </label>
                                                {errors.name && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                                )}
                                            </div>

                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder=" "
                                                    className={`peer w-full px-4 py-3 bg-white/5 border ${errors.email ? "border-red-500" : "border-white/10"
                                                        } rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors`}
                                                />
                                                <label className="absolute left-4 -top-2.5 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400">
                                                    Email
                                                </label>
                                                {errors.email && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Company & Phone Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    placeholder=" "
                                                    className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors"
                                                />
                                                <label className="absolute left-4 -top-2.5 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400">
                                                    Company (Optional)
                                                </label>
                                            </div>

                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder=" "
                                                    className="peer w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors"
                                                />
                                                <label className="absolute left-4 -top-2.5 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400">
                                                    Phone (Optional)
                                                </label>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="relative">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder=" "
                                                rows={4}
                                                className={`peer w-full px-4 py-3 bg-white/5 border ${errors.message ? "border-red-500" : "border-white/10"
                                                    } rounded-xl text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors resize-none`}
                                            />
                                            <label className="absolute left-4 -top-2.5 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400">
                                                How can I help you?
                                            </label>
                                            {errors.message && (
                                                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="relative w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span className="relative z-10">
                                                {isSubmitting ? "Sending..." : "Send Message"}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </button>

                                        {submitStatus === "error" && (
                                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                                <p className="text-red-400 text-sm">
                                                    Something went wrong. Please try again or email me directly.
                                                </p>
                                            </div>
                                        )}
                                    </form>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 mb-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center"
                                    >
                                        <svg
                                            className="w-10 h-10 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-slate-400 mb-8">
                                        Thanks for reaching out. I&apos;ll get back to you shortly.
                                    </p>
                                    <button
                                        onClick={resetForm}
                                        className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
