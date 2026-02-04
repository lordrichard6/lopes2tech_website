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
        name: "Packages.starter.name",
        price: 850,
        priceDisplay: "Packages.starter.priceDisplay",
        description: "Packages.starter.description",
        target: "Packages.starter.target",
        features: [
            "Packages.starter.features.0",
            "Packages.starter.features.1",
            "Packages.starter.features.2",
            "Packages.starter.features.3",
            "Packages.starter.features.4"
        ]
    },
    {
        key: "starterPlus",
        name: "Packages.starterPlus.name",
        price: 1400,
        priceDisplay: "Packages.starterPlus.priceDisplay",
        description: "Packages.starterPlus.description",
        target: "Packages.starterPlus.target",
        features: [
            "Packages.starterPlus.features.0",
            "Packages.starterPlus.features.1",
            "Packages.starterPlus.features.2",
            "Packages.starterPlus.features.3",
            "Packages.starterPlus.features.4"
        ],
        isPopular: true
    },
    {
        key: "businessPro",
        name: "Packages.businessPro.name",
        price: 2000,
        priceDisplay: "Packages.businessPro.priceDisplay",
        description: "Packages.businessPro.description",
        target: "Packages.businessPro.target",
        features: [
            "Packages.businessPro.features.0",
            "Packages.businessPro.features.1",
            "Packages.businessPro.features.2",
            "Packages.businessPro.features.3",
            "Packages.businessPro.features.4"
        ]
    },
    {
        key: "landingPage",
        name: "Packages.landingPage.name",
        price: 600,
        priceDisplay: "Packages.landingPage.priceDisplay",
        description: "Packages.landingPage.description",
        target: "Packages.landingPage.target",
        features: [
            "Packages.landingPage.features.0",
            "Packages.landingPage.features.1",
            "Packages.landingPage.features.2",
            "Packages.landingPage.features.3",
            "Packages.landingPage.features.4"
        ]
    },
    {
        key: "logoOnly",
        name: "Packages.logoOnly.name",
        price: 350,
        priceDisplay: "Packages.logoOnly.priceDisplay",
        description: "Packages.logoOnly.description",
        target: "Packages.logoOnly.target",
        features: [
            "Packages.logoOnly.features.0",
            "Packages.logoOnly.features.1",
            "Packages.logoOnly.features.2",
            "Packages.logoOnly.features.3",
            "Packages.logoOnly.features.4"
        ]
    },
    {
        key: "fullBrandKit",
        name: "Packages.fullBrandKit.name",
        price: 650,
        priceDisplay: "Packages.fullBrandKit.priceDisplay",
        description: "Packages.fullBrandKit.description",
        target: "Packages.fullBrandKit.target",
        features: [
            "Packages.fullBrandKit.features.0",
            "Packages.fullBrandKit.features.1",
            "Packages.fullBrandKit.features.2",
            "Packages.fullBrandKit.features.3",
            "Packages.fullBrandKit.features.4"
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
        name: "BuilderServices.website.name",
        basePrice: 850,
        description: "BuilderServices.website.description",
        icon: Monitor,
        color: "cyan",
        addOns: [
            { id: "10pages", name: "BuilderServices.website.addOns.10pages.name", description: "BuilderServices.website.addOns.10pages.description", price: 700, icon: Layers },
            { id: "cms", name: "BuilderServices.website.addOns.cms.name", description: "BuilderServices.website.addOns.cms.description", price: 500, icon: Database },
            { id: "multilang", name: "BuilderServices.website.addOns.multilang.name", description: "BuilderServices.website.addOns.multilang.description", price: 500, icon: Languages },
            { id: "booking", name: "BuilderServices.website.addOns.booking.name", description: "BuilderServices.website.addOns.booking.description", price: 650, icon: BarChart3 },
            { id: "chatbot", name: "BuilderServices.website.addOns.chatbot.name", description: "BuilderServices.website.addOns.chatbot.description", price: 600, icon: MessageSquare },
            { id: "ecommerce", name: "BuilderServices.website.addOns.ecommerce.name", description: "BuilderServices.website.addOns.ecommerce.description", price: 800, icon: Store }
        ]
    },
    {
        id: "landing",
        name: "BuilderServices.landing.name",
        basePrice: 600,
        description: "BuilderServices.landing.description",
        icon: Layout,
        color: "purple",
        addOns: [
            { id: "newsletter", name: "BuilderServices.landing.addOns.newsletter.name", description: "BuilderServices.landing.addOns.newsletter.description", price: 150, icon: FileText },
            { id: "multilang", name: "BuilderServices.landing.addOns.multilang.name", description: "BuilderServices.landing.addOns.multilang.description", price: 300, icon: Languages },
            { id: "stripe", name: "BuilderServices.landing.addOns.stripe.name", description: "BuilderServices.landing.addOns.stripe.description", price: 200, icon: Store }
        ]
    },
    {
        id: "automation",
        name: "BuilderServices.automation.name",
        basePrice: 800,
        description: "BuilderServices.automation.description",
        icon: Cpu,
        color: "green",
        hasMonthlyNote: true,
        addOns: [
            { id: "chatbot", name: "BuilderServices.automation.addOns.chatbot.name", description: "BuilderServices.automation.addOns.chatbot.description", price: 600, icon: MessageSquare },
            { id: "rag", name: "BuilderServices.automation.addOns.rag.name", description: "BuilderServices.automation.addOns.rag.description", price: 1000, icon: Database },
            { id: "voice", name: "BuilderServices.automation.addOns.voice.name", description: "BuilderServices.automation.addOns.voice.description", price: 1500, icon: Bot },
            { id: "email", name: "BuilderServices.automation.addOns.email.name", description: "BuilderServices.automation.addOns.email.description", price: 400, icon: Zap }
        ]
    },
    {
        id: "branding",
        name: "BuilderServices.branding.name",
        basePrice: 250,
        description: "BuilderServices.branding.description",
        icon: Palette,
        color: "orange",
        addOns: [
            { id: "brandkit", name: "BuilderServices.branding.addOns.brandkit.name", description: "BuilderServices.branding.addOns.brandkit.description", price: 200, icon: Sparkles },
            { id: "social", name: "BuilderServices.branding.addOns.social.name", description: "BuilderServices.branding.addOns.social.description", price: 200, icon: Globe },
            { id: "print", name: "BuilderServices.branding.addOns.print.name", description: "BuilderServices.branding.addOns.print.description", price: 250, icon: FileText }
        ]
    },
    {
        id: "webapp",
        name: "BuilderServices.webapp.name",
        basePrice: 3000,
        description: "BuilderServices.webapp.description",
        icon: Code,
        color: "blue",
        requiresSupport: true,
        addOns: [
            { id: "advancedauth", name: "BuilderServices.webapp.addOns.advancedauth.name", description: "BuilderServices.webapp.addOns.advancedauth.description", price: 400, icon: Database },
            { id: "api", name: "BuilderServices.webapp.addOns.api.name", description: "BuilderServices.webapp.addOns.api.description", price: 800, icon: Zap },
            { id: "dashboard", name: "BuilderServices.webapp.addOns.dashboard.name", description: "BuilderServices.webapp.addOns.dashboard.description", price: 1000, icon: BarChart3 },
            { id: "ecommerce", name: "BuilderServices.webapp.addOns.ecommerce.name", description: "BuilderServices.webapp.addOns.ecommerce.description", price: 1200, icon: Store }
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
