"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail, CheckCircle, ArrowRight,
  Zap, Target, BarChart2,
  Shield, Users, Clock, Repeat, BadgeCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import { WHATSAPP_URL } from "@/lib/constants";

// Static config — icons, colors, prices (never translated)
const packageConfig = [
  { key: "starter", price: "CHF 390", isPro: false, popular: false, color: "border-white/10 bg-white/[0.03]", accent: "text-cyan-400" },
  { key: "growth",  price: "CHF 590", isPro: false, popular: true,  color: "border-cyan-500/30 bg-cyan-500/5",   accent: "text-cyan-400" },
  { key: "pro",     price: "CHF 990", isPro: true,  popular: false, color: "border-purple-500/30 bg-purple-500/5", accent: "text-purple-400" },
] as const;

const includesIcons = [Target, Mail, Shield, Zap, BarChart2, BarChart2];
const stepNums = ["1", "2", "3", "4"];

export default function ColdEmailPage() {
  const t = useTranslations("ColdEmailPage");

  const includesItems = t.raw("includes.items") as { title: string; desc: string }[];
  const steps         = t.raw("howItWorks.steps") as { title: string; desc: string }[];
  const compRows      = t.raw("comparison.rows") as { option: string; cost: string; effort: string; tracking: string }[];
  const faqItems      = t.raw("faq.items") as { question: string; answer: string }[];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cold Email Outreach — Done-for-You",
    description: "Fully managed cold email campaigns for Swiss businesses. Lead sourcing, copywriting, technical setup, and sending — all handled.",
    provider: {
      "@type": "LocalBusiness",
      name: "Lopes2Tech",
      address: { "@type": "PostalAddress", addressLocality: "Zurich", addressCountry: "CH" },
    },
    areaServed: { "@type": "Country", name: "Switzerland" },
    offers: packageConfig.map((pkg) => ({
      "@type": "Offer",
      name: t(`packages.${pkg.key}.name`),
      price: pkg.price.replace("CHF ", ""),
      priceCurrency: "CHF",
      description: `${t(`packages.${pkg.key}.contacts`)} — ${t(`packages.${pkg.key}.replies`)}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Navbar />
      <ServiceBreadcrumb serviceName="Cold Email Outreach" serviceSlug="cold-email" />

      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
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
              <Mail className="w-4 h-4" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]"
            >
              {t("hero.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                {t("hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {t("hero.description")}
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

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              { icon: Users,      statKey: "replyRate",  color: "text-cyan-400"    },
              { icon: Clock,      statKey: "launchDays", color: "text-purple-400"  },
              { icon: BadgeCheck, statKey: "toolsCost",  color: "text-emerald-400" },
            ] as const).map(({ icon: Icon, statKey, color }, i) => (
              <motion.div
                key={statKey}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <Icon className={`w-8 h-8 mb-4 ${color}`} />
                <span className={`text-4xl font-black mb-2 ${color}`}>{t(`stats.${statKey}.value`)}</span>
                <span className="text-slate-400 text-sm">{t(`stats.${statKey}.label`)}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── What's Included ──────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("includes.badge")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">{t("includes.title")}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {includesItems.map((item, i) => {
                const Icon = includesIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
                  >
                    <Icon className="w-6 h-6 text-cyan-400 mb-4" />
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Packages ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">{t("packages.badge")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">{t("packages.title")}</h2>
              <p className="text-slate-400 text-sm">{t("packages.subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {packageConfig.map((pkg, i) => {
                const features = t.raw(`packages.${pkg.key}.features`) as string[];
                return (
                  <motion.div
                    key={pkg.key}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`relative pt-8 pb-8 px-6 rounded-2xl border flex flex-col ${pkg.color}`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-cyan-400 text-[#080d1a] whitespace-nowrap">
                        {t("packages.mostPopular")}
                      </span>
                    )}
                    <p className="text-white font-bold text-lg mb-1">{t(`packages.${pkg.key}.name`)}</p>
                    <p className="text-slate-400 text-xs mb-5">{t(`packages.${pkg.key}.contacts`)} · {t(`packages.${pkg.key}.replies`)}</p>
                    <div className="flex items-end gap-1 mb-6">
                      {pkg.isPro ? (
                        <>
                          <span className="text-slate-400 text-sm mb-1.5">{t("packages.from")}</span>
                          <span className={`text-4xl font-black ${pkg.accent}`}>990</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-400 text-base mb-0.5">CHF</span>
                          <span className={`text-4xl font-black ${pkg.accent}`}>{pkg.price.replace("CHF ", "")}</span>
                        </>
                      )}
                      <span className="text-slate-400 text-sm mb-1">{t("packages.perMonth")}</span>
                    </div>
                    <ul className="space-y-2 mb-8 flex-1">
                      {features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pkg.accent}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                        pkg.popular
                          ? "bg-cyan-400 text-[#080d1a] hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                      }`}
                    >
                      {t("packages.getStarted")}
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <BadgeCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">{t("packages.leadsOnly")}</p>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("howItWorks.badge")}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">{t("howItWorks.title")}</h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-black text-sm">{stepNums[i]}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Market Comparison ────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">{t("comparison.badge")}</p>
              <h2 className="text-3xl font-extrabold mb-3">{t("comparison.title")}</h2>
              <p className="text-slate-400 text-sm">{t("comparison.subtitle")}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="grid grid-cols-5 px-6 py-3 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="col-span-2">{t("comparison.headers.option")}</span>
                <span className="text-center">{t("comparison.headers.cost")}</span>
                <span className="text-center">{t("comparison.headers.effort")}</span>
                <span className="text-center">{t("comparison.headers.tracking")}</span>
              </div>
              {compRows.map((row, i) => {
                const isHighlight = i === compRows.length - 1;
                const effortLow = row.effort === "Very low" || row.effort === "Low" ||
                  row.effort === "Muito baixo" || row.effort === "Baixo" ||
                  row.effort === "Sehr niedrig" || row.effort === "Niedrig" ||
                  row.effort === "Très faible" || row.effort === "Faible" ||
                  row.effort === "Molto basso" || row.effort === "Basso";
                const trackingYes = row.tracking === "Yes" || row.tracking === "Sim" ||
                  row.tracking === "Ja" || row.tracking === "Oui" || row.tracking === "Sì";
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-5 px-6 py-4 border-t border-white/5 text-sm ${isHighlight ? "bg-cyan-500/5" : ""}`}
                  >
                    <span className={`col-span-2 font-medium ${isHighlight ? "text-cyan-400" : "text-white"}`}>{row.option}</span>
                    <span className={`text-center ${isHighlight ? "text-emerald-400 font-bold" : "text-slate-400"}`}>{row.cost}</span>
                    <span className={`text-center ${effortLow ? "text-emerald-400" : "text-red-400"}`}>{row.effort}</span>
                    <span className={`text-center ${trackingYes ? "text-emerald-400" : "text-slate-500"}`}>{row.tracking}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <ServiceFAQ
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
          pageUrl="/services/cold-email"
          items={faqItems.map(item => ({ question: item.question, answer: item.answer }))}
        />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
            >
              <Repeat className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">{t("cta.badge")}</p>
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
