"use client";

import { motion } from "framer-motion";
import { Gift, Zap, CheckCircle, ArrowRight, Users, Repeat, BadgeCheck } from "lucide-react";
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

const rewards = [
  { service: "Starter Website (CHF 690)", reward: "CHF 70", type: "one-time", note: "Paid on deposit" },
  { service: "Professional Website (CHF 1,390)", reward: "CHF 140", type: "one-time", note: "Paid on deposit" },
  { service: "Business Pro Website (CHF 1,990)", reward: "CHF 200", type: "one-time", note: "Paid on deposit" },
  { service: "Meta or Google Ads Management", reward: "15% × 6mo", type: "recurring", note: "~CHF 52–97/mo" },
  { service: "Monthly Care Plans", reward: "15% × 6mo", type: "recurring", note: "~CHF 6–25/mo" },
  { service: "AI Workflow / Automation Setup", reward: "10% of setup", type: "one-time", note: "CHF 60–500" },
];

const perks = [
  "No referral limit — refer 10 clients, earn 10 times",
  "No expiry on your referrals",
  "Paid via bank transfer (IBAN) or Twint",
  "You don't need to be a client yourself",
  "We handle all the sales — you just make the intro",
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

        {/* Rewards table */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-3">What you earn</p>
              <h2 className="text-3xl md:text-4xl font-extrabold">Your rewards, by service</h2>
            </div>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-3 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Service</span>
                <span className="text-center">Your Reward</span>
                <span className="text-right">Note</span>
              </div>
              {rewards.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 px-6 py-4 border-t border-white/5 items-center hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm text-white font-medium">{row.service}</span>
                  <span className="text-center">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${row.type === "recurring" ? "bg-purple-500/15 text-purple-400 border border-purple-500/20" : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"}`}>
                      {row.type === "recurring" && <Repeat className="w-3 h-3" />}
                      {row.reward}
                    </span>
                  </span>
                  <span className="text-right text-xs text-slate-500">{row.note}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-600 mt-4">Rewards are paid after the referred client completes their deposit or first monthly payment.</p>
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
