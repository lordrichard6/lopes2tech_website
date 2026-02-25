"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('Navigation');
    // We can't easily get current locale from client component without passing it or parsing.
    // However, next-intl useLocale hook exists.
    const locale = useLocale();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { key: "home", href: "/" },
        { key: "services", href: "/services" },
        { key: "portfolio", href: "/portfolio" },
        { key: "insights", href: "/insights" },
        { key: "about", href: "/about" },
        { key: "contact", href: "/contact" },
    ];

    const serviceLinks = [
        { href: "/services/web-design", label: "Web Design" },
        { href: "/services/seo-development", label: "SEO Development" },
        { href: "/services/ai-integration", label: "AI Integration" },
        { href: "/services/business-automation", label: "Business Automation" },
        { href: "/services/web-apps", label: "Web Applications" },
        { href: "/services/ecommerce", label: "E-Commerce" },
        { href: "/services/social-media-marketing", label: "Social Media" },
    ];

    const changeLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsLangOpen(false);
    };

    return (
        <>
            <header
                className={clsx(
                    "fixed top-6 left-0 right-0 mx-auto w-[95%] max-w-[1200px] z-50 rounded-[20px] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] border border-white/10 backdrop-blur-md",
                    isScrolled
                        ? "top-4 bg-black/85 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border-white/10"
                        : "bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                )}
            >
                <nav className="flex justify-between items-center px-6 py-3">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group relative">
                        <div className="relative w-[45px] h-[45px] animate-logo-glow transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo_w.svg"
                                alt="Lopes2Tech Logo"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]"
                            />
                        </div>

                        <div className="flex items-center gap-[1px] font-sans ml-1">
                            <span className="font-bold text-[1.4rem] text-white tracking-tight drop-shadow-[0_0_10px_#00f3ff]">
                                lopes
                            </span>
                            <span className="font-extrabold text-[2.4rem] leading-none text-white mx-[-1px] drop-shadow-[0_0_10px_#b845ff]">
                                2
                            </span>
                            <span className="font-extrabold text-[1.4rem] lowercase text-white drop-shadow-[0_0_10px_#ff9900]">
                                tech
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-8 ml-auto mr-8" role="menubar">
                        {navLinks.map((link) =>
                            link.key === "services" ? (
                                <li
                                    key={link.key}
                                    className="relative"
                                    onMouseEnter={() => setIsServicesOpen(true)}
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                >
                                    <Link
                                        href="/services"
                                        className={clsx(
                                            "relative text-[0.95rem] font-medium transition-all duration-300 nav-link-shadow inline-flex items-center gap-1",
                                            pathname.startsWith("/services") ? "text-white" : "text-white/70 hover:text-white"
                                        )}
                                    >
                                        {t("services")}
                                        <ChevronDown className={clsx("w-3 h-3 transition-transform", isServicesOpen && "rotate-180")} />
                                    </Link>
                                    <AnimatePresence>
                                        {isServicesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 min-w-[220px] shadow-2xl"
                                            >
                                                {serviceLinks.map((service) => (
                                                    <Link
                                                        key={service.href}
                                                        href={service.href}
                                                        className="block px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                                        onClick={() => setIsServicesOpen(false)}
                                                    >
                                                        {service.label}
                                                    </Link>
                                                ))}
                                                <div className="border-t border-white/10 mt-1 pt-1">
                                                    <Link
                                                        href="/services"
                                                        className="block px-4 py-2.5 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-all font-medium"
                                                        onClick={() => setIsServicesOpen(false)}
                                                    >
                                                        All Services →
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            ) : (
                                <li key={link.key}>
                                    <Link
                                        href={link.href}
                                        className={clsx(
                                            "relative text-[0.95rem] font-medium transition-all duration-300 nav-link-shadow",
                                            pathname === link.href ? "text-white" : "text-white/70 hover:text-white"
                                        )}
                                    >
                                        {t(link.key)}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-4 pl-6 border-l border-white/10 h-[32px]">
                        <Link
                            href="/client-portal"
                            className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-cyan-500/10 border border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] transition-all hover:-translate-y-[1px]"
                        >
                            {t('clientPortal')}
                        </Link>

                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-1 text-white/70 text-sm cursor-pointer hover:text-white uppercase"
                            >
                                {locale}
                                <ChevronDown className="w-3 h-3" />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 bg-black/90 border border-white/10 rounded-lg overflow-hidden min-w-[80px]"
                                    >
                                        {['en', 'pt', 'de'].map((l) => (
                                            <button
                                                key={l}
                                                onClick={() => changeLanguage(l)}
                                                className={`block w-full text-left px-4 py-2 text-sm uppercase hover:bg-white/10 ${locale === l ? 'text-cyan-400 font-bold' : 'text-white/70'}`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={clsx(
                            "md:hidden flex justify-center items-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:border-white/30",
                            isMenuOpen && "bg-white/15 border-white/40"
                        )}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white/80" />}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 bg-gradient-to-br from-[#08080c]/98 to-[#14141e]/99 backdrop-blur-xl flex flex-col justify-center items-center gap-6"
                    >
                        {/* Background glows */}
                        <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-cyan-500/15 blur-[60px] pointer-events-none" />
                        <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[60px] pointer-events-none" />

                        <nav className="flex flex-col items-center gap-8 w-full">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="w-full text-center"
                                >
                                    {link.key === "services" ? (
                                        <div className="w-full text-center">
                                            <button
                                                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                                className="text-xl uppercase tracking-widest font-medium text-white/70 hover:text-white transition-colors inline-flex items-center gap-2"
                                            >
                                                {t(link.key)}
                                                <ChevronDown className={clsx("w-4 h-4 transition-transform", isMobileServicesOpen && "rotate-180")} />
                                            </button>
                                            <AnimatePresence>
                                                {isMobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden mt-3"
                                                    >
                                                        <div className="flex flex-col gap-2">
                                                            {serviceLinks.map((service) => (
                                                                <Link
                                                                    key={service.href}
                                                                    href={service.href}
                                                                    onClick={() => { setIsMenuOpen(false); setIsMobileServicesOpen(false); }}
                                                                    className="text-sm text-white/50 hover:text-cyan-400 transition-colors"
                                                                >
                                                                    {service.label}
                                                                </Link>
                                                            ))}
                                                            <Link
                                                                href="/services"
                                                                onClick={() => { setIsMenuOpen(false); setIsMobileServicesOpen(false); }}
                                                                className="text-sm text-cyan-400 font-medium mt-1"
                                                            >
                                                                All Services →
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-xl uppercase tracking-widest font-medium text-white/70 hover:text-white transition-colors"
                                        >
                                            {t(link.key)}
                                        </Link>
                                    )}
                                </motion.div>
                            ))}

                            {/* Mobile Language Switcher */}
                            <div className="flex gap-4 mt-4">
                                {['en', 'pt', 'de'].map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => { changeLanguage(l); setIsMenuOpen(false); }}
                                        className={`px-4 py-2 rounded-full border ${locale === l ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' : 'border-white/10 text-white/60'}`}
                                    >
                                        {l.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8"
                            >
                                <Link
                                    href="/client-portal"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="px-8 py-3 text-lg font-semibold rounded-full text-white bg-cyan-500/10 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                >
                                    {t('clientPortal')}
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
