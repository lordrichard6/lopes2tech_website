import {
    Monitor,
    Layout,
    Cpu,
    ShoppingCart,
    Database,
    Globe,
    Sparkles,
    FileText,
    Zap,
    Store,
    Code,
    X
} from "lucide-react";

export interface ServiceOffering {
    id: string;
    title: string;
    description?: string;
}

export interface ServiceSubcategory {
    id: string;
    title: string;
    icon: any;
    offerings: ServiceOffering[];
}

export interface ServiceCategory {
    id: string;
    title: string;
    icon: any;
    color: string;
    subcategories: ServiceSubcategory[];
}

export const servicesData: ServiceCategory[] = [
    {
        id: "websites",
        title: "Services.map.websites.title",
        icon: Monitor,
        color: "cyan",
        subcategories: [
            {
                id: "corporate",
                title: "Services.map.websites.corporate.title",
                icon: Globe,
                offerings: [
                    { id: "1page", title: "Services.map.websites.corporate.1page" },
                    { id: "5pages", title: "Services.map.websites.corporate.5pages" },
                    { id: "10pages", title: "Services.map.websites.corporate.10pages" },
                    { id: "multipage", title: "Services.map.websites.corporate.multipage" }
                ]
            },
            {
                id: "specialized",
                title: "Services.map.websites.specialized.title",
                icon: Sparkles,
                offerings: [
                    { id: "portfolio", title: "Services.map.websites.specialized.portfolio" },
                    { id: "agency", title: "Services.map.websites.specialized.agency" },
                    { id: "service", title: "Services.map.websites.specialized.service" }
                ]
            },
            {
                id: "advanced",
                title: "Services.map.websites.advanced.title",
                icon: Code,
                offerings: [
                    { id: "cms", title: "Services.map.websites.advanced.cms" },
                    { id: "multilang", title: "Services.map.websites.advanced.multilang" },
                    { id: "integrations", title: "Services.map.websites.advanced.integrations" }
                ]
            }
        ]
    },
    {
        id: "landing",
        title: "Services.map.landing.title",
        icon: Layout,
        color: "purple",
        subcategories: [
            {
                id: "conversion",
                title: "Services.map.landing.conversion.title",
                icon: Zap,
                offerings: [
                    { id: "single", title: "Services.map.landing.conversion.single" },
                    { id: "ab", title: "Services.map.landing.conversion.ab" },
                    { id: "product", title: "Services.map.landing.conversion.product" },
                    { id: "leadgen", title: "Services.map.landing.conversion.leadgen" }
                ]
            },
            {
                id: "campaign",
                title: "Services.map.landing.campaign.title",
                icon: FileText,
                offerings: [
                    { id: "event", title: "Services.map.landing.campaign.event" },
                    { id: "download", title: "Services.map.landing.campaign.download" },
                    { id: "webinar", title: "Services.map.landing.campaign.webinar" }
                ]
            }
        ]
    },
    {
        id: "automation",
        title: "Services.map.automation.title",
        icon: Cpu,
        color: "green",
        subcategories: [
            {
                id: "ai",
                title: "Services.map.automation.ai.title",
                icon: Sparkles,
                offerings: [
                    { id: "rag", title: "Services.map.automation.ai.rag" },
                    { id: "voice", title: "Services.map.automation.ai.voice" },
                    { id: "chatbot", title: "Services.map.automation.ai.chatbot" },
                    { id: "support", title: "Services.map.automation.ai.support" }
                ]
            },
            {
                id: "business",
                title: "Services.map.automation.business.title",
                icon: Zap,
                offerings: [
                    { id: "workflow", title: "Services.map.automation.business.workflow" },
                    { id: "email", title: "Services.map.automation.business.email" },
                    { id: "data", title: "Services.map.automation.business.data" },
                    { id: "document", title: "Services.map.automation.business.document" }
                ]
            }
        ]
    },
    {
        id: "ecommerce",
        title: "Services.map.ecommerce.title",
        icon: ShoppingCart,
        color: "orange",
        subcategories: [
            {
                id: "stores",
                title: "Services.map.ecommerce.stores.title",
                icon: Store,
                offerings: [
                    { id: "small", title: "Services.map.ecommerce.stores.small" },
                    { id: "medium", title: "Services.map.ecommerce.stores.medium" },
                    { id: "large", title: "Services.map.ecommerce.stores.large" },
                    { id: "custom", title: "Services.map.ecommerce.stores.custom" }
                ]
            },
            {
                id: "specialized",
                title: "Services.map.ecommerce.specialized.title",
                icon: Sparkles,
                offerings: [
                    { id: "subscription", title: "Services.map.ecommerce.specialized.subscription" },
                    { id: "marketplace", title: "Services.map.ecommerce.specialized.marketplace" },
                    { id: "headless", title: "Services.map.ecommerce.specialized.headless" },
                    { id: "digital", title: "Services.map.ecommerce.specialized.digital" }
                ]
            }
        ]
    },
    {
        id: "webapps",
        title: "Services.map.webapps.title",
        icon: Database,
        color: "blue",
        subcategories: [
            {
                id: "business",
                title: "Services.map.webapps.business.title",
                icon: Code,
                offerings: [
                    { id: "saas", title: "Services.map.webapps.business.saas" },
                    { id: "internal", title: "Services.map.webapps.business.internal" },
                    { id: "crm", title: "Services.map.webapps.business.crm" },
                    { id: "dashboard", title: "Services.map.webapps.business.dashboard" }
                ]
            },
            {
                id: "custom",
                title: "Services.map.webapps.custom.title",
                icon: Globe,
                offerings: [
                    { id: "pwa", title: "Services.map.webapps.custom.pwa" },
                    { id: "fullstack", title: "Services.map.webapps.custom.fullstack" },
                    { id: "api", title: "Services.map.webapps.custom.api" },
                    { id: "database", title: "Services.map.webapps.custom.database" }
                ]
            }
        ]
    }
];

export const colorMap: Record<string, { from: string; to: string; glow: string }> = {
    cyan: { from: "#0e7490", to: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" },
    purple: { from: "#7c3aed", to: "#a855f7", glow: "rgba(168, 85, 247, 0.4)" },
    green: { from: "#059669", to: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
    orange: { from: "#ea580c", to: "#f97316", glow: "rgba(249, 115, 22, 0.4)" },
    blue: { from: "#2563eb", to: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)" }
};
