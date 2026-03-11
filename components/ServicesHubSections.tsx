"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Monitor, Layout, Cpu, ShoppingCart, Database, Search, Bot } from "lucide-react";

const services = [
    {
        number: "01",
        badge: "Web Development",
        title: "Professional Websites",
        description: [
            "Your website is your most powerful business asset — and first impressions are permanent. We design and develop custom, high-performance websites built from the ground up for Swiss businesses: fast, mobile-first, and engineered to convert visitors into clients.",
            "We don't use templates. Every project starts with your brand, your goals, and your audience. The result is a website that feels uniquely yours — one that builds trust the moment someone lands on it, and keeps them coming back.",
        ],
        bullets: [
            "100% custom design — no templates, ever",
            "Mobile-first & optimized for Core Web Vitals",
            "SEO-ready architecture from day one",
            "Multilingual support (EN / DE / FR / IT)",
        ],
        image: "/assets/services/websites.webp",
        href: "/services/web-design",
        icon: Monitor,
        gradient: "from-cyan-400 to-cyan-600",
        glow: "rgba(34,211,238,0.15)",
    },
    {
        number: "02",
        badge: "Social Media & Ads",
        title: "Digital Marketing",
        description: [
            "Being online isn't enough — you need to be visible where your clients are. We build and execute data-driven digital marketing strategies that grow your audience, amplify your brand, and drive qualified leads directly to your business.",
            "From targeted Meta and Instagram ad campaigns to organic content strategy and community management, every action we take is measured, refined, and aligned with your growth objectives. No vanity metrics — only results that matter.",
        ],
        bullets: [
            "Meta, Instagram & Google ad campaigns",
            "Content strategy, creation & scheduling",
            "Analytics, reporting & continuous optimization",
            "Community management & brand voice",
        ],
        image: "/assets/services/marketing.webp",
        href: "/services/social-media-marketing",
        icon: Layout,
        gradient: "from-purple-400 to-pink-500",
        glow: "rgba(168,85,247,0.15)",
    },
    {
        number: "03",
        badge: "Search Engine Optimization",
        title: "SEO Development",
        description: [
            "Ranking on Google in Switzerland takes more than keywords — it takes a technically sound foundation that search engines understand and trust. We combine deep technical SEO expertise with content strategy to build sustainable, long-term organic visibility.",
            "From site architecture and Core Web Vitals to structured data markup and multilingual hreflang implementation, we cover every signal that determines where your business appears in search results. The goal isn't traffic — it's the right traffic.",
        ],
        bullets: [
            "Technical SEO audits & Core Web Vitals",
            "Multilingual SEO (EN / DE / FR)",
            "Schema.org structured data implementation",
            "On-page optimization & keyword strategy",
        ],
        image: "/assets/services/seo.webp",
        href: "/services/seo-development",
        icon: Search,
        gradient: "from-emerald-400 to-cyan-500",
        glow: "rgba(52,211,153,0.15)",
    },
    {
        number: "04",
        badge: "Workflow Automation",
        title: "Business Automation",
        description: [
            "Your team's time is too valuable to spend on manual, repetitive tasks. We analyse your operations, identify the bottlenecks, and replace them with intelligent automations that run 24/7 — accurately, reliably, and without supervision.",
            "From CRM workflows and automated follow-up sequences to invoice processing and multi-system integrations, we build custom pipelines using leading automation platforms. The result: your business runs smoother, your team focuses on what matters, and nothing falls through the cracks.",
        ],
        bullets: [
            "CRM & email workflow automation",
            "AI-powered lead routing & follow-ups",
            "Invoice, document & data processing",
            "Custom n8n, Zapier & Make pipelines",
        ],
        image: "/assets/services/ai.webp",
        href: "/services/business-automation",
        icon: Cpu,
        gradient: "from-orange-400 to-red-500",
        glow: "rgba(251,146,60,0.15)",
    },
    {
        number: "05",
        badge: "Online Retail",
        title: "E-Commerce",
        description: [
            "Selling online in Switzerland means earning trust at every step — from the first product page to the checkout confirmation. We build e-commerce solutions tailored to the Swiss market: fast, secure, and designed to reduce friction and maximise conversions.",
            "Whether you're launching your first shop or scaling an existing operation, we handle the full stack. Custom design, payment integration (including TWINT), product management, and ongoing support — everything you need to sell with confidence.",
        ],
        bullets: [
            "Custom Shopify & WooCommerce stores",
            "Swiss payment methods: TWINT, card & invoice",
            "Multi-language & multi-currency ready",
            "Product management & inventory automation",
        ],
        image: "/assets/services/ecommerce.webp",
        href: "/services/ecommerce",
        icon: ShoppingCart,
        gradient: "from-cyan-400 to-purple-500",
        glow: "rgba(34,211,238,0.12)",
    },
    {
        number: "06",
        badge: "Custom Software",
        title: "Web Apps",
        description: [
            "When off-the-shelf software doesn't fit your workflow, we build it from scratch. Booking platforms, client portals, internal dashboards, SaaS tools — we engineer custom web applications designed precisely around how your business operates.",
            "Every application we build is cloud-deployed, secure by design, and built to scale as you grow. Whether you need an MVP to validate an idea or a production-grade system to replace a broken internal tool, we deliver software that works reliably from day one.",
        ],
        bullets: [
            "Booking & reservation platforms",
            "Client portals & internal dashboards",
            "SaaS MVPs & custom business tools",
            "API integrations & third-party data pipelines",
        ],
        image: "/assets/services/custom_web_apps.webp",
        href: "/services/web-apps",
        icon: Database,
        gradient: "from-blue-400 to-cyan-500",
        glow: "rgba(96,165,250,0.15)",
    },
    {
        number: "07",
        badge: "Artificial Intelligence",
        title: "AI Integration",
        description: [
            "AI is no longer a competitive advantage — it's quickly becoming a baseline requirement. We integrate intelligent AI solutions directly into your business: chatbots that handle enquiries around the clock, tools that extract insights from your data, and automations that continuously learn and improve.",
            "From adding a smart assistant to your website to building fully custom AI workflows and GPT-powered tools, we make AI practical, measurable, and immediately useful — not a science experiment, but a working part of your operation that delivers ROI from day one.",
        ],
        bullets: [
            "AI chatbots & virtual assistants",
            "Document & image processing with AI",
            "Custom GPT & Claude integrations",
            "AI-powered analytics & automated reporting",
        ],
        image: "/assets/services/ai.webp",
        href: "/services/ai-integration",
        icon: Bot,
        gradient: "from-violet-400 to-purple-600",
        glow: "rgba(167,139,250,0.15)",
    },
];

