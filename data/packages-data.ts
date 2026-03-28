/**
 * Centralized package pricing configurations for all service pages.
 * Single source of truth for prices — update here, reflects everywhere.
 */

export type PaymentPlan = "onetime" | "3months" | "6months" | "12months";

// ─── Payment Plans ────────────────────────────────────────────────────────────
// Shared across all service pages that offer installment payments

export const paymentPlanConfig = [
    { id: "onetime"  as PaymentPlan, multiplier: 1,    description: undefined },
    { id: "3months"  as PaymentPlan, multiplier: 1.05, description: "+5%"  },
    { id: "6months"  as PaymentPlan, multiplier: 1.10, description: "+10%" },
    { id: "12months" as PaymentPlan, multiplier: 1.15, description: "+15%" },
];

// ─── Web Design ───────────────────────────────────────────────────────────────

export const webDesignPackages = [
    { key: "starter",      price: 690,  popular: false, featureCount: 5, pricePrefix: "from " },
    { key: "professional", price: 1390, popular: true,  featureCount: 5, pricePrefix: "" },
    { key: "businessPro",  price: 1990, popular: false, featureCount: 5, pricePrefix: "from " },
];

// ─── SEO Development ──────────────────────────────────────────────────────────

export const seoDevelopmentPackages = [
    { key: "audit",   price: 450,  period: null,  prefix: null, popular: false },
    { key: "starter", price: 750,  period: "/mo", prefix: null, popular: false },
    { key: "growth",  price: 1200, period: "/mo", prefix: null, popular: true  },
];

// ─── AI Integration ───────────────────────────────────────────────────────────

export const aiIntegrationPackages = [
    { key: "chatbot",  price: 1200, period: null, prefix: null,   popular: false },
    { key: "workflow", price: 2000, period: null, prefix: null,   popular: true  },
    { key: "custom",   price: 3500, period: null, prefix: "From", popular: false },
];

// ─── Business Automation ──────────────────────────────────────────────────────

export const businessAutomationPackages = [
    { key: "starter",    price: 800,  period: null, prefix: null,   popular: false },
    { key: "growth",     price: 1500, period: null, prefix: null,   popular: true  },
    { key: "enterprise", price: 3000, period: null, prefix: "From", popular: false },
];

// ─── E-Commerce ───────────────────────────────────────────────────────────────

export const ecommercePackages = [
    { key: "starter",    price: 1500, period: null, prefix: null,   popular: false },
    { key: "growth",     price: 3000, period: null, prefix: null,   popular: true  },
    { key: "enterprise", price: 6000, period: null, prefix: "From", popular: false },
];

// ─── Web Apps ─────────────────────────────────────────────────────────────────

export const webAppsPackages = [
    { key: "mvp",        price: 3500,  period: null, prefix: null,   popular: false },
    { key: "standard",   price: 7500,  period: null, prefix: null,   popular: true  },
    { key: "enterprise", price: 15000, period: null, prefix: "From", popular: false },
];

// ─── Social Media / Digital Marketing ────────────────────────────────────────

export const socialMediaContentPackages = [
    { key: "digitalStarter", price: 490, priceEUR: 343, popular: false },
    { key: "digitalGrowth",  price: 690, priceEUR: 483, popular: true  },
    { key: "digitalPro",     price: 990, priceEUR: 693, popular: false },
];

export const socialMediaAdPackages = [
    { key: "metaAds",   price: 349, priceEUR: 249, popular: false },
    { key: "googleAds", price: 399, priceEUR: 279, popular: true  },
    { key: "bundle",    price: 680, priceEUR: 476, popular: false },
];

export const socialMediaAddOns = [
    { key: "extraPlatform", price: 99,  unit: "/mo"     },
    { key: "extraReels",    price: 79,  unit: "each"    },
    { key: "landingPage",   price: 299, unit: "one-off" },
];
