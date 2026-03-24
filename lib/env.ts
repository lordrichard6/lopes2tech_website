import { z } from "zod";

const envSchema = z.object({
    // Resend email service — optional so missing keys never break build or runtime
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().email().optional(),
    CONTACT_EMAIL: z.string().email().optional(),

    // Stripe — webhook secrets (optional; only required at runtime for webhook handler)
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),       // live
    STRIPE_WEBHOOK_SECRET_TEST: z.string().optional(),  // test / sandbox

    // Ebook download links (Google Drive) — optional; missing = email not sent
    GDRIVE_FREUD:        z.string().optional(),
    GDRIVE_TESLA:        z.string().optional(),
    GDRIVE_SWITZERLAND:  z.string().optional(),
    GDRIVE_PORTUGAL:     z.string().optional(),
    GDRIVE_PRODUCTIVITY: z.string().optional(),

    // Analytics (optional)
    NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),

    // Platform API (optional)
    NEXT_PUBLIC_PLATFORM_URL: z.string().url().optional(),
    NEXT_PUBLIC_PLATFORM_API_URL: z.string().url().optional(),
    NEXT_PUBLIC_PLATFORM_API_SECRET: z.string().optional(),

    // Node environment
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
    // Never throw — only warn so we never break a build or production deployment
    const formatted = parseResult.error.issues
        .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
        .join("\n");
    console.warn(`⚠️  Environment variable issues:\n${formatted}`);
}

// Warn in development if critical vars are missing
if (process.env.NODE_ENV === "development") {
    if (!process.env.RESEND_API_KEY) {
        console.warn("⚠️  RESEND_API_KEY is not set — contact form emails will not be sent.");
    }
    if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        console.warn("⚠️  NEXT_PUBLIC_GA_MEASUREMENT_ID is not set — Google Analytics will not track.");
    }
}

export const env = parseResult.success ? parseResult.data : (process.env as unknown as z.infer<typeof envSchema>);
