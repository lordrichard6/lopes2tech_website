"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { Link } from "@/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { Linkedin, Twitter, Instagram, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;
const VP   = { once: true, margin: "0px 0px -80px 0px" } as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;

// ── Count-up stat card ───────────────────────────────────────────────────────
function StatCard({
    value,
    suffix,
    decimals,
    label,
    delay,
}: {
    value: number;
    suffix: string;
    decimals: number;
    label: string;
    delay: number;
}) {
    const cardRef       = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const isInView      = useInView(cardRef, { once: true, margin: "0px 0px -80px 0px" });
    const rafRef        = useRef<number>(0);

    const fmt = (n: number) =>
        decimals > 0 ? n.toFixed(decimals) : Math.floor(n).toString();

    const [display, setDisplay] = useState(
        decimals > 0 ? "0." + "0".repeat(decimals) : "0"
    );

    useEffect(() => {
        if (!isInView) return;
        if (reducedMotion) { setDisplay(fmt(value)); return; }

        const duration  = 1700;
        const startTime = performance.now();

        rafRef.current = requestAnimationFrame(function tick(now) {
            const t     = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(fmt(eased * value));
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
        });

        return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, ...(reducedMotion ? {} : { y: 24, filter: "blur(8px)" }) }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VP}
            transition={{ duration: 0.8, delay, ease: EASE }}
            // #3 — spring transition scoped to whileHover only
            whileHover={{ y: -5, transition: SPRING }}
            className="group relative"
        >
            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04] h-full">
                <div className="relative p-8 rounded-[calc(2rem-1px)] bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] overflow-hidden h-full transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-white/[0.09]">
                    <div className="absolute inset-0 rounded-[calc(2rem-1px)] bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                    <div className="relative z-10">
                        <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 mb-3 tabular-nums">
                            {display}{suffix}
                        </div>
                        <div className="text-sm text-slate-400 font-medium">{label}</div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-cyan-400 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                </div>
            </div>
        </motion.div>
    );
}

