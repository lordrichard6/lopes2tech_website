"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Code2, TrendingUp, Megaphone, Zap, CheckCircle2, X, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";

const differentiators = [
  { key: "engineering", icon: Code2,       color: "from-cyan-500/20 to-cyan-500/5",     border: "border-cyan-500/20",    glow: "rgba(6,182,212,0.15)",   iconColor: "text-cyan-400"   },
  { key: "marketing",   icon: TrendingUp,  color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/20",  glow: "rgba(168,85,247,0.15)",  iconColor: "text-purple-400" },
  { key: "ads",         icon: Megaphone,   color: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/20",  glow: "rgba(139,92,246,0.15)",  iconColor: "text-violet-400" },
  { key: "automation",  icon: Zap,         color: "from-cyan-500/10 to-violet-500/10",  border: "border-violet-500/20",  glow: "rgba(139,92,246,0.12)",  iconColor: "text-violet-400" },
];

const notUs = ["wix", "wordpress", "webflow", "templates", "plugins", "bloated"];
const yesUs = ["nextjs", "typescript", "custom", "seo", "analytics", "ads"];

const stats = [
  { key: "rating",    value: "5.0★" },
  { key: "code",      value: "100%" },
  { key: "countries", value: "5"    },
  { key: "delivery",  value: "7d"   },
];

// Lightning bolts radiating from logo — angle + distance
const lightningBolts = [
  { angle: -45,  dist: 28, delay: 0    },
  { angle: 45,   dist: 28, delay: 0.4  },
  { angle: 135,  dist: 28, delay: 0.8  },
  { angle: -135, dist: 28, delay: 1.2  },
  { angle: 0,    dist: 32, delay: 0.2  },
  { angle: 90,   dist: 32, delay: 0.6  },
];

function LightningLogo() {
  return (
    <span className="relative inline-flex items-center justify-center">
      {/* Deep glow orb */}
      <motion.span
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.4, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
        className="absolute rounded-full bg-cyan-400/25 blur-[18px]"
        style={{ width: "100%", height: "100%", transform: "scale(2.2)" }}
      />
      {/* Secondary purple pulse */}
      <motion.span
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.2, 1.8, 1.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.32, 0.72, 0, 1], delay: 0.8 }}
        className="absolute rounded-full bg-purple-500/15 blur-[24px]"
        style={{ width: "100%", height: "100%", transform: "scale(2.8)" }}
      />

      {/* Radiating lightning sparks */}
      {lightningBolts.map((bolt, i) => {
        const rad = (bolt.angle * Math.PI) / 180;
        const x = Math.cos(rad) * bolt.dist;
        const y = Math.sin(rad) * bolt.dist;
        return (
          <motion.svg
            key={i}
            viewBox="0 0 10 18"
            fill="none"
            className="absolute w-[7px] h-[13px] md:w-[9px] md:h-[16px]"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${bolt.angle + 90}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: [0.32, 0.72, 0, 1],
              delay: bolt.delay,
              repeatDelay: 0.8,
            }}
          >
            <path
              d="M6 1L1 9H5L4 17L9 8H5L6 1Z"
              fill={`url(#boltGrad-${i})`}
              stroke="rgba(103,232,249,0.6)"
              strokeWidth="0.5"
            />
            <defs>
              <linearGradient id={`boltGrad-${i}`} x1="5" y1="1" x2="5" y2="17" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </motion.svg>
        );
      })}

      {/* Logo itself */}
      <span className="relative inline-block w-[44px] h-[42px] md:w-[56px] md:h-[53px] z-10">
        <Image
          src="/logo_w.svg"
          alt="Lopes2Tech Logo"
          fill
          className="object-contain drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]"
        />
      </span>
    </span>
  );
}

const floatingBadges = [
  { label: "Next.js",      pos: { top: "8%",     left: "-2%"  }, floatDur: 3.0, showDelay: 0.0,  cycle: 10 },
  { label: "Meta Ads",     pos: { top: "24%",    right: "-6%" }, floatDur: 3.5, showDelay: 1.5,  cycle: 11 },
  { label: "TypeScript",   pos: { top: "42%",    left: "-8%"  }, floatDur: 3.8, showDelay: 2.0,  cycle: 14 },
  { label: "Google Ads",   pos: { top: "56%",    right: "-4%" }, floatDur: 4.0, showDelay: 3.0,  cycle: 12 },
  { label: "n8n / Zapier", pos: { bottom: "18%", left: "-6%"  }, floatDur: 3.2, showDelay: 4.5,  cycle: 13 },
  { label: "Supabase",     pos: { top: "72%",    right: "-4%" }, floatDur: 3.3, showDelay: 5.5,  cycle: 11 },
];

