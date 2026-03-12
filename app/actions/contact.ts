"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limit store (resets on cold start — fine for Vercel serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;        // max submissions
const RATE_LIMIT_WINDOW = 60_000; // per 60 seconds

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
}) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
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

        const { data, error } = await resend.emails.send({
            from: `Lopes2Tech Contact Form <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || "paulo@lopes2tech.ch",
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

        const { data, error } = await resend.emails.send({
            from: `Lopes2Tech Website <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || "paulo@lopes2tech.ch",
            subject: `📅 Someone wants to schedule a meeting`,
            html: `
<h3>New Meeting Request</h3>
<p>Someone clicked <strong>&quot;Book a Call&quot;</strong> on your website and was redirected to your Cal.com calendar.</p>
<p><strong>Time:</strong> ${timestamp} (Zurich)</p>
<p><strong>Booking link:</strong> <a href="https://cal.com/lopes2tech/initial-consult">cal.com/lopes2tech/initial-consult</a></p>
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

        const { data, error } = await resend.emails.send({
            from: `Lopes2Tech Service Request <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || "paulo@lopes2tech.ch",
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

export async function sendNewsletterSubscriptionEmail(subscriberEmail: string) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY environment variable");
        return { success: false, error: "Server configuration error" };
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

        const { data, error } = await resend.emails.send({
            from: `Lopes2Tech Website <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`,
            to: process.env.CONTACT_EMAIL || "paulo@lopes2tech.ch",
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
