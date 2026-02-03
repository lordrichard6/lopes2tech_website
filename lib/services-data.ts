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
        title: "Professional Websites",
        icon: Monitor,
        color: "cyan",
        subcategories: [
            {
                id: "corporate",
                title: "Corporate Websites",
                icon: Globe,
                offerings: [
                    { id: "1page", title: "1-Page Website" },
                    { id: "5pages", title: "Up to 5 Pages" },
                    { id: "10pages", title: "10+ Pages" },
                    { id: "multipage", title: "Multi-Page Corporate Site" }
                ]
            },
            {
                id: "specialized",
                title: "Specialized Websites",
                icon: Sparkles,
                offerings: [
                    { id: "portfolio", title: "Portfolio Website" },
                    { id: "agency", title: "Agency Website" },
                    { id: "service", title: "Service Business Website" }
                ]
            },
            {
                id: "advanced",
                title: "Advanced Features",
                icon: Code,
                offerings: [
                    { id: "cms", title: "Website with CMS" },
                    { id: "multilang", title: "Multi-Language Site" },
                    { id: "integrations", title: "Custom Integrations" }
                ]
            }
        ]
    },
    {
        id: "landing",
        title: "Landing Pages",
        icon: Layout,
        color: "purple",
        subcategories: [
            {
                id: "conversion",
                title: "Conversion Pages",
                icon: Zap,
                offerings: [
                    { id: "single", title: "Single Landing Page" },
                    { id: "ab", title: "A/B Testing Variants" },
                    { id: "product", title: "Product Launch Page" },
                    { id: "leadgen", title: "Lead Generation Page" }
                ]
            },
            {
                id: "campaign",
                title: "Campaign Pages",
                icon: FileText,
                offerings: [
                    { id: "event", title: "Event Landing Page" },
                    { id: "download", title: "Download/Signup Page" },
                    { id: "webinar", title: "Webinar Registration" }
                ]
            }
        ]
    },
    {
        id: "automation",
        title: "Automations",
        icon: Cpu,
        color: "green",
        subcategories: [
            {
                id: "ai",
                title: "AI Assistants",
                icon: Sparkles,
                offerings: [
                    { id: "rag", title: "Knowledge Base (RAG)" },
                    { id: "voice", title: "Voice Agent" },
                    { id: "chatbot", title: "AI Chatbot" },
                    { id: "support", title: "Customer Support Bot" }
                ]
            },
            {
                id: "business",
                title: "Business Automation",
                icon: Zap,
                offerings: [
                    { id: "workflow", title: "Workflow Automation" },
                    { id: "email", title: "Email Automation" },
                    { id: "data", title: "Data Processing" },
                    { id: "document", title: "Document AI" }
                ]
            }
        ]
    },
    {
        id: "ecommerce",
        title: "E-Commerce",
        icon: ShoppingCart,
        color: "orange",
        subcategories: [
            {
                id: "stores",
                title: "Online Stores",
                icon: Store,
                offerings: [
                    { id: "small", title: "Small Store (up to 50 products)" },
                    { id: "medium", title: "Medium Store (50-500 products)" },
                    { id: "large", title: "Large Store (500+ products)" },
                    { id: "custom", title: "Custom E-commerce Platform" }
                ]
            },
            {
                id: "specialized",
                title: "Specialized Commerce",
                icon: Sparkles,
                offerings: [
                    { id: "subscription", title: "Subscription E-commerce" },
                    { id: "marketplace", title: "Multi-Vendor Marketplace" },
                    { id: "headless", title: "Headless Commerce" },
                    { id: "digital", title: "Digital Products Store" }
                ]
            }
        ]
    },
    {
        id: "webapps",
        title: "Web Apps",
        icon: Database,
        color: "blue",
        subcategories: [
            {
                id: "business",
                title: "Business Applications",
                icon: Code,
                offerings: [
                    { id: "saas", title: "SaaS Platform" },
                    { id: "internal", title: "Internal Tools" },
                    { id: "crm", title: "CRM System" },
                    { id: "dashboard", title: "Dashboard/Admin Panel" }
                ]
            },
            {
                id: "custom",
                title: "Custom Software",
                icon: Globe,
                offerings: [
                    { id: "pwa", title: "Progressive Web App (PWA)" },
                    { id: "fullstack", title: "Full-Stack Application" },
                    { id: "api", title: "API Development" },
                    { id: "database", title: "Database Design" }
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
