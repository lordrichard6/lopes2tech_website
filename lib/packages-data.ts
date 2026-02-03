import { Monitor, Layout, Cpu, Globe, Sparkles, Palette, FileText, Zap, Store, Code, MessageSquare, Bot, Database, Smartphone, Languages, BarChart3, Files, Layers } from "lucide-react";

// ===========================================
// PACKAGES DATA
// ===========================================
export interface Package {
    key: string;
    name: string;
    price: number;
    priceDisplay: string;
    description: string;
    target: string;
    features: string[];
    isPopular?: boolean;
    image?: string;
}

export const packagesData: Package[] = [
    {
        key: "starter",
        name: "Starter",
        price: 850,
        priceDisplay: "CHF 850",
        description: "Perfect foundation, whether you need a single landing page or a full 5-page website to establish your business.",
        target: "New business with existing brand",
        features: [
            "Single custom landing page",
            "Mobile-responsive",
            "Basic SEO setup",
            "Contact form",
            "1 round of revisions"
        ]
    },
    {
        key: "starterPlus",
        name: "Starter Plus",
        price: 1400,
        priceDisplay: "CHF 1,400",
        description: "The complete launch package: a professional website plus a brand identity design (logo, color palette, typography).",
        target: "New business needing branding",
        features: [
            "Professional 5-page website",
            "Full brand identity (Logo, Colors, Fonts)",
            "Mobile-responsive & fast",
            "Basic SEO setup",
            "Social media templates"
        ],
        isPopular: true
    },
    {
        key: "businessPro",
        name: "Business Pro",
        price: 2000,
        priceDisplay: "CHF 2,000",
        description: "For growing businesses needing advance features: CMS, blog, booking systems, or multi-language support.",
        target: "Established SMEs",
        features: [
            "Advanced CMS (Content Management System)",
            "Blog or Portfolio section",
            "Multi-language support ready",
            "Google Analytics integration",
            "Priority support"
        ]
    },
    {
        key: "landingPage",
        name: "Landing Page",
        price: 600,
        priceDisplay: "CHF 600",
        description: "High-conversion single page designed for marketing campaigns, product launches, or event registrations.",
        target: "Campaigns / launches",
        features: [
            "High-conversion structure",
            "A/B testing ready",
            "Fast loading speed",
            "Lead capture form integration",
            "Analytics setup"
        ]
    },
    {
        key: "logoOnly",
        name: "Logo Only",
        price: 350,
        priceDisplay: "CHF 350",
        description: "Custom logo design to give your business a professional face. Includes all necessary file formats.",
        target: "Standalone branding",
        features: [
            "Unique logo concepts",
            "Vector files (AI, EPS, SVG, PDF)",
            "Full ownership rights",
            "Color palette definition",
            "Usage guidelines"
        ]
    },
    {
        key: "fullBrandKit",
        name: "Full Brand Kit",
        price: 650,
        priceDisplay: "CHF 650",
        description: "Comprehensive branding: logo, business cards, letterhead, and social media templates for a cohesive look.",
        target: "Complete identity package",
        features: [
            "Logo design & variations",
            "Business card design",
            "Letterhead & email signature",
            "Social media profile kit",
            "Brand style guide"
        ]
    }
];

// ===========================================
// CUSTOM PACKAGE BUILDER DATA
// ===========================================
export interface AddOn {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: any;
}

export interface BuilderService {
    id: string;
    name: string;
    basePrice: number;
    description: string;
    icon: any;
    color: string;
    hasMonthlyNote?: boolean;
    requiresSupport?: boolean;
    addOns: AddOn[];
}