// ── Schemas ──────────────────────────────────────────────────────────────────
const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paulo Lopes Reizinho",
    givenName: "Paulo",
    familyName: "Lopes Reizinho",
    jobTitle: "Founder & Full-Stack Developer",
    worksFor: { "@type": "Organization", name: "Lopes2Tech", url: "https://www.lopes2tech.ch" },
    url: "https://www.lopes2tech.ch/en/about",
    image: "https://www.lopes2tech.ch/founder.jpg",
    sameAs: [
        "https://www.linkedin.com/in/pauloreizinho/",
        "https://x.com/paulo_reizinho4",
        "https://www.instagram.com/paulo_reizinho/",
        "https://medium.com/@paulolopesreizinho",
    ],
    address: { "@type": "PostalAddress", addressLocality: "Zurich", addressCountry: "CH" },
    knowsAbout: ["Web Design", "SEO", "AI Integration", "Business Automation", "Next.js", "TypeScript", "React"],
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",  item: "https://www.lopes2tech.ch" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://www.lopes2tech.ch/en/about" },
    ],
};

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
    const t             = useTranslations("AboutPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const fadeUp = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: VP, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: VP, transition: { duration: 0.4, delay } };

    const fadeIn = (delay = 0) =>
        shouldAnimate
            ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

    const stats = [
        { value: 99.9, suffix: "%", decimals: 1, label: t("philosophy.stats.uptime")       },
        { value: 3,    suffix: "x", decimals: 0, label: t("philosophy.stats.delivery")     },
        { value: 5,    suffix: "★", decimals: 1, label: t("philosophy.stats.satisfaction") },
        { value: 150,  suffix: "+", decimals: 0, label: t("philosophy.stats.coffees")      },
    ];

    // #8 — gallery arrays now carry a hover label
    const galleryOne = [
        { src: "/about/about_01.webp", alt: "Lopes2Tech Workspace",  label: "Our Workspace"       },
        { src: "/about/about_02.webp", alt: "Development Process",   label: "Development Process" },
        { src: "/about/about_03.webp", alt: "Team Collaboration",    label: "Team Collaboration"  },
    ];

    const galleryTwo = [
        { src: "/about/swiss_alps.webp",  alt: "Swiss Alps Summer", label: "Swiss Alps"   },
        { src: "/about/user_coding.webp", alt: "Coding at Office",  label: "Craft & Code" },
        { src: "/about/zurich_view.webp", alt: "Zurich Cityscape",  label: "Zurich"       },
    ];

    // Reusable gallery card — shared between both grids
    const GalleryCard = ({ src, alt, label, delay }: { src: string; alt: string; label: string; delay: number }) => (
        <motion.div
            {...fadeUp(delay)}
            className="aspect-[4/3] p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
        >
            <div className="relative h-full rounded-[calc(2rem-1px)] overflow-hidden group shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/70 via-[#080d1a]/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                {/* #8 — label pill revealed on hover */}
                <div className="absolute bottom-4 left-4 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <span className="px-3 py-1 rounded-full bg-[#080d1a]/80 border border-white/15 text-white text-[11px] font-medium tracking-wide">
                        {label}
                    </span>
                </div>
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                />
            </div>
        </motion.div>
    );

    return (
        <main className="min-h-screen bg-[#080d1a]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}     />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <Navbar />

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
                    <motion.div
                        animate={shouldAnimate ? { y: [0, -30, 0], x: [0, 20, 0] } : undefined}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-cyan-400 blur-[80px] opacity-20"
                    />
                    <motion.div
                        animate={shouldAnimate ? { y: [0, 30, 0], x: [0, -20, 0] } : undefined}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7 }}
                        className="absolute top-[20%] right-[10%] w-[250px] h-[250px] rounded-full bg-violet-500 blur-[80px] opacity-20"
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div {...fadeIn(0)}>
                        <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                            {t("hero.badge")}
                        </div>
                    </motion.div>
                    <motion.h1
                        {...fadeIn(0.1)}
                        className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight leading-[1.1]"
                    >
                        {t("hero.title")}
                    </motion.h1>
                    <motion.p
                        {...fadeIn(0.2)}
                        className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t("hero.description")}
                    </motion.p>
                </div>
            </section>

            {/* ── Gallery One — #2 py-8 → py-16 ────────────────────────────── */}
            <section className="relative py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {galleryOne.map((img, i) => (
                            <GalleryCard key={img.src} {...img} delay={i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Philosophy ────────────────────────────────────────────────── */}
            <section className="relative py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">

                    {/* #4 — heading split into 3 individually staggered elements */}
                    <div className="text-center mb-16">
                        <motion.div {...fadeUp(0)} className="inline-block mb-4">
                            <div className="px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] border border-white/10">
                                {t("philosophy.eyebrow")}
                            </div>
                        </motion.div>
                        <motion.h2
                            {...fadeUp(0.1)}
                            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            {t("philosophy.title")}
                        </motion.h2>
                        <motion.p
                            {...fadeUp(0.2)}
                            className="text-lg text-slate-400 max-w-3xl mx-auto"
                        >
                            {t("philosophy.description")}
                        </motion.p>
                    </div>

                    {/* Stat cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {stats.map((stat, i) => (
                            <StatCard key={i} {...stat} delay={i * 0.1} />
                        ))}
                    </div>

                    {/* Gallery Two */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
                        {galleryTwo.map((img, i) => (
                            <GalleryCard key={img.src} {...img} delay={0.1 + i * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* #6 — Hairline divider between philosophy world and founder world */}
            <div className="max-w-7xl mx-auto px-6" aria-hidden="true">
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* ── Founder ── #5 ambient depth added ────────────────────────── */}
            <section className="relative py-24 overflow-hidden">
                {/* Ambient orbs anchored to portrait side */}
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div
                        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-50"
                        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.11) 0%, transparent 70%)" }}
                    />
                    <div
                        className="absolute top-1/4 right-0 w-[380px] h-[380px] rounded-full blur-[110px] opacity-40"
                        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left: Portrait — #9 max-w-md → max-w-lg */}
                        <motion.div {...fadeUp(0)} className="relative">
                            <div className="relative aspect-square max-w-lg mx-auto">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400 via-violet-500 to-cyan-400 p-[3px]">
                                    <div className="w-full h-full rounded-3xl bg-[#080d1a] overflow-hidden">
                                        <Image
                                            src="/founder.jpg"
                                            alt="Paulo Lopes Reizinho — Founder of Lopes2Tech"
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-cover"
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-400/15 to-violet-500/15 blur-2xl -z-10" />
                            </div>
                        </motion.div>

                        {/* Right: Story + Quote + Socials */}
                        <motion.div {...fadeUp(0.15)} className="space-y-8">
                            <div>
                                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-4 border border-white/10">
                                    {t("founder.eyebrow")}
                                </div>
                                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-white mb-6">
                                    {t("founder.title")}
                                </h2>
                                <div className="space-y-4 text-lg text-slate-400 leading-relaxed">
                                    <p dangerouslySetInnerHTML={{ __html: t.raw("founder.description1") }} />
                                    <p dangerouslySetInnerHTML={{ __html: t.raw("founder.description2") }} />
                                </div>
                            </div>

                            {/* Quote — Double-Bezel, #7 font-serif → display font */}
                            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                                <div className="relative p-6 rounded-[calc(2rem-1px)] bg-gradient-to-br from-cyan-400/10 to-violet-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] overflow-hidden">
                                    <div className="absolute top-3 left-5 text-6xl text-cyan-400/20 font-[family-name:var(--font-display)] leading-none select-none">
                                        &ldquo;
                                    </div>
                                    <p className="relative z-10 text-xl text-white font-medium italic pl-8">
                                        {t("founder.quote")}
                                    </p>
                                </div>
                            </div>

                            {/* Social links */}
                            <div>
                                <p className="text-sm text-slate-500 mb-4">{t("founder.connect")}</p>
                                <div className="flex gap-3">
                                    {[
                                        { href: "https://www.linkedin.com/in/pauloreizinho/",   label: "Paulo Lopes on LinkedIn",    Icon: Linkedin  },
                                        { href: "https://x.com/paulo_reizinho4",                label: "Paulo Lopes on X (Twitter)", Icon: Twitter   },
                                        { href: "https://www.instagram.com/paulo_reizinho/",    label: "Paulo Lopes on Instagram",   Icon: Instagram },
                                        { href: "https://medium.com/@paulolopesreizinho",       label: "Paulo Lopes on Medium",      Icon: FileText  },
                                    ].map(({ href, label, Icon }) => (
                                        <motion.div
                                            key={href}
                                            whileHover={{ y: -3, scale: 1.08, transition: SPRING }}
                                            whileTap={{ scale: 0.93, transition: SPRING }}
                                        >
                                            <Link
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={label}
                                                className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 hover:text-cyan-400 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                                            >
                                                <Icon className="w-4 h-4" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <CTA />
            <Footer />
        </main>
    );
}
