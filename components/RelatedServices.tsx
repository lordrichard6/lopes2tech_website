"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { ArrowRight, Globe, Search, Bot, Workflow, ShoppingCart, AppWindow, Share2 } from "lucide-react";

type ServiceKey = "webDesign" | "seo" | "aiIntegration" | "businessAutomation" | "ecommerce" | "webApps" | "socialMedia";

const serviceConfig: Record<ServiceKey, { slug: string; icon: React.ElementType; color: string }> = {
    webDesign:          { slug: "web-design",             icon: Globe,         color: "text-cyan-400" },
    seo:                { slug: "seo-development",         icon: Search,        color: "text-green-400" },
    aiIntegration:      { slug: "ai-integration",          icon: Bot,           color: "text-blue-400" },
    businessAutomation: { slug: "business-automation",     icon: Workflow,      color: "text-orange-400" },
    ecommerce:          { slug: "ecommerce",               icon: ShoppingCart,  color: "text-pink-400" },
    webApps:            { slug: "web-apps",                icon: AppWindow,     color: "text-cyan-400" },
    socialMedia:        { slug: "social-media-marketing",  icon: Share2,        color: "text-purple-400" },
};

const relatedMap: Record<string, ServiceKey[]> = {
    "web-design":             ["seo", "ecommerce", "webApps"],
    "seo-development":        ["webDesign", "webApps", "businessAutomation"],
    "ai-integration":         ["businessAutomation", "webApps", "webDesign"],
    "business-automation":    ["aiIntegration", "webApps", "webDesign"],
    "web-apps":               ["webDesign", "seo", "businessAutomation"],
    "ecommerce":              ["webDesign", "seo", "socialMedia"],
    "social-media-marketing": ["webDesign", "seo", "ecommerce"],
};

interface RelatedServicesProps {
    currentSlug: string;
}

export default function RelatedServices({ currentSlug }: RelatedServicesProps) {
    const t = useTranslations("ServiceLinks");
    const related = relatedMap[currentSlug] ?? [];

    if (related.length === 0) return null;

    return (
        <section className="relative z-10 py-16 border-t border-white/5">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-2">
                        {t("subtitle")}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{t("heading")}</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {related.map((key, index) => {
                        const { slug, icon: Icon, color } = serviceConfig[key];
                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Link
                                    href={`/services/${slug}`}
                                    className="group flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-slate-900/50 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold mb-1">
                                            {t(`services.${key}.name`)}
                                        </p>
                                        <p className="text-slate-400 text-sm leading-relaxed">
                                            {t(`services.${key}.description`)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-cyan-400 text-sm font-medium mt-auto pt-1 group-hover:gap-2 transition-all duration-200">
                                        Learn more <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