export default function WhoIsLopes2Tech() {
  const t = useTranslations("WhoSection");

  return (
    <section
      id="who"
      className="relative py-24 md:py-32 bg-[#080d1a]"
    >
      {/* Overflow clip wrapper — isolates horizontal clip from vertical, fixing Safari overflow bug */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%]  w-[500px] h-[500px] rounded-full bg-cyan-500/5   blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10"
          >
            {t("badge")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] flex flex-wrap items-center justify-center gap-x-4 gap-y-3 font-[family-name:var(--font-display)]"
          >
            <span>{t("titlePre")}</span>
            <span className="inline-flex items-center gap-3">
              <LightningLogo />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Lopes2Tech?
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base md:text-lg text-slate-400 leading-[1.8] max-w-2xl text-center"
          >
            {t("intro")}
          </motion.p>

        </div>

        {/* ── Main split layout ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">

          {/* ── LEFT: Content ─────────────────── */}
          <div className="space-y-8">

            {/* NOT us vs YES us */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Outer shell — Not Us */}
              <div className="p-[1px] rounded-2xl ring-1 ring-red-500/20" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))' }}>
                {/* Inner core */}
                <div className="rounded-[calc(1rem-1px)] bg-[#080d1a]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] p-4">
                  <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-3">{t("notUsLabel")}</p>
                  <ul className="space-y-1.5">
                    {notUs.map(k => (
                      <li key={k} className="flex items-center gap-2 text-slate-400 text-sm">
                        <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        {t(`notUs.${k}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Outer shell — Yes Us */}
              <div className="p-[1px] rounded-2xl ring-1 ring-cyan-500/20" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(6,182,212,0.02))' }}>
                {/* Inner core */}
                <div className="rounded-[calc(1rem-1px)] bg-[#080d1a]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] p-4">
                  <p className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-3">{t("yesUsLabel")}</p>
                  <ul className="space-y-1.5">
                    {yesUs.map(k => (
                      <li key={k} className="flex items-center gap-2 text-slate-300 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        {t(`yesUs.${k}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Differentiator cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {differentiators.map((d, i) => {
                const Icon = d.icon;
                return (
                  <motion.div
                    key={d.key}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4 }}
                    className="transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{ ["--hover-glow" as string]: d.glow }}
                  >
                    {/* Outer shell */}
                    <div className={`p-[1px] rounded-2xl bg-gradient-to-br ${d.color} ring-1 ${d.border} transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-2`} style={{ boxShadow: `0 8px 32px ${d.glow}` }}>
                      {/* Inner core */}
                      <div className="rounded-[calc(1rem-1px)] bg-[#080d1a]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] p-5">
                        <Icon className={`w-5 h-5 mb-3 ${d.iconColor}`} />
                        <h3 className="text-white font-bold text-sm mb-1">{t(`diff.${d.key}.title`)}</h3>
                        <p className="text-slate-400 text-xs leading-relaxed">{t(`diff.${d.key}.desc`)}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Image ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-[80px]" />
            <motion.div
              className="absolute w-[380px] h-[380px] rounded-full border border-cyan-500/10"
              style={{
                background: "conic-gradient(from 0deg, rgba(6,182,212,0.05), transparent 60%, rgba(168,85,247,0.05), transparent)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border border-purple-500/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
              className="relative w-[280px] h-[360px] sm:w-[340px] sm:h-[420px] md:w-[420px] md:h-[520px]"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
            >
              <Image
                src="/paulo_god.webp"
                alt="Paulo Lopes — Founder of Lopes2Tech"
                fill
                sizes="(max-width: 768px) 340px, 420px"
                className="object-contain drop-shadow-[0_0_60px_rgba(6,182,212,0.3)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/founder.jpg";
                }}
              />
            </motion.div>

            {/* Floating tech badges — cycle in/out */}
            {floatingBadges.map((b) => (
              <motion.div
                key={b.label}
                className="hidden md:block absolute px-3 py-1.5 rounded-full bg-[#0a0f1e] border border-white/10 text-white text-xs font-semibold whitespace-nowrap shadow-xl"
                style={{ ...b.pos }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale:   [0.7, 1, 1, 0.7],
                  y:       [0, -8, -8, 0],
                }}
                transition={{
                  duration: b.cycle,
                  delay: b.showDelay,
                  repeat: Infinity,
                  ease: [0.32, 0.72, 0, 1],
                  times: [0, 0.15, 0.75, 1],
                }}
              >
                {b.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Stats bar ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Outer shell */}
          <div className="p-[1px] rounded-3xl bg-white/5 ring-1 ring-white/10">
            {/* Inner core */}
            <div className="rounded-[calc(1.5rem-1px)] bg-white/[0.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] grid grid-cols-2 md:grid-cols-4 gap-4 p-6 md:p-8">
              {stats.map((s, i) => (
                <div
                  key={s.key}
                  className={`text-center
                    ${i < 2 ? "border-b border-white/10 pb-4 md:pb-0 md:border-b-0" : ""}
                    ${i < stats.length - 1 ? "md:border-r md:border-white/10" : ""}
                  `}
                >
                  <p className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mb-1">
                    {s.value}
                  </p>
                  <p className="text-slate-400 text-sm font-medium">{t(`stats.${s.key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-10"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium underline-offset-4 hover:underline transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {t('ctaLink')}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>

    </section>
  );
}
