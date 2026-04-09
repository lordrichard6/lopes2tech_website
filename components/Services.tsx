"use client";

import { motion } from "framer-motion";
import { Monitor, Layout, Cpu, Database, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import Image from "next/image";
import clsx from "clsx";

const services = [
  { key: "web",        image: "/assets/services/service_webdev.webp",           icon: Monitor,     href: "/services/web-design",            dataId: "websites"   },
  { key: "marketing",  image: "/assets/services/service_digital_marketing.webp", icon: Layout,      href: "/services/social-media-marketing", dataId: "landing"    },
  { key: "automation", image: "/assets/services/service_ai_solutions.webp",      icon: Cpu,         href: "/services/business-automation",    dataId: "automation" },
  { key: "ecommerce",  image: "/assets/services/service_e_commerce.webp",        icon: ShoppingCart, href: "/services/ecommerce",             dataId: "ecommerce"  },
  { key: "apps",       image: "/assets/services/service_mobile_app.webp",        icon: Database,    href: "/services/web-apps"                                   },
];

import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations('ServicesSection');

  return (
    <section id="services" className="relative py-16 bg-[#080d1a] min-h-screen flex flex-col justify-start pt-28 md:pt-36">

      {/* Diagonal lines pattern — fades in/out at edges */}
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
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[300px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[300px] rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 text-slate-400 font-semibold text-sm mb-5 border border-white/10">
            {t('title')}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="text-white">Our </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Expertise</span>
          </h2>
          <p className="text-lg text-slate-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Deck View Grid */}
        <div className="flex justify-center items-center md:perspective-[2000px] py-4 px-4 overflow-visible flex-col md:flex-row gap-6 md:gap-0 h-auto md:h-[650px] items-center">
          {services.map((service, index) => (
            <Link key={service.key} href={service.href} className="contents">
            <motion.div
              layout
              initial="initial"
              whileInView="rest"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                initial: {
                  opacity: 0,
                  y: 30,
                  rotateY: 0,
                  scale: 0.95,
                  z: 0
                },
                rest: {
                  opacity: 1,
                  y: 0,
                  rotateY: -15, // Default to desktop tilt
                  scale: 1,
                  z: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1
                  }
                },
                hover: {
                  rotateY: 0,
                  y: -20, // Less movement
                  scale: 1.05,
                  z: 50,
                  zIndex: 100,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}
              className={clsx(
                "group relative w-full md:w-[320px] h-[250px] md:h-[480px] rounded-[24px] shrink-0 border border-white/10 shadow-lg md:shadow-2xl overflow-hidden cursor-pointer",
                // Stacking effect for desktop only
                index === 0 ? "md:origin-bottom" : "md:ml-[-120px] md:origin-bottom"
              )}
              style={{
                zIndex: 50 - index, // Default stacking order
              }}
            >
              {/* Background Image - Optimized */}
              <Image
                src={service.image}
                alt={`${t(`items.${service.key}.title`)} - ${t(`items.${service.key}.description`)}`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 to-[#0f172a]/40 z-10 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-20 h-full p-6 md:p-8 flex flex-col justify-end items-start text-left">

                {/* Badge */}
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#06b6d4] text-white text-[0.7rem] font-bold uppercase tracking-wider shadow-lg opacity-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {t('getStarted')}
                </div>

                {/* Icon */}
                <div className="w-[60px] h-[60px] mb-4 bg-[#0e7490]/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0e7490]/20">
                  <service.icon className="w-8 h-8 text-[#0e7490] group-hover:text-[#06b6d4] transition-colors duration-300" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {t(`items.${service.key}.title`)}
                </h3>

                <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed opacity-90">
                  {t(`items.${service.key}.description`)}
                </p>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-br from-[#0e7490] to-[#06b6d4] text-white font-semibold shadow-[0_4px_20px_rgba(14,116,144,0.3)] hover:shadow-[0_8px_32px_rgba(14,116,144,0.45)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden relative"
          >
            <span className="relative z-10">{t('cta')}</span>
            {/* Button-in-Button trailing icon */}
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:scale-110 relative z-10">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:hidden" />
          </Link>
        </div>

      </div>
    </section >
  );
}
