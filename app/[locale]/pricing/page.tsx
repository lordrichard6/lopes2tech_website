"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronDown, Info, Globe, Palette, Megaphone, Bot, Zap, Shield,
  ArrowRight, CheckCircle, TrendingDown, Repeat, BadgeCheck, Clock, BarChart2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import { WHATSAPP_URL } from "@/lib/constants";
import { useTranslations } from "next-intl";

const EASE   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;

// ─── Types ─────────────────────────────────────────────────────────────────────

type PricingRow = {
  service: string;
  price: string;
  marketAvg: string;
  savings: string;
  pitch: string;
  bullets: string[];
  link?: string;
  popular?: boolean;
};

type ColorKey = keyof typeof colorMap;

type PricingCategory = {
  key: string;
  title: string;
  type: "one-time" | "recurring";
  color: ColorKey;
  icon: React.ElementType;
  rows: PricingRow[];
};

// ─── Colour map ────────────────────────────────────────────────────────────────

const colorMap = {
  cyan:    { header: "bg-cyan-500/5",    icon: "text-cyan-400",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",           expand: "bg-cyan-500/[0.04]",    dot: "bg-cyan-400"    },
  pink:    { header: "bg-pink-500/5",    icon: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",           expand: "bg-pink-500/[0.04]",    dot: "bg-pink-400"    },
  violet:  { header: "bg-violet-500/5",  icon: "text-violet-400",  badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",    expand: "bg-violet-500/[0.04]",  dot: "bg-violet-400"  },
  orange:  { header: "bg-orange-500/5",  icon: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",    expand: "bg-orange-500/[0.04]",  dot: "bg-orange-400"  },
  amber:   { header: "bg-amber-500/5",   icon: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",       expand: "bg-amber-500/[0.04]",   dot: "bg-amber-400"   },
  emerald: { header: "bg-emerald-500/5", icon: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", expand: "bg-emerald-500/[0.04]", dot: "bg-emerald-400" },
};

// ─── Static structural data ────────────────────────────────────────────────────

type RowStatic = { price: string; marketAvg: string; savings: string; link?: string; popular?: boolean };
type CatStatic = { key: string; type: "one-time" | "recurring"; color: ColorKey; icon: React.ElementType; rows: RowStatic[] };

const categoriesStatic: CatStatic[] = [
  {
    key: "websites", type: "one-time", color: "cyan", icon: Globe,
    rows: [
      { price: "CHF 690",   marketAvg: "CHF 1,500+", savings: "~54%", link: "/services/web-design" },
      { price: "CHF 1,390", marketAvg: "CHF 2,800+", savings: "~50%", link: "/services/web-design" },
      { price: "CHF 1,990", marketAvg: "CHF 5,000+", savings: "~60%", link: "/services/web-design", popular: true },
      { price: "CHF 350",   marketAvg: "CHF 900+",   savings: "~61%", link: "/services/web-design" },
    ],
  },
  {
    key: "branding", type: "one-time", color: "pink", icon: Palette,
    rows: [
      { price: "CHF 299", marketAvg: "CHF 800+",   savings: "~63%", link: "/contact" },
      { price: "CHF 680", marketAvg: "CHF 3,500+", savings: "~81%", link: "/contact", popular: true },
    ],
  },
  {
    key: "marketing", type: "recurring", color: "violet", icon: Megaphone,
    rows: [
      { price: "CHF 349/mo", marketAvg: "CHF 750+/mo",   savings: "~53%", link: "/services/social-media-marketing" },
      { price: "CHF 399/mo", marketAvg: "CHF 850+/mo",   savings: "~53%", link: "/services/social-media-marketing" },
      { price: "CHF 680/mo", marketAvg: "CHF 1,400+/mo", savings: "~54%", link: "/services/social-media-marketing", popular: true },
      { price: "CHF 490/mo", marketAvg: "CHF 1,500+/mo", savings: "~67%", link: "/services/social-media-marketing" },
      { price: "CHF 690/mo", marketAvg: "CHF 2,000+/mo", savings: "~66%", link: "/services/social-media-marketing" },
      { price: "CHF 990/mo", marketAvg: "CHF 3,000+/mo", savings: "~67%", link: "/services/social-media-marketing" },
    ],
  },
  {
    key: "ai", type: "one-time", color: "orange", icon: Bot,
    rows: [
      { price: "CHF 2,500–9,000",  marketAvg: "CHF 8,000–25,000",  savings: "~60%", link: "/services/ai-integration", popular: true },
      { price: "CHF 2,500–7,000",  marketAvg: "CHF 8,000–20,000",  savings: "~60%", link: "/services/ai-integration" },
      { price: "CHF 4,000–10,000", marketAvg: "CHF 12,000–30,000", savings: "~65%", link: "/services/ai-integration" },
      { price: "CHF 600–1,200",    marketAvg: "CHF 2,000–4,000",   savings: "~70%", link: "/services/business-automation" },
      { price: "CHF 1,500–5,000",  marketAvg: "CHF 5,000–15,000",  savings: "~66%", link: "/services/business-automation" },
    ],
  },
  {
    key: "quickWins", type: "one-time", color: "amber", icon: Zap,
    rows: [
      { price: "CHF 99",  marketAvg: "CHF 300+", savings: "~67%", link: "/services/seo-development" },
      { price: "CHF 190", marketAvg: "CHF 400+", savings: "~68%", link: "/services/seo-development", popular: true },
      { price: "CHF 80",  marketAvg: "CHF 200+", savings: "~65%", link: "/services/seo-development" },
      { price: "CHF 160", marketAvg: "CHF 500+", savings: "~70%", link: "/services/business-automation" },
    ],
  },
  {
    key: "care", type: "recurring", color: "emerald", icon: Shield,
    rows: [
      { price: "CHF 39/mo",  marketAvg: "CHF 80+/mo",  savings: "~51%" },
      { price: "CHF 89/mo",  marketAvg: "CHF 200+/mo", savings: "~56%", popular: true },
      { price: "CHF 169/mo", marketAvg: "CHF 350+/mo", savings: "~52%" },
    ],
  },
];

const comparisonStatic = [
  { market: "CHF 1,500+",  ours: "CHF 690",    savings: "~54%", anchor: "cat-websites"  },
  { market: "CHF 2,800+",  ours: "CHF 1,390",  savings: "~50%", anchor: "cat-websites"  },
  { market: "CHF 5,000+",  ours: "CHF 1,990",  savings: "~60%", anchor: "cat-websites"  },
  { market: "CHF 3,500+",  ours: "CHF 680",    savings: "~81%", anchor: "cat-branding"  },
  { market: "CHF 750+/mo", ours: "CHF 349/mo", savings: "~53%", anchor: "cat-marketing" },
];

const planAccents: Array<"emerald" | "cyan" | null> = ["emerald", null, null, "cyan"];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const t             = useTranslations("Pricing");
  const reducedMotion = useReducedMotion();
  const shouldAnimate = !reducedMotion;
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (key: string) => setExpanded(prev => (prev === key ? null : key));

  type CatRowT  = { service: string; pitch: string; bullets: string[] };
  type CatT     = { title: string; rows: CatRowT[] };
  type CompRowT = { service: string };
  type PlanT    = { name: string; markup: string; desc: string; badge: string };

  const catT  = t.raw("categories")    as CatT[];
  const compT = t.raw("comparisonRows") as CompRowT[];
  const planT = t.raw("planList")       as PlanT[];

  const categories: PricingCategory[] = categoriesStatic.map((cat, ci) => ({
    ...cat,
    title: catT[ci].title,
    rows: cat.rows.map((row, ri) => ({
      ...row,
      service: catT[ci].rows[ri].service,
      pitch:   catT[ci].rows[ri].pitch,
      bullets: catT[ci].rows[ri].bullets,
    })),
  }));

  const comparisonRows = comparisonStatic.map((row, i) => ({
    ...row,
    service: compT[i].service,
  }));

  const paymentPlans = planT.map((plan, i) => ({
    ...plan,
    accent: planAccents[i],
  }));

  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;
  const [hourlyRateCurrency, hourlyRateAmount] = t("hourly.rate").split(" ");

  const fadeIn = (delay = 0) =>
    shouldAnimate
      ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

  return (
    <>
      <Navbar />
      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-violet-500/10 blur-[100px]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div {...fadeIn(0)}>
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10">
                {t("badge")}
              </div>
            </motion.div>

            <motion.h1
              {...fadeIn(0.1)}
              className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-extrabold mb-6 text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("hero.h1a")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-violet-500">
                {t("hero.h1b")}
              </span>
            </motion.h1>

            <motion.p {...fadeIn(0.2)} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              {t("hero.subtitle")}
            </motion.p>

            <motion.div {...fadeIn(0.3)} className="inline-block">
              <motion.a
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {t("hero.cta")}
                <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, value: t("stats.s1value"), label: t("stats.s1label"), color: "text-cyan-400"    },
              { icon: Clock,        value: t("stats.s2value"), label: t("stats.s2label"), color: "text-violet-400"  },
              { icon: BadgeCheck,   value: t("stats.s3value"), label: t("stats.s3label"), color: "text-emerald-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={VP}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
              >
                <div className="rounded-[calc(2rem-1px)] flex flex-col items-center text-center p-8 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                  <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                  <span className={`font-[family-name:var(--font-display)] text-4xl font-extrabold mb-2 ${stat.color}`} style={{ letterSpacing: "-0.02em" }}>{stat.value}</span>
                  <span className="text-slate-400 text-sm">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Research-backed note ──────────────────────────────────────────── */}
        <section className="px-6 pb-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="p-[1px] rounded-[2rem] ring-1 ring-amber-500/40 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10"
            >
              <div className="rounded-[calc(2rem-1px)] p-6 md:p-8 bg-[#080d1a]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] relative overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div aria-hidden="true" className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                    <BarChart2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-3 border border-white/10">
                      {t("research.label")}
                    </div>
                    <p className="text-white font-bold text-base md:text-lg mb-2 leading-snug">
                      {t("research.body")}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("research.sourcePrefix")}{" "}
                      <span className="text-amber-300/80">resign.ch</span>,{" "}
                      <span className="text-amber-300/80">webtree.ch</span>,{" "}
                      <span className="text-amber-300/80">peakline-agency.ch</span>,{" "}
                      <span className="text-amber-300/80">webartistik.ch</span>,{" "}
                      <span className="text-amber-300/80">digitalcreators.ch</span>,{" "}
                      <span className="text-amber-300/80">cynatic.ch</span>,{" "}
                      <span className="text-amber-300/80">authodia.ch</span>,{" "}
                      <span className="text-amber-300/80">logodesign-agentur.ch</span>,{" "}
                      <span className="text-amber-300/80">studioradke.com</span>,{" "}
                      <span className="text-amber-300/80">corinaburri.com</span>{" "}
                      {t("research.sourceConnector")}{" "}
                      <span className="text-amber-300/80">gryps.ch</span>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Market Comparison ─────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center mb-12"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-4 border border-white/10">
                {t("comparison.label")}
              </div>
              <h2
                className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {t("comparison.title")}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
            >
              <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                <div className="grid grid-cols-4 px-6 py-3 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <span className="col-span-2">{t("comparison.colService")}</span>
                  <span className="text-right">{t("comparison.colMarket")}</span>
                  <span className="text-right">{t("comparison.colOurs")}</span>
                </div>

                {comparisonRows.map((row, i) => (
                  <a
                    key={i}
                    href={`#${row.anchor}`}
                    className="grid grid-cols-4 px-6 py-4 border-t border-white/5 items-center hover:bg-white/[0.04] transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  >
                    <span className="col-span-2 text-sm text-white font-medium flex items-center gap-1.5">
                      {row.service}
                      <ArrowRight className="w-3 h-3 text-slate-600" />
                    </span>
                    <span className="text-right text-sm text-slate-500 line-through">{row.market}</span>
                    <span className="text-right flex items-center justify-end gap-2 flex-wrap">
                      <span className="text-sm font-bold text-cyan-400">{row.ours}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400">
                        {row.savings}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            <p className="text-center text-xs text-slate-600 mt-4">{t("comparison.disclaimer")}</p>
          </div>
        </section>

        {/* ── Full Pricing Tables ───────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center mb-16"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-4 border border-white/10">
                {t("tables.label")}
              </div>
              <h2
                className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-white mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                {t("tables.title")}
              </h2>
              <p className="text-slate-400 text-sm">{t("tables.subtitle")}</p>
            </motion.div>

            <div className="space-y-10">
              {categories.map((cat, ci) => {
                const c = colorMap[cat.color];
                return (
                  <React.Fragment key={ci}>
                    <motion.div
                      id={`cat-${cat.key}`}
                      initial={{ opacity: 0, ...(shouldAnimate ? { y: 20, filter: "blur(8px)" } : {}) }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={VP}
                      transition={{ duration: 0.6, delay: ci * 0.05, ease: EASE }}
                      className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04] scroll-mt-28"
                    >
                      <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">

                        {/* Category header */}
                        <div className={`flex flex-wrap items-center gap-3 px-6 py-4 border-b border-white/10 ${c.header}`}>
                          <cat.icon className={`w-5 h-5 ${c.icon}`} />
                          <span className="font-bold text-white text-sm uppercase tracking-wider">{cat.title}</span>
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-cyan-400 transition-colors ml-2"
                          >
                            {t("tables.questionsLink")}
                            <ArrowRight className="w-3 h-3" />
                          </a>
                          <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.badge}`}>
                            {cat.type === "recurring" && <Repeat className="w-3 h-3" />}
                            {cat.type === "one-time" ? t("tables.badgeOneTime") : t("tables.badgeRecurring")}
                          </span>
                        </div>

                        {/* Column headers */}
                        <div className="grid grid-cols-2 md:grid-cols-4 px-6 py-2 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                          <span className="md:col-span-2">{t("tables.colService")}</span>
                          <span className="hidden md:block text-right">{t("tables.colMarket")}</span>
                          <span className="text-right">{t("tables.colPrice")}</span>
                        </div>

                        {/* Rows */}
                        {cat.rows.map((row, ri) => {
                          const key = `${ci}-${ri}`;
                          const isOpen = expanded === key;
                          return (
                            <div key={ri} className="border-t border-white/5">
                              <button
                                onClick={() => toggle(key)}
                                aria-expanded={isOpen}
                                aria-controls={`panel-${key}`}
                                className="w-full grid grid-cols-2 md:grid-cols-4 px-6 py-3.5 items-center hover:bg-white/[0.04] transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] text-left cursor-pointer"
                              >
                                <span className="md:col-span-2 flex items-center gap-2 text-sm text-white font-medium pr-4">
                                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "rotate-180" : ""} ${c.icon}`} />
                                  {row.service}
                                  {row.popular && (
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${c.badge}`}>
                                      {t("mostPopular")}
                                    </span>
                                  )}
                                </span>
                                <span className="hidden md:block text-right text-sm text-slate-500 line-through">{row.marketAvg}</span>
                                <span className="text-right flex items-center justify-end gap-1.5">
                                  <span className={`text-sm font-bold ${c.icon}`}>{row.price}</span>
                                  <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400">{row.savings}</span>
                                </span>
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    id={`panel-${key}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: EASE }}
                                    className="overflow-hidden"
                                  >
                                    <div className={`px-6 py-5 border-t border-white/5 ${c.expand}`}>
                                      <div className="flex items-center gap-3 mb-4 md:hidden">
                                        <span className="text-xs text-slate-500">{t("marketAvgLabel")}</span>
                                        <span className="text-xs text-slate-400 line-through">{row.marketAvg}</span>
                                        <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400">{row.savings}</span>
                                      </div>
                                      <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">&ldquo;{row.pitch}&rdquo;</p>
                                      <ul className="space-y-1.5 mb-4">
                                        {row.bullets.map((b, bi) => (
                                          <li key={bi} className="flex items-center gap-2 text-xs text-slate-400">
                                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                                            {b}
                                          </li>
                                        ))}
                                      </ul>
                                      {row.link && (
                                        <a href={row.link} className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.icon} hover:underline`}>
                                          {t("tables.viewService")}
                                          <ArrowRight className="w-3 h-3" />
                                        </a>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>

                    {cat.key === "websites" && (
                      <p className="text-xs text-slate-500 mt-2 px-1 flex items-center gap-1.5">
                        <Info className="w-3 h-3 text-cyan-400/70 flex-shrink-0" />
                        {t("websitesHostingNote")}
                      </p>
                    )}
                    {cat.key === "ai" && (
                      <p className="text-xs text-slate-500 mt-2 px-1 flex items-center gap-1.5">
                        <Info className="w-3 h-3 text-orange-400/70 flex-shrink-0" />
                        {t("aiMonthlyNote")}
                      </p>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">{t("tables.footerNote")}</p>

            <div className="text-center mt-4">
              <a
                href="/referral"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                {t("tables.referralLink")}
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Payment Plans ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="text-center mb-14"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-4 border border-white/10">
                {t("paymentPlans.label")}
              </div>
              <h2
                className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-white mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                {t("paymentPlans.title")}
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">{t("paymentPlans.subtitle")}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {paymentPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={VP}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className={`p-[1px] rounded-[2rem] ${
                    plan.accent === "emerald"
                      ? "ring-1 ring-emerald-500/30 bg-emerald-500/5"
                      : plan.accent === "cyan"
                      ? "ring-1 ring-cyan-500/30 bg-cyan-500/5"
                      : "ring-1 ring-white/10 bg-white/[0.04]"
                  }`}
                >
                  <div className={`rounded-[calc(2rem-1px)] relative pt-8 pb-6 px-6 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] ${
                    plan.accent === "emerald"
                      ? "bg-emerald-500/5"
                      : plan.accent === "cyan"
                      ? "bg-cyan-500/5"
                      : "bg-white/[0.06]"
                  }`}>
                    {plan.badge && (
                      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                        plan.accent === "emerald" ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
                      }`}>
                        {plan.badge}
                      </span>
                    )}
                    <p className="text-white font-bold text-base mb-2">{plan.name}</p>
                    <p className={`font-[family-name:var(--font-display)] text-2xl font-extrabold mb-3 ${
                      plan.accent === "emerald" ? "text-emerald-400" : plan.accent === "cyan" ? "text-cyan-400" : "text-white"
                    }`} style={{ letterSpacing: "-0.02em" }}>
                      {plan.markup}
                    </p>
                    <p className="text-xs text-slate-400">{plan.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]">
              <div className="rounded-[calc(2rem-1px)] flex items-start gap-3 p-4 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                <BadgeCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400">{t("paymentPlans.terms")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hourly Rate ───────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="p-[1px] rounded-[2rem] ring-1 ring-violet-500/30 bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-cyan-500/10"
            >
              <div className="rounded-[calc(2rem-1px)] p-8 md:p-10 bg-[#080d1a]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] relative overflow-hidden">
                <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div aria-hidden="true" className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0 flex flex-col items-center text-center md:items-start md:text-left md:border-r md:border-white/10 md:pr-10">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-3 border border-white/10">
                      {t("hourly.label")}
                    </div>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-slate-400 text-xl mb-1.5">{hourlyRateCurrency}</span>
                      <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-white leading-none" style={{ letterSpacing: "-0.02em" }}>{hourlyRateAmount}</span>
                      <span className="text-slate-400 text-lg mb-1.5">{t("hourly.unit")}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{t("hourly.desc")}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center md:items-start gap-5">
                    <div>
                      <h3
                        className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-extrabold text-white mb-2"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {t("hourly.title")}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{t("hourly.subtitle")}</p>
                    </div>
                    <motion.a
                      href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={SPRING}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-300 font-semibold text-sm hover:bg-violet-500/30 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    >
                      <Clock className="w-4 h-4" />
                      {t("hourly.cta")}
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <ServiceFAQ
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          pageUrl="/pricing"
          items={faqItems.map(item => ({ question: item.q, answer: item.a }))}
        />

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="p-[1px] rounded-[2rem] ring-1 ring-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10"
            >
              <div className="rounded-[calc(2rem-1px)] p-10 bg-[#080d1a]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-4 border border-white/10">
                  {t("cta.label")}
                </div>
                <h2
                  className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {t("cta.title")}
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">{t("cta.description")}</p>
                <motion.a
                  href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  {t("cta.button")}
                  <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
