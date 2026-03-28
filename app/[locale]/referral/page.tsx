"use client";

import { motion } from "framer-motion";
import { Gift, Zap, CheckCircle, ArrowRight, Users, Repeat, BadgeCheck, Globe, Palette, Settings, Megaphone, Bot, Wrench } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP_URL } from "@/lib/constants";

const steps = [
  {
    icon: Users,
    title: "Know someone who needs a website or digital help?",
    description: "Think of a friend, colleague, or business owner who could benefit from a professional website, paid ads, or automation. That's your referral.",
  },
  {
    icon: Zap,
    title: "Send them our way",
    description: "Share our website or just send us a WhatsApp with their name and contact. We'll take it from there — no follow-up needed from you.",
  },
  {
    icon: Gift,
    title: "Get paid when they sign",
    description: "Once they sign a contract and pay the deposit, we transfer your reward. Simple, transparent, no paperwork.",
  },
];

type RewardRow = { service: string; price: string; reward: string; note?: string };
type RewardCategory = {
  title: string;
  type: "one-time" | "recurring";
  color: string;
  icon: React.ElementType;
  rows: RewardRow[];
};

const rewardCategories: RewardCategory[] = [
  {
    title: "Website Packages",
    type: "one-time",
    color: "cyan",
    icon: Globe,
    rows: [
      { service: "Starter Website", price: "CHF 690", reward: "CHF 69", note: "Paid on deposit" },
      { service: "Professional Website", price: "CHF 1,390", reward: "CHF 139", note: "Paid on deposit" },
      { service: "Business Pro Website", price: "CHF 1,990", reward: "CHF 199", note: "Paid on deposit" },
      { service: "Campaign Landing Page", price: "CHF 350", reward: "CHF 35", note: "Paid on deposit" },
    ],
  },
  {
    title: "Branding",
    type: "one-time",
    color: "pink",
    icon: Palette,
    rows: [
      { service: "Logo Only", price: "CHF 299", reward: "CHF 30", note: "Paid on delivery" },
      { service: "Full Brand Kit", price: "CHF 549", reward: "CHF 55", note: "Paid on delivery" },
    ],
  },
  {
    title: "Setup & Quick Wins",
    type: "one-time",
    color: "amber",
    icon: Settings,
    rows: [
      { service: "Google Business Profile Setup", price: "CHF 249", reward: "CHF 25" },
      { service: "Analytics & Tracking Setup (GA4)", price: "CHF 329", reward: "CHF 33" },
      { service: "Email Domain Setup", price: "CHF 169", reward: "CHF 17" },
      { service: "Website Audit", price: "CHF 99", reward: "CHF 10" },
      { service: "Speed Optimization", price: "CHF 129", reward: "CHF 13" },
      { service: "Google Business Boost", price: "CHF 69", reward: "CHF 7" },
      { service: "Automation Assessment", price: "CHF 149", reward: "CHF 15" },
    ],
  },
  {
    title: "Website Add-Ons",
    type: "one-time",
    color: "teal",
    icon: Wrench,
    rows: [
      { service: "Blog / CMS Setup", price: "CHF 350", reward: "CHF 35" },
      { service: "Extra Service Page", price: "CHF 80/page", reward: "CHF 8/page" },
      { service: "Extra Language", price: "From CHF 100", reward: "From CHF 10", note: "Scales with site size" },
      { service: "Local SEO Boost", price: "CHF 199", reward: "CHF 20" },
      { service: "Social Proof Widget", price: "CHF 99", reward: "CHF 10" },
      { service: "Newsletter Integration", price: "CHF 149", reward: "CHF 15" },
      { service: "Review Collection Automation", price: "CHF 329", reward: "CHF 33" },
      { service: "Appointment Booking System", price: "CHF 369", reward: "CHF 37" },
      { service: "Lead Capture System", price: "CHF 449", reward: "CHF 45" },
      { service: "AI FAQ Chatbot", price: "CHF 699–850", reward: "CHF 70–85" },
    ],
  },
  {
    title: "Marketing & Ads (Monthly)",
    type: "recurring",
    color: "purple",
    icon: Megaphone,
    rows: [
      { service: "Meta Ads Management", price: "CHF 349/mo", reward: "CHF 52/mo", note: "× 6 months = CHF 314" },
      { service: "Google Ads Management", price: "CHF 399/mo", reward: "CHF 60/mo", note: "× 6 months = CHF 359" },
      { service: "Meta + Google Bundle", price: "CHF 649/mo", reward: "CHF 97/mo", note: "× 6 months = CHF 584" },
      { service: "Social Media Management – Starter", price: "CHF 299/mo", reward: "CHF 45/mo", note: "× 6 months = CHF 269" },
      { service: "Social Media Management – Growth", price: "CHF 399/mo", reward: "CHF 60/mo", note: "× 6 months = CHF 359" },
      { service: "Social Media Management – Pro", price: "CHF 649/mo", reward: "CHF 97/mo", note: "× 6 months = CHF 584" },
    ],
  },
  {
    title: "AI & Automation Setup",
    type: "one-time",
    color: "emerald",
    icon: Bot,
    rows: [
      { service: "AI Workflow – Light", price: "CHF 600–1,200", reward: "CHF 60–120" },
      { service: "AI Workflow – Full", price: "CHF 1,500–5,000", reward: "CHF 150–500" },
      { service: "AI Customer Support Agent", price: "CHF 2,500–9,000", reward: "CHF 250–900" },
      { service: "AI Sales & Outreach Agent", price: "CHF 2,500–7,000", reward: "CHF 250–700" },
      { service: "AI Voice Agent", price: "CHF 4,000–10,000", reward: "CHF 400–1,000" },
      { service: "AI Knowledge-Base / RAG", price: "CHF 3,500–10,000", reward: "CHF 350–1,000" },
    ],
  },
];

