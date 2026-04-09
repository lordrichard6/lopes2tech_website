"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Monitor, Layout, Cpu, ShoppingCart, Database, Search, Bot } from "lucide-react";

const EASE   = [0.16, 1, 0.3, 1] as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;

const serviceConfig = [
    { number: "01", key: "webDev",     image: "/assets/services/websites.webp",        href: "/services/web-design",             icon: Monitor,       gradient: "from-cyan-400 to-cyan-600",      glow: "rgba(34,211,238,0.15)"  },
    { number: "02", key: "marketing",  image: "/assets/services/marketing.webp",        href: "/services/social-media-marketing", icon: Layout,        gradient: "from-purple-400 to-pink-500",    glow: "rgba(168,85,247,0.15)"  },
    { number: "03", key: "seo",        image: "/assets/services/seo.webp",              href: "/services/seo-development",        icon: Search,        gradient: "from-emerald-400 to-cyan-500",   glow: "rgba(52,211,153,0.15)"  },
    { number: "04", key: "automation", image: "/assets/services/ai.webp",               href: "/services/business-automation",    icon: Cpu,           gradient: "from-orange-400 to-red-500",     glow: "rgba(251,146,60,0.15)"  },
    { number: "05", key: "ecommerce",  image: "/assets/services/ecommerce.webp",        href: "/services/ecommerce",              icon: ShoppingCart,  gradient: "from-cyan-400 to-violet-500",    glow: "rgba(34,211,238,0.12)"  },
    { number: "06", key: "webApps",    image: "/assets/services/custom_web_apps.webp",  href: "/services/web-apps",               icon: Database,      gradient: "from-blue-400 to-cyan-500",      glow: "rgba(96,165,250,0.15)"  },
    { number: "07", key: "ai",         image: "/assets/services/ai.webp",               href: "/services/ai-integration",         icon: Bot,           gradient: "from-violet-400 to-purple-600",  glow: "rgba(167,139,250,0.15)" },
];

const statsConfig = [
    { value: "19",   key: "projects"  },
    { value: "3",    key: "countries" },
    { value: "5.0★", key: "rating"   },
    { value: "24h",  key: "response"  },
];

export default function ServicesHubSections() {
    const t             = useTranslations("ServicesHubPage");
    const reducedMotion = useReducedMotion();
    const shouldAnimate = !reducedMotion;

    const services = serviceConfig.map((cfg) => ({
        ...cfg,
        badge:       t(`services.${cfg.key}.badge`),
        title:       t(`services.${cfg.key}.title`),
        description: [t(`services.${cfg.key}.desc1`), t(`services.${cfg.key}.desc2`)],
        bullets: [
            t(`services.${cfg.key}.bullet1`),
            t(`services.${cfg.key}.bullet2`),
            t(`services.${cfg.key}.bullet3`),
            t(`services.${cfg.key}.bullet4`),
        ],
    }));

    const stats = statsConfig.map((s) => ({
        value: s.value,
        label: t(`stats.${s.key}`),
    }));

    return (
        <div className="relative z-10">

            {/* ── Stats Bar ─────────────────────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={VP}
                transition={{ duration: 0.8, ease: EASE }}
                className="max-w-5xl mx-auto px-6 mb-10"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        /* Double-Bezel stat card */
                        <div key={stat.label} className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
                            <div className="flex flex-col items-center justify-center p-6 rounded-[calc(2rem-1px)] bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                                <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500 mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-slate-400 text-sm">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── Service Sections ──────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6">
                {services.map((service, index) => {
                    const isEven = index % 2 === 0;
                    const Icon   = service.icon;

                    return (
                        <motion.div
                            key={service.number}
                            initial={{ opacity: 0, ...(shouldAnimate ? { y: 50, filter: "blur(8px)" } : {}) }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={VP}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-20 md:py-28 border-b border-white/5 last:border-0"
                        >
                            {/* Ghost Number */}
                            <span
                                aria-hidden="true"
                                className={`absolute ${isEven ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[clamp(120px,18vw,220px)] font-extrabold text-white/[0.025] select-none pointer-events-none leading-none`}
                            >
                                {service.number}
                            </span>

                            {/* Image — hover scale on parent only (no CSS hover:scale on Image) */}
                            <motion.div
                                className={`relative ${isEven ? "md:order-1" : "md:order-2"}`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5, ease: EASE }}
                            >
                                <div
                                    className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
                                    style={{ boxShadow: `0 25px 80px ${service.glow}` }}
                                >
                                    <Image
                                        src={service.image}
                                        alt={`${service.title} — Lopes2Tech Switzerland`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    {/* Overlay — #080d1a unified */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#080d1a]/50 via-transparent to-transparent" />

                                    {/* Icon badge */}
                                    <div className={`absolute bottom-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Text Content */}
                            <div className={`relative ${isEven ? "md:order-2" : "md:order-1"}`}>

                                {/* Service badge — intentional per-service gradient */}
                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
                                    {service.badge}
                                </div>

                                <h2
                                    className="font-[family-name:var(--font-display)] text-3xl md:text-[2.5rem] font-extrabold text-white mb-6 leading-tight"
                                    style={{ letterSpacing: "-0.02em" }}
                                >
                                    {service.title}
                                </h2>

                                <div className="space-y-4 mb-8">
                                    {service.description.map((para, i) => (
                                        <p key={i} className="text-slate-400 leading-relaxed text-[0.95rem]">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                {/* Bullets */}
                                <ul className="space-y-3 mb-10">
                                    {service.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-center gap-3 text-slate-300 text-sm">
                                            <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow`}>
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            </span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA — whileTap spring + specific transitions only */}
                                <motion.div whileTap={{ scale: 0.97 }} transition={SPRING} className="inline-block">
                                    <Link
                                        href={service.href}
                                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.04] text-white font-semibold hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-colors transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                                    >
                                        {t("explore", { title: service.title })}
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
