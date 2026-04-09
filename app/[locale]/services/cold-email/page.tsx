"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail, CheckCircle, ArrowRight,
  Zap, Target, BarChart2, FileText,
  Shield, Users, Clock, Repeat, BadgeCheck, DollarSign,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import RelatedServices from "@/components/RelatedServices";
import { WHATSAPP_URL } from "@/lib/constants";

const EASE   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 22 } as const;
const VP     = { once: true, margin: "0px 0px -80px 0px" } as const;

// Static config — icons, colors, prices (never translated)
const packageConfig = [
  { key: "starter", price: "CHF 390", isPro: false, popular: false, color: "border-white/10 bg-white/[0.03]", accent: "text-cyan-400" },
  { key: "growth",  price: "CHF 590", isPro: false, popular: true,  color: "border-cyan-500/30 bg-cyan-500/5",   accent: "text-cyan-400" },
  { key: "pro",     price: "CHF 990", isPro: true,  popular: false, color: "border-white/10 bg-white/[0.03]",    accent: "text-violet-400" },
] as const;

const includesIcons = [Target, Mail, Shield, Zap, BarChart2, FileText];

const statConfig = [
  { icon: Users,       statKey: "replyRate",  color: "text-cyan-400"    },
  { icon: Clock,       statKey: "launchDays", color: "text-violet-400"  },
  { icon: BadgeCheck,  statKey: "toolsCost",  color: "text-emerald-400" },
  { icon: DollarSign,  statKey: "setupFee",   color: "text-yellow-400"  },
] as const;

const compRowConfig = [
  { effortLow: false, trackingGood: false, highlight: false },
  { effortLow: false, trackingGood: false, highlight: false },
  { effortLow: true,  trackingGood: true,  highlight: false },
  { effortLow: true,  trackingGood: true,  highlight: true  },
];

