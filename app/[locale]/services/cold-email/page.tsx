"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, CheckCircle, ArrowRight, Zap, Target, BarChart2,
  ChevronDown, Shield, Users, Clock, Repeat, BadgeCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceBreadcrumb from "@/components/ServiceBreadcrumb";
import { WHATSAPP_URL } from "@/lib/constants";

// ─── Data ───────────────────────────────────────────────────────────────────

const packages = [
  {
    key: "starter",
    name: "Campaign Starter",
    price: "CHF 390",
    period: "/mo",
    contacts: "100 contacts/mo",
    replies: "~3–8 replies/mo",
    popular: false,
    color: "border-white/10 bg-white/[0.03]",
    accent: "text-cyan-400",
    features: [
      "100 hyper-local leads/month — sourced live from Google Maps",
      "1 sending inbox — configured & warmed up",
      "1–2 week inbox warmup before launch",
      "3-step personalised email sequence",
      "Instantly.ai campaign setup",
      "Deliverability monitoring",
      "Monthly performance report",
    ],
  },
  {
    key: "growth",
    name: "Campaign Growth",
    price: "CHF 590",
    period: "/mo",
    contacts: "250 contacts/mo",
    replies: "~8–20 replies/mo",
    popular: true,
    color: "border-cyan-500/30 bg-cyan-500/5",
    accent: "text-cyan-400",
    features: [
      "250 hyper-local leads/month — sourced live from Google Maps",
      "Up to 3 sending inboxes — configured & warmed up",
      "1–2 week inbox warmup before launch",
      "3-step personalised email sequence",
      "A/B test on subject lines",
      "Instantly.ai campaign setup",
      "Deliverability monitoring",
      "Monthly performance report + recommendations",
    ],
  },
  {
    key: "pro",
    name: "Campaign Pro",
    price: "From CHF 990",
    period: "/mo",
    contacts: "500+ contacts/mo",
    replies: "~15–40 replies/mo",
    popular: false,
    color: "border-purple-500/30 bg-purple-500/5",
    accent: "text-purple-400",
    features: [
      "500+ hyper-local leads/month — sourced live from Google Maps",
      "5+ sending inboxes — configured & warmed up",
      "1–2 week inbox warmup before launch",
      "Multi-segment targeting (industries, cities, or offers)",
      "3-step personalised email sequence per segment",
      "A/B test on subject lines + copy",
      "Priority deliverability monitoring",
      "Monthly strategy call + full performance report",
      "Custom volume available — price scales with contacts",
    ],
  },
];

const includes = [
  {
    icon: Target,
    title: "Lead Prospecting",
    desc: "Fresh, verified leads sourced from Google Maps in real time — not a 2-year-old database. Matched to your exact target profile.",
  },
  {
    icon: Mail,
    title: "Email Copywriting",
    desc: "A personalised 3-step sequence crafted for your specific offer and audience. Not a generic template — written for your niche.",
  },
  {
    icon: Shield,
    title: "Technical Setup",
    desc: "Domain/subdomain config, SPF, DKIM, DMARC, and email warmup. Your emails reach the inbox — not spam.",
  },
  {
    icon: Zap,
    title: "Campaign Scheduling",
    desc: "Sequences sent via Instantly.ai with smart timing and daily limits that protect your domain health.",
  },
  {
    icon: BarChart2,
    title: "Deliverability Monitoring",
    desc: "Bounce rate and spam score tracked throughout the month. We catch problems before they damage your domain.",
  },
  {
    icon: BarChart2,
    title: "Monthly Report",
    desc: "Clear breakdown of sent / opened / replied / bounced — plus what we're adjusting next month and why.",
  },
];

