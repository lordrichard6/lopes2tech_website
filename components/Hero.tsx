"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { trackCTAClick } from "@/lib/analytics";
import { sendBookingNotificationEmail } from "@/app/actions/contact";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
    const t = useTranslations('Hero');
    const { scrollY } = useScroll();
    const reducedMotion = useReducedMotion();

    // Parallax Transforms — gentle values to avoid nausea on scroll
    // When reduced motion is preferred, pass 0 to disable all parallax
    const yTitleRaw = useTransform(scrollY, [0, 500], [0, 60]);
    const yTextRaw  = useTransform(scrollY, [0, 500], [0, 80]);
    const yButtonRaw = useTransform(scrollY, [0, 500], [0, 120]);
    const yImageRaw = useTransform(scrollY, [0, 500], [0, 30]);

    const yTitle  = reducedMotion ? 0 : yTitleRaw;
    const yText   = reducedMotion ? 0 : yTextRaw;
    const yButton = reducedMotion ? 0 : yButtonRaw;
    const yImage  = reducedMotion ? 0 : yImageRaw;

    const handleBookingClick = () => {
        trackCTAClick('hero_book_call');
        sendBookingNotificationEmail();
    };

    return (
        <section
            id="home"
            className="relative min-h-[100dvh] flex items-center overflow-hidden bg-black"
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/vids/hero-poster.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/vids/hero.mp4" type="video/mp4" />
                </video>

                {/* Dark gradient overlay — ensures heading legibility over any video frame */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />

                {/* Ambient orbs — large, deeply blurred, non-competing */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-15%] right-[5%] w-[700px] h-[700px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
                    <div className="absolute bottom-[5%] left-[-5%] w-[550px] h-[550px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
                </div>

                {/* Background Waves */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="relative block w-[calc(100%+2rem)] h-[120px]"
                    >
                        <motion.path
                            animate={{ x: [0, -25, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
                            d="M0,120V73.71c47.79-22.2,103.59-32.17,158-28,70.36,5.37,136.33,33.31,206.8,37.5,73.84,4.36,147.54-16.88,218.2-35.26,69.27-18,138.3-24.88,209.4-13.08,36.15,6,69.85,17.84,104.45,29.34,92.64,30.79,216.14,70.08,303.85,2.52V120Z"
                            className="fill-[#080d1a] opacity-25"
                        ></motion.path>
                        <motion.path
                            animate={{ x: [0, -25, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
                            d="M0,120V104.19C13,83.08,27.64,63.14,47.69,47.95,99.41,8.73,165,9,224.58,28.42c31.15,10.15,60.09,26.07,89.67,39.8,40.92,19,84.73,46,130.83,49.67,36.26,2.85,70.9-9.42,98.6-31.56,31.77-25.39,62.32-62,103.63-73,40.44-10.79,81.35,6.69,119.13,24.28s75.16,39,116.92,43.05c59.73,5.85,113.28-22.88,168.9-38.84,30.2-8.66,59-6.17,87.09,7.5,22.43,10.89,48,26.93,60.65,49.24V120Z"
                            className="fill-[#080d1a] opacity-50"
                        ></motion.path>
                    </svg>
                </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-24 md:py-0 flex flex-col md:flex-row items-center md:justify-between text-left gap-8 md:gap-0">
                <div className="w-full md:max-w-[60%] flex flex-col items-center md:items-start text-center md:text-left relative z-20">

                    {/* Eyebrow badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-medium text-cyan-400 mb-5"
                    >
                        {t('badge')}
                    </motion.span>

                    <motion.h1
                        style={{ y: yTitle }}
                        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[2.2rem] leading-[1.1] font-extrabold tracking-tight mb-4 md:text-[4.5rem] break-words hyphens-auto text-balance font-[family-name:var(--font-display)]"
                    >
                        <span className="block text-white">{t('title1')}</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">{t('title2')}</span>
                    </motion.h1>

                    <motion.p
                        style={{ y: yText, textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                        className="text-white text-[1rem] md:text-[1.25rem] leading-[1.6] max-w-[700px] mb-8"
                    >
                        {t('subtitle')}
                    </motion.p>

                    <motion.div
                        style={{ y: yButton }}
                        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col items-center md:items-start gap-4 mb-8"
                    >
                        <div className="flex flex-wrap items-center gap-4">
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleBookingClick}
                                className="group relative px-8 py-4 rounded-full bg-cyan-500/10 text-white font-semibold border border-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.3),inset_0_0_15px_rgba(0,245,255,0.1)] hover:bg-cyan-500/20 hover:shadow-[0_0_25px_rgba(0,245,255,0.6),inset_0_0_20px_rgba(0,245,255,0.2)] hover:-translate-y-[2px] active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10">{t('cta')}</span>
                                <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-110">
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:hidden" />
                            </a>

                            <Link
                                href="/portfolio"
                                className="group flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                            >
                                {t('seeWork')}
                                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Social proof micro-signal */}
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5" aria-label="5 stars">
                                {[0, 1, 2, 3, 4].map(i => (
                                    <svg key={i} className="w-3 h-3 fill-amber-400 text-amber-400" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-xs text-white/40">5.0 on Google</span>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image - Parallax Effect */}
                <div className="hidden md:block relative w-[60%] h-[700px] z-10 pointer-events-none">
                    <motion.div
                        style={{ y: yImage }}
                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-[-120px] right-[-50px] w-full h-full flex items-end justify-center"
                    >
                        <Image
                            src="/me_paper.png"
                            alt="Paulo Lopes - Founder of Lopes2Tech"
                            width={800}
                            height={1000}
                            priority
                            sizes="(max-width: 768px) 0px, 60vw"
                            className="w-auto h-full max-h-[95vh] object-contain drop-shadow-[0_0_50px_rgba(34,211,238,0.2)] scale-x-[-1]"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll-down indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute bottom-[148px] left-1/2 -translate-x-1/2 z-[15] flex flex-col items-center gap-1.5 pointer-events-none motion-reduce:hidden"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
                >
                    <ChevronDown className="w-5 h-5 text-white/30" />
                </motion.div>
            </motion.div>

            {/* Foreground Wave (In Front of Content) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="relative block w-[calc(100%+2rem)] h-[120px]"
                >
                    <path
                        d="M0,120V114.37C149.93,61,314.09,48.68,475.83,77.43c43,7.64,84.23,20.12,127.61,26.46,59,8.63,112.48-12.24,165.56-35.4C827.93,42.78,886,24.76,951.2,30c86.53,7,172.46,45.71,248.8,84.81V120Z"
                        className="fill-[#080d1a]"
                    ></path>
                </svg>
            </div>
        </section>
    );
}
