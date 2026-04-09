"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Megaphone, Cpu, ShoppingCart, AppWindow, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/navigation";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const services = [
  { key: "web",        image: "/assets/services/service_webdev.webp",           icon: Monitor,      href: "/services/web-design"            },
  { key: "marketing",  image: "/assets/services/service_digital_marketing.webp", icon: Megaphone,    href: "/services/social-media-marketing" },
  { key: "automation", image: "/assets/services/service_ai_solutions.webp",      icon: Cpu,          href: "/services/business-automation"   },
  { key: "ecommerce",  image: "/assets/services/service_e_commerce.webp",        icon: ShoppingCart, href: "/services/ecommerce"             },
  { key: "apps",       image: "/assets/services/service_mobile_app.webp",        icon: AppWindow,    href: "/services/web-apps"              },
];

export default function Services() {
  const t = useTranslations("ServicesSection");

  // Detect desktop to conditionally enable the rotateY fan effect
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track hovered card so it can be lifted above all siblings via z-index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Swipe hint — auto-hides after first scroll interaction on mobile
  const [hasSwiped, setHasSwiped] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#080d1a]">

      {/* Diagonal lines pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.03) 0px,
            rgba(255,255,255,0.03) 1px,
            transparent 1px,
            transparent 40px
          )`,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[300px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 px-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block px-3 py-1 rounded-full bg-white/5 text-slate-400 font-semibold text-[10px] uppercase tracking-[0.2em] mb-6 border border-white/10"
          >
            {t("title")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight font-[family-name:var(--font-display)]"
          >
            <span className="text-white">{t("headingPre")} </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              {t("headingHighlight")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-slate-400"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* ── Card Deck ──
            Mobile: horizontal scroll strip with snap, peek at next card
            Desktop: perspective fan deck with rotateY tilt
        ── */}
        <div
          ref={scrollRef}
          onScroll={() => setHasSwiped(true)}
          className={clsx(
            // Mobile: horizontal scroll strip
            "flex flex-row overflow-x-auto snap-x snap-mandatory",
            "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
            "pl-6 pr-6 gap-4 pb-4",
            // Desktop: fan deck
            "md:overflow-visible md:snap-none md:justify-center md:items-center",
            "md:[perspective:2000px] md:gap-0 md:pb-0 md:pl-4 md:pr-4",
            "md:min-h-[650px]"
          )}
        >
          {services.map((service, index) => (
            <Link key={service.key} href={service.href} className="contents">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95, rotateY: isDesktop ? -15 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotateY: isDesktop ? -15 : 0, scale: 1 }}
                whileHover={{ rotateY: 0, y: isDesktop ? -20 : -6, scale: isDesktop ? 1.05 : 1.02 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  default: { duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
                  rotateY: { type: "spring", stiffness: 300, damping: 30 },
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  scale: { type: "spring", stiffness: 300, damping: 30 },
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={clsx(
                  // Mobile: fixed width for peek effect, snap-center
                  "snap-center shrink-0 w-[78vw] sm:w-[60vw] h-[340px]",
                  // Desktop: fan width + height + negative margin stacking
                  "md:w-[320px] md:h-[480px]",
                  "group relative rounded-[24px] border border-white/10 cursor-pointer",
                  // Desktop-only stacking offset
                  index === 0 ? "md:origin-bottom" : "md:ml-[-120px] md:origin-bottom"
                )}
                style={{
                  // Hovered card jumps to z-index 200 — above all others in the fan
                  zIndex: hoveredIndex === index ? 200 : 50 - index,
                  boxShadow: "0 8px 40px -8px rgba(0,0,0,0.6), 0 0 0 0 transparent",
                }}
              >
                {/* Image + overlay clipped in their own layer to avoid 3D tilt artifacts */}
                <div className="absolute inset-0 overflow-hidden rounded-[24px]">
                  <Image
                    src={service.image}
                    alt={`${t(`items.${service.key}.title`)} — ${t(`items.${service.key}.description`)}`}
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-cover object-center"
                  />
                  {/* Overlay — exact section bg for seamless card→section blend */}
                  <div
                    className="absolute inset-0 z-10 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    style={{
                      background: "linear-gradient(to top, rgba(8,13,26,0.96) 0%, rgba(8,13,26,0.35) 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 h-full p-6 md:p-8 flex flex-col justify-end items-start text-left">

                  {/* Ghost step number */}
                  <span className="absolute bottom-4 right-6 text-[6rem] font-extrabold text-white/[0.05] leading-none select-none font-[family-name:var(--font-display)] pointer-events-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon — custom cubic-bezier easing */}
                  <div className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] mb-4 bg-cyan-500/10 rounded-xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 group-hover:bg-cyan-500/20">
                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-cyan-300" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                    {t(`items.${service.key}.title`)}
                  </h3>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {t(`items.${service.key}.description`)}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* ── Swipe hint — mobile only, auto-hides after first scroll ── */}
        <AnimatePresence>
          {!hasSwiped && (
            <motion.div
              key="swipe-hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ delay: 1.0, duration: 0.5, ease: EASE }}
              className="md:hidden flex items-center justify-center gap-2 mt-3 pointer-events-none"
              aria-hidden="true"
            >
              <motion.div
                className="flex items-center"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: EASE }}
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400/70" />
                <ChevronRight className="w-3.5 h-3.5 -ml-2 text-cyan-400/35" />
              </motion.div>
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.18em] font-semibold">
                {t("swipeHint")}
              </span>
              <motion.div
                className="flex items-center"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: EASE }}
              >
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400/35" />
                <ChevronRight className="w-3.5 h-3.5 -ml-2 text-cyan-400/70" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center px-6"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium underline-offset-4 hover:underline transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {t("cta")}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