export const builderServicesData: BuilderService[] = [
    {
        id: "website",
        name: "Professional Website",
        basePrice: 850,
        description: "Custom-built, high-performance website",
        icon: Monitor,
        color: "cyan",
        addOns: [
            { id: "10pages", name: "10+ Pages", description: "Large website with many sections", price: 700, icon: Layers },
            { id: "cms", name: "CMS + Blog", description: "Manage content & publish articles", price: 500, icon: Database },
            { id: "multilang", name: "Multi-Language", description: "Reach global audiences", price: 500, icon: Languages },
            { id: "booking", name: "Custom Booking System", description: "Fully custom, not a simple embed", price: 650, icon: BarChart3 },
            { id: "chatbot", name: "AI Chatbot", description: "24/7 automated support", price: 600, icon: MessageSquare },
            { id: "ecommerce", name: "E-Commerce (Basic)", description: "Sell products online", price: 800, icon: Store }
        ]
    },
    {
        id: "landing",
        name: "Landing Page",
        basePrice: 600,
        description: "High-conversion marketing page",
        icon: Layout,
        color: "purple",
        addOns: [
            { id: "newsletter", name: "Newsletter Integration", description: "Connect to Mailchimp, ConvertKit, etc.", price: 150, icon: FileText },
            { id: "multilang", name: "Multi-Language", description: "Reach global audiences", price: 300, icon: Languages },
            { id: "stripe", name: "Stripe Payment Button", description: "Accept payments directly", price: 200, icon: Store }
        ]
    },
    {
        id: "automation",
        name: "AI Automation",
        basePrice: 800,
        description: "Consultation, system design & integration setup",
        icon: Cpu,
        color: "green",
        hasMonthlyNote: true,
        addOns: [
            { id: "chatbot", name: "AI Chatbot", description: "24/7 customer support", price: 600, icon: MessageSquare },
            { id: "rag", name: "Knowledge Base (RAG)", description: "Train AI on your docs", price: 1000, icon: Database },
            { id: "voice", name: "Voice Agent", description: "Phone call automation", price: 1500, icon: Bot },
            { id: "email", name: "Email Automation", description: "Smart email workflows", price: 400, icon: Zap }
        ]
    },
    {
        id: "branding",
        name: "Brand Identity",
        basePrice: 250,
        description: "Logo & visual identity design",
        icon: Palette,
        color: "orange",
        addOns: [
            { id: "brandkit", name: "Full Brand Kit", description: "Complete identity package", price: 200, icon: Sparkles },
            { id: "social", name: "Social Media Templates", description: "5 post + 3 story templates", price: 200, icon: Globe },
            { id: "print", name: "Print Materials", description: "Business cards, letterheads", price: 250, icon: FileText }
        ]
    },
    {
        id: "webapp",
        name: "Web Application",
        basePrice: 3000,
        description: "Responsive app + basic auth + deployment",
        icon: Code,
        color: "blue",
        requiresSupport: true,
        addOns: [
            { id: "advancedauth", name: "Advanced Auth", description: "Roles, permissions, OAuth", price: 400, icon: Database },
            { id: "api", name: "API Development", description: "Custom API endpoints", price: 800, icon: Zap },
            { id: "dashboard", name: "Admin Dashboard", description: "Manage data, users, settings", price: 1000, icon: BarChart3 },
            { id: "ecommerce", name: "E-Commerce", description: "Shopping cart, checkout, payments", price: 1200, icon: Store }
        ]
    }
];

export const builderColorMap: Record<string, { from: string; to: string; glow: string; bg: string }> = {
    cyan: { from: "#0e7490", to: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)", bg: "rgba(6, 182, 212, 0.1)" },
    purple: { from: "#7c3aed", to: "#a855f7", glow: "rgba(168, 85, 247, 0.4)", bg: "rgba(168, 85, 247, 0.1)" },
    green: { from: "#059669", to: "#10b981", glow: "rgba(16, 185, 129, 0.4)", bg: "rgba(16, 185, 129, 0.1)" },
    orange: { from: "#ea580c", to: "#f97316", glow: "rgba(249, 115, 22, 0.4)", bg: "rgba(249, 115, 22, 0.1)" },
    blue: { from: "#2563eb", to: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)", bg: "rgba(59, 130, 246, 0.1)" }
};