const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "3", label: "Countries Served" },
    { value: "5.0★", label: "Average Rating" },
    { value: "48h", label: "Avg. Response Time" },
];

export default function ServicesHubSections() {
    return (
        <div className="relative z-10">

            {/* Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto px-6 mb-10"
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                        >
                            <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 mb-1">
                                {stat.value}
                            </p>
                            <p className="text-slate-400 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Service Sections */}
            <div className="max-w-7xl mx-auto px-6">
                {services.map((service, index) => {
                    const isEven = index % 2 === 0;
                    const Icon = service.icon;

                    return (
                        <motion.div
                            key={service.number}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-20 md:py-28 border-b border-white/5 last:border-0"
                        >
                            {/* Ghost Number */}
                            <span
                                className={`absolute ${isEven ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[clamp(120px,18vw,220px)] font-extrabold text-white/[0.025] select-none pointer-events-none leading-none`}
                            >
                                {service.number}
                            </span>

                            {/* Image */}
                            <motion.div
                                className={`relative ${isEven ? "md:order-1" : "md:order-2"}`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div
                                    className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
                                    style={{ boxShadow: `0 25px 80px ${service.glow}` }}
                                >
                                    <Image
                                        src={service.image}
                                        alt={`${service.title} - Lopes2Tech Switzerland`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/50 via-transparent to-transparent" />

                                    {/* Icon badge */}
                                    <div className={`absolute bottom-6 left-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-xl`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Text Content */}
                            <div className={`relative ${isEven ? "md:order-2" : "md:order-1"}`}>

                                {/* Badge */}
                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${service.gradient} text-white shadow-lg`}>
                                    {service.badge}
                                </div>

                                <h2 className="text-3xl md:text-[2.5rem] font-extrabold text-white mb-6 leading-tight">
                                    {service.title}
                                </h2>

                                <div className="space-y-4 mb-8">
                                    {service.description.map((para, i) => (
                                        <p key={i} className="text-slate-400 leading-relaxed text-[0.95rem]">
                                            {para}
                                        </p>
                                    ))}
                                </div>

                                {/* Bullets */}
                                <ul className="space-y-3 mb-10">
                                    {service.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-center gap-3 text-slate-300 text-sm">
                                            <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow`}>
                                                <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                            </span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <Link
                                    href={service.href}
                                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/5 text-white font-semibold hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300"
                                >
                                    Explore {service.title}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