export default function ColdEmailPage() {
  const t = useTranslations("ColdEmailPage");
  const reducedMotion = useReducedMotion();
  const shouldAnimate = !reducedMotion;

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

  const fadeIn = (delay = 0) =>
    shouldAnimate
      ? { initial: { opacity: 0, y: 24, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 0.8, delay, ease: EASE } }
      : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Navbar />
      <ServiceBreadcrumb serviceName="Cold Email Outreach" serviceSlug="cold-email" />

      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
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
                {t("hero.badge")}
              </div>
            </motion.div>

            <motion.h1
              {...fadeIn(0.1)}
              className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-extrabold mb-6 leading-[1.1]"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("hero.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                {t("hero.titleHighlight")}
              </span>
            </motion.h1>

            <motion.p {...fadeIn(0.2)} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              {t("hero.description")}
            </motion.p>

            <motion.div {...fadeIn(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                {t("hero.cta")}
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/20 text-slate-300 font-semibold hover:border-white/40 hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] text-base"
              >
                {t("hero.seePricing")}
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {statConfig.map(({ icon: Icon, statKey, color }, i) => (
              <motion.div
                key={statKey}
                initial={{ opacity: 0, ...(shouldAnimate ? { y: 16, filter: "blur(8px)" } : {}) }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={VP}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className="p-[1px] rounded-[1.5rem] ring-1 ring-white/10 bg-white/[0.04]"
              >
                <div className="rounded-[calc(1.5rem-1px)] flex flex-col items-center text-center p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                  <Icon className={`w-7 h-7 mb-3 ${color}`} />
                  <span className={`text-3xl font-black mb-1.5 ${color}`}>{t(`stats.${statKey}.value`)}</span>
                  <span className="text-slate-400 text-xs leading-snug">{t(`stats.${statKey}.label`)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── What's Included ──────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-14"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-3 border border-white/10">
                {t("includes.badge")}
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold" style={{ letterSpacing: "-0.02em" }}>
                {t("includes.title")}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {includesItems.map((item, i) => {
                const Icon = includesIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 16, filter: "blur(8px)" } : {}) }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={VP}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                    className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
                  >
                    <div className="rounded-[calc(2rem-1px)] p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                      <Icon className="w-6 h-6 text-cyan-400 mb-4" />
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Packages ─────────────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-14"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-3 border border-white/10">
                {t("packages.badge")}
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold mb-3" style={{ letterSpacing: "-0.02em" }}>
                {t("packages.title")}
              </h2>
              <p className="text-slate-400 text-sm">{t("packages.subtitle")}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {packageConfig.map((pkg, i) => {
                const features = t.raw(`packages.${pkg.key}.features`) as string[];
                return (
                  <motion.div
                    key={pkg.key}
                    initial={{ opacity: 0, ...(shouldAnimate ? { y: 30, filter: "blur(8px)" } : {}) }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={VP}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                    className={`relative p-[1px] rounded-[2rem] ${
                      pkg.popular
                        ? "ring-1 ring-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                        : "ring-1 ring-white/10 bg-white/[0.04]"
                    }`}
                    style={pkg.popular ? { boxShadow: "0 0 40px rgba(34,211,238,0.15)" } : undefined}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-cyan-400 text-[#080d1a] whitespace-nowrap z-10">
                        {t("packages.mostPopular")}
                      </span>
                    )}
                    <div className={`rounded-[calc(2rem-1px)] pt-8 pb-8 px-6 flex flex-col h-full ${
                      pkg.popular
                        ? "bg-[#080d1a]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                        : "bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]"
                    }`}>
                      <h3 className="text-white font-bold text-lg mb-1">{t(`packages.${pkg.key}.name`)}</h3>
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
                      <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING}
                        className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm ${
                          pkg.popular
                            ? "bg-cyan-400 text-[#080d1a] hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                            : "bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                        }`}
                      >
                        {t("packages.getStarted")}
                        <span className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-[1.25rem] ring-1 ring-white/10 bg-white/[0.03]">
              <BadgeCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">{t("packages.leadsOnly")}</p>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-14"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-3 border border-white/10">
                {t("howItWorks.badge")}
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold" style={{ letterSpacing: "-0.02em" }}>
                {t("howItWorks.title")}
              </h2>
            </motion.div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, ...(shouldAnimate ? { x: -16, filter: "blur(8px)" } : {}) }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={VP}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04]"
                >
                  <div className="rounded-[calc(2rem-1px)] flex gap-5 p-6 bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <span className="text-cyan-400 font-black text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Market Comparison ────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-center mb-12"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-3 border border-white/10">
                {t("comparison.badge")}
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold mb-3" style={{ letterSpacing: "-0.02em" }}>
                {t("comparison.title")}
              </h2>
              <p className="text-slate-400 text-sm">{t("comparison.subtitle")}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 16, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.6, ease: EASE }}
              className="p-[1px] rounded-[2rem] ring-1 ring-white/10 bg-white/[0.04] overflow-hidden"
            >
              <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="text-left px-6 py-3 w-2/5">{t("comparison.headers.option")}</th>
                      <th className="text-center px-4 py-3">{t("comparison.headers.cost")}</th>
                      <th className="text-center px-4 py-3">{t("comparison.headers.effort")}</th>
                      <th className="text-center px-4 py-3">{t("comparison.headers.tracking")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compRows.map((row, i) => {
                      const { effortLow, trackingGood, highlight } = compRowConfig[i] ?? {};
                      return (
                        <tr key={i} className={`border-t border-white/5 ${highlight ? "bg-cyan-500/5" : ""}`}>
                          <td className={`px-6 py-4 font-medium ${highlight ? "text-cyan-400" : "text-white"}`}>{row.option}</td>
                          <td className={`px-4 py-4 text-center ${highlight ? "text-emerald-400 font-bold" : "text-slate-400"}`}>{row.cost}</td>
                          <td className={`px-4 py-4 text-center ${effortLow ? "text-emerald-400" : "text-red-400"}`}>{row.effort}</td>
                          <td className={`px-4 py-4 text-center ${trackingGood ? "text-emerald-400" : "text-slate-500"}`}>{row.tracking}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
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
              initial={{ opacity: 0, ...(shouldAnimate ? { y: 24, filter: "blur(8px)" } : {}) }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VP}
              transition={{ duration: 0.8, ease: EASE }}
              className="p-[1px] rounded-[2rem] ring-1 ring-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-violet-500/10"
            >
              <div className="rounded-[calc(2rem-1px)] p-10 bg-[#080d1a]/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)]">
                <Repeat className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-3 border border-white/10">
                  {t("cta.badge")}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold mb-4" style={{ letterSpacing: "-0.02em" }}>
                  {t("cta.title")}
                </h2>
                <p className="text-slate-400 mb-8 leading-relaxed">{t("cta.description")}</p>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  {t("cta.button")}
                  <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        <RelatedServices currentSlug="cold-email" />

      </main>

      <Footer />
    </>
  );
}