const steps = [
  {
    num: "1",
    title: "Define your ideal client",
    desc: "Tell us who you want to reach: industry, city, and company type. For example: 'dental clinics in Zurich' or 'law firms in Geneva'. The more specific, the better the results.",
  },
  {
    num: "2",
    title: "We build your campaign",
    desc: "We source the lead list, write the personalised 3-step email sequence, configure the sending infrastructure, and set everything up in Instantly. Typically ready in 3–5 business days.",
  },
  {
    num: "3",
    title: "Campaign goes live",
    desc: "Emails go out in daily batches with smart delays to maximise deliverability. We monitor open rates, bounces, and replies throughout the month to keep your domain healthy.",
  },
  {
    num: "4",
    title: "Replies come in — we optimise",
    desc: "Interested prospects reply directly to your inbox. At the end of each month we send a performance report and adjust the next campaign based on what's working.",
  },
];

const faqItems = [
  {
    question: "Will this work for my industry?",
    answer: "Cold email works in almost any B2B context where there is a clear decision-maker to reach. It works especially well for professional services (lawyers, accountants, clinics), agencies, consultants, software companies, and local businesses targeting other businesses. It is not suitable for B2C or highly regulated industries (finance, pharmaceuticals) without additional compliance steps.",
  },
  {
    question: "How many replies can I realistically expect?",
    answer: "Industry benchmark for well-targeted, personalised cold email campaigns is 3–8% reply rate. On 100 contacts that means 3–8 replies per month — not all of which will convert. Results depend heavily on offer clarity, target specificity, and how compelling your value proposition is. We are transparent about this upfront.",
  },
  {
    question: "What is the setup fee for?",
    answer: "The one-time CHF 149 setup fee covers: creating and configuring a sending subdomain (to protect your main domain), setting up SPF/DKIM/DMARC DNS records, connecting the inbox to Instantly.ai, and running a 2-week email warmup so your first campaign hits the inbox instead of spam. This is only charged once — never on renewals.",
  },
  {
    question: "Will my main domain be at risk?",
    answer: "No. We always use a sending subdomain (e.g., mail.yourdomain.com) — never your main domain. This completely isolates your primary email reputation from the campaign. In the unlikely event of any deliverability issues, your business email is unaffected.",
  },
  {
    question: "How long before I see results?",
    answer: "The first 2 weeks are spent on warmup (required for inbox placement). Campaigns typically go live in week 3. First replies usually start coming in within days of launch. Expect the first meaningful data and optimisation recommendations after the first full month.",
  },
  {
    question: "Can I cancel after the minimum commitment?",
    answer: "Yes. After the 2-month minimum, the service is month-to-month. Cancel any time with 30 days' notice — no annual contracts, no penalties.",
  },
  {
    question: "Do I need to buy any tools or software?",
    answer: "No. We handle Instantly.ai, the lead database, email verification, and all technical infrastructure. You do not need to purchase or set up anything yourself.",
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function ColdEmailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cold Email Outreach — Done-for-You",
    description:
      "Fully managed cold email campaigns for Swiss businesses. Lead sourcing, copywriting, technical setup, and sending — all handled.",
    provider: {
      "@type": "LocalBusiness",
      name: "Lopes2Tech",
      address: { "@type": "PostalAddress", addressLocality: "Zurich", addressCountry: "CH" },
    },
    areaServed: { "@type": "Country", name: "Switzerland" },
    offers: packages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      price: pkg.price.replace("CHF ", ""),
      priceCurrency: "CHF",
      description: `${pkg.contacts} — ${pkg.replies}`,
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
              Done-for-You Cold Outreach
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]"
            >
              Reach your ideal clients.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                While you sleep.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              We handle everything — finding the right contacts, writing the emails, setting up the infrastructure, and sending the sequences. You only need to do one thing: reply to interested prospects.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
            >
              Start Your Campaign
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users,     value: "3–8%",    label: "Average reply rate — industry benchmark",   color: "text-cyan-400"    },
              { icon: Clock,     value: "3–5",      label: "Business days to campaign launch",          color: "text-purple-400"  },
              { icon: BadgeCheck, value: "CHF 0",  label: "Tools to buy — we handle everything",       color: "text-emerald-400" },
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

        {/* ── What's Included ──────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Every Campaign Includes</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">Everything handled. Nothing to set up.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {includes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <item.icon className="w-6 h-6 text-cyan-400 mb-4" />
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Packages ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">Pricing</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Simple, transparent pricing</h2>
              <p className="text-slate-400 text-sm">+ CHF 149 one-time setup fee (new clients only) · Minimum 2 months · Cancel anytime after</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {packages.map((pkg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative pt-8 pb-8 px-6 rounded-2xl border flex flex-col ${pkg.color}`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-cyan-400 text-[#080d1a] whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <p className="text-white font-bold text-lg mb-1">{pkg.name}</p>
                  <p className="text-slate-400 text-xs mb-5">{pkg.contacts} · {pkg.replies}</p>
                  <div className="flex items-end gap-1 mb-6">
                    {pkg.price.startsWith("From") ? (
                      <>
                        <span className="text-slate-400 text-sm mb-1.5">From CHF</span>
                        <span className={`text-4xl font-black ${pkg.accent}`}>990</span>
                      </>
                    ) : (
                      <>
                        <span className="text-slate-400 text-base mb-0.5">CHF</span>
                        <span className={`text-4xl font-black ${pkg.accent}`}>{pkg.price.replace("CHF ", "")}</span>
                      </>
                    )}
                    <span className="text-slate-400 text-sm mb-1">{pkg.period}</span>
                  </div>
                  <ul className="space-y-2 mb-8 flex-1">
                    {pkg.features.map((f, fi) => (
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
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <BadgeCheck className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400">
                Need leads only, without campaign management? We provide verified lead lists from CHF 90 per list. Ask via WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">How It Works</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">From zero to replies in under a week</h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 font-black text-sm">{step.num}</span>
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

        {/* ── Market comparison ────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">Market Comparison</p>
              <h2 className="text-3xl font-extrabold mb-3">How we compare</h2>
              <p className="text-slate-400 text-sm">A full-service cold email agency charges CHF 2,000–8,000/month for the same outcome.</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="grid grid-cols-5 px-6 py-3 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <span className="col-span-2">Option</span>
                <span className="text-center">Cost/mo</span>
                <span className="text-center">Your effort</span>
                <span className="text-center">Tracking</span>
              </div>
              {[
                { option: "Manual LinkedIn outreach", cost: "CHF 0–60",      effort: "Very high", tracking: "None",     highlight: false },
                { option: "DIY tools (Apollo + Instantly)", cost: "CHF 150–400", effort: "Very high", tracking: "Basic",  highlight: false },
                { option: "Cold email agency (full-service)", cost: "CHF 2,000+", effort: "Low",   tracking: "Yes",      highlight: false },
                { option: "Lopes2Tech",               cost: "CHF 249–699", effort: "Very low",  tracking: "Yes",      highlight: true  },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-5 px-6 py-4 border-t border-white/5 text-sm ${
                    row.highlight ? "bg-cyan-500/5" : ""
                  }`}
                >
                  <span className={`col-span-2 font-medium ${row.highlight ? "text-cyan-400" : "text-white"}`}>
                    {row.option}
                  </span>
                  <span className={`text-center ${row.highlight ? "text-emerald-400 font-bold" : "text-slate-400"}`}>{row.cost}</span>
                  <span className={`text-center ${row.effort === "Very low" || row.effort === "Low" ? "text-emerald-400" : "text-red-400"}`}>{row.effort}</span>
                  <span className={`text-center ${row.tracking === "Yes" ? "text-emerald-400" : "text-slate-500"}`}>{row.tracking}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <ServiceFAQ
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before starting."
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
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">Ready to Start?</p>
              <h2 className="text-3xl font-extrabold mb-4">Build a predictable client pipeline</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Stop waiting for referrals. Let us build and run your cold outreach — while you focus on delivering for the clients who reply.
              </p>
              <a
                href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
              >
                Get a Free Strategy Call
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
