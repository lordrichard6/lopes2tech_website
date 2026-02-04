"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin, Instagram, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-16 pb-8 bg-[#0a0e27] text-white overflow-hidden text-center">
            {/* ... (background elements) */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-60"
                style={{
                    background: "linear-gradient(45deg, rgba(34, 211, 238, 0.05) 0%, transparent 50%, rgba(168, 85, 247, 0.08) 100%)",
                }}
            />

            {/* Subtle top border */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] z-10"
                style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.6) 20%, rgba(34, 211, 238, 0.8) 50%, rgba(34, 211, 238, 0.6) 80%, transparent 100%)",
                    boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)"
                }}
            />

            <div className="relative z-10 container max-w-[1200px] mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mb-8">

                    {/* Logo Section - Left Aligned on Desktop */}
                    <div className="relative group cursor-pointer justify-self-center md:justify-self-start">
                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.6)_0%,_rgba(34,211,238,0.3)_40%,_rgba(168,85,247,0.2)_70%,_transparent_100%)] blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" />

                        {/* Logo Image */}
                        <Image
                            src="/logo_w.svg"
                            alt="Lopes2Tech - Swiss IT Solutions Logo"
                            width={120}
                            height={80}
                            className="relative z-10 h-[80px] w-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                        />
                    </div>

                    {/* Navigation Links - Centered */}
                    <div className="flex flex-wrap justify-center gap-8 justify-self-center w-full">
                        {['impressum', 'privacy', 'terms'].map((key) => (
                            <Link
                                key={key}
                                href={`/${key === 'privacy' ? 'privacy-policy' : key === 'terms' ? 'terms-of-service' : key}`}
                                className="relative text-white/85 text-[0.95rem] font-medium transition-all duration-300 hover:text-white hover:-translate-y-1 group"
                            >
                                {t(`links.${key}`)}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Social Icons - Right Aligned on Desktop */}
                    <div className="flex items-center gap-4 justify-self-center md:justify-self-end">
                        {[
                            { icon: Mail, href: "mailto:paulo@lopes2tech.ch", label: "Email" },
                            { icon: Linkedin, href: "https://www.linkedin.com/company/lopes2tech/", label: "LinkedIn" },
                            { icon: Instagram, href: "https://www.instagram.com/lopes2tech/", label: "Instagram" },
                            { icon: FileText, href: "https://medium.com/@paulolopesreizinho", label: "Medium" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white/90 transition-all duration-400 overflow-hidden group hover:-translate-y-1 hover:scale-105 hover:border-cyan-500/50 hover:shadow-[0_8px_24px_rgba(34,211,238,0.3)]"
                            >
                                {/* Shine Effect */}
                                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />

                                <social.icon className="w-5 h-5 relative z-10" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 relative text-center">
                    {/* Top Border */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-white/60 text-sm tracking-wide">
                        &copy; {currentYear} Lopes2Tech. {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
