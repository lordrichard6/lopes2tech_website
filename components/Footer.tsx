"use client";

import { Link } from "@/navigation";
import Image from "next/image";
import { Mail, Linkedin, Instagram, FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear(); // module-level would be ideal but this is fine for SSR

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
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 text-left">
                    {/* Logo & Description */}
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                        <div className="relative group cursor-pointer mb-4">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.6)_0%,_rgba(34,211,238,0.3)_40%,_rgba(168,85,247,0.2)_70%,_transparent_100%)] blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" />
                            <Image
                                src="/logo_w.svg"
                                alt="Lopes2Tech - Swiss IT Solutions Logo"
                                width={80}
                                height={60}
                                className="relative z-10 h-[60px] w-auto transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                            />
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed text-center md:text-left">{t('description')}</p>
                        <NewsletterSignup />
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('sections.services')}</h4>
                        <ul className="space-y-2">
                            {[
                                { href: "/services/web-design", label: t('serviceLinks.webDesign') },
                                { href: "/services/seo-development", label: t('serviceLinks.seo') },
                                { href: "/services/ai-integration", label: t('serviceLinks.ai') },
                                { href: "/services/business-automation", label: t('serviceLinks.automation') },
                                { href: "/services/web-apps", label: t('serviceLinks.webApps') },
                                { href: "/services/ecommerce", label: t('serviceLinks.ecommerce') },
                                { href: "/services/social-media-marketing", label: t('serviceLinks.socialMedia') },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/60 text-sm hover:text-cyan-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('sections.company')}</h4>
                        <ul className="space-y-2">
                            {[
                                { href: "/about", label: t('companyLinks.about') },
                                { href: "/portfolio", label: t('companyLinks.portfolio') },
                                { href: "/insights", label: t('companyLinks.insights') },
                                { href: "/faq", label: t('companyLinks.faq') },
                                { href: "/contact", label: t('companyLinks.contact') },
                                { href: "/pricing", label: t('companyLinks.pricing') },
                                { href: "/referral", label: t('companyLinks.referral') },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/60 text-sm hover:text-cyan-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div>
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t('sections.legal')}</h4>
                        <ul className="space-y-2 mb-6">
                            {['impressum', 'privacy', 'terms'].map((key) => (
                                <li key={key}>
                                    <Link
                                        href={`/${key === 'privacy' ? 'privacy-policy' : key === 'terms' ? 'terms-of-service' : key}`}
                                        className="text-white/60 text-sm hover:text-cyan-400 transition-colors"
                                    >
                                        {t(`links.${key}`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: Mail, href: "mailto:paulo@lopes2tech.ch", label: "Send us an email" },
                                { icon: Linkedin, href: "https://www.linkedin.com/company/lopes2tech/", label: "Visit our LinkedIn profile" },
                                { icon: Instagram, href: "https://www.instagram.com/lopes2tech/", label: "Visit our Instagram profile" },
                                { icon: FileText, href: "https://medium.com/@paulolopesreizinho", label: "Read our Medium articles" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white/90 transition-all duration-400 overflow-hidden group hover:-translate-y-1 hover:border-cyan-500/50"
                                >
                                    <social.icon className="w-4 h-4 relative z-10" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 relative text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <p className="text-white/60 text-sm tracking-wide">
                        &copy; {currentYear} Lopes2Tech. {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}
