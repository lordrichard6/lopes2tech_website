"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift, Zap, CheckCircle, ArrowRight, Users, Repeat, BadgeCheck,
  Globe, Palette, Settings, Megaphone, Bot, Wrench, ChevronDown, ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

// ── Structural data (no translatable text) ─────────────────────────────────

const stepIcons = [Users, Zap, Gift];

type NoteKey = "deposit" | "delivery" | "scales" | null;

type RowMeta = {
  price: string;
  reward: string;
  noteKey?: NoteKey;
  noteRaw?: string;   // for non-translatable notes (e.g. "× 6 months = CHF 314")
  link?: string;
};

type CategoryMeta = {
  color: string;
  icon: React.ElementType;
  type: "one-time" | "recurring";
  rows: RowMeta[];
};

const categoryMeta: CategoryMeta[] = [
  {
    color: "cyan", icon: Globe, type: "one-time",
    rows: [
      { price: "CHF 690",   reward: "CHF 69",  noteKey: "deposit", link: "/services/web-design" },
      { price: "CHF 1,390", reward: "CHF 139", noteKey: "deposit", link: "/services/web-design" },
      { price: "CHF 1,990", reward: "CHF 199", noteKey: "deposit", link: "/services/web-design" },
      { price: "CHF 350",   reward: "CHF 35",  noteKey: "deposit", link: "/services/web-design" },
    ],
  },
  {
    color: "pink", icon: Palette, type: "one-time",
    rows: [
      { price: "CHF 299", reward: "CHF 30", noteKey: "delivery" },
      { price: "CHF 680", reward: "CHF 68", noteKey: "delivery" },
    ],
  },
  {
    color: "amber", icon: Settings, type: "one-time",
    rows: [
      { price: "CHF 249", reward: "CHF 25" },
      { price: "CHF 329", reward: "CHF 33" },
      { price: "CHF 169", reward: "CHF 17" },
      { price: "CHF 99",  reward: "CHF 10" },
      { price: "CHF 190", reward: "CHF 19" },
      { price: "CHF 80",  reward: "CHF 8"  },
      { price: "CHF 160", reward: "CHF 16", link: "/services/business-automation" },
    ],
  },
  {
    color: "teal", icon: Wrench, type: "one-time",
    rows: [
      { price: "CHF 350",      reward: "CHF 35",       link: "/services/seo-development" },
      { price: "CHF 80/page",  reward: "CHF 8/page",   link: "/services/seo-development" },
      { price: "From CHF 100", reward: "From CHF 10",  noteKey: "scales" },
      { price: "CHF 199",      reward: "CHF 20",       link: "/services/seo-development" },
      { price: "CHF 99",       reward: "CHF 10" },
      { price: "CHF 160",      reward: "CHF 16" },
      { price: "CHF 329",      reward: "CHF 33", link: "/services/business-automation" },
      { price: "CHF 369",      reward: "CHF 37", link: "/services/business-automation" },
      { price: "CHF 449",      reward: "CHF 45", link: "/services/business-automation" },
      { price: "CHF 699–850",  reward: "CHF 70–85", link: "/services/ai-integration" },
    ],
  },
  {
    color: "purple", icon: Megaphone, type: "recurring",
    rows: [
      { price: "CHF 349/mo", reward: "CHF 52/mo", noteRaw: "× 6 months = CHF 314", link: "/services/social-media-marketing" },
      { price: "CHF 399/mo", reward: "CHF 60/mo", noteRaw: "× 6 months = CHF 359", link: "/services/social-media-marketing" },
      { price: "CHF 680/mo", reward: "CHF 102/mo", noteRaw: "× 6 months = CHF 612", link: "/services/social-media-marketing" },
      { price: "CHF 490/mo", reward: "CHF 74/mo", noteRaw: "× 6 months = CHF 444", link: "/services/social-media-marketing" },
      { price: "CHF 690/mo", reward: "CHF 104/mo", noteRaw: "× 6 months = CHF 624", link: "/services/social-media-marketing" },
      { price: "CHF 990/mo", reward: "CHF 149/mo", noteRaw: "× 6 months = CHF 894", link: "/services/social-media-marketing" },
    ],
  },
  {
    color: "emerald", icon: Bot, type: "one-time",
    rows: [
      { price: "CHF 600–1,200",   reward: "CHF 60–120",   link: "/services/business-automation" },
      { price: "CHF 1,500–5,000", reward: "CHF 150–500",  link: "/services/ai-integration" },
      { price: "CHF 2,500–9,000", reward: "CHF 250–900",  link: "/services/ai-integration" },
      { price: "CHF 2,500–7,000", reward: "CHF 250–700",  link: "/services/ai-integration" },
      { price: "CHF 4,000–10,000",reward: "CHF 400–1,000",link: "/services/ai-integration" },
      { price: "CHF 3,500–10,000",reward: "CHF 350–1,000",link: "/services/ai-integration" },
    ],
  },
];

