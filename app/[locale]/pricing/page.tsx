"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, ExternalLink, Globe, Palette, Megaphone, Bot, Zap, Shield,
  ArrowRight, CheckCircle, TrendingDown, Repeat, BadgeCheck, Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";
import { useTranslations } from "next-intl";

// ─── Types ─────────────────────────────────────────────────────────────────────

type PricingRow = {
  service: string;
  price: string;
  marketAvg: string;
  savings: string;
  pitch: string;
  bullets: string[];
  link?: string;
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
  cyan:    { header: "bg-cyan-500/5",    icon: "text-cyan-400",    badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",          expand: "bg-cyan-500/[0.04]"    },
  pink:    { header: "bg-pink-500/5",    icon: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",          expand: "bg-pink-500/[0.04]"    },
  purple:  { header: "bg-purple-500/5",  icon: "text-purple-400",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",   expand: "bg-purple-500/[0.04]"  },
  orange:  { header: "bg-orange-500/5",  icon: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",   expand: "bg-orange-500/[0.04]"  },
  amber:   { header: "bg-amber-500/5",   icon: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",      expand: "bg-amber-500/[0.04]"   },
  emerald: { header: "bg-emerald-500/5", icon: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",expand: "bg-emerald-500/[0.04]" },
};

// ─── Comparison spotlight ──────────────────────────────────────────────────────

const comparisonRows = [
  { service: "Starter Website (1 page)",       market: "CHF 1,500+",   ours: "CHF 690",    savings: "54%" },
  { service: "Professional Website (5 pages)", market: "CHF 2,800+",   ours: "CHF 1,390",  savings: "50%" },
  { service: "Business Pro Website",           market: "CHF 4,500+",   ours: "CHF 1,990",  savings: "56%" },
  { service: "Full Brand Kit",                 market: "CHF 1,800+",   ours: "CHF 549",    savings: "70%" },
  { service: "Meta Ads Management",            market: "CHF 750+/mo",  ours: "CHF 349/mo", savings: "53%" },
];

// ─── Pricing categories ────────────────────────────────────────────────────────

const categories: PricingCategory[] = [
  {
    key: "websites",
    title: "Website Packages",
    type: "one-time",
    color: "cyan",
    icon: Globe,
    rows: [
      {
        service: "Starter Website",
        price: "CHF 690",
        marketAvg: "CHF 1,500+",
        savings: "~54%",
        pitch: "Perfect for new businesses, freelancers, or anyone who needs a clean online presence fast. Delivered in 4–5 days — no waiting weeks.",
        bullets: ["One-page custom website", "AI-written copy included", "Booking widget + WhatsApp button", "Mobile responsive", "Delivered in 4–5 days"],
        link: "/services/web-design",
      },
      {
        service: "Professional Website",
        price: "CHF 1,390",
        marketAvg: "CHF 2,800+",
        savings: "~50%",
        pitch: "For established solopreneurs ready to upgrade. Multi-page, multi-language, with SEO baked in from day one.",
        bullets: ["5-page website", "2 languages included", "1 automation included", "SEO foundations", "Delivered in 5–6 days"],
        link: "/services/web-design",
      },
      {
        service: "Business Pro Website",
        price: "CHF 1,990",
        marketAvg: "CHF 4,500+",
        savings: "~56%",
        pitch: "The full package for SMEs. Up to 10 service pages, 3 languages, lead capture system — everything to compete online seriously.",
        bullets: ["5 core pages + up to 10 service pages", "3 languages included", "SEO + lead capture system", "Delivered in 6–7 days"],
        link: "/services/web-design",
      },
      {
        service: "Campaign Landing Page",
        price: "CHF 350",
        marketAvg: "CHF 900+",
        savings: "~61%",
        pitch: "A conversion-focused single page for ad campaigns, product launches, or lead magnets. Built to convert traffic into leads.",
        bullets: ["Conversion-optimized design", "Ads tracking integration", "CTA + lead capture form", "Fast delivery"],
        link: "/services/web-design",
      },
    ],
  },
  {
    key: "branding",
    title: "Branding",
    type: "one-time",
    color: "pink",
    icon: Palette,
    rows: [
      {
        service: "Logo Only",
        price: "CHF 299",
        marketAvg: "CHF 800+",
        savings: "~63%",
        pitch: "A professional logo in 3 variations. Great for new businesses or rebrands that just need the mark — clean, scalable, and delivered fast.",
        bullets: ["3 logo variations (light, dark, icon)", "Vector files included", "Ready for web + print"],
      },
      {
        service: "Full Brand Kit",
        price: "CHF 549",
        marketAvg: "CHF 1,800+",
        savings: "~70%",
        pitch: "Everything a business needs to look professional everywhere. Logo, colors, fonts, business cards, and a social media kit — all in one package.",
        bullets: ["Logo (3 variations)", "Color palette + typography", "Brand guidelines document", "Business cards design", "Social media kit (profile + cover images)"],
      },
    ],
  },
  {
    key: "marketing",
    title: "Marketing & Ads",
    type: "recurring",
    color: "purple",
    icon: Megaphone,
    rows: [
      {
        service: "Meta Ads Management",
        price: "CHF 349/mo",
        marketAvg: "CHF 750+/mo",
        savings: "~53%",
        pitch: "Full campaign management on Facebook and Instagram. We handle creatives, targeting, and optimization so your ads actually convert.",
        bullets: ["Campaign setup + ad creative", "Audience targeting + retargeting", "A/B testing", "Monthly performance report"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Google Ads Management",
        price: "CHF 399/mo",
        marketAvg: "CHF 850+/mo",
        savings: "~53%",
        pitch: "Search and Display campaigns built for conversions. Keyword research, ad copy, and monthly reporting included.",
        bullets: ["Keyword research + campaign setup", "Search & Display ads", "Conversion tracking", "Monthly analytics report"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Meta + Google Bundle",
        price: "CHF 649/mo",
        marketAvg: "CHF 1,400+/mo",
        savings: "~54%",
        pitch: "Run both channels with a unified cross-channel strategy. Save CHF 99/mo vs. buying separately.",
        bullets: ["Everything in both plans", "Cross-channel strategy", "Unified monthly reporting", "Save CHF 99/mo vs. separate"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Starter",
        price: "CHF 299/mo",
        marketAvg: "CHF 600+/mo",
        savings: "~50%",
        pitch: "Stay consistently visible with 8 posts per month on your best-performing platform.",
        bullets: ["8 posts/mo (1 platform)", "Content creation + scheduling", "Instagram, Facebook, or LinkedIn"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Growth",
        price: "CHF 399/mo",
        marketAvg: "CHF 800+/mo",
        savings: "~50%",
        pitch: "Grow across two platforms with stories and active engagement management.",
        bullets: ["12 posts/mo (2 platforms)", "Stories + engagement management", "Monthly strategy check-in"],
        link: "/services/social-media-marketing",
      },
      {
        service: "Social Media Pro",
        price: "CHF 649/mo",
        marketAvg: "CHF 1,200+/mo",
        savings: "~46%",
        pitch: "Full content machine — 3 platforms, reels, and monthly strategy calls for ambitious brands.",
        bullets: ["16 posts/mo (3 platforms)", "Reels + stories", "Monthly strategy call"],
        link: "/services/social-media-marketing",
      },
    ],
  },
  {
    key: "ai",
    title: "AI & Automation",
    type: "one-time",
    color: "orange",
    icon: Bot,
    rows: [
      {
        service: "AI Customer Support Agent",
        price: "CHF 2,500–9,000",
        marketAvg: "CHF 8,000–25,000",
        savings: "~60%",
        pitch: "An intelligent chatbot that handles customer enquiries 24/7 on your website, WhatsApp, or app — trained on your business.",
        bullets: ["Built on your knowledge base", "WhatsApp + web widget integration", "Escalation to human when needed", "+ required monthly care plan"],
        link: "/services/ai-integration",
      },
      {
        service: "AI Sales & Outreach Agent",
        price: "CHF 2,500–7,000",
        marketAvg: "CHF 8,000–20,000",
        savings: "~60%",
        pitch: "Automated prospecting and outreach pipeline — from LinkedIn research to personalised email sequences.",
        bullets: ["Lead sourcing + enrichment", "AI-personalised email sequences", "CRM integration", "+ required monthly care plan"],
        link: "/services/ai-integration",
      },
      {
        service: "AI Voice Agent",
        price: "CHF 4,000–10,000",
        marketAvg: "CHF 12,000–30,000",
        savings: "~65%",
        pitch: "An AI phone agent that handles calls, qualifies leads, and books appointments — in any language.",
        bullets: ["Inbound + outbound calling", "Lead qualification + appointment booking", "Twilio / VAPI integration", "+ required monthly care plan"],
        link: "/services/ai-integration",
      },
      {
        service: "AI Workflow — Light",
        price: "CHF 600–1,200",
        marketAvg: "CHF 2,000–4,000",
        savings: "~70%",
        pitch: "Automate one repetitive process end-to-end using n8n or Make. Perfect entry point into automation.",
        bullets: ["1 automated workflow", "Tool integration (CRM, email, Slack...)", "Full documentation", "+ optional care plan"],
        link: "/services/business-automation",
      },
      {
        service: "AI Workflow — Full",
        price: "CHF 1,500–5,000",
        marketAvg: "CHF 5,000–15,000",
        savings: "~66%",
        pitch: "Complex multi-step automations connecting your entire toolstack with AI decision logic built in.",
        bullets: ["Multiple connected workflows", "AI reasoning steps", "Custom API integrations", "+ required monthly care plan"],
        link: "/services/business-automation",
      },
    ],
  },
  {
    key: "quickWins",
    title: "Quick Wins",
    type: "one-time",
    color: "amber",
    icon: Zap,
    rows: [
      {
        service: "Website Audit",
        price: "CHF 99",
        marketAvg: "CHF 300+",
        savings: "~67%",
        pitch: "A focused 1-page PDF with 5 specific, actionable improvements for your existing website.",
        bullets: ["Performance + SEO review", "UX + conversion analysis", "Delivered in 48h", "Counts toward upgrade if you proceed"],
      },
      {
        service: "Speed Optimization",
        price: "CHF 129",
        marketAvg: "CHF 400+",
        savings: "~68%",
        pitch: "Faster websites rank higher and convert better. We squeeze every millisecond out of your existing site.",
        bullets: ["Caching + image compression", "Core Web Vitals improvement", "Before/after performance report"],
      },
      {
        service: "Google Business Boost",
        price: "CHF 69",
        marketAvg: "CHF 200+",
        savings: "~65%",
        pitch: "Get found on Google Maps and local search with a fully optimised Google Business Profile.",
        bullets: ["GBP setup or optimization", "3 posts published", "Category + keyword optimization"],
      },
      {
        service: "Automation Assessment",
        price: "CHF 149",
        marketAvg: "CHF 500+",
        savings: "~70%",
        pitch: "A 1-page PDF identifying 3–5 manual processes in your business that could be automated with AI.",
        bullets: ["Process mapping session", "Automation opportunity report", "Tool recommendations included"],
      },
    ],
  },
  {
    key: "care",
    title: "Monthly Care & Hosting",
    type: "recurring",
    color: "emerald",
    icon: Shield,
    rows: [
      {
        service: "Just Hosting",
        price: "CHF 39/mo",
        marketAvg: "CHF 80+/mo",
        savings: "~51%",
        pitch: "Fast, secure hosting with daily backups, SSL certificate, and uptime monitoring. Set it and forget it.",
        bullets: ["Vercel / cloud hosting", "SSL certificate", "Daily backups", "Uptime monitoring"],
      },
      {
        service: "Essential Care",
        price: "CHF 89/mo",
        marketAvg: "CHF 200+/mo",
        savings: "~56%",
        pitch: "Everything in hosting plus weekly updates, 1h of support/changes per month, and priority email response.",
        bullets: ["Everything in Just Hosting", "Weekly platform updates", "1h support/changes per month", "Priority email support"],
      },
      {
        service: "Growth Care",
        price: "CHF 169/mo",
        marketAvg: "CHF 350+/mo",
        savings: "~52%",
        pitch: "Active monthly care with SEO reporting, 2h of support, and proactive suggestions to keep improving your site.",
        bullets: ["Everything in Essential Care", "Monthly SEO performance report", "2h support per month", "Proactive improvement suggestions"],
      },
    ],
  },
];

// ─── Payment plans ─────────────────────────────────────────────────────────────

const paymentPlans = [
  { name: "Pay Upfront",  markup: "0% markup", desc: "Best price. 50% deposit, 50% on launch.", badge: "Best Value",      accent: "emerald" as const },
  { name: "3-Month Plan", markup: "+5%",        desc: "CHF 2,000 project → CHF 700/mo",          badge: null,              accent: null              },
  { name: "6-Month Plan", markup: "+10%",       desc: "CHF 2,000 project → CHF 367/mo",          badge: null,              accent: null              },
  { name: "12-Month",     markup: "+15%",       desc: "CHF 2,000 project → CHF 192/mo",          badge: "Most Accessible", accent: "cyan"   as const },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const t = useTranslations("Pricing");
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (key: string) => setExpanded(prev => (prev === key ? null : key));

  return (
    <>
      <Navbar />
      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
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
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6"
            >
              <TrendingDown className="w-4 h-4" />
              {t("badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]"
            >
              {t("hero.h1a")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                {t("hero.h1b")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.a
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
            >
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, value: t("stats.s1value"), label: t("stats.s1label"), color: "text-cyan-400"    },
              { icon: Clock,        value: t("stats.s2value"), label: t("stats.s2label"), color: "text-purple-400"  },
              { icon: BadgeCheck,   value: t("stats.s3value"), label: t("stats.s3label"), color: "text-emerald-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
                <span className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</span>
                <span className="text-slate-400 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Market Comparison ─────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("comparison.label")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">{t("comparison.title")}</h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="grid grid-cols-4 px-6 py-3 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="col-span-2">{t("comparison.colService")}</span>
                <span className="text-right">{t("comparison.colMarket")}</span>
                <span className="text-right">{t("comparison.colOurs")}</span>
              </div>

              {comparisonRows.map((row, i) => (
                <div key={i} className="grid grid-cols-4 px-6 py-4 border-t border-white/5 items-center">
                  <span className="col-span-2 text-sm text-white font-medium">{row.service}</span>
                  <span className="text-right text-sm text-slate-500 line-through">{row.market}</span>
                  <span className="text-right flex items-center justify-end gap-2 flex-wrap">
                    <span className="text-sm font-bold text-cyan-400">{row.ours}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400">
                      -{row.savings}
                    </span>
                  </span>
                </div>
              ))}
            </motion.div>

            <p className="text-center text-xs text-slate-600 mt-4">{t("comparison.disclaimer")}</p>
          </div>
        </section>

        {/* ── Full Pricing Tables ───────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">{t("tables.label")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t("tables.title")}</h2>
              <p className="text-slate-400 text-sm">{t("tables.subtitle")}</p>
            </div>

            <div className="space-y-10">
              {categories.map((cat, ci) => {
                const c = colorMap[cat.color];
                return (
                  <motion.div
                    key={ci}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.05 }}
                    className="rounded-2xl border border-white/10 overflow-hidden"
                  >
                    {/* Category header */}
                    <div className={`flex items-center gap-3 px-6 py-4 border-b border-white/10 ${c.header}`}>
                      <cat.icon className={`w-5 h-5 ${c.icon}`} />
                      <span className="font-bold text-white text-sm uppercase tracking-wider">{cat.title}</span>
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
                            className="w-full grid grid-cols-2 md:grid-cols-4 px-6 py-3.5 items-center hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                          >
                            <span className="md:col-span-2 flex items-center gap-2 text-sm text-white font-medium pr-4">
                              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${c.icon}`} />
                              {row.service}
                            </span>
                            <span className="hidden md:block text-right text-sm text-slate-500 line-through">{row.marketAvg}</span>
                            <span className="text-right flex items-center justify-end gap-1.5">
                              <span className={`text-sm font-bold ${c.icon}`}>{row.price}</span>
                              <span className="hidden md:inline px-1.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400">{row.savings}</span>
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className={`px-6 py-5 border-t border-white/5 ${c.expand}`}>
                                  {/* Mobile: market avg visible here */}
                                  <div className="flex items-center gap-3 mb-4 md:hidden">
                                    <span className="text-xs text-slate-500">Market avg:</span>
                                    <span className="text-xs text-slate-400 line-through">{row.marketAvg}</span>
                                    <span className="px-1.5 py-0.5 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400">{row.savings}</span>
                                  </div>
                                  <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">&ldquo;{row.pitch}&rdquo;</p>
                                  <ul className="space-y-1.5 mb-4">
                                    {row.bullets.map((b, bi) => (
                                      <li key={bi} className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.icon.replace("text-", "bg-")}`} />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                  {row.link && (
                                    <a
                                      href={row.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.icon} hover:underline`}
                                    >
                                      {t("tables.viewService")}
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">{t("tables.footerNote")}</p>
          </div>
        </section>

        {/* ── Payment Plans ──────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("paymentPlans.label")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{t("paymentPlans.title")}</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto">{t("paymentPlans.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {paymentPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className={`relative pt-8 pb-6 px-6 rounded-2xl border text-center ${
                    plan.accent === "emerald"
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : plan.accent === "cyan"
                      ? "border-cyan-500/30 bg-cyan-500/5"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  {plan.badge && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      plan.accent === "emerald" ? "bg-emerald-500 text-white" : "bg-cyan-400 text-[#080d1a]"
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                  <p className="text-white font-bold text-base mb-2">{plan.name}</p>
                  <p className={`text-2xl font-black mb-3 ${
                    plan.accent === "emerald" ? "text-emerald-400" : plan.accent === "cyan" ? "text-cyan-400" : "text-white"
                  }`}>
                    {plan.markup}
                  </p>
                  <p className="text-xs text-slate-400">{plan.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <BadgeCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">{t("paymentPlans.terms")}</p>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
            >
              <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("cta.label")}</p>
              <h2 className="text-3xl font-extrabold mb-4">{t("cta.title")}</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">{t("cta.description")}</p>
              <a
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
              >
                {t("cta.button")}
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
