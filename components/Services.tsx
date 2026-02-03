"use client";

import { motion } from "framer-motion";
import { Monitor, Layout, Cpu, Database, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const services = [
  {
    key: "web",
    title: "Professional Websites",
    description: "High-performance websites that represent your brand perfectly.",
    image: "/assets/services/service_webdev.webp",
    icon: Monitor,
    href: "/services/websites"
  },
  {
    key: "marketing",
    title: "Landing Pages",
    description: "Conversion-focused pages designed to turn visitors into leads.",
    image: "/assets/services/service_digital_marketing.webp",
    icon: Layout,
    href: "/services/landing-pages"
  },
  {
    key: "automation",
    title: "Automations",
    description: "Streamline your operations and save hours of manual work.",
    image: "/assets/services/service_ai_solutions.webp",
    icon: Cpu,
    href: "/services/automations"
  },
  {
    key: "ecommerce",
    title: "E-Commerce",
    description: "Custom online stores that make buying easy and secure.",
    image: "/assets/services/service_e_commerce.webp",
    icon: ShoppingCart,
    href: "/services/ecommerce"
  },
  {
    key: "apps",
    title: "Web Apps",
    description: "Custom software solutions tailored to your unique business needs.",
    image: "/assets/services/service_mobile_app.webp",
    icon: Database,
    href: "/services/web-apps"
  }
];

export default function Services() {
  return (
    <section id="services" className="relative py-12 bg-[#f3f0e7] overflow-hidden min-h-screen flex flex-col justify-start pt-24 md:pt-32">
      <div className="max-w-[1200px] mx-auto px-6 w-full">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0f172a]">
            Our Expertise
          </h2>
          <p className="text-lg text-[#64748b]">
            From web development to intelligent automation, we provide end-to-end digital solutions.
          </p>
        </div>

        {/* Deck View Grid */}
        <div className="flex justify-center items-center md:perspective-[2000px] py-4 px-4 overflow-visible flex-col md:flex-row gap-6 md:gap-0 h-auto md:h-[650px] items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
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
                  rotateY: -15, // Default to desktop tilt, mobile override handles via responsive variants or CSS if needed, but for now fixed to avoid hydration mismatch
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
                "md:ml-[-120px] md:origin-bottom md:first:ml-0"
              )}
              style={{
                zIndex: 50 - index, // Default stacking order
              }}
            >
              {/* Background Image - Optimized */}
              <Image
                src={service.image}
                alt={`${service.title} - ${service.description}`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover object-center"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 to-[#0f172a]/40 z-10 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-20 h-full p-6 md:p-8 flex flex-col justify-end items-start text-left">

                {/* Badge */}
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-gradient-to-br from-[#0e7490] via-[#0891b2] to-[#06b6d4] text-white text-[0.7rem] font-bold uppercase tracking-wider shadow-lg opacity-100 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Get Started
                </div>

                {/* Icon */}
                <div className="w-[60px] h-[60px] mb-4 bg-[#0e7490]/10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0e7490]/20">
                  <service.icon className="w-8 h-8 text-[#0e7490] group-hover:text-[#06b6d4] transition-colors duration-300" />
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                  {service.title}
                </h3>

                <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed opacity-90">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-br from-[#0e7490] to-[#06b6d4] text-white font-semibold text-lg shadow-[0_4px_15px_rgba(14,116,144,0.3)] hover:shadow-[0_8px_25px_rgba(14,116,144,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            See all services
          </Link>
        </div>

      </div>
    </section >
  );
}