const colorMap: Record<string, { badge: string; header: string; icon: string; expand: string }> = {
  cyan:    { badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",       header: "bg-cyan-500/10 border-cyan-500/20",       icon: "text-cyan-400",    expand: "bg-cyan-500/5 border-cyan-500/10" },
  pink:    { badge: "bg-pink-500/15 text-pink-400 border-pink-500/20",       header: "bg-pink-500/10 border-pink-500/20",       icon: "text-pink-400",    expand: "bg-pink-500/5 border-pink-500/10" },
  amber:   { badge: "bg-amber-500/15 text-amber-400 border-amber-500/20",    header: "bg-amber-500/10 border-amber-500/20",    icon: "text-amber-400",   expand: "bg-amber-500/5 border-amber-500/10" },
  teal:    { badge: "bg-teal-500/15 text-teal-400 border-teal-500/20",       header: "bg-teal-500/10 border-teal-500/20",       icon: "text-teal-400",    expand: "bg-teal-500/5 border-teal-500/10" },
  purple:  { badge: "bg-purple-500/15 text-purple-400 border-purple-500/20", header: "bg-purple-500/10 border-purple-500/20", icon: "text-purple-400",  expand: "bg-purple-500/5 border-purple-500/10" },
  emerald: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", header: "bg-emerald-500/10 border-emerald-500/20", icon: "text-emerald-400", expand: "bg-emerald-500/5 border-emerald-500/10" },
};

// ── Types for translated data ──────────────────────────────────────────────

type TRow = { service: string; pitch: string; bullets: string[] };
type TCategory = { title: string; rows: TRow[] };

// ── Component ──────────────────────────────────────────────────────────────

export default function ReferralPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const t = useTranslations("Referral");

  const toggle = (key: string) => setExpanded(prev => (prev === key ? null : key));

  const tSteps      = t.raw("howItWorks.steps")   as Array<{ title: string; description: string }>;
  const tCategories = t.raw("rewards.categories") as TCategory[];
  const tPerks      = t.raw("perks.items")        as string[];

  // resolve translated note for a row
  const resolveNote = (row: RowMeta): string | undefined => {
    if (row.noteRaw) return row.noteRaw;
    if (row.noteKey === "deposit")  return t("rewards.noteOnDeposit");
    if (row.noteKey === "delivery") return t("rewards.noteOnDelivery");
    if (row.noteKey === "scales")   return t("rewards.noteScales");
    return undefined;
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`, backgroundSize: "60px 60px", maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)" }} />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
              <Gift className="w-4 h-4" />
              {t("badge")}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              {t("hero.h1a")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{t("hero.h1b")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              {t("hero.subtitlePre")}{" "}
              <span className="text-white font-semibold">{t("hero.highlight1")}</span>{" "}
              {t("hero.subtitleMid")}{" "}
              <span className="text-white font-semibold">{t("hero.highlight2")}</span>{" "}
              {t("hero.subtitlePost")}
            </motion.p>
            <motion.a initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5">
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* How it works */}
        <section className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("howItWorks.label")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">{t("howItWorks.title")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tSteps.map((step, i) => {
                const Icon = stepIcons[i];
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="absolute top-6 right-6 text-5xl font-black text-white/5 select-none leading-none">{i + 1}</div>
                    <h3 className="text-lg font-bold text-white mb-3 leading-snug">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Dual benefit banner */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 p-8 md:p-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">{t("dualBenefit.label")}</p>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                    {t("dualBenefit.title1")} <span className="text-amber-400">&amp;</span> {t("dualBenefit.title2")} <span className="text-amber-400">{t("dualBenefit.title3")}</span> {t("dualBenefit.title4")}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    {t("dualBenefit.descPre")} <strong className="text-white">{t("dualBenefit.descHighlight")}</strong> {t("dualBenefit.descPost")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Rewards tables */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">{t("rewards.label")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t("rewards.title")}</h2>
              <p className="text-slate-400 text-sm">
                {t("rewards.subtitlePre")} <span className="text-white font-semibold">{t("rewards.subtitleHighlight1")}</span> {t("rewards.subtitleMid")} <span className="text-white font-semibold">{t("rewards.subtitleHighlight2")}</span>. {t("rewards.subtitlePost")}
              </p>
            </div>

            <div className="space-y-10">
              {categoryMeta.map((meta, ci) => {
                const tCat = tCategories[ci];
                const c = colorMap[meta.color];
                return (
                  <motion.div key={ci} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.06 }} className="rounded-2xl border border-white/10 overflow-hidden">

                    {/* Category header */}
                    <div className={`flex items-center gap-3 px-6 py-4 border-b border-white/10 ${c.header}`}>
                      <meta.icon className={`w-5 h-5 ${c.icon}`} />
                      <span className="font-bold text-white text-sm uppercase tracking-wider">{tCat.title}</span>
                      <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.badge}`}>
                        {meta.type === "recurring" && <Repeat className="w-3 h-3" />}
                        {meta.type === "one-time" ? t("rewards.badgeOneTime") : t("rewards.badgeRecurring")}
                      </span>
                    </div>

                    {/* Column headers */}
                    <div className="grid grid-cols-3 px-6 py-2 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span>{t("rewards.colService")}</span>
                      <span className="text-center">{t("rewards.colPrice")}</span>
                      <span className="text-right">{t("rewards.colReward")}</span>
                    </div>

                    {/* Rows */}
                    {meta.rows.map((rowMeta, ri) => {
                      const tRow = tCat.rows[ri];
                      const key = `${ci}-${ri}`;
                      const isOpen = expanded === key;
                      const note = resolveNote(rowMeta);
                      return (
                        <div key={ri} className="border-t border-white/5">
                          <button
                            onClick={() => toggle(key)}
                            className="w-full grid grid-cols-3 px-6 py-3.5 items-center hover:bg-white/[0.04] transition-colors text-left cursor-pointer"
                          >
                            <span className="flex items-center gap-2 text-sm text-white font-medium pr-4">
                              <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${c.icon}`} />
                              {tRow.service}
                            </span>
                            <span className="text-center text-sm text-slate-400">{rowMeta.price}</span>
                            <span className="text-right">
                              <span className="inline-flex flex-col items-end">
                                <span className={`text-sm font-bold ${c.icon}`}>{rowMeta.reward}</span>
                                {note && <span className="text-xs text-slate-600">{note}</span>}
                              </span>
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
                                  <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">&ldquo;{tRow.pitch}&rdquo;</p>
                                  <ul className="space-y-1.5 mb-4">
                                    {tRow.bullets.map((b, bi) => (
                                      <li key={bi} className="flex items-center gap-2 text-xs text-slate-400">
                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.icon.replace("text-", "bg-")}`} />
                                        {b}
                                      </li>
                                    ))}
                                  </ul>
                                  {rowMeta.link && (
                                    <a href={rowMeta.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-semibold ${c.icon} hover:underline`}>
                                      {t("rewards.viewService")}
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

            <p className="text-center text-xs text-slate-600 mt-6">{t("rewards.footerNote")}</p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("perks.label")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">{t("perks.title")}</h2>
            </div>
            <div className="space-y-4">
              {tPerks.map((perk, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5">
                  <BadgeCheck className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <span className="text-white font-medium">{perk}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
              <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
              <h2 className="text-3xl font-extrabold mb-4">{t("finalCta.title")}</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">{t("finalCta.description")}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5">
                {t("finalCta.button")}
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
