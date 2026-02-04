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
                    <Link href="/" className="flex items-center gap-3 group relative">
                        <div className="relative w-[45px] h-[45px] animate-logo-glow transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src="/logo_w.svg"
                                alt="Lopes2Tech Logo"
                                fill
                                priority
                                className="object-contain drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]"
                            />
                        </div>

                        <div className="flex items-baseline gap-[2px] font-sans ml-2">
                            <span className="font-bold text-[1.8rem] leading-[44px] text-white tracking-tight drop-shadow-[0_0_10px_#00f3ff]">
                                lopes
                            </span>
                            <span className="relative top-[2px] font-extrabold text-[3.2rem] leading-none text-white mx-[-2px] drop-shadow-[0_0_10px_#b845ff]">
                                2
                            </span>
                            <span className="font-extrabold text-[1.8rem] lowercase text-white drop-shadow-[0_0_10px_#ff9900]">
                                tech
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-8 ml-auto mr-8">
                        {navLinks.map((link) => (
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
                        ))}
                    </ul>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-4 pl-6 border-l border-white/10 h-[32px]">
                        <a
                            href="https://app.lopes2tech.ch"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-cyan-500/10 border border-cyan-400 shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(0,245,255,0.6)] transition-all hover:-translate-y-[1px]"
                        >
                            Client Portal
                        </a>

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
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xl uppercase tracking-widest font-medium text-white/70 hover:text-white transition-colors"
                                    >
                                        {t(link.key)}
                                    </Link>
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
                                <a
                                    href="https://app.lopes2tech.ch"
                                    className="px-8 py-3 text-lg font-semibold rounded-full text-white bg-cyan-500/10 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                >
                                    Client Portal
                                </a>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