const colorMap: Record<string, { badge: string; header: string; icon: string }> = {
  cyan:    { badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",    header: "bg-cyan-500/10 border-cyan-500/20",    icon: "text-cyan-400" },
  pink:    { badge: "bg-pink-500/15 text-pink-400 border-pink-500/20",    header: "bg-pink-500/10 border-pink-500/20",    icon: "text-pink-400" },
  amber:   { badge: "bg-amber-500/15 text-amber-400 border-amber-500/20", header: "bg-amber-500/10 border-amber-500/20", icon: "text-amber-400" },
  teal:    { badge: "bg-teal-500/15 text-teal-400 border-teal-500/20",    header: "bg-teal-500/10 border-teal-500/20",    icon: "text-teal-400" },
  purple:  { badge: "bg-purple-500/15 text-purple-400 border-purple-500/20", header: "bg-purple-500/10 border-purple-500/20", icon: "text-purple-400" },
  indigo:  { badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20", header: "bg-indigo-500/10 border-indigo-500/20", icon: "text-indigo-400" },
  emerald: { badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20", header: "bg-emerald-500/10 border-emerald-500/20", icon: "text-emerald-400" },
};

const perks = [
  "No referral limit — refer 10 clients, earn 10 times",
  "No expiry on your referrals",
  "Paid via bank transfer (IBAN) or Twint",
  "You don't need to be a client yourself to refer",
  "We handle all the sales — you just make the intro",
  "Refer someone AND hire us? You get 20% off one service",
];

export default function ReferralPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#080d1a] min-h-screen text-white">

        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
            <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6"
            >
              <Gift className="w-4 h-4" />
              Referral Program
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1]"
            >
              Refer a client.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Get paid.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              Know someone who needs a website, paid ads, or automations? Make the intro and earn up to{" "}
              <span className="text-white font-semibold">10% per project</span> or{" "}
              <span className="text-white font-semibold">15% of their monthly retainer</span> for 6 months.
              No limits. No forms. Just a WhatsApp message.
            </motion.p>

            <motion.a
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
            >
              Send a referral now
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </section>

        {/* How it works */}
        <section className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">How it works</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">3 steps. That&apos;s it.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-black text-white/5 select-none leading-none">{i + 1}</div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-snug">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dual benefit banner */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 p-8 md:p-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Gift className="w-7 h-7 text-amber-400" />
                </div>
                <div className="flex-1">
                  <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2">Bonus perk for referrers</p>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                    Refer someone <span className="text-amber-400">&amp;</span> become a client yourself? Get <span className="text-amber-400">20% off</span> one service.
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                    If you refer a client to us and later decide to hire us yourself, you unlock a <strong className="text-white">20% discount on any single service</strong> — website, ads, automation, branding, whatever you need. No expiry. Just let us know you referred someone and the discount is yours.
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
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">What you earn</p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Your rewards, by service</h2>
              <p className="text-slate-400 text-sm">One-time services pay <span className="text-white font-semibold">10%</span> on deposit. Monthly services pay <span className="text-white font-semibold">15% for 6 months</span>.</p>
            </div>

            <div className="space-y-10">
              {rewardCategories.map((cat, ci) => {
                const c = colorMap[cat.color];
                return (
                  <motion.div
                    key={ci}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.06 }}
                    className="rounded-2xl border border-white/10 overflow-hidden"
                  >
                    {/* Category header */}
                    <div className={`flex items-center gap-3 px-6 py-4 border-b border-white/10 ${c.header}`}>
                      <cat.icon className={`w-5 h-5 ${c.icon}`} />
                      <span className="font-bold text-white text-sm uppercase tracking-wider">{cat.title}</span>
                      <span className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${c.badge}`}>
                        {cat.type === "recurring" && <Repeat className="w-3 h-3" />}
                        {cat.type === "one-time" ? "10% one-time" : "15% × 6 months"}
                      </span>
                    </div>

                    {/* Column headers */}
                    <div className="grid grid-cols-3 px-6 py-2 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span>Service</span>
                      <span className="text-center">Price</span>
                      <span className="text-right">Your Reward</span>
                    </div>

                    {/* Rows */}
                    {cat.rows.map((row, ri) => (
                      <div
                        key={ri}
                        className="grid grid-cols-3 px-6 py-3.5 border-t border-white/5 items-center hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="text-sm text-white font-medium pr-4">{row.service}</span>
                        <span className="text-center text-sm text-slate-400">{row.price}</span>
                        <span className="text-right">
                          <span className={`inline-flex flex-col items-end`}>
                            <span className={`text-sm font-bold ${c.icon}`}>{row.reward}</span>
                            {row.note && <span className="text-xs text-slate-600">{row.note}</span>}
                          </span>
                        </span>
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>

            <p className="text-center text-xs text-slate-600 mt-6">Rewards are paid after the referred client completes their deposit or first monthly payment. Monthly rewards are transferred at the end of each month.</p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-3">The fine print (it&apos;s not fine print)</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">No catches. Seriously.</h2>
            </div>
            <div className="space-y-4">
              {perks.map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5"
                >
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
            >
              <CheckCircle className="w-10 h-10 text-cyan-400 mx-auto mb-5" />
              <h2 className="text-3xl font-extrabold mb-4">Ready to make your first referral?</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Just drop us a WhatsApp with the name and contact of who you&apos;re referring. We&apos;ll take it from there and keep you updated on every step.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-400 text-[#080d1a] font-bold text-lg hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
              >
                Send referral on WhatsApp
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
