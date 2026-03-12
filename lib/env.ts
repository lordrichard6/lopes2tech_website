import { z } from "zod";

const envSchema = z.object({
    // Resend email service — optional so missing keys never break build or runtime
    RESEND_API_KEY: z.string().optional(),
    RESEND_FROM_EMAIL: z.string().email().optional(),
    CONTACT_EMAIL: z.string().email().optional(),

    // Analytics (optional)
    NEXT_PUBLIC_CLARITY_PROJECT_ID: z.string().optional(),

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

export const env = parseResult.success ? parseResult.data : (process.env as unknown as z.infer<typeof envSchema>);
