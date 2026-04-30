"use server";

// CSRF note: Next.js Server Actions are protected against CSRF by default.
// The framework validates the Origin header on every Server Action call,
// so no additional token is needed for form submissions in this app.

import { Resend } from "resend";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/constants";

// Lazy-init: must NOT touch env at module scope (CLAUDE.md landmine #7).
let _resend: Resend | null = null;
function getResend(): Resend {
    if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
    return _resend;
}

// Best-effort in-memory rate limit. On Vercel serverless this resets per
// instance, so it's a soft brake rather than a real shield. The honeypot +
// time-based check below are the actual anti-spam — replace with Vercel KV /
// Upstash if real per-IP rate limiting is required.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;        // max submissions per instance per window
const RATE_LIMIT_WINDOW = 60_000; // 60 seconds

// Honeypot + time-based bot heuristics.
const MIN_FILL_TIME_MS = 1500; // humans take >1.5s to fill the form

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (entry.count >= RATE_LIMIT_MAX) return false;

    entry.count++;
    return true;
}

/** Escapes user input for safe use inside HTML email bodies */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}

export async function sendContactEmail(formData: {
    name: string;
    email: string;
    company: string;
    phone: string;
    message: string;
    /** Honeypot — must remain empty. Hidden from humans via CSS + aria-hidden. */
    website?: string;
    /** Client-set timestamp when the form mounted (Date.now()). */
    formLoadedAt?: number;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
    }

    // Bot heuristic 1: honeypot. Silently succeed so bots don't retry.
    if (formData.website && formData.website.trim().length > 0) {
        return { success: true, data: null };
    }

    // Bot heuristic 2: time-to-fill. Bots submit instantly; humans take >1.5s.
    if (formData.formLoadedAt && Date.now() - formData.formLoadedAt < MIN_FILL_TIME_MS) {
        return { success: true, data: null };
    }

    if (!checkRateLimit(`contact:${formData.email}`)) {
        return { success: false, error: "Too many requests. Please wait a moment and try again." };
    }

    try {
        const name = escapeHtml(formData.name);
        const email = escapeHtml(formData.email);
        const company = escapeHtml(formData.company);
        const phone = escapeHtml(formData.phone);
        const message = escapeHtml(formData.message).replace(/\n/g, "<br/>");

        const { data, error } = await getResend().emails.send({
            from: `Lopes2Tech Contact Form <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || CONTACT_EMAIL,
            subject: `New Contact Request from ${name}`,
            text: `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || "N/A"}
Phone: ${formData.phone || "N/A"}

Message:
${formData.message}
            `,
            html: `
<h3>New Contact Request from Lopes2Tech Website</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || "N/A"}</p>
<p><strong>Phone:</strong> ${phone || "N/A"}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message}</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function sendBookingNotificationEmail() {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
    }

    try {
        const timestamp = new Date().toLocaleString("en-GB", {
            timeZone: "Europe/Zurich",
            dateStyle: "full",
            timeStyle: "short",
        });

        const { data, error } = await getResend().emails.send({
            from: `Lopes2Tech Website <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || CONTACT_EMAIL,
            subject: `📅 Someone wants to schedule a meeting`,
            html: `
<h3>New Meeting Request</h3>
<p>Someone clicked <strong>&quot;Book a Call&quot;</strong> on your website and was redirected to your Cal.com calendar.</p>
<p><strong>Time:</strong> ${timestamp} (Zurich)</p>
<p><strong>Booking link:</strong> <a href="${BOOKING_URL}">${BOOKING_URL}</a></p>
<br/>
<p style="color:#888;font-size:12px;">This notification was sent automatically by lopes2tech.ch</p>
            `,
        });

        if (error) {
            console.error("Resend booking notification error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send booking notification:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function sendServiceRequestEmail(formData: {
    name: string;
    email: string;
    company: string;
    message: string;
    context: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
    }

    if (!checkRateLimit(`service:${formData.email}`)) {
        return { success: false, error: "Too many requests. Please wait a moment and try again." };
    }

    try {
        const name = escapeHtml(formData.name);
        const email = escapeHtml(formData.email);
        const company = escapeHtml(formData.company);
        const message = escapeHtml(formData.message).replace(/\n/g, "<br/>");
        const context = escapeHtml(formData.context);

        const { data, error } = await getResend().emails.send({
            from: `Lopes2Tech Service Request <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || CONTACT_EMAIL,
            subject: `New Service Request: ${formData.context} from ${formData.name}`,
            text: `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || "N/A"}
Requested Package/Service: ${formData.context}

Message:
${formData.message}
            `,
            html: `
<h3>New Service Package Request</h3>
<p><strong>Package/Service Context:</strong> ${context}</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || "N/A"}</p>
<br/>
<p><strong>Message:</strong></p>
<p>${message}</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send service request email:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function sendNewsletterSubscriptionEmail(
    subscriberEmail: string,
    spamCheck?: { website?: string; formLoadedAt?: number }
) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
    }

    // Honeypot — silently succeed so bots don't retry.
    if (spamCheck?.website && spamCheck.website.trim().length > 0) {
        return { success: true, data: null };
    }
    // Time-to-fill — bots submit instantly.
    if (spamCheck?.formLoadedAt && Date.now() - spamCheck.formLoadedAt < MIN_FILL_TIME_MS) {
        return { success: true, data: null };
    }

    if (!checkRateLimit(`newsletter:${subscriberEmail}`)) {
        return { success: false, error: "Too many requests. Please wait a moment and try again." };
    }

    try {
        const safeEmail = escapeHtml(subscriberEmail);
        const timestamp = new Date().toLocaleString("en-GB", {
            timeZone: "Europe/Zurich",
            dateStyle: "full",
            timeStyle: "short",
        });

        const { data, error } = await getResend().emails.send({
            from: `Lopes2Tech Website <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || CONTACT_EMAIL,
            subject: `📬 New Newsletter Subscriber: ${subscriberEmail}`,
            html: `
<h3>New Newsletter Subscription</h3>
<p>Someone wants to subscribe to the Lopes2Tech newsletter.</p>
<p><strong>Email:</strong> ${safeEmail}</p>
<p><strong>Time:</strong> ${timestamp} (Zurich)</p>
<br/>
<p style="color:#888;font-size:12px;">This notification was sent automatically by lopes2tech.ch</p>
            `,
        });

        if (error) {
            console.error("Resend newsletter notification error:", error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Failed to send newsletter notification:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}
